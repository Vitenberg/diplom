//подключение файла со стилями
import "./index.css";

import {NewsApi} from '../../js/modules/NewsApi.js';
import {NewsCardList}  from '../../js/components/NewsCardList.js';
import {NewsCard}  from '../../js/components/NewsCard.js';
import {SearchInput} from '../../js/components/SearchInput';
import {DataStorage} from '../../js/components/DataStorage';

const newsCardListElem = document.querySelector('.cards');
const errorMessageElem = document.querySelector('.error');
const newsNoDataElem = document.querySelector('.nodata');
const newsPreloadElem = document.querySelector('.preload');
const newsResultElem = document.querySelector('.results');
//кнопки и формы

const newsAddCardsButton = document.querySelector('.results__button');


const dataStorage = new DataStorage();
const api = new NewsApi();
const createNewsCard = (source, title, date, descr, urlImg, url) => new NewsCard(source, title, date, descr, urlImg, url);

const newsCards = new NewsCardList(newsResultElem, 
    newsNoDataElem, 
    newsPreloadElem,
    newsCardListElem, 
    dataStorage,
    api, 
    newsAddCardsButton,
    createNewsCard,
    document.forms.search);
const searchInput = new SearchInput(document.forms.search,
                                        errorMessageElem,
                                        newsAddCardsButton,
                                        newsCards.render.bind(newsCards),
                                        newsCards.showThreeCards.bind(newsCards),
                                        newsCards.showCardsFromLocalStore.bind(newsCards),
                                        dataStorage,
                                    );
searchInput.addEventListener();
