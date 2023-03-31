import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import useFilterMove from '../../../hooks/ui/filterMove/filterMove.hook';
import BaseForm from '../../ui/BaseForm/BaseForm.ui';
import BaseModal from '../../ui/BaseModal/BaseModal.ui';
import BasePanel from '../../ui/BasePanel/BasePanel.ui';
import useOrdersFilterForm from './hooks/FilterForm/FilterForm.hook';
import useFilterMethods from './hooks/FilterMethods/FilterMethods.hook';

const OrdersPanel = () => {
  const { config } = useOrdersFilterForm();

  const { handleCreateNew, handleUpdate, handleFilter, handleResetForm } = useFilterMethods();

  // ui
  const {
    visibleFilter,
    hideFilterHandle,
    showFilterHandle,
  } = useFilterMove();

  const onFilterHandle = () => {
    handleFilter();
    hideFilterHandle();
  };

  return (
    <>
      <BasePanel
        handleCreate={handleCreateNew}
        handleUpdate={handleUpdate}
        handleCallFilter={showFilterHandle}
      />
      <BaseModal
        title="Поиск заказов"
        show={visibleFilter}
        handleClose={hideFilterHandle}
        handleAction={onFilterHandle}
      >
        <div>
          <Row>
            <Col sm={{ span: 4, offset: 8, }}>
              <Button
                variant="outline-secondary"
                onClick={handleResetForm}
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
}

export default OrdersPanel;
