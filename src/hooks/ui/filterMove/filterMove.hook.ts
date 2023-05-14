import { useCallback, useState } from "react";

const useFilterMove = () => {
  const [visibleFilter, setVisibleFilter] = useState(false);
  const hideFilterHandle = useCallback(() => setVisibleFilter(false), []);
  const showFilterHandle = useCallback(() => setVisibleFilter(true), []);

  return {
    visibleFilter,
    setVisibleFilter,
    hideFilterHandle,
    showFilterHandle,
  }
}

export default useFilterMove;