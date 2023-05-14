import { PAGINATION_LIMIT } from "../../constants/variables.constant";

export const getScrollLimit = (): number => {
  if (window.matchMedia("(min-width: 575px)")) {
    return PAGINATION_LIMIT + 2;
  }
  if (window.matchMedia("(min-width: 320px)")) {
    return PAGINATION_LIMIT;
  }

  return PAGINATION_LIMIT;
}

export const foo = () => {};