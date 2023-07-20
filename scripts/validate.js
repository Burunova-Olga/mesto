//----------------------------------------------------
//                    Валидация
//----------------------------------------------------
// Вывод ошибки
const showInputError = (selectorinputErrorClass, selectorErrorClass, formElement, inputElement, errorMessage) =>
{
  inputElement.classList.add(selectorinputErrorClass);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorErrorClass);
};

// Скрытие ошибки
const hideInputError = (selectorinputErrorClass, selectorErrorClass, formElement, inputElement) =>
{
  inputElement.classList.remove(selectorinputErrorClass);

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(selectorErrorClass);
  errorElement.textContent = '';
};

// Проверка валидности элемента
const isValid = (selectorinputErrorClass, selectorErrorClass, formElement, inputElement) =>
{
  if (inputElement.validity.valid)
    hideInputError(selectorinputErrorClass, selectorErrorClass, formElement, inputElement);
  else
    showInputError(selectorinputErrorClass, selectorErrorClass, formElement, inputElement, inputElement.validationMessage);
};

// Установка кнопки в активное состояние
const enabledButton = (selectorBtn, buttonElement) =>
{
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(selectorBtn);
};

// Установка кнопки в неактивное состояние
const disabledButton = (selectorBtn, buttonElement) =>
{
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(selectorBtn);
};

// Button enable
const toggleButtonState  = (selectorBtn, inputList, buttonElement) =>
{
  if (hasInvalidInput(inputList))
    disabledButton(selectorBtn, buttonElement);
  else
    enabledButton(selectorBtn, buttonElement);
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
const setEventListeners = (selectors, formElement) =>
{
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement  = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(selectors.inactiveButtonClass, inputList, buttonElement);

  // Настройка события ввода
  inputList.forEach((inputElement) =>
  {
    inputElement.addEventListener('input', () =>
    {
      isValid(selectors.inputErrorClass, selectors.errorClass, formElement, inputElement);
      toggleButtonState(selectors.inactiveButtonClass, inputList, buttonElement);
    });
  });
};

// Валидация всех форм
const enableValidation = (selectors) =>
{
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) =>
  {
    setEventListeners(selectors, formElement);
  });
};

const validatePopup = (popupElement, selectors) =>
{
  const inputList = Array.from(popupElement.querySelectorAll(selectors.inputSelector));
  const buttonElement  = popupElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) =>
  {
    isValid(selectors.inputErrorClass, selectors.errorClass, popupElement, inputElement);
  });
  toggleButtonState(selectors.inactiveButtonClass, inputList, buttonElement);
}

// Вызов функции
enableValidation(selectorsList);
