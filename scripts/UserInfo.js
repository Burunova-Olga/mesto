export default class UserInfo
{
  constructor(name, description)
  {
    this._name = name;
    this._description = description;
  }

  // Получить данные пользователя
  getUserInfo()
  {
    const info = [this._name, this._description];
    return info;
  }

  // Установить в поля на странице
  setUserInfo(name, description)
  {
    const nameOutput = document.querySelector('.profile__name');
    this._name =
    nameOutput.textContent = name;

    const descriptionOutput = document.querySelector('.profile__description');
    this._description =
    descriptionOutput.textContent = description;
  }
}
