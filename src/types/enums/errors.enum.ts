// eslint-disable-next-line import/prefer-default-export
export enum EBaseErrorTitles {
  FailLoginData = "С данными для авторизации что-то не так...",
  FailAuthRequest = "Ошибка при попытке авторизации...",

  FailGetUsersList = "Ошибка при запросе клиентов...",

  FailRequestDeleteUser = "Ошибка при запросе на удаление клиента...",
  FailDeleteUser = "Ошибка при удалении клиента...",

  FailFetchUser = "Ошибка при запросе данных клиента...",
  FailUndefinedUser = "Такого покупателя нет...",

  FailCreateUser = "Ошибка при запросе на создание покупателя...",
  // FailCreateUser = "Ошибка при запросе на создание покупателя...",

  FailDateUser = "Некорректные данные покупателя...",
  FailUpdateUser = "Ошибка при обновлении покупателя...",

  FailGetProductsList = "Ошибка при запросе продуктов...",

  FailGetProduct = "Ошибка при запросе продукта...",
  FailPutProduct = "Ошибка при создании продукта...",
  FailUpdateProduct = "Ошибка при обновлении продукта...",

  FailGetKitsList = "Ошибка при запросе наборов...",

  FailRequestDeleteKit = "Ошибка при запросе на удаление набора...",

  FailGetKit = "Ошибка при запросе набора...",
  FailPutKit = "Ошибка при создании набора...",
  FailUpdateKit = "Ошибка при обновлении набора...",

  FailGetOrdersList = "Ошибка при запросе заказов...",
}