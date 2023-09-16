import Popup from './Popup.js';

export default class PopupWithAgree extends Popup
{
  constructor(popupSelector, handleFormSubmit)
  {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this.submitElement = this.popup.querySelector('.form-popup__submit');
    this.memberTextSubmit = this.submitElement.value;
  }

  open(card, id)
  {
    super.open();
    this._id = id;
    this._card = card;
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
      this._handleFormSubmit(this._card, this._id);
    });
  }
}
