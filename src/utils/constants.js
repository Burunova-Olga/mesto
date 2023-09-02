import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const popupZoom = new PopupWithImage('.popup_type_zoom');
const userInfo = new UserInfo('.profile__name', '.profile__description');

const editBtn = document.querySelector('.profile__edit');
const addBtn = document.querySelector('.profile__add');

const initialCards =
[
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig =
{
  formSelector: '.form-popup',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__submit',
  inactiveButtonClass: 'form-popup__submit_disabled',
  inputErrorClass: 'form-popup__input_error',
  errorClass: 'form-popup__input-error_visible'
};

export {initialCards, validationConfig, popupZoom, userInfo, editBtn, addBtn};
