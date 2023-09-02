import './index.css';

import Card from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import
{
  initialCards,
  validationConfig,
  popupZoom,
  userInfo,
  editBtn,
  addBtn
} from '../utils/constants.js';

const popupProfile = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile);
const popupPlace = new PopupWithForm('.popup_type_places', handleFormSubmitAdd);

//----------------------------------------------------
//                      Popups
//----------------------------------------------------
//------------Изменение данных профиля----------------

// Открыть форму редактирования профиля
editBtn.addEventListener('click', showPopupEdit);
function showPopupEdit()
{
  popupProfile.open();

  const {name, description} = userInfo.getUserInfo();
  popupProfile.formElement.querySelector('#input-name').value = name;
  popupProfile.formElement.querySelector('#input-description').value = description;

  formValidators['form-popup_type_profile'].preValidation(false);
}

// Внести на страницу новые данные профиля
function handleFormSubmitProfile(inputValues)
{
  userInfo.setUserInfo(inputValues.get('input-name'), inputValues.get('input-description'));
}

//-----------Добавление нового элемента---------------
addBtn.addEventListener('click', showPopupAdd);
function showPopupAdd()
{
  popupPlace.open();
  formValidators['form-popup_type_place'].preValidation(true);
}

function openPopupZoom(link, name)
{
  popupZoom.open(link, name);
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
function сreateCard({link, place})
{
  const card = new Card(link, place, openPopupZoom, '.elementTemplate');
  return card.createElement();
}

// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(inputValues)
{
  const cardHTML = сreateCard({link: inputValues.get('input-link'), place: inputValues.get('input-place')});
  section.setItemBefore(cardHTML);
}

// Добавление массива фотографий на форму
const section = new Section('.elements', (item) =>
  {
    const cardHTML = сreateCard({link: item.link, place: item.name});
    section.setItemAfter(cardHTML);
  });

section.clear();
section.renderItems(initialCards);

//----------------------------------------------------
//                  Валидация
//----------------------------------------------------
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

