import React, { useMemo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model";
import { addOrderKitAction } from "../../../../../store/order/reducers/order.reducer";
import { IKit } from "../../../../../store/models/kits.model";
import { PAGINATION_LIMIT } from "../../../../../constants/variables.constant";
import { fetchKitsList } from "../../../../../store/kits/action-creators/kits.action-creator";
import { clearKits, kitsAwaitSelector, kitsListSelector } from "../../../../../store/kits/reducers/kits.reducer";
import BaseSearchFieldWithSelectingKeys from "../../../../ui/BaseSearchFieldWithSelectingKeys/BaseSearchFieldWithSelectingKeys.ui";

const keys = [{
  value: "kitNumber",
  label: "по названию",
  placeholder: "Поиск по названию..."
}, {
  value: "price",
  label: "по цене",
  placeholder: "Поиск по цене..."
}];

const useOrderKits = () => {
  const dispatch = useAppDispatch();

  const kits = useSelector(kitsListSelector);
  const kitsAwait = useSelector(kitsAwaitSelector);

  const [currentKey, setCurrentKey] = useState(keys[0].value);

  const onChooseKeyHandle = useCallback((arg: React.ChangeEvent<HTMLSelectElement>) => setCurrentKey(arg.target.value), []);

  const filterHandle = useCallback((arg: string) => dispatch(fetchKitsList({
    filter: {
      [currentKey]: +arg
    },
    pagination: {
      lastVisible: null,
      limit: PAGINATION_LIMIT,
    },
  })), [currentKey, dispatch]);

  const changeHandle = useCallback((arg: IKit) => dispatch(addOrderKitAction(arg)), [dispatch]);

  const onReset = useCallback(() => dispatch(clearKits()), [dispatch]);

  const kitSearch = useMemo(() => ({
    id: "kit",
    component: <Col xs={12}>
      <BaseSearchFieldWithSelectingKeys
        id="kits"
        label="Наборы"
        placeholder={keys.find((item) => item.value === currentKey)?.placeholder ?? ""}
        items={kits}
        onSearch={filterHandle}
        await={kitsAwait}
        renderProps={(item: IKit) => `${item.kitNumber || "-"} ${item.price || "-"}`}
        callback={(item: IKit) => changeHandle(item)}
        reset={onReset}

        keys={keys}
        currentKey={currentKey}
        onChooseKey={onChooseKeyHandle}
      />
    </Col>
  }), [changeHandle, currentKey, filterHandle, kits, kitsAwait, onChooseKeyHandle, onReset]);

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
