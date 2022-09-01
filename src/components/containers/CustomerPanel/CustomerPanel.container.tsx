import React, { useCallback, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EInputTypeKeys, EInputTypeTitles } from "../../../enums/inputTypes.enum";
import { ENavigationKeys } from "../../../enums/navigation.enum";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IUsersFilter, IUsersRequest } from "../../../store/models/users.model";
import { fetchUsersList } from "../../../store/users/action-creators/users.action-creator";
import { clearUsersPagination, usersPaginationSelector } from "../../../store/users/reducers/users.reducer";
import { resetUsersFilterAction, updateUsersFilterAction, usersFilterDataSelector } from "../../../store/usersFilter/reducers/usersFilter.reducer";
import BaseForm from "../../views/BaseForm/BaseForm.view";
import { IBaseFormConfig } from "../../views/BaseForm/models/BaseForm.model";
import BaseModal from "../../views/BaseModal/BaseModal.view";
import BasePanel from "../../views/BasePanel/BasePanel.view";
import BaseDateTimePicker from "../../views/inputs/BaseDateTimePicker/BaseDateTimePicker.component";
import BaseTextInput from "../../views/inputs/BaseTextInput/BaseTextInput.component";

const CustomerPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ui
  const [visibleFilter, setVisibleFilter] = useState(false);
  const hideFilterHandle = useCallback(() => setVisibleFilter(false), []);
  const showFilterHandle = useCallback(() => setVisibleFilter(true), []);

  // business
  const usersFilter = useSelector(usersFilterDataSelector);
  const lastVisible = useSelector(usersPaginationSelector);
  const filterData: IUsersRequest = useMemo(() => ({
    filter: usersFilter || undefined,
    pagination: {
      lastVisible,
    }
  }), [lastVisible, usersFilter]);
  const createNew = useCallback(() => navigate(`${ENavigationKeys.Customers}/new`), [navigate]);
  const handleUpdate = useCallback(() => {
    dispatch(clearUsersPagination());
    dispatch(fetchUsersList({
      filter: usersFilter || undefined,
      pagination: {
        lastVisible: null,
      }
    }))
  }, [dispatch, usersFilter]);

  const changeFilterHandle = useCallback((arg: {[x: string]: string | Date;} | IUsersFilter) => dispatch(updateUsersFilterAction(arg)), [dispatch]);
  const resetFormHandle = useCallback(() => dispatch(resetUsersFilterAction()), [dispatch]);
  const filterHandle = useCallback(() => {
    dispatch(fetchUsersList(filterData));
    setVisibleFilter(false);
  }, [dispatch, filterData]);
  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      {
        id: "name",
        component: <BaseTextInput
          id="name-field"
          value={usersFilter?.name}
          callback={changeFilterHandle}
          objectKey={EInputTypeKeys.Name}
          placeholder={EInputTypeTitles.Name}
          label={EInputTypeTitles.Name}
        />,
      },
      {
        id: "phone",
        component: <BaseTextInput
          id="phone-field"
          value={usersFilter?.phone}
          callback={changeFilterHandle}
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
          value={usersFilter?.email}
          callback={changeFilterHandle}
          objectKey={EInputTypeKeys.Email}
          placeholder={EInputTypeTitles.Email}
          label={EInputTypeTitles.Email}
        />,
      },
      {
        id: "address",
        component: <BaseTextInput
          id="address-field"
          value={usersFilter?.address}
          callback={changeFilterHandle}
          objectKey={EInputTypeKeys.Address}
          placeholder={EInputTypeTitles.Address}
          label={EInputTypeTitles.Address}
        />,
      },
      {
        id: EInputTypeKeys.CreationDateFrom,
        component: <BaseDateTimePicker
          id="creation-date-field"
          value={usersFilter?.creationDateFrom}
          callback={changeFilterHandle}
          objectKey={EInputTypeKeys.CreationDateFrom}
          placeholder={EInputTypeTitles.CreationDateFrom}
          label={EInputTypeTitles.CreationDateFrom}
        />,
      },
      {
        id: EInputTypeKeys.CreationDateTo,
        component: <BaseDateTimePicker
          id="creation-date-field"
          value={usersFilter?.creationDateTo}
          callback={changeFilterHandle}
          objectKey={EInputTypeKeys.CreationDateTo}
          placeholder={EInputTypeTitles.CreationDateTo}
          label={EInputTypeTitles.CreationDateTo}
        />,
      },
    ],
  }), [changeFilterHandle, usersFilter?.address, usersFilter?.creationDateFrom, usersFilter?.creationDateTo, usersFilter?.email, usersFilter?.name, usersFilter?.phone]);

  return (
    <>
      <BasePanel
        handleCreate={createNew}
        handleUpdate={handleUpdate}
        handleCallFilter={showFilterHandle}
      />
      <BaseModal
        title="Поиск покупателей"
        show={visibleFilter}
        handleClose={hideFilterHandle}
        handleAction={filterHandle}
      >
        <div>
          <Row>
            <Col sm={{ span: 4, offset: 8, }}>
              <Button
                variant="outline-secondary"
                onClick={resetFormHandle}
              >
                Очистить форму
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <BaseForm
                config={config}
                col={{
                  xs: 12,
                  sm: 6,
                  xl: 6,
                }}
              />
            </Col>
          </Row>
        </div>
      </BaseModal>
    </>
  );
};

export default CustomerPanel;