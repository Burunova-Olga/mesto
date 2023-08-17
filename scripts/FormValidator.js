export class FormValidator
{
  constructor(validationConfig, form)
  {
    this._config = validationConfig;
    this._formElement = form;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement  = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  // Настройка события ввода во все input
  enableValidation()
  {
    // Настройка события ввода
    this._inputList.forEach((inputElement) =>
    {
      inputElement.addEventListener('input', () =>
      {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Проверка значений, введённых программно
  preValidation(hasEmptyFields)
  {
    if (hasEmptyFields)
    {
      this._inputList.forEach((inputElement) => { this._hideInputError(inputElement); });
      this._disabledButton();
    }
    else
    {
      this._inputList.forEach((inputElement) => { this._isValid(inputElement); });
      this._toggleButtonState();
    }
  }

  // Проверка валидности элемента
  _isValid = (inputElement) =>
  {
    if (inputElement.validity.valid)
      this._hideInputError(inputElement);
    else
      this._showInputError(inputElement, inputElement.validationMessage);
  };

  // Вывод ошибки
  _showInputError = (inputElement, errorMessage) =>
  {
    inputElement.classList.add(this._config.inputErrorClass);

    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  // Скрытие ошибки
  _hideInputError = (inputElement) =>
  {
    inputElement.classList.remove(this._config.inputErrorClass);

    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  // Button enable
  _toggleButtonState ()
  {
    if (this._hasInvalidInput())
      this._disabledButton();
    else
      this._enabledButton();
  }

  // Есть ли хоть один не валидный
  _hasInvalidInput = () =>
  {
    return this._inputList.some((inputElement) =>
    {
      return !inputElement.validity.valid;
    });
  }

  // Установка кнопки в активное состояние
  _enabledButton = () =>
  {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  };

  // Установка кнопки в неактивное состояние
  _disabledButton = () =>
  {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  };
}
