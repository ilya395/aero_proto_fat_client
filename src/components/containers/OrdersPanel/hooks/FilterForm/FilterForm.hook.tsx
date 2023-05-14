import React, { useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../../store/hooks/store.hook"
import { IOrdersFilter } from "../../../../../store/models/orders.model"
import { ordersFilterDataSelector, updateOrdersFilterAction } from "../../../../../store/ordersFilter/reducers/ordersFilter.reducer"
import { EOrdersInputTypeKeys, EOrdersInputTypeTitles } from "../../../../../types/enums/ordersInputTypes"
import BaseDateTimePicker from "../../../../ui/BaseDateTimePicker/BaseDateTimePicker.ui"
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model"
import BaseTextInput from "../../../../ui/BaseTextInput/BaseTextInput.ui"

const useOrdersFilterForm = () => {
  const dispatch = useAppDispatch();

  const ordersFilter = useSelector(ordersFilterDataSelector);

  const changeFilterHandle = useCallback((arg: {[x: string]: string | Date;} | IOrdersFilter) => dispatch(updateOrdersFilterAction(arg)), [dispatch]);

  const changeNumberFilterHandle = useCallback((arg: {[x: string]: string;} & IOrdersFilter) => {
    const keys = Object.keys(arg);
    const key = keys[0];
    dispatch(updateOrdersFilterAction({
      [key]: Number(arg[key]),
    }))
  }, [dispatch]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      {
        id: EOrdersInputTypeKeys.DeliveryDayFrom,
        component: <BaseDateTimePicker
          id="delivery-date-field"
          value={ordersFilter?.deliveryDateFrom}
          callback={changeFilterHandle}
          objectKey={EOrdersInputTypeKeys.DeliveryDayFrom}
          placeholder={EOrdersInputTypeTitles.DeliveryDayFrom}
          label={EOrdersInputTypeTitles.DeliveryDayFrom}
        />,
      },
      {
        id: EOrdersInputTypeKeys.DeliveryDayTo,
        component: <BaseDateTimePicker
          id="delivery-date-field"
          value={ordersFilter?.deliveryDateTo}
          callback={changeFilterHandle}
          objectKey={EOrdersInputTypeKeys.DeliveryDayTo}
          placeholder={EOrdersInputTypeTitles.DeliveryDayTo}
          label={EOrdersInputTypeTitles.DeliveryDayTo}
        />,
      },
      {
        id: EOrdersInputTypeKeys.Price,
        component: <BaseTextInput
          id="price-field"
          value={(ordersFilter?.price ?? '').toString()}
          callback={changeNumberFilterHandle}
          objectKey={EOrdersInputTypeKeys.Price}
          placeholder={EOrdersInputTypeTitles.Price}
          label={EOrdersInputTypeTitles.Price}
        />,
      },
    ],
  }), [changeFilterHandle, changeNumberFilterHandle, ordersFilter?.deliveryDateFrom, ordersFilter?.deliveryDateTo, ordersFilter?.price]);

  return {
    config,
  };
}

export default useOrdersFilterForm;
