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

function handleFormSubmit (evt)
{
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    hidePopup();
}

/* Добавление нового элемента*/
let btnAdd = document.querySelector('.profile__add');

/* Постановка лайка */
let btnLike = document.querySelector('.element__like');
btnLike.addEventListener('click', setLike);

function setLike (evt)
{
  if (btnLike.classList.contains('element__like_checked'))
    btnLike.classList.remove('element__like_checked');
  else
    btnLike.classList.add('element__like_checked');

  /*  btnLike.classList.toggle('.element__like_checked');*/
}
