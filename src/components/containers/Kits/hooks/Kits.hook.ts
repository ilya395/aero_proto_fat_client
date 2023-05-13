import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../store/hooks/store.hook";
import { fetcNextKitsList, fetchDeleteKit, fetchKitsList } from "../../../../store/kits/action-creators/kits.action-creator";
import { kitsListSelector, kitsPaginationSelector } from "../../../../store/kits/reducers/kits.reducer";
import { kitsFilterDataSelector } from "../../../../store/kitsFilter/reducers/kitsFilter.reducer";
import { IKitsFilter } from "../../../../store/models/kits.model";
import { IBaseListRequest } from "../../../../types/models/base.model";

const useKits = () => {
  const dispatch = useAppDispatch();

  const kits = useSelector(kitsListSelector) || [];

  // business
  const filterFields = useSelector(kitsFilterDataSelector);
  const pagination = useSelector(kitsPaginationSelector);
  const filterData: IBaseListRequest<IKitsFilter> = useMemo(() => ({
    filter: filterFields || {},
    pagination,
  }), [filterFields, pagination]);
  const fetchKits = useCallback(() => dispatch(fetchKitsList(filterData)), [dispatch, filterData]);
  const fetchNextKits = useCallback(() => dispatch(fetcNextKitsList(filterData)), [dispatch, filterData]);
  const handleDelete = useCallback(async (id: string) => {
    await dispatch(fetchDeleteKit({
      id,
    }));
    await fetchKits();
  }, [dispatch, fetchKits]);

  return {
    kits,
    handleDelete,
    fetchKits,
    fetchNextKits,
  };
}

export default useKits;
