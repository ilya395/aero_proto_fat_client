import React, { useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EInputTypeKeys, EInputTypeTitles } from "../../../enums/inputTypes.enum";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { fetchOneUser } from "../../../store/user/action-creators/user.action-creator";
import { userAddNewAction, userAddressMemoSelector, userCreationDateMemoSelector, userEmailMemoSelector, userNameMemoSelector, userPhoneMemoSelector } from "../../../store/user/reducers/user.reducer";
import BaseForm from "../../views/BaseForm/BaseForm.view";
import { IBaseFormConfig } from "../../views/BaseForm/models/BaseForm.model";
import BaseDateTimePicker from "../../views/inputs/BaseDateTimePicker/BaseDateTimePicker.component";
import BaseTextInput from "../../views/inputs/BaseTextInput/BaseTextInput.component";

const CustomerContainer = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id, } = params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isNew = useMemo(() => !id, [id]);

  useEffect(() => {
    if (isNew) {
      dispatch(userAddNewAction());
      return;
    }
    if (id) {
      dispatch(fetchOneUser({
        id,
      }));
    }
  }, [dispatch, id, isNew]);

  const userPhone = useSelector(userPhoneMemoSelector);
  const userName = useSelector(userNameMemoSelector);
  const userEmail = useSelector(userEmailMemoSelector);
  const userAddress= useSelector(userAddressMemoSelector);
  const userCreationDate = useSelector(userCreationDateMemoSelector);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      {
        id: "name",
        component: <BaseTextInput
          id="name-field"
          value={userName}
          callback={(arg: any) => console.log(arg)}
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
          callback={(arg: any) => console.log(arg)}
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
          callback={(arg: any) => console.log(arg)}
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
          callback={(arg: any) => console.log(arg)}
          objectKey={EInputTypeKeys.Address}
          placeholder={EInputTypeTitles.Address}
          label={EInputTypeTitles.Address}
        />,
      },
      {
        id: "creationDate",
        component: <BaseDateTimePicker
          id="creation-date-field"
          value={new Date()}
          callback={(arg: any) => console.log(arg)}
          objectKey={EInputTypeKeys.CreationDate}
          placeholder={EInputTypeTitles.CreationDate}
          label={EInputTypeTitles.CreationDate}
        />,
      },
    ],
  }), [userAddress, userEmail, userName, userPhone]);

  return (
    <div className="base-form">
      <div className="base-form__management-buttons">
        <div className="management-button">
          <Button variant="outline-primary">
            Очистить форму
          </Button>
        </div>
      </div>
      <BaseForm
        config={config}
      />
      <div className="base-form__management-buttons">
        <div className="management-button">
          <Button variant="primary">
            Сохранить
          </Button>
        </div>
        <div className="management-button">
          <Button variant="outline-danger">
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerContainer;