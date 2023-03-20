import { ENavigationKeys, ENavigationTitles } from "../types/enums/navigation.enum";

export const AUTH_DATA = "AUTH_DATA";

export const PAGINATION_LIMIT = 10;

export const menuList = [
  {
    key: ENavigationKeys.Kits,
    title: ENavigationTitles.Kits,
  },
  {
    key: ENavigationKeys.Customers,
    title: ENavigationTitles.Customers,
  },
  {
    key: ENavigationKeys.Orders,
    title: ENavigationTitles.Orders,
  },
  {
    key: ENavigationKeys.Products,
    title: ENavigationTitles.Products,
  },
];