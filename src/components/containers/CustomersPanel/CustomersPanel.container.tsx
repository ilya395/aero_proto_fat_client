import React, { useCallback, useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { EInputTypeKeys, EInputTypeTitles } from "../../../types/enums/inputTypes.enum";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import useFilterMove from "../../../hooks/ui/filterMove/filterMove.hook";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IUsersFilter, IUsersRequest } from "../../../store/models/users.model";
import { fetchUsersList, updateUsersList } from "../../../store/users/action-creators/users.action-creator";
import { clearUsers, usersPaginationSelector } from "../../../store/users/reducers/users.reducer";
import { resetUsersFilterAction, updateUsersFilterAction, usersFilterDataSelector } from "../../../store/usersFilter/reducers/usersFilter.reducer";
import { IBaseFormConfig } from "../../ui/BaseForm/models/BaseForm.model";
import BasePanel from "../../ui/BasePanel/BasePanel.ui";
import BaseModal from "../../ui/BaseModal/BaseModal.ui";
import BaseForm from "../../ui/BaseForm/BaseForm.ui";
import BaseTextInput from "../../ui/BaseTextInput/BaseTextInput.ui";
import BaseDateTimePicker from "../../ui/BaseDateTimePicker/BaseDateTimePicker.ui";

const CustomersPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ui
  const {
    visibleFilter,
    hideFilterHandle,
    showFilterHandle,
  } = useFilterMove();

  // business
  const usersFilter = useSelector(usersFilterDataSelector);
  const pagination = useSelector(usersPaginationSelector);
  const filterData: IUsersRequest = useMemo(() => ({
    filter: usersFilter || undefined,
    pagination,
  }), [pagination, usersFilter]);
  const createNew = useCallback(() => navigate(`${ENavigationKeys.Customers}/new`), [navigate]);
  const handleUpdate = useCallback(async () => {
    await dispatch(clearUsers());
    await dispatch(updateUsersList({
      filter: usersFilter || undefined,
      pagination: {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      }
    }))
  }, [dispatch, usersFilter]);

  const changeFilterHandle = useCallback((arg: {[x: string]: string | Date;} | IUsersFilter) => dispatch(updateUsersFilterAction(arg)), [dispatch]);
  const resetFormHandle = useCallback(() => dispatch(resetUsersFilterAction()), [dispatch]);
  const filterHandle = useCallback(async () => {
    await dispatch(clearUsers());
    await dispatch(fetchUsersList({
      ...filterData,
      pagination: {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      }
    }));
    await hideFilterHandle();
  }, [dispatch, filterData, hideFilterHandle]);
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
        actionWord="Поиск"
        closeWord="Отмена"
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

export default CustomersPanel;