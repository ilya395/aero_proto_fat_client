import React, { useCallback, useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { ENavigationKeys } from "../../../enums/navigation.enum";
import { EProductsInputTypeKeys, EProductsInputTypeTitles } from "../../../enums/productsInputTypes.enum";
import useFilterMove from "../../../hooks/ui/filterMove/filterMove.hook";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IProductsFilter, IProductsRequest } from "../../../store/models/products.model";
import { filterProductsList } from "../../../store/products/action-creators/products.action-creator";
import { clearProducts, productsPaginationSelector } from "../../../store/products/reducers/products.reducer";
import { productsFilterDataSelector, resetProductsFilterAction, updateProductsFilterAction } from "../../../store/productsFilter/reducers/productsFilter.reducer";
import BaseForm from "../../views/BaseForm/BaseForm.view";
import { IBaseFormConfig } from "../../views/BaseForm/models/BaseForm.model";
import BaseModal from "../../views/BaseModal/BaseModal.view";
import BasePanel from "../../views/BasePanel/BasePanel.view";
import BaseTextInput from "../../views/inputs/BaseTextInput/BaseTextInput.component";

const ProductsPanelContainer = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // ui
  const {
    visibleFilter,
    hideFilterHandle,
    showFilterHandle,
  } = useFilterMove();

  // business
  const productsFilter = useSelector(productsFilterDataSelector);

  const pagination = useSelector(productsPaginationSelector);

  const filterData: IProductsRequest = useMemo(() => ({
    filter: productsFilter || undefined,
    pagination,
  }), [pagination, productsFilter]);

  const createNew = useCallback(() => navigate(`${ENavigationKeys.Products}/new`), [navigate]);

  const handleUpdate = useCallback(async () => {
    await dispatch(clearProducts());
    await dispatch(filterProductsList({
      filter: productsFilter || undefined,
      pagination: {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      }
    }))
  }, [dispatch, productsFilter]);

  const changeFilterHandle = useCallback((arg: {[x: string]: string | Date | number;} | IProductsFilter) => dispatch(updateProductsFilterAction(arg)), [dispatch]);

  const changeNumberFilterHandle = useCallback((arg: {[x: string]: string;} & IProductsFilter) => {
    const keys = Object.keys(arg);
    const key = keys[0];
    dispatch(updateProductsFilterAction({
      [key]: Number(arg[key]),
    }))
  }, [dispatch]);

  const resetFormHandle = useCallback(() => dispatch(resetProductsFilterAction()), [dispatch]);

  const filterHandle = useCallback(() => {
    dispatch(filterProductsList(filterData));
    hideFilterHandle();
  }, [dispatch, filterData, hideFilterHandle]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      {
        id: "name",
        component: <BaseTextInput
          id="name-field"
          value={productsFilter?.name}
          callback={changeFilterHandle}
          objectKey={EProductsInputTypeKeys.Name}
          placeholder={EProductsInputTypeTitles.Name}
          label={EProductsInputTypeTitles.Name}
        />,
      },
      {
        id: "price",
        component: <BaseTextInput
          id="price-field"
          value={String(productsFilter?.price || "")}
          callback={changeNumberFilterHandle}
          objectKey={EProductsInputTypeKeys.Price}
          placeholder={EProductsInputTypeTitles.Price}
          label={EProductsInputTypeTitles.Price}
        />,
      },
      {
        id: "quantity",
        component: <BaseTextInput
          id="quantity-field"
          value={String(productsFilter?.price || "")}
          callback={changeNumberFilterHandle}
          objectKey={EProductsInputTypeKeys.Quantity}
          placeholder={EProductsInputTypeTitles.Quantity}
          label={EProductsInputTypeTitles.Quantity}
        />,
      },
    ],
  }), [changeFilterHandle, changeNumberFilterHandle, productsFilter?.name, productsFilter?.price]);

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
}

export default ProductsPanelContainer