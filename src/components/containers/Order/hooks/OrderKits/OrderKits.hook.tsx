import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import BaseSearchField from "../../../../ui/BaseSearchField/BaseSearchField.ui";
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model";
import { addOrderKitAction } from "../../../../../store/order/reducers/order.reducer";
import { IKit } from "../../../../../store/models/kits.model";
import { PAGINATION_LIMIT } from "../../../../../constants/variables.constant";
import { fetchKitsList } from "../../../../../store/kits/action-creators/kits.action-creator";
import { clearKits, kitsAwaitSelector, kitsListSelector } from "../../../../../store/kits/reducers/kits.reducer";

const useOrderKits = () => {
  const dispatch = useAppDispatch();

  const kits = useSelector(kitsListSelector);
  const kitsAwait = useSelector(kitsAwaitSelector);

  const filterHandle = useCallback((arg: string) => dispatch(fetchKitsList({
    filter: {
      kitNumber: +arg
    },
    pagination: {
      lastVisible: null,
      limit: PAGINATION_LIMIT,
    },
  })), [dispatch]);

  const changeHandle = useCallback((arg: IKit) => dispatch(addOrderKitAction(arg)), [dispatch]);

  const onReset = useCallback(() => dispatch(clearKits()), [dispatch]);

  const kitSearch = useMemo(() => ({
    id: "kit",
    component: <Col xs={12}>
      <BaseSearchField
        id="kits"
        label="Наборы"
        placeholder="Поиск по названию..."
        items={kits}
        onSearch={filterHandle}
        await={kitsAwait}
        renderProps={(item: IKit) => `${item.kitNumber || "-"} ${item.price || "-"}`}
        callback={(item: IKit) => changeHandle(item)}
        reset={onReset}
      />
    </Col>
  }), [changeHandle, filterHandle, kits, kitsAwait, onReset]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      kitSearch,
    ],
  }), [kitSearch]);

  return {
    config,
  };
}

export default useOrderKits;
