import {formateDate, setImageAnyway} from '../../js/utils/functions'
export class NewsCard {
    constructor(source, title, publishedAt, description, urlToImage, url) {
      this.source = source;
      this.title = title;
      this.publishedAt = formateDate(publishedAt);
      this.description = description;
      this.urlToImage = setImageAnyway(urlToImage);
      this.url = url;
    }
  create() {
    const cardTemplateNode = document.querySelector('[data-component="news-card"]').content.cloneNode(true);
    const newsCardElem = cardTemplateNode.querySelector('.card');
    newsCardElem.querySelector('.card__title').textContent = this.title;
    newsCardElem.querySelector('.card__date').textContent = this.publishedAt;
    newsCardElem.querySelector('.card__text').textContent = this.description;
    newsCardElem.querySelector('.card__link').textContent = this.source;
    newsCardElem.querySelector('.card__image').src = this.urlToImage;
    newsCardElem.href = this.url;
    return newsCardElem;
  }
}

