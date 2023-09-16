import './index.css';

import Card from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithAgree from '../components/PopupWithAgree.js';
import
{
  api,
  validationConfig,
  popupZoom,
  userInfo,
  editProfileBtn,
  editAvatarBtn,
  addBtn
} from '../utils/constants.js';

const popupProfile = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile);
const popupPlace = new PopupWithForm('.popup_type_places', handleFormSubmitAdd);
const popupDelete = new PopupWithAgree('.popup_type_delete', handleFormSubmitDelete);
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleFormSubmitAvatar);

//----------------------------------------------------
//                    Профиль
//----------------------------------------------------
let myID;

// Загрузить начальные значения при загрузке страницы
api.getUserInfo()
  .then((result) =>
  {
    myID = result._id;
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserAvatar(result.avatar);
  });

// Открыть форму редактирования профиля
editProfileBtn.addEventListener('click', showPopupEditProfile);
function showPopupEditProfile()
{
  popupProfile.open();

  const {name, description, avatar} = userInfo.getUserInfo();
  popupProfile.formElement.querySelector('#input-name').value = name;
  popupProfile.formElement.querySelector('#input-description').value = description;

  formValidators['form-popup_type_profile'].preValidation(false);
}

// Форма изменения данных прислала новые сведения
function handleFormSubmitProfile(inputValues)
{
  api.setUserInfo(inputValues.get('input-name'), inputValues.get('input-description'))
    .then((result) =>
    {
      userInfo.setUserInfo(result.name, result.about);
    });;
}

// Открыть форму редактирования аватара
editAvatarBtn.addEventListener('click', showPopupEditAvatar);
function showPopupEditAvatar()
{
  popupAvatar.open();

  const {name, description, avatar} = userInfo.getUserInfo();
  popupAvatar.formElement.querySelector('#input-avatar').value = avatar;

  //formValidators['form-popup_type_avatar'].preValidation(false);
}

// Форма изменения аватара прислала новые сведения
function handleFormSubmitAvatar(inputValues)
{
  console.log(inputValues);
  console.log(inputValues.get('input-avatar'));
  api.setUserAvatar(inputValues.get('input-avatar'))
    .then((result) =>
    {
      console.log(result);
      userInfo.setUserAvatar(result.avatar);
    });;
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
// Открыть форму добавления карточки
addBtn.addEventListener('click', showPopupAdd);
function showPopupAdd()
{
  popupPlace.open();
  formValidators['form-popup_type_place'].preValidation(true);
}

// Добавление карточки на страницу
function handleFormSubmitAdd(inputValues)
{
  api.addNewCard(inputValues.get('input-place'), inputValues.get('input-link'))
    .then((res) =>
    {
      const cardHTML =  сreateCard(res);
      section.setItemBefore(cardHTML);
    })
}

// Удалить карточку
function handleFormSubmitDelete(id)
{
  api.deleteCard(id);
}

// Вывод массива фотографий на форму
const section = new Section('.elements', (item) =>
{
  const cardHTML =  сreateCard(item);
  section.setItemAfter(cardHTML);
});

// Создать карточку
function сreateCard(item)
{
  const card = new Card(item, openPopupZoom, api.changeLike.bind(api), '.elementTemplate', popupDelete);
  return card.createElement(myID);
}

// Раскрыть попап полноформатного изображения
function openPopupZoom(link, name)
{
  popupZoom.open(link, name);
}

// Вывод начального массива при загрузке страницы
  section.clear();
  section.renderItems(api.getInitialCards());

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

