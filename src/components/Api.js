export default class Api
{
  constructor({baseUrl, headers})
  {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getInfo(request)
  {
    return fetch(this._baseUrl + request,
      {
        headers: this._headers
      })
      .then((res) =>
      {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) =>
      {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  getInitialCards()
  {
    return this._getInfo("/cards");
  }

  getUserInfo()
  {
    return this._getInfo("/users/me");
  }
}
