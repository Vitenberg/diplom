import { StatPoint } from './StatPoint.js';
import {formateDateDayOfWeek, getFormatedWeek, numOfSameDate, upFirstLetter, getMonth} from '../../js/utils/functions';
export class Statistics {
    constructor(searchWordElem, totalElem ,tableCellsElem, remarksElem, monthElem, dataStorage) {
        this.searchElem = searchWordElem;
        this.totalElem = totalElem;
        this.tableCellsElem = tableCellsElem;
        this.remarksElem = remarksElem;
        this.monthElem = monthElem;
        this.dataStorage = dataStorage;
    }
    addStatPoint(sPoint){
        this.tableCellsElem.appendChild(sPoint.create());
    }
    _getTotalRemarks(){  
        return this._chooseDaysWithRemarks().length;;
    }
    _chooseDaysWithRemarks() {
        const suitableDates = [];
        const news = this.dataStorage.getDatafromStorage('news');
        const searchText = this.dataStorage.getTextDatafromStorage('searchWord');
        // console.log(news);
        const text = upFirstLetter(searchText);
        //console.log(text);
        for (const elem of news) {

            try {
                if (elem.title.indexOf(searchText) != -1 || elem.description.indexOf(searchText) != -1
                    || elem.title.indexOf(text) || elem.description.indexOf(text)) {
                    suitableDates.push(formateDateDayOfWeek(elem.publishedAt));
                }
            } catch{
                console.log('для новости нет описания или заголовка');
            }
        }
        return suitableDates;
    }

    _setValuesForDiag(){
        const sameDateObjList = numOfSameDate(this._chooseDaysWithRemarks());
        const weekDays = getFormatedWeek();  
        const totalRemarks = this._getTotalRemarks();
          weekDays.forEach((elem)=>{
            const value = Math.round(((sameDateObjList[elem] / totalRemarks) * 100));
            const sPoint = new StatPoint(elem, value);
            this.addStatPoint(sPoint);
          });  
    }
    _setSearchWord(){
        const searchText = this.dataStorage.getTextDatafromStorage('searchWord');
        this.searchElem.textContent = `Вы спросили: "${searchText}"`;
    }
    _setTotal(){
        const total = this.dataStorage.getTextDatafromStorage('totalResults');
        this.totalElem.textContent = `Новостей за неделю: ${total}`;
    }
    _setRemarks(){
        this.remarksElem.textContent = `Упоминаний в загаловках: ${this._getTotalRemarks()}`;
    }
    _setMonth(){
        this.monthElem.textContent = `Дата( ${getMonth()})`;
    }
    setData(){
        this._setSearchWord();
        this._setTotal();
        this._setRemarks();
        this._setValuesForDiag();
        this._setMonth();
    }
}