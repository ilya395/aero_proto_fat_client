import React, { useMemo } from "react";
import { ListGroup, Popover, Spinner } from "react-bootstrap";
import { IDefaultPopoverProps } from "./models/DefaultPopover.model";

const DefaultPopover = <T extends Object, >(props: IDefaultPopoverProps<T>) => {
  const { items, callback, renderProps, await = null } = props;

  const computedEndElement = useMemo(() => {
    if (await) {
      return (
        <ListGroup.Item key="await"><Spinner animation="border" size="sm" /></ListGroup.Item>
      );
    }
    return !items?.length ? <ListGroup.Item key="end">Нет данных для отображения...</ListGroup.Item> : null;
  }, [await, items?.length]);

  return (
    <Popover id="popover">
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        <ListGroup>
          {
            items?.map((item, index) => (
              // 'id' in item ? item?.id as string | number : index
              // eslint-disable-next-line react/no-array-index-key
              <ListGroup.Item key={index} action onClick={() => callback?.(item)}>
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
  );
}

export default DefaultPopover;
