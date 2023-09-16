export default class Card
{
  constructor(item, handleCardClick, changeLike, templateSelector, popupDelete)
  {
    this._item = item;
    this._handleCardClick = handleCardClick;
    this._changeLike = changeLike;
    this._popupDelete = popupDelete;

    const _elementTemplate = document.querySelector(templateSelector).content;
    this._elementHTML = _elementTemplate.querySelector('.element').cloneNode(true);
    this._elementLikeCount = this._elementHTML.querySelector('.like__count');
    this._deleteBtn = this._elementHTML.querySelector('.element__delete');
  }

  // Конструкция из шаблона
  createElement(myID)
  {
    const image = this._elementHTML.querySelector('.element__image');
    image.src = this._item.link;
    image.alt = this._item.name;
    this._elementHTML.querySelector('.element__text').textContent = this._item.name;
    this._elementLikeCount.textContent = this._item.likes.length;

    if (this._item.owner._id == myID)
    {
      this._deleteBtn.classList.remove('element__delete_invisible');
    }

    this._setEventListeners();

    return this._elementHTML;
  }

  // Обработчик лайка
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

  // Обработик delete
  _handleDeleteClick()
  {console.log(this);
    this._popupDelete.open(this._item._id);
  }

  // Настройка эффектов
  _setEventListeners()
  {
    this._likeBtn = this._elementHTML.querySelector('.like__button');
    this._likeBtn.addEventListener('click', () => this._handleLikeClick());

    this._zoomPopup = this._elementHTML.querySelector('.element__zoom');
    this._zoomPopup.addEventListener('click', () => this._handleCardClick(this._item.link, this._item.name));

    this._deleteBtn.addEventListener('click', () => this._handleDeleteClick());
  }
}
