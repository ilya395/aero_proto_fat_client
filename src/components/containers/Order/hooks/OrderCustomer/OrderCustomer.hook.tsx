import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model";
import BaseTextInput from "../../../../ui/BaseTextInput/BaseTextInput.ui";
import { changeOrderCustomerDataAction, orderCustomerMemoSelector } from "../../../../../store/order/reducers/order.reducer";
import { EInputTypeKeys, EInputTypeTitles } from "../../../../../types/enums/inputTypes.enum";
import BaseDateTimePicker from "../../../../ui/BaseDateTimePicker/BaseDateTimePicker.ui";
import { IUser } from "../../../../../store/models/users.model";
import { clearUsers, usersAwaitSelector, usersListSelector } from "../../../../../store/users/reducers/users.reducer";
import { fetchUsersList } from "../../../../../store/users/action-creators/users.action-creator";
import { PAGINATION_LIMIT } from "../../../../../constants/variables.constant";
import BaseSearchFieldWithSelectingKeys from "../../../../ui/BaseSearchFieldWithSelectingKeys/BaseSearchFieldWithSelectingKeys.ui";

const keys = [{
  value: "name",
  label: "по имени",
  placeholder: "Поиск по имени..."
}, {
  value: "phone",
  label: "по телефону",
  placeholder: "Поиск по телефону..."
}];

const useOrderCustomer = () => {
  const dispatch = useAppDispatch();

  const customer = useSelector(orderCustomerMemoSelector);

  const changeHandle = useCallback((arg: IUser) => dispatch(changeOrderCustomerDataAction(arg)), [dispatch]);

  const name = useMemo(() => ({
    id: "name",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="name-field"
        value={customer?.name}
        callback={changeHandle}
        objectKey={EInputTypeKeys.Name}
        placeholder={EInputTypeTitles.Name}
        label={EInputTypeTitles.Name}
      />
    </Col>,
  }), [changeHandle, customer?.name]);

  const phone = useMemo(() => ({
    id: "phone",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="phone-field"
        value={customer?.phone}
        callback={changeHandle}
        objectKey={EInputTypeKeys.Phone}
        placeholder={EInputTypeTitles.Phone}
        label={EInputTypeTitles.Phone}
      />
    </Col>,
  }), [changeHandle, customer?.phone]);

  const email = useMemo(() => ({
    id: "email",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="email-field"
        type="email"
        value={customer?.email}
        callback={changeHandle}
        objectKey={EInputTypeKeys.Email}
        placeholder={EInputTypeTitles.Email}
        label={EInputTypeTitles.Email}
      />
    </Col>,
  }), [changeHandle, customer?.email]);

  const address = useMemo(() => ({
    id: "address",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="address-field"
        value={customer?.address}
        callback={changeHandle}
        objectKey={EInputTypeKeys.Address}
        placeholder={EInputTypeTitles.Address}
        label={EInputTypeTitles.Address}
      />
    </Col>,
  }), [changeHandle, customer?.address]);

  const creationDate = useMemo(() => ({
    id: "creationDate",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseDateTimePicker
        id="creation-date-field"
        value={customer?.creationDate ?? undefined}
        callback={changeHandle}
        objectKey={EInputTypeKeys.CreationDate}
        placeholder={EInputTypeTitles.CreationDate}
        label={EInputTypeTitles.CreationDate}
      />
    </Col>,
  }), [changeHandle, customer?.creationDate]);

  const onReset = useCallback(() => dispatch(clearUsers()), [dispatch]);

  const [currentKey, setCurrentKey] = useState(keys[0].value);

  const onChooseKeyHandle = useCallback((arg: React.ChangeEvent<HTMLSelectElement>) => setCurrentKey(arg.target.value), []);

  const customers = useSelector(usersListSelector);
  // const customersData = useSelector(usersListDataSelector);
  const usersAwait = useSelector(usersAwaitSelector);
  const filterHandle = useCallback((arg: string) => dispatch(fetchUsersList({
    filter: {
      [currentKey]: arg
    },
    pagination: {
      lastVisible: null,
      limit: PAGINATION_LIMIT,
    },
  })), [currentKey, dispatch]);

  const customerSearch = useMemo(() => ({
    id: "customer",
    component: <Col xs={12}>
      {/* <BaseSearchField
        id="customer"
        label="Заказчик"
        placeholder="Поиск по имени и хотелось бы по телефону, но нетъ..."
        items={customers}
        onSearch={filterHandle}
        await={usersAwait}
        renderProps={(item: IUser) => `${item.name || "-"} ${item.phone || "-"}`}
        callback={(item: IUser) => changeHandle(item)}
        reset={onReset}
      /> */}

      <BaseSearchFieldWithSelectingKeys
        id="customer"
        label="Заказчик"
        placeholder={keys.find((item) => item.value === currentKey)?.placeholder ?? ""}
        items={customers}
        onSearch={filterHandle}
        await={usersAwait}
        renderProps={(item: IUser) => `${item.name || "-"} ${item.phone || "-"}`}
        callback={(item: IUser) => changeHandle(item)}
        reset={onReset}

        keys={keys}
        currentKey={currentKey}
        onChooseKey={onChooseKeyHandle}
      />
    </Col>
  }), [changeHandle, currentKey, customers, filterHandle, onChooseKeyHandle, onReset, usersAwait]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      customerSearch,
      name,
      phone,
      email,
      address,
      creationDate,
    ],
  }), [address, creationDate, customerSearch, email, name, phone]);

  return {
    config,
  };
};

export default useOrderCustomer;
