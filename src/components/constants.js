import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// const popupProfile = new PopupWithForm('.popup_type_profile', handleFormSubmitProfile);
// const popupPlace = new PopupWithForm('.popup_type_places', handleFormSubmitAdd);
const popupZoom = new PopupWithImage('.popup_type_zoom');
const userInfo = new UserInfo('Жак-Ив Кусто', 'Исследователь океана');

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

export {initialCards, validationConfig, /*popupProfile, popupPlace, */popupZoom, userInfo, editBtn, addBtn};
