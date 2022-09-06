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
}