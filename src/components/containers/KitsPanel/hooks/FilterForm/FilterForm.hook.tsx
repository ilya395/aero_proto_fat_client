import React, { useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../../store/hooks/store.hook"
import { kitsFilterDataSelector, updateKitsFilterAction } from "../../../../../store/kitsFilter/reducers/kitsFilter.reducer"
import { IKitsFilter } from "../../../../../store/models/kits.model"
import { EKitsInputTypeKeys, EKitsInputTypeTitles } from "../../../../../types/enums/kitsInputTypes.enum"
import { EProductsInputTypeKeys, EProductsInputTypeTitles } from "../../../../../types/enums/productsInputTypes.enum"
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model"
import BaseTextInput from "../../../../ui/BaseTextInput/BaseTextInput.ui"

const useKitsFilterForm = () => {
  const dispatch = useAppDispatch();

  const kitsFilter = useSelector(kitsFilterDataSelector);

  const changeNumberFilterHandle = useCallback((arg: {[x: string]: string;} & IKitsFilter) => {
    const keys = Object.keys(arg);
    const key = keys[0];
    dispatch(updateKitsFilterAction({
      [key]: Number(arg[key]),
    }))
  }, [dispatch]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      {
        id: "kit-number",
        component: <BaseTextInput
          id="kit-number-field"
          value={(kitsFilter?.kitNumber ?? '').toString()}
          callback={changeNumberFilterHandle}
          objectKey={EKitsInputTypeKeys.KitNumber}
          placeholder={EKitsInputTypeTitles.KitNumber}
          label={EKitsInputTypeTitles.KitNumber}
        />,
      },
      {
        id: "price",
        component: <BaseTextInput
          id="price-field"
          value={(kitsFilter?.price ?? '').toString()}
          callback={changeNumberFilterHandle}
          objectKey={EProductsInputTypeKeys.Price}
          placeholder={EProductsInputTypeTitles.Price}
          label={EProductsInputTypeTitles.Price}
        />,
      },
    ],
  }), [changeNumberFilterHandle, kitsFilter?.kitNumber, kitsFilter?.price]);

  return {
    config,
  };
}

export default useKitsFilterForm;
