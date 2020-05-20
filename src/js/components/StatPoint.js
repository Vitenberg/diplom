export class StatPoint {
    constructor(date, value) {
      this.date = date;
      this.value = value;
    }
  create() {
    const cellTemplateNode = document.querySelector('[data-component="cell"]').content.cloneNode(true);
    const cellElem = cellTemplateNode.querySelector('.cell');
    cellElem.querySelector('.cell__date').textContent = this.date;
    cellElem.querySelector('.cell__value').textContent = this.value;
    cellElem.querySelector('.cell__line').style.width = `${this.value}% `;

    return cellElem;
  }
}