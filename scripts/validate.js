//----------------------------------------------------
//                    Валидация
//----------------------------------------------------
// Вывод ошибки
const showInputError = (selectorinputErrorClass, selectorErrorClass, formElement, inputElement, errorMessage) =>
{
  inputElement.classList.add(`${selectorinputErrorClass}`);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${selectorErrorClass}`);
};

// Скрытие ошибки
const hideInputError = (selectorinputErrorClass, selectorErrorClass, formElement, inputElement) =>
{
  inputElement.classList.remove(`${selectorinputErrorClass}`);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(`${selectorErrorClass}`);
  errorElement.textContent = '';
};

// Проверка валидности элемента
const isValid = (selectorinputErrorClass, selectorErrorClass, formElement, inputElement) =>
{
  console.log(inputElement);
  console.log(inputElement.validity);
  console.log(inputElement.validity.valid);
  if (inputElement.validity.valid)
    hideInputError(selectorinputErrorClass, selectorErrorClass, formElement, inputElement);
  else
    showInputError(selectorinputErrorClass, selectorErrorClass, formElement, inputElement, inputElement.validationMessage);
};

// Button enable
const toggleButtonState  = (selectorBtn, inputList, buttonElement) =>
{
  if (hasInvalidInput(inputList))
  {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(`${selectorBtn}`);
  }
  else
  {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(`${selectorBtn}`);
  }
}

// Есть ли хоть один не валидный
const hasInvalidInput = (inputList) =>
{
  return inputList.some((inputElement) =>
  {
    return !inputElement.validity.valid;
  });
}

// Настройка события ввода во все input
const setEventListeners = (selectors, popupElement) =>
{
  const inputList = Array.from(popupElement.querySelectorAll(`${selectors.inputSelector}`));
  const buttonElement  = popupElement.querySelector(`${selectors.submitButtonSelector}`);
  toggleButtonState(selectors.inactiveButtonClass, inputList, buttonElement);

  // Настройка события ввода
  inputList.forEach((inputElement) =>
  {
    inputElement.addEventListener('input', () =>
    {
      isValid(selectors.inputErrorClass, selectors.errorClass, popupElement, inputElement);
      toggleButtonState(selectors.inactiveButtonClass, inputList, buttonElement);
    });
  });
};

// Валидация всех форм
const enableValidation = (selectors) =>
{
  const popupList = Array.from(document.querySelectorAll(`${selectors.formSelector}`));
  popupList.forEach((popupElement) =>
  {
    setEventListeners(selectors, popupElement);
  });
};

// Вызов функции
enableValidation
(
  {
    formSelector: '.form-popup',
    inputSelector: '.form-popup__input',
    submitButtonSelector: '.form-popup__submit',
    inactiveButtonClass: 'form-popup__submit_disabled',
    inputErrorClass: 'form-popup__input_error',
    errorClass: 'form-popup__input-error_visible'
  }
);
