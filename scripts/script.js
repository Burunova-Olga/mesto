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

class Card
{
  constructor(link, name, templateSelector)
  {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
  }

  // Конструкция из шаблона
  createElement(_name, _link)
  {
    const _elementTemplate = document.querySelector(this._templateSelector).content;
    const _elementHTML = _elementTemplate.querySelector('.element').cloneNode(true);

    const image = _elementHTML.querySelector('.element__image');
    image.src = this._link;
    image.alt = this._name;
    _elementHTML.querySelector('.element__text').textContent = this._name;

    this._setEventListeners(_elementHTML);

    return _elementHTML;
  }

  // Настройка эффектов
  _setEventListeners(_elementHTML)
  {
    const _like = _elementHTML.querySelector('.element__like');
    _like.addEventListener('click', () => _like.classList.toggle('element__like_checked'));

    const _zoom = _elementHTML.querySelector('.element__zoom');
    _zoom.addEventListener('click', () => this._showPopupZoom());

    const _del = _elementHTML.querySelector('.element__delete');
    _del.addEventListener('click', () => _del.parentElement.remove());
  }

  // Фото на весь экран
  _showPopupZoom()
  {
    image.src = this._link;
    image.alt = this._name;
    text.textContent = this._name;

    showPopup(popupZoom);
  }
}

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
  console.log(1);
  showPopup(popupPlace);
  validatorPlace.preValidation(true);
}

formElementPlace.addEventListener('submit', handleFormSubmitAdd);
// Добавление пользовательской фото на страницу
function handleFormSubmitAdd(evt)
{
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const card = new Card(linkInput.value, placeInput.value, '.elementTemplate');
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
    const card = new Card(element.link, element.name, '.elementTemplate');
    const elementHTML = card.createElement();
    elementsContainer.append(elementHTML);
  });
