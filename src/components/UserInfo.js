export default class UserInfo
{
  constructor(selectorName, selectorDescription, selectorAvatar)
  {
    this._nameOutput = document.querySelector(selectorName);
    this._descriptionOutput = document.querySelector(selectorDescription);
    this._avatarOutput = document.querySelector(selectorAvatar);
  }

  // Получить данные пользователя
  getUserInfo()
  {
    const info = {name: this._nameOutput.textContent, description: this._descriptionOutput.textContent,
      avatar: this._avatarOutput.src};
    return info;
  }

  // Установить в поля на странице
  setUserInfo(name, description)
  {
    this._nameOutput.textContent = name;
    this._descriptionOutput.textContent = description;
  }

  // Установить в поля на странице
  setUserAvatar(link)
  {
    this._avatarOutput.src = link;
  }

  // Установить в поля на странице
  setUserAvatar(link)
  {
    this._avatarOutput.src = link;
  }
}
