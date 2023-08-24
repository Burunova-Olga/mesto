export default class Section
{
  constructor({ data, renderer }, containerSelector)
  {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItemBefore(element)
  {
    this._container.prepend(element);
  }

  setItemAfter(element)
  {
    this._container.append(element);
  }

  _clear()
  {
    this._container.innerHTML = '';
  }

  renderItems()
  {
    this._clear();

    this._renderedItems.forEach((item) =>
    {
      this._renderer(item);
    });
  }
}
