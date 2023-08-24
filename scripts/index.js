import Card from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards, validationConfig } from './constants.js';
import Section from './Section.js';

//const elementsContainer = document.querySelector('.elements');
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

const image = popupZoom.querySelector('.photo__image');
const text = popupZoom.querySelector('.photo__text');

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
/*function createCard(link, name)
{
  const card = new Card(link, name, showPopupZoom, '.elementTemplate');
  return card.createElement();
}*/

addBtns.addEventListener('click', showPopupAdd);
function showPopupAdd()
{
  showPopup(popupPlace);

  formElementPlace.reset();

  formValidators['form-popup_type_place'].preValidation(true);
}

formElementPlace.addEventListener('submit', handleFormSubmitAdd);
// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // elementsContainer.prepend(createCard(linkInput.value, placeInput.value));
  const card = new Card(linkInput.value, placeInput.value, showPopupZoom, '.elementTemplate');
  section.setItemBefore(card.createElement());

  hidePopup(popupPlace);
}

// Фото на весь экран
function showPopupZoom(name, link)
{
  image.src = link;
  image.alt = name;
  text.textContent = name;

  showPopup(popupZoom);
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
// Добавление массива фотографий на форму
//initialCards.forEach(element => { elementsContainer.append(createCard(element.link, element.name));});
const section = new Section(
  {
    data: initialCards,
    renderer: (item) =>
    {
      const card = new Card(item.link, item.name, showPopupZoom, '.elementTemplate');
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
