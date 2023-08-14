import { showPopup } from './index.js'

export class Card
{
  constructor(link, name, cardConfig, popup, templateSelector)
  {
    this._link = link;
    this._name = name;
    this._config = cardConfig;
    this._popup = popup;
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
    const image = this._popup.querySelector(this._config.imageSelector);
    const text = this._popup.querySelector(this._config.textSelector);

    image.src = this._link;
    image.alt = this._name;
    text.textContent = this._name;

    showPopup(this._popup);
  }
}
