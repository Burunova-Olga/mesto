import './index.css';

import Card from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import
{
  initialCards,
  validationConfig,
  // popupProfile,
  // popupPlace,
  popupZoom,
  userInfo,
  editBtn,
  addBtn
} from './components/constants.js';

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

  const [name, description] = userInfo.getUserInfo();
  popupProfile.formElement.querySelector('#input-name').value = name;
  popupProfile.formElement.querySelector('#input-description').value = description;

  formValidators['form-popup_type_profile'].preValidation(false);
}

// Внести на страницу новые данные профиля
function handleFormSubmitProfile()
{
  userInfo.setUserInfo(popupProfile.inputValues.get('input-name'), popupProfile.inputValues.get('input-description'));
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

// Добавление пользовательской фото на страницу
function handleFormSubmitAdd()
{
  const card = new Card(popupPlace.inputValues.get('input-link'), popupPlace.inputValues.get('input-place'), openPopupZoom, '.elementTemplate');
  section.setItemBefore(card.createElement());
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

