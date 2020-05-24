//подключение файла со стилями
import "./stat.css";
import {Statistics} from '../../js/components/Statistics';
import {DataStorage} from '../../js/components/DataStorage';
const searchWordElem = document.querySelector('.total__title');
const totalElem = document.querySelector('.total__num');
const tableCellsElem = document.querySelector('.table__cells');
const remarksElem = document.querySelector('.total__num_remarks');
const monthElem = document.querySelector('.table__head-date');
const dStorage =  new DataStorage();
window.addEventListener('load', () => {new Statistics(searchWordElem, 
    totalElem, 
    tableCellsElem, 
    remarksElem,
    monthElem,
    dStorage).setData()});
