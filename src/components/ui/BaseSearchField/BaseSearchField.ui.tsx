import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, OverlayTrigger } from "react-bootstrap";
import { IBaseSearchFieldProps } from "./models/BaseSearchField.model";
import DefaultPopover from "./components/DefaultPopover/DefaultPopover.ui";

const BaseSearchField = <T extends Object, >(props: IBaseSearchFieldProps<T>) => {
  const { id, onSearch, items, value, computedValueHandle, label, placeholder, delay = 2000, callback } = props;
  const show = useMemo(() => !!items?.length, [items?.length]);

  const [search, setSearch] = useState<string | null>(null);
  const setComputedSearch = useMemo(() => computedValueHandle?.(value) ?? null, [computedValueHandle, value]);
  useEffect(() => {
    setSearch(setComputedSearch);
  }, [computedValueHandle, setComputedSearch, value]);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch?.(event.target.value);
  }, []);

  // TODO
  const [onDelay, setOnDelay] = useState(false);
  useEffect(() => {
    if (search) {
      if (!onDelay) {
        setOnDelay(true);

        const promise = new Promise<void>((resolve) => {
          setTimeout(() => resolve(), delay);
        });
        promise
          .then(() => onSearch?.(search))
          .then(() => setOnDelay(false))
      }
    }
  }, [delay, onDelay, onSearch, search]);

  return (
    <>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <OverlayTrigger show={show} placement="bottom" overlay={<DefaultPopover items={items} callback={callback} />}>
        <Form.Control
          type="text"
          placeholder={placeholder ?? ""}
          id={id}
          value={search ?? undefined}
          onChange={onChange}
        />
      </OverlayTrigger>
    </>
  );
}

export default BaseSearchField;
