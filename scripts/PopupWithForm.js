import Popup from './Popup.js';

export default class PopupWithForm extends Popup
{
  constructor(popupSelector, handleFormSubmit)
  {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues()
  {
    // создаём объект FormData, передаём в него элемент формы
    this.inputValues = new FormData(this.formElement);
  }


  // Обработчик submit
  setEventListeners()
  {
    super.setEventListeners();

    this.formElement = this.popup.querySelector('.form-popup');
    this.formElement.addEventListener('submit', (evt) =>
    {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      this._getInputValues();
      this._handleFormSubmit();
      this.close();
    });
  }

  // Закрытие popup
  close()
  {
    super.close();
    this.formElement.reset();
  }
}
