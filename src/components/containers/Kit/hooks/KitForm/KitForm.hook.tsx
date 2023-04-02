import React, { useCallback, useMemo } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import { putKit, updateKit } from "../../../../../store/kit/action-creators/kit.action-creator";
import { changeKitDataAction, kitCreationDateMemoSelector, kitDataSelect, kitNumberMemoSelector, kitPriceMemoSelector, kitRedirectIdSelector, kitUrlMemoSelector, resetKitDataAction } from "../../../../../store/kit/reducers/kit.reducer";
import { IKit } from "../../../../../store/models/kits.model";
import { EKitsInputTypeKeys, EKitsInputTypeTitles } from "../../../../../types/enums/kitsInputTypes.enum";
import { ENavigationKeys } from "../../../../../types/enums/navigation.enum";
import BaseDateTimePicker from "../../../../ui/BaseDateTimePicker/BaseDateTimePicker.ui";
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model";
import BaseTextInput from "../../../../ui/BaseTextInput/BaseTextInput.ui";
import { imageCoder } from "../../../../../services/ImageCoder/ImageCoder.service";
import ImageField from "../../../../views/ImageField/ImageField.view";

const useKitForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const kitCreationDate = useSelector(kitCreationDateMemoSelector);
  const kitNumber = useSelector(kitNumberMemoSelector);
  const kitPrice = useSelector(kitPriceMemoSelector);
  const kitUrl = useSelector(kitUrlMemoSelector);

  const redirectId = useSelector(kitRedirectIdSelector);
  const kitData = useSelector(kitDataSelect);

  const changeHandle = useCallback((arg: IKit) => dispatch(changeKitDataAction(arg)), [dispatch]);
  const changeNumberHandle = useCallback((arg: IKit) => {
    const key: keyof IKit = Object.keys(arg)[0] as keyof IKit;
    dispatch(changeKitDataAction({
      [key]: Number(arg[key]),
    }));
  }, [dispatch]);

  const imageHandle = useCallback(async (arg: {[x: string | EKitsInputTypeKeys.Image]: File}) => {
    const file = arg[EKitsInputTypeKeys.Image];
    const string = await imageCoder.codeToBase64(file);
    typeof string === 'string' && changeHandle({
      [EKitsInputTypeKeys.Image]: string,
    });
  }, [changeHandle]);

  const resetImagehandle = () => changeHandle({
    [EKitsInputTypeKeys.Image]: null,
  });

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
  const image = useMemo(() => ({
    id: "image",
    component: <Col xs={12} sm={6} xl={4}>
      <ImageField
        id="image-field"
        value={kitUrl}
        callback={imageHandle}
        objectKey={EKitsInputTypeKeys.Image}
        placeholder={EKitsInputTypeTitles.Image}
        label={EKitsInputTypeTitles.Image}
        resetHandle={resetImagehandle}
      />
    </Col>,
  }), [imageHandle, kitUrl, resetImagehandle]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      number,
      price,
      creationDate,
      image,
    ],
  }), [creationDate, image, number, price]);

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