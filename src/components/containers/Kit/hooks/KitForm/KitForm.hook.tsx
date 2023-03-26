import React, { useCallback, useMemo } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import { putKit, updateKit } from "../../../../../store/kit/action-creators/kit.action-creator";
import { changeKitDataAction, kitCreationDateMemoSelector, kitDataSelect, kitNumberMemoSelector, kitPriceMemoSelector, kitRedirectIdSelector, resetKitDataAction } from "../../../../../store/kit/reducers/kit.reducer";
import { IKit } from "../../../../../store/models/kits.model";
import { EKitsInputTypeKeys, EKitsInputTypeTitles } from "../../../../../types/enums/kitsInputTypes.enum";
import { ENavigationKeys } from "../../../../../types/enums/navigation.enum";
import BaseDateTimePicker from "../../../../ui/BaseDateTimePicker/BaseDateTimePicker.ui";
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model";
import BaseTextInput from "../../../../ui/BaseTextInput/BaseTextInput.ui";

const useKitForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const kitCreationDate = useSelector(kitCreationDateMemoSelector);
  const kitNumber = useSelector(kitNumberMemoSelector);
  const kitPrice = useSelector(kitPriceMemoSelector);

  const redirectId = useSelector(kitRedirectIdSelector);
  const kitData = useSelector(kitDataSelect);

  const changeHandle = useCallback((arg: IKit) => dispatch(changeKitDataAction(arg)), [dispatch]);
  const changeNumberHandle = useCallback((arg: IKit) => {
    const key: keyof IKit = Object.keys(arg)[0] as keyof IKit;
    dispatch(changeKitDataAction({
      [key]: Number(arg[key]),
    }));
  }, [dispatch]);

  const creationDate = useMemo(() => ({
    id: "creation-date",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseDateTimePicker
        id="creation-date-field"
        value={kitCreationDate ?? undefined}
        callback={changeHandle}
        objectKey={EKitsInputTypeKeys.CreationDate}
        placeholder={EKitsInputTypeTitles.CreationDate}
        label={EKitsInputTypeTitles.CreationDate}
      />
    </Col>,
  }), [changeHandle, kitCreationDate]);
  const number = useMemo(() => ({
    id: "number",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="number-field"
        value={(kitNumber ?? '').toString()}
        callback={changeNumberHandle}
        objectKey={EKitsInputTypeKeys.KitNumber}
        placeholder={EKitsInputTypeTitles.KitNumber}
        label={EKitsInputTypeTitles.KitNumber}
      />
    </Col>,
  }), [changeNumberHandle, kitNumber]);
  const price = useMemo(() => ({
    id: "price",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="price-field"
        value={(kitPrice ?? '').toString()}
        callback={changeNumberHandle}
        objectKey={EKitsInputTypeKeys.Price}
        placeholder={EKitsInputTypeTitles.Price}
        label={EKitsInputTypeTitles.Price}
      />
    </Col>,
  }), [changeNumberHandle, kitPrice]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      number,
      price,
      creationDate,
    ],
  }), [creationDate, number, price]);

  const handleClear = useCallback(() => dispatch(resetKitDataAction()), [dispatch]);

  const handlePut = useCallback(() => kitData && dispatch(putKit(kitData)), [dispatch, kitData]);

  const handleUpdate = useCallback(() => kitData && dispatch(updateKit(kitData)), [dispatch, kitData]);

  const handleReturn = useCallback(() => {
    navigate(ENavigationKeys.Kits);
    handleClear();
  }, [handleClear, navigate]);

  return {
    config,
    redirectId,
    handleClear,
    handlePut,
    handleUpdate,
    handleReturn,
  };
}

export default useKitForm;