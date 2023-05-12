import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Form, ListGroup, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { IBaseSearchFieldProps } from "./models/BaseSearchField.model";

const ForwardedFormControl = forwardRef<HTMLDivElement, any>((props, ref) => ( // React.ForwardedRef<HTMLInputElement> |
  <div ref={ref}>
    <Form.Control
      {...props}
    />
  </div>
));

const BaseSearchField = <T extends Object, >(props: IBaseSearchFieldProps<T>) => {
  const { id, onSearch, items, value, computedValueHandle, label, placeholder, delay = 2000, callback, await, renderProps, reset } = props;
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
  const [searchLenght, setSearchLenght] = useState(search?.length ?? 0);
  useEffect(() => {
    if (((search?.length ?? 0) > searchLenght) && !value && !onDelay) {
      setOnDelay(true);

      const promise = new Promise<void>((resolve) => {
        setTimeout(() => resolve(), delay);
      });
      promise
        .then(() => search && onSearch?.(search))
        .then(() => setSearchLenght(search?.length ?? 0))
        .then(() => setOnDelay(false));
    }
  }, [delay, onDelay, onSearch, search, searchLenght, value]);

  const computedEndElement = useMemo(() => {
    if (await) {
      return (
        <ListGroup.Item key="await"><Spinner animation="border" size="sm" /></ListGroup.Item>
      );
    }
    return !items?.length ? <ListGroup.Item key="end">Нет данных для отображения...</ListGroup.Item> : null;
  }, [await, items?.length]);

  const popover = useMemo(() => (
    <Popover id="popover">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        <ListGroup>
          {
            items?.map((item, index) => (
              // 'id' in item ? item?.id as string | number : index
              // eslint-disable-next-line react/no-array-index-key
              <ListGroup.Item key={index} action onClick={() => {
                callback?.(item);
                reset?.();
                setSearch(null);
              }}>
                {renderProps?.(item)}
              </ListGroup.Item>
            ))
          }
          {
            computedEndElement
          }
        </ListGroup>
      </Popover.Body>
    </Popover>
  ), [callback, computedEndElement, items, renderProps, reset]);

  return (
    <>
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <OverlayTrigger
        show={show}
        placement="bottom"
        overlay={popover}
        // overlay={<DefaultPopover items={items} callback={callback} />}
        >
        <ForwardedFormControl
          type="text"
          placeholder={placeholder ?? ""}
          id={id}
          value={search ?? ""}
          onChange={onChange}
          className="mb-3"
        />
        {/* {
          forwardRef((props, ref) => (
            <Form.Control
              {...props}
              type="text"
              placeholder={placeholder ?? ""}
              id={id}
              value={search ?? undefined}
              onChange={onChange}
              ref={ref}
            />
          ))
        } */}
      </OverlayTrigger>
    </>
  );
}

export default BaseSearchField;
