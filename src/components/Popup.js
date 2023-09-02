export default class Popup
{
  constructor(popupSelector)
  {
    this.popup = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._setEventListeners();
  }

  // Открытие popup
  open()
  {
    this.popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрытие popup
  close()
  {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Отслеживание нажатия Esc
  _handleEscClose(evt)
  {
    if (evt.key === 'Escape')
    {
      this.close();
    }
  }

  // Клик на overlay и close
  _setEventListeners()
  {
    this.popup.addEventListener('mousedown', (evt) =>
    {
      if (evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('close__button'))
        this.close();
    });
  }
}
