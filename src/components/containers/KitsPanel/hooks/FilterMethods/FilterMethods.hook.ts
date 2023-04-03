import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAGINATION_LIMIT } from "../../../../../constants/variables.constant";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import { fetchKitsList } from "../../../../../store/kits/action-creators/kits.action-creator";
import { clearKits, kitsPaginationSelector } from "../../../../../store/kits/reducers/kits.reducer";
import { kitsFilterDataSelector, resetKitsFilterAction } from "../../../../../store/kitsFilter/reducers/kitsFilter.reducer";
import { IKit } from "../../../../../store/models/kits.model";
import { ENavigationKeys } from "../../../../../types/enums/navigation.enum";
import { IBaseListRequest } from "../../../../../types/models/base.model";

const useFilterMethods = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const kitsFilter = useSelector(kitsFilterDataSelector);

  const pagination = useSelector(kitsPaginationSelector);

  const filterData: IBaseListRequest<IKit> = useMemo(() => ({
    filter: kitsFilter || undefined,
    pagination,
  }), [kitsFilter, pagination]);

  const handleCreateNew = useCallback(() => navigate(`${ENavigationKeys.Kits}/new`), [navigate]);

  const handleClearList = useCallback(() => dispatch(clearKits()), [dispatch]);

  const handleUpdate = useCallback(async () => {
    await dispatch(clearKits());
    await dispatch(fetchKitsList({
      filter: kitsFilter || undefined,
      pagination: {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      }
    }))
  }, [dispatch, kitsFilter]);

  const handleFilter = useCallback(() => dispatch(fetchKitsList(filterData)), [dispatch, filterData]);

  const handleResetForm = useCallback(() => dispatch(resetKitsFilterAction()), [dispatch]);

  return {
    handleCreateNew,
    handleUpdate,
    handleFilter,
    handleResetForm,
    handleClearList,
  };
}

export default useFilterMethods;
