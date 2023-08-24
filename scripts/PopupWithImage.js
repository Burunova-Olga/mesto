import Popup from './Popup.js';

export default class PopupWithImage extends Popup
{
  // Открытие фото на весь экран
  open(link, name)
  {
    console.log(link);
    console.log(name);

    const image = this.popup.querySelector('.photo__image');
    const text = this.popup.querySelector('.photo__text');

    image.src = link;
    image.alt = name;
    text.textContent = name;

    super.open();
  }
}
