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
      {
        hidePopup(popup);
        return;
      }
    });
  }
}

// Открытие popup
function showPopup(popup)
{
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
  const popupContainer = popup.querySelector('.popup__container');
  popupContainer.addEventListener('click', (evt) =>
  {
    evt.stopImmediatePropagation();
  });

  popup.addEventListener('click', (evt) =>
  {
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
addBtns.addEventListener('click', () => showPopup(popupPlace));

formElementPlace.addEventListener('submit', handleFormSubmitAdd);
// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const elementHTML = printElement(placeInput.value, linkInput.value);
  elementsContainer.prepend(elementHTML);

  evt.target.reset();

  hidePopup(popupPlace);
}

//---------------Фото на весь экран-------------------
function showPopupZoom(element)
{
  const link = element.querySelector('.element__image');
  const name = element.querySelector('.element__text');

  image.src = link.src;
  image.alt = link.alt;
  text.textContent = name.textContent;

  showPopup(popupZoom);
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
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

// Добавление массива фотографий на форму
initialCards.forEach(element =>
  {
    const elementHTML = printElement(element.name, element.link);
    elementsContainer.append(elementHTML);
  });

// Конструкция из шаблона
function printElement(localName, localLink)
{
  const elementTemplate = document.querySelector('.elementTemplate').content;
  const elementHTML = elementTemplate.querySelector('.element').cloneNode(true);

  const image = elementHTML.querySelector('.element__image');
  image.src = localLink;
  image.alt = localName;
  elementHTML.querySelector('.element__text').textContent = localName;

  // Настройка эффектов
  const like = elementHTML.querySelector('.element__like');
  like.addEventListener('click', () => like.classList.toggle('element__like_checked'));

  const zoom = elementHTML.querySelector('.element__zoom');
  zoom.addEventListener('click', () => showPopupZoom(elementHTML));

  const del = elementHTML.querySelector('.element__delete');
  del.addEventListener('click', () => del.parentElement.remove());

  return elementHTML;
}
