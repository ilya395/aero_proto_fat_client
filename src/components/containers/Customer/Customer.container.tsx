import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EInputTypeKeys, EInputTypeTitles } from "../../../enums/inputTypes.enum";
import BaseForm from "../../views/BaseForm/BaseForm.view";
import { IBaseFormConfig } from "../../views/BaseForm/models/BaseForm.model";
import BaseDateTimePicker from "../../views/inputs/BaseDateTimePicker/BaseDateTimePicker.component";
import BaseTextInput from "../../views/inputs/BaseTextInput/BaseTextInput.component";

const CustomerContainer = () => {
  const params = useParams();
  const { id, } = params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isNew = useMemo(() => !id, [id]);

  const config: IBaseFormConfig = {
    list: [
      {
        id: "name",
        component: <BaseTextInput
          id="name-field"
          value=""
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
          value=""
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
          value=""
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
          value=""
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
  }

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