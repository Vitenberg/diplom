import {PERIOD_FOR_NEWS_SEARCH} from '../constants/const';
export class NewsApi {
    constructor(conf) {
       // this.link = 'https://newsapi.org/v2/everything?';
        this.link = ' https://praktikum.tk/news/v2/everything?';
        this.apiKey = '8a209ae81d4a4d0d8134b2a7d5004208';
    }
    constructUrl(searchText){
        const url = this.link +
                    'q=' + searchText + '&'+
                    'from=' + this.getFromDate() + '&'+
                    'to=' + this.getCurrentDate() + '&'+
                    'sortBy=popularity&' +
                    'pageSize=100&' + 
                    'apiKey=' + this.apiKey;
        return url;
    };
    getCurrentDate(){
        const today = new Date;
        const month = today.getMonth() + 1;
        return (today.getFullYear() + '-' + month +'-'+ today.getDate());
    }
    getFromDate(){
        const today = new Date;
        today.setDate(today.getDate() - PERIOD_FOR_NEWS_SEARCH + 1);
        const month = today.getMonth() + 1;
        return (today.getFullYear() + '-' + month +'-'+ today.getDate());
    }
    getNewsCards(searchText) {
        return fetch(this.constructUrl(searchText), {
            headers: {
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }  
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })

    }
}