export default class Api
{
  constructor({baseUrl, headers})
  {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Подумать и объединить
  _requestWithoutBody({method, url})
  {
    return fetch(this._baseUrl + url,
      {
        method: method,
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

  _requestWithBody({method, url, body})
  {
    return fetch(this._baseUrl + url,
    {
      method: method,
      headers: this._headers,
      body: body
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
    return this._requestWithoutBody({method: 'GET', url: "/cards"});
  }

  getUserInfo()
  {
    return this._requestWithoutBody({method: 'GET', url: "/users/me"});
  }

  setUserInfo(name, description)
  {
    return this._requestWithBody
    ({
      method: 'PATCH',
      url: "/users/me",
      body: JSON.stringify
      ({
        name: name,
        about: description
      })
    })
  }

  addNewCard(name, link)
  {
    return this._requestWithBody
    ({
      method: 'POST',
      url: "/cards",
      body: JSON.stringify
      ({
        name: name,
        link: link
      })
    })
  }

  changeLike(cardId, isLike)
  {
    const method = isLike ? 'PUT' : 'DELETE';
    return this._requestWithoutBody({method: method, url: `/cards/${cardId}/likes`});
  }
}
