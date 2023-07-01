let btnEdit = document.querySelector('.profile__btnEdit');
let popup = document.querySelector('.popup');
let btnClose = popup.querySelector('.popup__close');

let btnAdd = document.querySelector('.profile__btnAdd');

btnEdit.addEventListener('click', showPopup);
btnClose.addEventListener('click', hidePopup);

function showPopup()
{
  popup.classList.add("popup_opened");
}

function hidePopup()
{
  popup.classList.remove("popup_opened");
}
