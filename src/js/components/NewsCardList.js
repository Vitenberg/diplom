
import {NOTHING_FOUND, ERROR_THROUTH_REQUEST} from '../constants/const';
export class NewsCardList {
    constructor(resultElem, nodataElem, preloadElem, cardListElem, dataStorage, api, resultButton, createCard) {
        this.cardListElem = cardListElem;
        this.nodataElem = nodataElem;
        this.preloadElem = preloadElem;
        this.resultElem = resultElem;
        this.dataStorage = dataStorage;
        this.api = api;
        this._pointer = 0;
        this.resultButton = resultButton;
        this.createCard = createCard;
    }
    addNewsCard(nCard) {
        this.cardListElem.appendChild(nCard.create());
    }
    clearNewsCard(){
        document.querySelector('.cards').innerHTML = '';
    }
    render(sText) {
        this.showPreload();
        this.api.getNewsCards(sText)
            .then((result) => {
                if (result.articles.length) {
                    this.resetAfterNewSearch();
                    this.dataStorage.setJSONDatatoStorage('news', result.articles);
                    this.dataStorage.setDatatoStorage('searchWord', sText);
                    this.dataStorage.setDatatoStorage('totalResults', result.totalResults);
                    this.showResultButton();
                    this.hideNothingFound();
                    this.showResults();
                    this.showThreeCards();
                } else {
                    this.hidePreload();
                    this.showNothingFound(NOTHING_FOUND);
                    this.hideResults();
                }
            })
            .catch((err) => {
                this.resetAfterNewSearch();
                this.hidePreload();
                this.showNothingFound(ERROR_THROUTH_REQUEST);
                this.hideResults();
            })
            ;
    }
    resetAfterNewSearch(){
        this.dataStorage.clear();
        this._pointer = 0;
        this.dataStorage.setDatatoStorage('pointer', this._pointer);
        this.clearNewsCard();    
    }

    showThreeCards(){
        this._pointer = this.dataStorage.getDatafromStorage('pointer');
        const news = this.dataStorage.getDatafromStorage('news');
        const newsToShow = news.slice(this._pointer,this._pointer+3);
        for(const elem of newsToShow) {
            let card = this.createCard(elem.source.name, 
                elem.title, 
                elem.publishedAt, 
                elem.description, 
                elem.urlToImage, 
                elem.url);
            this.addNewsCard(card);
        }
        this._pointer = Math.min((news.length),(this._pointer+3));
        this.dataStorage.setDatatoStorage('pointer', this._pointer); 
        if (this._pointer == news.length){
            this.hideResultButton();
        }
    }

    showCardsFromLocalStore() {
        this.hideNothingFound();
        this._pointer = this.dataStorage.getDatafromStorage('pointer');
        if (this._pointer) {
            this.showResults();
            const news = this.dataStorage.getDatafromStorage('news');
            const newsToShow = news.slice(0, this._pointer);
            for(const elem of newsToShow) {
                let card = this.createCard(elem.source.name, 
                    elem.title, 
                    elem.publishedAt, 
                    elem.description, 
                    elem.urlToImage, 
                    elem.url);
                this.addNewsCard(card);
            }
            if (this._pointer == news.length){
                this.hideResultButton();
            }
        }


    }
    showNothingFound(text){
        this.nodataElem.classList.remove('nodata_visibility_hidden');
        this.nodataElem.querySelector('.nodata__title').textContent = text;
    }
    showPreload(){
        this.nodataElem.classList.remove('preload_visibility_hidden');
    }
    hideNothingFound(){
        this.nodataElem.classList.add('nodata_visibility_hidden');
    }
    hidePreload(){
        this.nodataElem.classList.add('preload_visibility_hidden');
    }
    showResults(){
        this.resultElem.classList.remove('results_visibility_hidden');
    }
    hideResults(){
        this.resultElem.classList.add('results_visibility_hidden');
    }
    hideResultButton(){
        this.resultButton.classList.add('results__button_visibility_hidden');
    }
    showResultButton(){
        this.resultButton.classList.remove('results__button_visibility_hidden');
    } 
}