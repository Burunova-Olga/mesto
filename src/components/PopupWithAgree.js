import Popup from './Popup.js';

export default class PopupWithAgree extends Popup
{
  constructor(popupSelector, handleFormSubmit)
  {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this.submitElement = this.popup.querySelector('.form-popup__submit');
    this._memberTextSubmit = this.submitElement.value;
  }

  open(id)
  {
    this.submitElement.value = this._memberTextSubmit;
    super.open();
    this._id = id;
  }

  // Обработчик submit
  _setEventListeners()
  {
    super._setEventListeners();

    this.formElement = this.popup.querySelector('.form-popup');
    this.formElement.addEventListener('submit', (evt) =>
    {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      this.submitElement.value = "Удаление...";
      this._handleFormSubmit(this._id);
      this.close();
    });
  }
}
