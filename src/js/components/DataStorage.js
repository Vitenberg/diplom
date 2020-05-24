export class DataStorage {
    constructor(){

    }
    setJSONDatatoStorage(key, data){
        localStorage.setItem(key, JSON.stringify(data));
    }
    getDatafromStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }
    setDatatoStorage(key, data){
        localStorage.setItem(key, data);
    }
    getTextDatafromStorage(key){
        return localStorage.getItem(key);
    }
    clear(){
        localStorage.clear();
    }

}