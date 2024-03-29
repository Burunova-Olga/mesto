export default class Section
{
  constructor(containerSelector, renderer)
  {
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

  clear()
  {
    this._container.innerHTML = '';
  }

  renderItems(renderItems)
  {
    renderItems.forEach((item) =>
    {
      this._renderer(item);
    });
  }
}
