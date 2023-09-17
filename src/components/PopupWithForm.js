import Popup from './Popup.js';

export default class PopupWithForm extends Popup
{
  constructor(popupSelector, handleFormSubmit)
  {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this.submitElement = this.popup.querySelector('.form-popup__submit');
    this.memberTextSubmit = this.submitElement.value;
  }

  _getInputValues()
  {
    // создаём объект FormData, передаём в него элемент формы
    return new FormData(this.formElement);
  }

  // Обработчик submit
  _setEventListeners()
  {
    super._setEventListeners();

    this.formElement = this.popup.querySelector('.form-popup');
    this.formElement.addEventListener('submit', (evt) =>
    {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      this.submitElement.value = "Сохранение...";
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch(() =>
        {
          console.log("Что-то пошло не так: " + err);
        })
        .finally(() =>
        {
          this.submitElement.value = this.memberTextSubmit;
        })
    });
  }

  // Закрытие popup
  close()
  {
    super.close();
    this.formElement.reset();
  }
}
