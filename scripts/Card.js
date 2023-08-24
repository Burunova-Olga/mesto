export default class Card
{
  constructor(link, name, handleCardClick, templateSelector)
  {
    this._link = link;
    this._name = name;
    this._handleCardClick = handleCardClick;

    const _elementTemplate = document.querySelector(templateSelector).content;
    this._elementHTML = _elementTemplate.querySelector('.element').cloneNode(true);
  }

  // Конструкция из шаблона
  createElement()
  {
    const image = this._elementHTML.querySelector('.element__image');
    image.src = this._link;
    image.alt = this._name;
    this._elementHTML.querySelector('.element__text').textContent = this._name;

    this._setEventListeners();

    return this._elementHTML;
  }

  // Настройка эффектов
  _setEventListeners()
  {
    this._likeBtn = this._elementHTML.querySelector('.element__like');
    this._likeBtn.addEventListener('click', () => this._likeBtn.classList.toggle('element__like_checked'));

    this._zoomPopup = this._elementHTML.querySelector('.element__zoom');
    this._zoomPopup.addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._deleteBtn = this._elementHTML.querySelector('.element__delete');
    this._deleteBtn.addEventListener('click', () => this._deleteBtn.closest('.element').remove());
  }
}
