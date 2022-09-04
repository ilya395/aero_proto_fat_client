import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import useInfiniteScroll from "../../../hooks/infiniteScroll/infiniteScroll.hook";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IUsersRequest } from "../../../store/models/users.model";
import { fetchDeleteUser, fetchUsersList } from "../../../store/users/action-creators/users.action-creator";
import { usersListSelector, usersPaginationSelector } from "../../../store/users/reducers/users.reducer";
import { usersFilterDataSelector } from "../../../store/usersFilter/reducers/usersFilter.reducer";
import CustomersView from "../../views/Customers/Customers.view";

const CustomersContainer = () => {
  const dispatch = useAppDispatch();
  const customers = useSelector(usersListSelector) || [];

  // business
  const filterFields = useSelector(usersFilterDataSelector);
  const pagination = useSelector(usersPaginationSelector);
  const filterData: IUsersRequest = useMemo(() => ({
    filter: filterFields || undefined,
    pagination,
  }), [filterFields, pagination]);
  const fetchUsers = useCallback(() => dispatch(fetchUsersList(filterData)), [dispatch, filterData]);
  const handleDelete = useCallback(async (id: string) => {
    await dispatch(fetchDeleteUser({
      id,
    }));
    await fetchUsers();
  }, [dispatch, fetchUsers]);

  // ? отдельный хук для получения при скролле
  const {
    setLastElement,
  } = useInfiniteScroll({
    dataLength: customers.length,
    callback: fetchUsers,
  });
  // const [lastElement, setLastElement] = useState<null | Element>(null);
  // const [paginationCount, setPaginationCount] = useState<number>(0);

  // const observer = useRef<IntersectionObserver>(new IntersectionObserver((entries, obs) => {
  //   entries.forEach((entry) => {
  //     // Если элемент не в зоне видимости, то ничего не происходит
  //     if (!entry.isIntersecting) {
  //       return;
  //     }
  //     // Отключаем «наблюдатель»
  //     // obs.unobserve(entry.target);
  //     // Добавляем текст
  //     // entry.target.textContent = ` Элемент вошел в зону видимости.`;

  //     setPaginationCount(count => count + PAGINATION_LIMIT);
  //   });
  // }));

  // useEffect(() => {
  //   const currentObserver = observer.current;

  //   if (lastElement) {
  //     currentObserver.observe(lastElement);
  //   }

  //   return () => {
  //     if (lastElement) {
  //       currentObserver.unobserve(lastElement);
  //     }
  //   }
  // }, [lastElement]);

  // useEffect(() => {
  //   if (paginationCount === customers.length) {
  //     fetchUsers();
  //   }
  // }, [customers.length, fetchUsers, paginationCount]);

  // рендеринг
  // const renderPaginationLimit = PAGINATION_LIMIT - 5;
  // const [scopes, setScopes] = useState({
  //   start: 0,
  //   end: renderPaginationLimit,
  //   total: customers.length,
  //   leaveFirstCount: 0,
  // });
  // useEffect(() => setScopes(state => ({
  //   ...state,
  //   total: customers.length,
  // })), [customers.length]);
  // useEffect(() => setScopes(state => ({
  //   ...state,
  //   leaveFirstCount: 0,
  // })), [scopes.start]);

  // const usersCollection = useMemo(() => customers.filter((_, index) => (index >= scopes.start) && (index <= scopes.end)), [customers, scopes.end, scopes.start]);

  // const [elements, setElements] = useState<{first: null | Element; last: null | Element;}>({
  //   first: null,
  //   last: null,
  // });

  // const observerLast = useRef<IntersectionObserver>(new IntersectionObserver((entries, obs) => {
  //   entries.forEach((entry) => {
  //     if (!entry.isIntersecting) {
  //       return;
  //     }
  //     setScopes(state => {
  //       if (state.total - state.end >= renderPaginationLimit) {
  //         return ({
  //           ...state,
  //           start: state.start + renderPaginationLimit,
  //           end: state.end + renderPaginationLimit,
  //         });
  //       }
  //       if (state.total - state.end < renderPaginationLimit && state.total - state.end > 0) {
  //         return ({
  //           ...state,
  //           start: state.start + (state.total - state.end),
  //           end: state.end + (state.total - state.end),
  //         });
  //       }
  //       return state; // ?
  //     });
  //   });
  // }));

  // useEffect(() => {
  //   const lastObserver = observerLast.current;
  //   const elementLast = elements.last;

  //   if (elementLast) {
  //     lastObserver.observe(elementLast);
  //   }

  //   return () => {
  //     if (elementLast) {
  //       lastObserver.unobserve(elementLast);
  //     }
  //   }
  // }, [elements.last]);

  // const observerFirst = useRef<IntersectionObserver>(new IntersectionObserver((entries, obs) => {
  //   entries.forEach((entry) => {
  //     if (!entry.isIntersecting) {
  //       setScopes(state => ({
  //         ...state,
  //         leaveFirstCount: state.leaveFirstCount + 1,
  //       }));
  //       return;
  //     }
  //     setScopes(state => {
  //       if (state.leaveFirstCount) {
  //         if (state.start >= renderPaginationLimit) {
  //           return ({
  //             ...state,
  //             start: state.start - renderPaginationLimit,
  //             end: state.end - renderPaginationLimit,
  //           });
  //         }
  //         if (state.start < renderPaginationLimit && state.start > 0) {
  //           return ({
  //             ...state,
  //             start: state.start - state.start,
  //             end: state.end - state.start,
  //           });
  //         }
  //       }
  //       return state; // ?
  //     });
  //   });
  // }));

  // useEffect(() => {
  //   const firstObserver = observerFirst.current;
  //   const elementFirst = elements.first;

  //   if (elementFirst) {
  //     firstObserver.observe(elementFirst);
  //   }

  //   return () => {
  //     if (elementFirst) {
  //       firstObserver.unobserve(elementFirst);
  //     }
  //   }
  // }, [elements.first]);

  // методы для определяния ссылок на первый и последний отрендоенные элементы

  // const setRefToFirstElement = useCallback((arg: Element) => {
  //   setElements(state => ({
  //     ...state,
  //     first: arg,
  //   }));
  // }, []);

  // const setRefToLastElement = useCallback((arg: Element) => {
  //   setLastElement(arg);
  //   setElements(state => ({
  //     ...state,
  //     last: arg,
  //   }));
  // }, [setLastElement]);

  if (!customers.length) {
    return (
      <div>
        Нету...
      </div>
    );
  }

  return (
    <CustomersView
      customers={customers}
      deleteCallback={handleDelete}
      callbackRefToLastElement={setLastElement}
    />
  );
}

export default CustomersContainer;