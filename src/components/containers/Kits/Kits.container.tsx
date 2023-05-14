import React from "react";
import useInfiniteScroll from "../../../hooks/infiniteScroll/infiniteScroll.hook";
import { IKit } from "../../../store/models/kits.model";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import BaseCard from "../../ui/BaseCard/BaseCard.ui";
import BaseList from "../../ui/BaseList/BaseList.ui";
import useKits from "./hooks/Kits.hook";

const KitsContainer = () => {
  const { kits, handleDelete, fetchNextKits } = useKits();

  const {
    setLastElement,
  } = useInfiniteScroll({
    dataLength: kits.length,
    callback: fetchNextKits,
  });

  if (!kits.length) {
    return (
      <div>
        Нету...
      </div>
    );
  }

  return (
    <BaseList
      items={kits}
      deleteCallback={handleDelete}
      callbackRefToLastElement={setLastElement}
      path={ENavigationKeys.Kits}
      renderCard={(item: IKit) => <BaseCard {...item} title={item.kitNumber} subTitle={item.price} />}
    />
  );
}

export default KitsContainer;