import React, { useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../../store/hooks/store.hook"
import { kitsFilterDataSelector, updateKitsFilterAction } from "../../../../../store/kitsFilter/reducers/kitsFilter.reducer"
import { IKitsFilter } from "../../../../../store/models/kits.model"
import { EKitsInputTypeKeys, EKitsInputTypeTitles } from "../../../../../types/enums/kitsInputTypes.enum"
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
        id: EKitsInputTypeKeys.KitNumber,
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
        id: EKitsInputTypeKeys.Price,
        component: <BaseTextInput
          id="price-field"
          value={(kitsFilter?.price ?? '').toString()}
          callback={changeNumberFilterHandle}
          objectKey={EKitsInputTypeKeys.Price}
          placeholder={EKitsInputTypeTitles.Price}
          label={EKitsInputTypeTitles.Price}
        />,
      },
    ],
  }), [changeNumberFilterHandle, kitsFilter?.kitNumber, kitsFilter?.price]);

  return {
    config,
  };
}

export default useKitsFilterForm;
