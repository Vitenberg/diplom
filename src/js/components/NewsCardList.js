
import {NOTHING_FOUND, ERROR_THROUTH_REQUEST, NUMBER_CARDS_TO_ADD} from '../constants/const';
export class NewsCardList {
    constructor(resultElem, nodataElem, preloadElem, 
        cardListElem, dataStorage, api, 
        resultButton, createCard, searchForm) {
        this.cardListElem = cardListElem;
        this.nodataElem = nodataElem;
        this.preloadElem = preloadElem;
        this.resultElem = resultElem;
        this.dataStorage = dataStorage;
        this.api = api;
        this._pointer = 0;
        this.resultButton = resultButton;
        this.createCard = createCard;    
        this.searchForm = searchForm;
    }
    addNewsCard(newsCard) {
        this.cardListElem.appendChild(newsCard.create());
    }
    clearNewsCard(){
        this.cardListElem.innerHTML = '';
    }
    render(searchText) {
        this._resetAfterNewSearch();
        this._hideResults();
        this._showPreload();
        this.api.getNewsCards(searchText)
            .then((result) => {
                if (result.articles.length) {
                    this.dataStorage.setJSONDatatoStorage('news', result.articles);
                    this.dataStorage.setDatatoStorage('searchWord', searchText);
                    this.dataStorage.setDatatoStorage('totalResults', result.totalResults);
                    this._hidePreload();
                    this._showResultButton();
                    this._hideNothingFound();
                    this._showResults();
                    this.showThreeCards();
                } else {
                    this._hidePreload();
                    this._showNothingFound(NOTHING_FOUND);
                    this._hideResults();
                }
                this.searchForm.input.removeAttribute("disabled", "");
            })
            .catch(() => {
                this._resetAfterNewSearch();
                this._hidePreload();
                this._showNothingFound(ERROR_THROUTH_REQUEST);
                this._hideResults();
                this.searchForm.input.removeAttribute("disabled", "");
            })
            ;
    }
    _resetAfterNewSearch(){
        this.dataStorage.clear();
        this._pointer = 0;
        this.dataStorage.setDatatoStorage('pointer', this._pointer);
        this.clearNewsCard();    
    }

    showThreeCards(){
        this._pointer = this.dataStorage.getDatafromStorage('pointer');
        const news = this.dataStorage.getDatafromStorage('news');
        const newsToShow = news.slice(this._pointer,this._pointer + NUMBER_CARDS_TO_ADD);
        for(const elem of newsToShow) {
            const card = this.createCard(elem.source.name, 
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
            this._hideResultButton();
        }
    }

    showCardsFromLocalStore() {
        this._hideNothingFound();
        this._pointer = this.dataStorage.getDatafromStorage('pointer');
        if (this._pointer) {
            this._showResults();
            const news = this.dataStorage.getDatafromStorage('news');
            const newsToShow = news.slice(0, this._pointer);
            for(const elem of newsToShow) {
                const card = this.createCard(elem.source.name, 
                    elem.title, 
                    elem.publishedAt, 
                    elem.description, 
                    elem.urlToImage, 
                    elem.url);
                this.addNewsCard(card);
            }
            if (this._pointer == news.length){
                this._hideResultButton();
            }
        }


    }
    _showNothingFound(text){
        this.nodataElem.classList.remove('nodata_visibility_hidden');
        this.nodataElem.querySelector('.nodata__title').textContent = text;
    }
    _showPreload(){
        this.preloadElem.classList.remove('preload_visibility_hidden');
        
    }
    _hideNothingFound(){
        this.nodataElem.classList.add('nodata_visibility_hidden');
    }
    _hidePreload(){
        this.preloadElem.classList.add('preload_visibility_hidden');
    }
    _showResults(){
        this.resultElem.classList.remove('results_visibility_hidden');
    }
    _hideResults(){
        this.resultElem.classList.add('results_visibility_hidden');
    }
    _hideResultButton(){
        this.resultButton.classList.add('results__button_visibility_hidden');
    }
    _showResultButton(){
        this.resultButton.classList.remove('results__button_visibility_hidden');
    } 
}