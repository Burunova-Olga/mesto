// Все комментарии ниже не несут в себе цели оскорбить или обидеть ревьюера. Они не содержат просьб о помощи.
// Прошу воспринимать их как просто как ворчание.

// Открытие popup
/* Считается хорошей практикой начинать названия локальных переменных с нижнего подчеркивания.
Таким образом для программиста сразу видно, используется ли данная переменная исключительно в данной функции
или может быть доступна в глобальном пространстве. */
function showPopup(popup)
{
  popup.classList.add("popup_opened");
}

// Нажатие Close
// btnsClose - это множественное число. Buttons Close.
const closeBtns = document.querySelectorAll('.close__button');
for (let i = 0; i < closeBtns.length; i++)
  closeBtns[i].addEventListener('click', () => hidePopup(closeBtns[i].closest(".popup")));

// Закрытие popup
function hidePopup(popup)
{
  popup.classList.remove("popup_opened");
}

//----------------------------------------------------
//            Изменение данных профиля
//----------------------------------------------------
const editBtn = document.querySelector('.profile__edit');
editBtn.addEventListener('click', showPopupEdit);

const popupProfile = document.querySelector('.popup_type_profile');
const formElementProfile = popupProfile.querySelector('.form-popup_type_profile');
let nameInput = formElementProfile.querySelector('#input-name');
let descriptionInput = formElementProfile.querySelector('#input-description');
let nameOutput = document.querySelector('.profile__name');
let descriptionOutput = document.querySelector('.profile__description');

formElementProfile.addEventListener('submit', handleFormSubmit);

// Открыть форму редактирования профиля
function showPopupEdit()
{
  showPopup(popupProfile);

  nameInput.value = nameOutput.textContent;
  descriptionInput.value = descriptionOutput.textContent;
}

// Внести на страницу новые данные профиля
function handleFormSubmit(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;

  hidePopup(popupProfile);
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
let elementsContainer = document.querySelector('.elements');

let initialCards =
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

// Конструкция из шаблона
function printElement(localName, localLink)
{
  const elementTemplate = document.querySelector('.elementTemplate').content;
  let elementHTML = elementTemplate.querySelector('.element').cloneNode(true);

  let image = elementHTML.querySelector('.element__image');
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

// Добавление массива фотографий на форму
initialCards.forEach(element =>
{
  let elementHTML = printElement(element.name, element.link);
  elementsContainer.append(elementHTML);
});

//----------------------------------------------------
//                 Фото на весь экран
//----------------------------------------------------
let popupZoom = document.querySelector('.popup_type_zoom');

function showPopupZoom(_element)
{
  let image = popupZoom.querySelector('.photo__image');
  let text = popupZoom.querySelector('.photo__text');

  const link = _element.querySelector('.element__image');
  const name = _element.querySelector('.element__text');

  image.src = link.src;
  image.alt = link.alt;
  text.textContent = name.textContent;

  showPopup(popupZoom);
}

//----------------------------------------------------
//            Добавление нового элемента
//----------------------------------------------------
const addBtns = document.querySelector('.profile__add');
addBtns.addEventListener('click', () => showPopup(popupPlace));

const popupPlace = document.querySelector('.popup_type_places');
const formElementPlace = popupPlace.querySelector('.form-popup_type_place');
const placeInput = formElementPlace.querySelector('#input-place');
const linkInput = formElementPlace.querySelector('#input-link');

formElementPlace.addEventListener('submit', handleFormSubmitAdd);

// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  initialCards.unshift(
  {
    name: placeInput.value,
    link: linkInput.value
  });

  const elementHTML = printElement(placeInput.value, linkInput.value);
  elementsContainer.prepend(elementHTML);

  evt.target.reset();

  hidePopup(popupPlace);
}
