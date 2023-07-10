// Открытие popup
function showPopup(_popup)
{
  _popup.classList.add("popup_opened");
}

// Нажатие Close
let btnsClose = document.querySelectorAll('.popup__close');
for (let i = 0; i < btnsClose.length; i++)
  btnsClose[i].addEventListener('click', () => hidePopup(btnsClose[i].parentElement.parentElement));

// Закрытие popup
function hidePopup(_popup)
{
  _popup.classList.remove("popup_opened");
}

//----------------------------------------------------
//            Изменение данных профиля
//----------------------------------------------------
let btnEdit = document.querySelector('.profile__edit');
btnEdit.addEventListener('click', showPopupEdit);

let popupProfile = document.querySelector('#popup-profile');
let formElementProfile = popupProfile.querySelector('#form-profile');
let nameInput = formElementProfile.querySelector('#input-name');
let descriptionInput = formElementProfile.querySelector('#input-description');

formElementProfile.addEventListener('submit', handleFormSubmit);

// Открыть форму редактирования профиля
function showPopupEdit()
{
  showPopup(popupProfile);

  nameInput.value = document.querySelector('.profile__name').textContent;
  descriptionInput.value = document.querySelector('.profile__description').textContent;
}

// Внести на страницу новые данные профиля
function handleFormSubmit(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = descriptionInput.value;

  hidePopup(popupProfile);
}

//----------------------------------------------------
//                Массив картинок
//----------------------------------------------------
let elementsContainer = document.querySelector('.elements');

let initialCards = [
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
function printElement(name, link)
{
  const elementTemplate = document.querySelector('#elementTemplate').content;
  let elementHTML = elementTemplate.querySelector('.element').cloneNode(true);

  let image = elementHTML.querySelector('.element__image');
  image.src = link;
  image.alt = name;
  elementHTML.querySelector('.element__text').textContent = name;

  return elementHTML;
}

// Добавление массива фотографий на форму
initialCards.forEach(element =>
{
  let elementHTML = printElement(element.name, element.link);
  elementsContainer.append(elementHTML);
});


//----------------------------------------------------
//            Добавление нового элемента
//----------------------------------------------------
let btnAdd = document.querySelector('.profile__add');
btnAdd.addEventListener('click', () => showPopup(popupPlace));

let popupPlace = document.querySelector('#popup-place');
let formElementPlace = popupPlace.querySelector('#form-place');
let placeInput = formElementPlace.querySelector('#input-place');
let linkInput = formElementPlace.querySelector('#input-link');

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

  let elementHTML = printElement(placeInput.value, linkInput.value);

  // Настройка жмяка лайка
  let like = elementHTML.querySelector('.element__like');
  like.addEventListener('click', () => like.classList.toggle('element__like_checked'));

  elementsContainer.prepend(elementHTML);

  hidePopup(popupPlace);
}

//----------------------------------------------------
//                  Постановка лайка
//----------------------------------------------------
let btnsLike = document.querySelectorAll('.element__like');
for (let i = 0; i < btnsLike.length; i++)
  btnsLike[i].addEventListener('click', () => btnsLike[i].classList.toggle('element__like_checked'));
