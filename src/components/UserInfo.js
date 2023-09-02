export default class UserInfo
{
  constructor(selectorName, selectorDescription)
  {
    this._nameOutput = document.querySelector(selectorName);
    this._descriptionOutput = document.querySelector(selectorDescription);
  }

  // Получить данные пользователя
  getUserInfo()
  {
    const info = {name: this._nameOutput.textContent, description: this._descriptionOutput.textContent};
    return info;
  }

  // Установить в поля на странице
  setUserInfo(name, description)
  {
    this._nameOutput.textContent = name;
    this._descriptionOutput.textContent = description;
  }
}
