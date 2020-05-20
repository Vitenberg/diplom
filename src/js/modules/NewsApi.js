import {ERROR_THROUTH_REQUEST} from '../constants/const';
export class NewsApi {
    constructor(conf) {
        this.link = 'https://newsapi.org/v2/everything?';
        this.apiKey = '8a209ae81d4a4d0d8134b2a7d5004208';
        //this.apiKey = '8a209ae81d4a4d0d8134b2a7d500420811';
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
        let today = new Date;
        let month = today.getMonth() + 1;
        return (today.getFullYear() + '-' + month +'-'+ today.getDate());
    }
    getFromDate(){
        let today = new Date;
        today.setDate(today.getDate() - 6);
        let month = today.getMonth() + 1;
        return (today.getFullYear() + '-' + month +'-'+ today.getDate());
    }
    getNewsCards(sText) {
        return fetch(this.constructUrl(sText), {
            headers: {
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }  
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(ERROR_THROUTH_REQUEST, err);
            })
            ;
    }
}