/* Изменение данных профиля */
let btnEdit = document.querySelector('.profile__edit');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.form-profile');
let nameInput = formElement.querySelector('.form-profile__input_type_name');
let jobInput = formElement.querySelector('.form-profile__input_type_description');
let btnClose = popup.querySelector('.popup__close');

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', hidePopup);
formElement.addEventListener('submit', handleFormSubmit);

function showPopup()
{
  popup.classList.add("popup_opened");

  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
}

function hidePopup()
{
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;

  hidePopup();
}

/* Постановка лайка */
let btnsLike = document.querySelectorAll('.element__like');
for (let i = 0; i < btnsLike.length; i++)
{
  btnsLike[i].addEventListener('click', function ()
  {
    btnsLike[i].classList.toggle('element__like_checked');
  });
}

/* Добавление нового элемента*/
let btnAdd = document.querySelector('.profile__add');
let elementsContainer = document.querySelector('.elements');

const initialCards = [
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

function printElement(name, link)
{
  const elementTemplate = document.querySelector('#elementTemplate').content;
  let element = elementTemplate.querySelector('.element').cloneNode(true);

  let image = element.querySelector('.element__image');
  image.src = link;
  image.alt = name;
  console.log(element);
  element.querySelector('.element__text').textContent = name;

  elementsContainer.append(element);
}

initialCards.forEach(element =>
{
  printElement(element.name, element.link);
});
