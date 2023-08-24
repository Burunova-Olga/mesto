export default class Popup
{
  constructor(popupSelector)
  {
    this.popup = document.querySelector(popupSelector);
    this.setEventListeners();
  }

  // Открытие popup
  open()
  {
    this.popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Закрытие popup
  close()
  {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Отслеживание нажатия Esc
  _handleEscClose(evt)
  {
    if (evt.key === 'Escape')
    {
      console.log(this.popup);
      console.log(this.popup.classList);
      if (this.popup.classList.contains("popup_opened"))
        this.close();
    }
  }

  // Клик на overlay и close
  setEventListeners()
  {
    this.popup.addEventListener('mousedown', (evt) =>
    {
      if (evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('close__button'))
        this.close();
    });
  }
}
