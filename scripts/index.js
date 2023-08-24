import Card from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards, validationConfig } from './constants.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';

const nameOutput = document.querySelector('.profile__name');
const descriptionOutput = document.querySelector('.profile__description');
const editBtn = document.querySelector('.profile__edit');
const addBtns = document.querySelector('.profile__add');

//----------------------------------------------------
//                      Popups
//----------------------------------------------------
const popupProfile = new Popup('.popup_type_profile');
const formElementProfile = popupProfile.popup.querySelector('.form-popup_type_profile');
const nameInput = formElementProfile.querySelector('#input-name');
const descriptionInput = formElementProfile.querySelector('#input-description');

const popupPlace = new Popup('.popup_type_places');
const formElementPlace = popupPlace.popup.querySelector('.form-popup_type_place');
const placeInput = formElementPlace.querySelector('#input-place');
const linkInput = formElementPlace.querySelector('#input-link');

const popupZoom = new PopupWithImage('.popup_type_zoom');

//------------Изменение данных профиля----------------
// Открыть форму редактирования профиля
editBtn.addEventListener('click', showPopupEdit);
function showPopupEdit()
{
  popupProfile.open();

  nameInput.value = nameOutput.textContent;
  descriptionInput.value = descriptionOutput.textContent;

  formValidators['form-popup_type_profile'].preValidation(false);
}

// Внести на страницу новые данные профиля
formElementProfile.addEventListener('submit', handleFormSubmitProfile);
function handleFormSubmitProfile(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;

  popupProfile.close();
}

//-----------Добавление нового элемента---------------
addBtns.addEventListener('click', showPopupAdd);
function showPopupAdd()
{
  popupPlace.open();

  formElementPlace.reset();

  formValidators['form-popup_type_place'].preValidation(true);
}

function openPopupZoom(link, name)
{
  popupZoom.open(link, name);
}

formElementPlace.addEventListener('submit', handleFormSubmitAdd);
// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const card = new Card(linkInput.value, placeInput.value, openPopupZoom, '.elementTemplate');
  section.setItemBefore(card.createElement());

  popupPlace.close();
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
// Добавление массива фотографий на форму
const section = new Section(
  {
    data: initialCards,
    renderer: (item) =>
    {
      const card = new Card(item.link, item.name, openPopupZoom, '.elementTemplate');
      const cardElement = card.createElement();
      section.setItemAfter(cardElement);
    }
  }, '.elements');

section.renderItems();

//----------------------------------------------------
//                  Валидация
//----------------------------------------------------
// Мне не нравится этот вариант.
// Я считаю неправильным, что включение валидации происходит автоматически, внутри функции, а вызов
// превалидации (валидации в момент открытия формы) - через обращение к массиву.
// Гораздо логичнее использовать один и тот же подход для вызова всех функций одной сущности.
// Но количество итераций ограничено, так что пусть будет как скажете.
// Хотя это было меткой "можно лучше"((

const formValidators = (function()
{
  const formValidators = {};
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))

  formList.forEach((formElement) =>
  {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;

    validator.enableValidation();
  });

  return formValidators;
}());

// formValidators['form-popup_type_profile'].enableValidation();
// formValidators['form-popup_type_place'].enableValidation();
