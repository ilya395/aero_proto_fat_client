import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import useFilterMove from "../../../hooks/ui/filterMove/filterMove.hook";
import BaseForm from "../../ui/BaseForm/BaseForm.ui";
import BaseModal from "../../ui/BaseModal/BaseModal.ui";
import BasePanel from "../../ui/BasePanel/BasePanel.ui";
import useKitsFilterForm from "./hooks/FilterForm/FilterForm.hook";
import useFilterMethods from "./hooks/FilterMethods/FilterMethods.hook";

const KitsPanelContainer = () => {
  const { config } = useKitsFilterForm();

  const { handleCreateNew, handleUpdate, handleFilter, handleResetForm, handleClearList } = useFilterMethods();

  // ui
  const {
    visibleFilter,
    hideFilterHandle,
    showFilterHandle,
  } = useFilterMove();

  const onFilterHandle = () => {
    handleClearList();
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
        title="Поиск товаров"
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

export default KitsPanelContainer;
