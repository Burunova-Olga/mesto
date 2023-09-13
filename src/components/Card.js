export default class Card
{
  constructor(item, handleCardClick, changeLike, templateSelector)
  {
    this._item = item;
    this._handleCardClick = handleCardClick;
    this._changeLike = changeLike;

    const _elementTemplate = document.querySelector(templateSelector).content;
    this._elementHTML = _elementTemplate.querySelector('.element').cloneNode(true);
    this._elementLikeCount = this._elementHTML.querySelector('.like__count');
  }

  // Конструкция из шаблона
  createElement()
  {
    const image = this._elementHTML.querySelector('.element__image');
    image.src = this._item.link;
    image.alt = this._item.name;
    this._elementHTML.querySelector('.element__text').textContent = this._item.name;
    this._elementLikeCount.textContent = this._item.likes.length;

    this._setEventListeners();

    return this._elementHTML;
  }

  _handleLikeClick()
  {
    this._likeBtn.classList.toggle('like__button_checked');
    const isLike = this._likeBtn.classList.contains('like__button_checked');
    this._changeLike(this._item._id, isLike)
      .then((res) =>
      {
        this._elementLikeCount.textContent = res.likes.length;
      }
    );
  }

  _handleDeleteClick()
  {
    this._elementHTML.remove();
    this._elementHTML = null;
  }

  // Настройка эффектов
  _setEventListeners()
  {
    this._likeBtn = this._elementHTML.querySelector('.like__button');
    this._likeBtn.addEventListener('click', () => this._handleLikeClick());

    this._zoomPopup = this._elementHTML.querySelector('.element__zoom');
    this._zoomPopup.addEventListener('click', () => this._handleCardClick(this._link, this._name));

    this._deleteBtn = this._elementHTML.querySelector('.element__delete');
    this._deleteBtn.addEventListener('click', () => this._handleDeleteClick());
  }
}
