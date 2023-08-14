export class FormValidator
{
  constructor(validationConfig, form)
  {
    this._config = validationConfig;
    this._formElement = form;
  }

  // Настройка события ввода во все input
  enableValidation()
  {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement  = this._formElement.querySelector(this._config.submitButtonSelector);
    // this._toggleButtonState(inputList, buttonElement);

    // Настройка события ввода
    inputList.forEach((inputElement) =>
    {
      inputElement.addEventListener('input', () =>
      {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // Проверка значений, введённых программно
  // Можно сделать через 2 потомков для каждого вида popup
  // Но я не уверена, что это будет соответствовать заданию
  preValidation(hasEmptyFields)
  {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement  = this._formElement.querySelector(this._config.submitButtonSelector);
    if (hasEmptyFields)
    {
      inputList.forEach((inputElement) => { this._hideInputError(inputElement); });
      this._disabledButton(buttonElement);
    }
    else
    {
      inputList.forEach((inputElement) => { this._isValid(inputElement); });
      this._toggleButtonState(inputList, buttonElement);
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
  _toggleButtonState (inputList, buttonElement)
  {
    if (this._hasInvalidInput(inputList))
      this._disabledButton(buttonElement);
    else
      this._enabledButton(buttonElement);
  }

  // Есть ли хоть один не валидный
  _hasInvalidInput = (inputList) =>
  {
    return inputList.some((inputElement) =>
    {
      return !inputElement.validity.valid;
    });
  }

  // Установка кнопки в активное состояние
  _enabledButton = (buttonElement) =>
  {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  };

  // Установка кнопки в неактивное состояние
  _disabledButton = (buttonElement) =>
  {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._config.inactiveButtonClass);
  };
}
