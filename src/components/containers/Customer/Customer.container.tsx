import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EInputTypeKeys, EInputTypeTitles } from "../../../enums/inputTypes.enum";
import { ENavigationKeys } from "../../../enums/navigation.enum";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IUser } from "../../../store/models/users.model";
import { createUser, fetchOneUser, updateUser } from "../../../store/user/action-creators/user.action-creator";
import { userAddNewAction, userAddressMemoSelector, userChangeDataAction, userCreationDateMemoSelector, userEmailMemoSelector, userNameMemoSelector, userPhoneMemoSelector, userRedirectIdMemoSelector, userResetAction } from "../../../store/user/reducers/user.reducer";
import BaseForm from "../../views/BaseForm/BaseForm.view";
import { IBaseFormConfig } from "../../views/BaseForm/models/BaseForm.model";
import BaseDateTimePicker from "../../views/inputs/BaseDateTimePicker/BaseDateTimePicker.component";
import BaseTextInput from "../../views/inputs/BaseTextInput/BaseTextInput.component";

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

  const returnHandle = useCallback(() => navigate(ENavigationKeys.Customers), [navigate]);

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
          value={userCreationDate}
          callback={changeHandle}
          objectKey={EInputTypeKeys.CreationDate}
          placeholder={EInputTypeTitles.CreationDate}
          label={EInputTypeTitles.CreationDate}
        />,
      },
    ],
  }), [changeHandle, userAddress, userCreationDate, userEmail, userName, userPhone]);

  return (
    <div className="base-form">
      <div className="base-form__management-buttons">
        <div className="management-button">
          <Button variant="outline-primary" onClick={clearFormHandle}>
            Очистить форму
          </Button>
        </div>
      </div>
      <BaseForm
        config={config}
      />
      <div className="base-form__management-buttons">
        <div className="management-button">
          <Button variant="primary" onClick={saveDataHandle}>
            Сохранить
          </Button>
        </div>
        <div className="management-button">
          <Button variant="outline-danger" onClick={returnHandle}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerContainer;