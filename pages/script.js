let btnEdit = document.querySelector('.profile__edit');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__description');
let btnClose = popup.querySelector('.popup__close');

let btnAdd = document.querySelector('.profile__add');

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', hidePopup);
formElement.addEventListener('submit', handleFormSubmit);

function showPopup()
{
  popup.classList.add("popup_opened");
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
