import { useEffect, useRef, useState } from "react";
import { PAGINATION_LIMIT } from "../../constants/variables.constant";
import { IInfiniteScroll } from "./models/useInfiniteScroll.model";

const useInfiniteScroll = (object: IInfiniteScroll) => {
  const {
    callback,
    dataLength = 0,
    limit = PAGINATION_LIMIT,
  } = object;

  const [lastElement, setLastElement] = useState<null | Element>(null);
  const [paginationCount, setPaginationCount] = useState<number>(0);

  const observer = useRef<IntersectionObserver>(new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      // Если элемент не в зоне видимости, то ничего не происходит
      if (!entry.isIntersecting) {
        return;
      }
      // Отключаем «наблюдатель»
      // obs.unobserve(entry.target);
      // Добавляем текст
      // entry.target.textContent = ` Элемент вошел в зону видимости.`;

      setPaginationCount(count => count + limit);
    });
  }));

  useEffect(() => {
    const currentObserver = observer.current;

    if (lastElement) {
      currentObserver.observe(lastElement);
    }

    return () => {
      if (lastElement) {
        currentObserver.unobserve(lastElement);
      }
    }
  }, [lastElement]);

  useEffect(() => {
    if (dataLength < paginationCount) {
      setPaginationCount(0);
    }
    if (paginationCount === dataLength) {
      callback && callback();
    }
  }, [callback, dataLength, paginationCount]);

  return {
    setLastElement,
  }
}

export default useInfiniteScroll;