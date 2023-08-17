import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards, validationConfig } from './constants.js';

const elementsContainer = document.querySelector('.elements');
const popupProfile = document.querySelector('.popup_type_profile');
const popupZoom = document.querySelector('.popup_type_zoom');
const popupPlace = document.querySelector('.popup_type_places');
const nameOutput = document.querySelector('.profile__name');
const descriptionOutput = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');
const editBtn = document.querySelector('.profile__edit');
const addBtns = document.querySelector('.profile__add');

const formElementProfile = popupProfile.querySelector('.form-popup_type_profile');
const nameInput = formElementProfile.querySelector('#input-name');
const descriptionInput = formElementProfile.querySelector('#input-description');

const formElementPlace = popupPlace.querySelector('.form-popup_type_place');
const placeInput = formElementPlace.querySelector('#input-place');
const linkInput = formElementPlace.querySelector('#input-link');

//----------------------------------------------------
//                      Popups
//----------------------------------------------------
function listenEsc(evt)
{
  if (evt.key === 'Escape')
  {
    popups.forEach((popup) =>
    {
      if (popup.classList.contains("popup_opened"))
        hidePopup(popup);
    });
  }
}

// Клик на overlay и close
popups.forEach((popup) =>
{
    popup.addEventListener('mousedown', (evt) =>
    {
      if (evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('close__button'))
        hidePopup(popup);
    })
});

// Открытие popup
function showPopup(popup)
{
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', listenEsc);
}

// Закрытие popup
function hidePopup(popup)
{
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', listenEsc);
}

//------------Изменение данных профиля----------------
// Открыть форму редактирования профиля
editBtn.addEventListener('click', showPopupEdit);
function showPopupEdit()
{
  showPopup(popupProfile);

  nameInput.value = nameOutput.textContent;
  descriptionInput.value = descriptionOutput.textContent;

  formValidators['form-popup_type_profile'].preValidation(false);
  // validatorProfile.preValidation(false);
}

// Внести на страницу новые данные профиля
formElementProfile.addEventListener('submit', handleFormSubmitProfile);
function handleFormSubmitProfile(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;

  hidePopup(popupProfile);
}

//-----------Добавление нового элемента---------------
function createCard(link, name)
{
  const card = new Card(link, name, showPopupZoom, '.elementTemplate');
  return card.createElement();
}

addBtns.addEventListener('click', showPopupAdd);
function showPopupAdd()
{
  showPopup(popupPlace);

  const form = popupPlace.querySelector('.form-popup');
  form.reset();

  formValidators['form-popup_type_place'].preValidation(true);
  // validatorPlace.preValidation(true);
}

formElementPlace.addEventListener('submit', handleFormSubmitAdd);
// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  elementsContainer.prepend(createCard(linkInput.value, placeInput.value));

  hidePopup(popupPlace);
}

// Фото на весь экран
function showPopupZoom(name, link)
{
  const image = popupZoom.querySelector('.photo__image');
  const text = popupZoom.querySelector('.photo__text');

  image.src = link;
  image.alt = name;
  text.textContent = name;

  showPopup(popupZoom);
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
// Добавление массива фотографий на форму
initialCards.forEach(element => { elementsContainer.append(createCard(element.link, element.name));});

//----------------------------------------------------
//                  Валидация
//----------------------------------------------------
/*
  const validatorProfile = new FormValidator(validationConfig, formElementProfile);
  const validatorPlace = new FormValidator(validationConfig, formElementPlace);

  // Вызов функции валидации
  validatorProfile.enableValidation();
  validatorPlace.enableValidation();
*/

const formValidators = (function()
{
  const formValidators = {};
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))

  formList.forEach((formElement) =>
  {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
  });

  return formValidators;
}());

formValidators['form-popup_type_profile'].enableValidation();
formValidators['form-popup_type_place'].enableValidation();


