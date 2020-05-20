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
    getTotalRemarks(){  
        return this.chooseDaysWithRemarks().length;;
    }
    chooseDaysWithRemarks(){
        let rDateArray = [];
        let news = this.dataStorage.getDatafromStorage('news');
        const searchText = this.dataStorage.getTextDatafromStorage('searchWord');
        const text = upFirstLetter(searchText);
        for(const elem of news) {
            if (elem.title.indexOf(searchText) != -1 || elem.description.indexOf(searchText) != -1
                    || elem.title.indexOf(text) || elem.description.indexOf(text)) {
                rDateArray.push(formateDateDayOfWeek(elem.publishedAt));
            } 
        }
        return rDateArray; 
    }

    setValuesForDiag(){
        const sameDateObjList = numOfSameDate(this.chooseDaysWithRemarks());
        const dateList = getFormatedWeek();  
        const totalRemarks = this.getTotalRemarks();
        for (let i = 0; i < dateList.length; i++) {
            let value = Math.round(((sameDateObjList[dateList[i]] / totalRemarks) * 100));
            let sPoint = new StatPoint(dateList[i], value);
            this.addStatPoint(sPoint);
          }
    }
    setSearchWord(){
        const searchText = this.dataStorage.getTextDatafromStorage('searchWord');
        this.searchElem.textContent = `Вы спросили: "${searchText}"`;
    }
    setTotal(){
        const total = this.dataStorage.getTextDatafromStorage('totalResults');
        this.totalElem.textContent = `Новостей за неделю: ${total}`;
    }
    setRemarks(){
        this.remarksElem.textContent = `Упоминаний в загаловках: ${this.getTotalRemarks()}`;
    }
    setMonth(){
        this.monthElem.textContent = `Дата( ${getMonth()})`;
    }
    setData(){
        this.setSearchWord();
        this.setTotal();
        this.setRemarks();
        this.setValuesForDiag();
        this.setMonth();
    }
}