import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

const popupZoom = new PopupWithImage('.popup_type_zoom');
const userInfo = new UserInfo('.profile__name', '.profile__description', '.avatar__image');

const editProfileBtn = document.querySelector('.profile__edit');
const editAvatarBtn = document.querySelector('.avatar__button');
const addBtn = document.querySelector('.profile__add');

const validationConfig =
{
  formSelector: '.form-popup',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__submit',
  inactiveButtonClass: 'form-popup__submit_disabled',
  inputErrorClass: 'form-popup__input_error',
  errorClass: 'form-popup__input-error_visible'
};

const api = new Api
({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers:
  {
    authorization: 'e3eda12f-0d31-4fd3-b509-9437a2757934',
    'Content-Type': 'application/json'
  }
});

export {api, validationConfig, popupZoom, userInfo, editProfileBtn, editAvatarBtn, addBtn};
