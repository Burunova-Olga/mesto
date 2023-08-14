import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards, validationConfig, cardConfig } from './constants.js';

const elementsContainer = document.querySelector('.elements');
const popupProfile = document.querySelector('.popup_type_profile');
const popupZoom = document.querySelector('.popup_type_zoom');
const popupPlace = document.querySelector('.popup_type_places');
const nameOutput = document.querySelector('.profile__name');
const descriptionOutput = document.querySelector('.profile__description');
const closeBtns = document.querySelectorAll('.close__button');
const popups = document.querySelectorAll('.popup');
const editBtn = document.querySelector('.profile__edit');
const addBtns = document.querySelector('.profile__add');

const formElementProfile = popupProfile.querySelector('.form-popup_type_profile');
const nameInput = formElementProfile.querySelector('#input-name');
const descriptionInput = formElementProfile.querySelector('#input-description');

const formElementPlace = popupPlace.querySelector('.form-popup_type_place');
const placeInput = formElementPlace.querySelector('#input-place');
const linkInput = formElementPlace.querySelector('#input-link');

const validatorProfile = new FormValidator(validationConfig, formElementProfile);
const validatorPlace = new FormValidator(validationConfig, formElementPlace);

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

// Открытие popup
function showPopup(popup)
{
  const form = popup.querySelector('.form-popup');
  // Popup с картинкой формы не имеет
  if (form != null)
    form.reset();

  popup.classList.add("popup_opened");
  document.addEventListener('keydown', listenEsc);
}

// Нажатие Close
for (let i = 0; i < closeBtns.length; i++)
  closeBtns[i].addEventListener('click', () => hidePopup(closeBtns[i].closest(".popup")));

// Закрытие popup
function hidePopup(popup)
{
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', listenEsc);
}

popups.forEach((popup) =>
{
  popup.addEventListener('click', (evt) =>
  {
    if (evt.target.classList.contains('popup'))
      hidePopup(evt.target);
  });
});

//------------Изменение данных профиля----------------
// Открыть форму редактирования профиля
editBtn.addEventListener('click', showPopupEdit);
function showPopupEdit()
{
  showPopup(popupProfile);

  nameInput.value = nameOutput.textContent;
  descriptionInput.value = descriptionOutput.textContent;

  validatorProfile.preValidation(false);
}

// Внести на страницу новые данные профиля
formElementProfile.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;

  hidePopup(popupProfile);
}

//-----------Добавление нового элемента---------------
addBtns.addEventListener('click', showPopupAdd);
function showPopupAdd()
{
  showPopup(popupPlace);
  validatorPlace.preValidation(true);
}

formElementPlace.addEventListener('submit', handleFormSubmitAdd);
// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const card = new Card(linkInput.value, placeInput.value, cardConfig, popupZoom, '.elementTemplate');
  const elementHTML = card.createElement();
  elementsContainer.prepend(elementHTML);

  hidePopup(popupPlace);
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
// Добавление массива фотографий на форму
initialCards.forEach(element =>
  {
    const card = new Card(element.link, element.name, cardConfig, popupZoom, '.elementTemplate');
    const elementHTML = card.createElement();
    elementsContainer.append(elementHTML);
  });

// Вызов функции валидации
validatorProfile.enableValidation();
validatorPlace.enableValidation();

export {showPopup};
