import { useLocation } from "react-router-dom";
import { ENavigationKeys, ENavigationTitles } from "../../../../types/enums/navigation.enum";
import { IBreadcrumb } from "../model/Breadcrumbs.model";

const useRoutePath = () => {
  const location = useLocation();

  const { pathname } = location;

  const strArray = pathname.replace("/", "").split("/") as string[];

  const result = strArray.reduce((accum: IBreadcrumb[], item: string, index: number): IBreadcrumb[] => {
    switch (item) {
      case "":
        return accum;

      case ENavigationKeys.Customers.replace("/", ""):
        accum.push({
          title: ENavigationTitles.Customers,
          path: ENavigationKeys.Customers,
          disabled: false,
          active: false,
        })
        return accum;

      case ENavigationKeys.Orders.replace("/", ""):
        accum.push({
          title: ENavigationTitles.Orders,
          path: ENavigationKeys.Orders,
          disabled: false,
          active: false,
        })
        return accum;

      case ENavigationKeys.Products.replace("/", ""):
        accum.push({
          title: ENavigationTitles.Products,
          path: ENavigationKeys.Products,
          disabled: false,
          active: false,
        })
        return accum;

      case ENavigationKeys.Kits.replace("/", ""):
        accum.push({
          title: ENavigationTitles.Kits,
          path: ENavigationKeys.Kits,
          disabled: false,
          active: false,
        })
        return accum;

      default:
        if (
          (accum.length > 0) &&
          (accum[accum.length - 1].path === ENavigationKeys.Customers)
        ) {
          const prevUrl = accum[index - 1] && accum[index - 1].path;
          accum.push({
            path: prevUrl ? `${prevUrl}/${item}` : `/${item}`,
            title: item === "new" ? "Новый клиент" : `Клиент № ${item}`,
            active: false,
            disabled: false,
          });
        } else if (
          (accum.length > 0) &&
          (accum[accum.length - 1].path === ENavigationKeys.Orders)
        ) {
          const prevUrl = accum[index - 1] && accum[index - 1].path;
          accum.push({
            path: prevUrl ? `${prevUrl}/${item}` : `/${item}`,
            title: item === "new" ? "Новый заказ" : `Заказ № ${item}`,
            active: false,
            disabled: false,
          });
        } else if (
          (accum.length > 0) &&
          (accum[accum.length - 1].path === ENavigationKeys.Products)
        ) {
          const prevUrl = accum[index - 1] && accum[index - 1].path;
          accum.push({
            path: prevUrl ? `${prevUrl}/${item}` : `/${item}`,
            title: item === "new" ? "Новый продукт" : `Продукт № ${item}`,
            active: false,
            disabled: false,
          });
        } else if (
          (accum.length > 0) &&
          (accum[accum.length - 1].path === ENavigationKeys.Kits)
        ) {
          const prevUrl = accum[index - 1] && accum[index - 1].path;
          accum.push({
            path: prevUrl ? `${prevUrl}/${item}` : `/${item}`,
            title: item === "new" ? "Новый набор" : `Набор № ${item}`,
            active: false,
            disabled: false,
          });
        } else {
          const prevUrl = accum[index - 1] && accum[index - 1].path;
          accum.push({
            path: prevUrl ? `${prevUrl}/${item}` : `/${item}`,
            title: "Мы не знаем что это такое...",
            active: false,
            disabled: false,
          });
        }
        return accum;
    }
  }, [] as IBreadcrumb[]);

  result[result.length - 1] &&
  (result[result.length - 1].active = true);

  return result
}

export default useRoutePath;