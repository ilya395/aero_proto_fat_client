import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EInputTypeKeys, EInputTypeTitles } from "../../../types/enums/inputTypes.enum";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IUser } from "../../../store/models/users.model";
import { createUser, fetchOneUser, updateUser } from "../../../store/user/action-creators/user.action-creator";
import { userAddNewAction, userAddressMemoSelector, userChangeDataAction, userCreationDateMemoSelector, userEmailMemoSelector, userNameMemoSelector, userPhoneMemoSelector, userRedirectIdMemoSelector, userResetAction } from "../../../store/user/reducers/user.reducer";
import FormPanel from "../../views/FormPanel/FormPanel.view";
import { IBaseFormConfig } from "../../ui/BaseForm/models/BaseForm.model";
import BaseForm from "../../ui/BaseForm/BaseForm.ui";
import BaseTextInput from "../../ui/BaseTextInput/BaseTextInput.ui";
import BaseDateTimePicker from "../../ui/BaseDateTimePicker/BaseDateTimePicker.ui";

const CustomerContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id, } = params;

  // business
  const userPhone = useSelector(userPhoneMemoSelector);
  const userName = useSelector(userNameMemoSelector);
  const userEmail = useSelector(userEmailMemoSelector);
  const userAddress= useSelector(userAddressMemoSelector);
  const userCreationDate = useSelector(userCreationDateMemoSelector);
  const redirectId = useSelector(userRedirectIdMemoSelector);

  const isNew = useMemo(() => !id, [id]);
  useEffect(() => {
    if (id) {
      dispatch(fetchOneUser({
        id,
      }));
    }
    dispatch(userAddNewAction());
  }, [dispatch, id]);

  useEffect(() => {
    if (isNew && redirectId) {
      navigate(`${ENavigationKeys.Customers}/${redirectId}`);
    }
  }, [isNew, navigate, redirectId]);

  const changeHandle = useCallback((arg: IUser) => dispatch(userChangeDataAction(arg)), [dispatch]);
  const clearFormHandle = useCallback(() => dispatch(userResetAction()), [dispatch]);
  const saveDataHandle = useCallback(() => isNew ?
    dispatch(createUser({
      user: {
        name: userName,
        phone: userPhone,
        email: userEmail,
        address: userAddress,
        creationDate: userCreationDate,
        id,
      },
    })) :
    dispatch(updateUser({
      user: {
        name: userName,
        phone: userPhone,
        email: userEmail,
        address: userAddress,
        creationDate: userCreationDate,
        id,
      },
    })), [dispatch, id, isNew, userAddress, userCreationDate, userEmail, userName, userPhone]);

  const returnHandle = useCallback(() => {
    navigate(ENavigationKeys.Customers);
    clearFormHandle();
  }, [clearFormHandle, navigate]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      {
        id: "name",
        component: <BaseTextInput
          id="name-field"
          value={userName}
          callback={changeHandle}
          objectKey={EInputTypeKeys.Name}
          placeholder={EInputTypeTitles.Name}
          label={EInputTypeTitles.Name}
        />,
      },
      {
        id: "phone",
        component: <BaseTextInput
          id="phone-field"
          value={userPhone}
          callback={changeHandle}
          objectKey={EInputTypeKeys.Phone}
          placeholder={EInputTypeTitles.Phone}
          label={EInputTypeTitles.Phone}
        />,
      },
      {
        id: "email",
        component: <BaseTextInput
          id="email-field"
          type="email"
          value={userEmail}
          callback={changeHandle}
          objectKey={EInputTypeKeys.Email}
          placeholder={EInputTypeTitles.Email}
          label={EInputTypeTitles.Email}
        />,
      },
      {
        id: "address",
        component: <BaseTextInput
          id="address-field"
          value={userAddress}
          callback={changeHandle}
          objectKey={EInputTypeKeys.Address}
          placeholder={EInputTypeTitles.Address}
          label={EInputTypeTitles.Address}
        />,
      },
      {
        id: "creationDate",
        component: <BaseDateTimePicker
          id="creation-date-field"
          value={userCreationDate ?? undefined}
          callback={changeHandle}
          objectKey={EInputTypeKeys.CreationDate}
          placeholder={EInputTypeTitles.CreationDate}
          label={EInputTypeTitles.CreationDate}
        />,
      },
    ],
  }), [changeHandle, userAddress, userCreationDate, userEmail, userName, userPhone]);

  return (
    <FormPanel
      clearFormHandle={clearFormHandle}
      saveFormHandle={saveDataHandle}
      cancelFormHandle={returnHandle}
    >
      <BaseForm
        config={config}
      />
    </FormPanel>
  );
}

export default CustomerContainer;