function formateDate(date) {
    const monthArray = ['января,', 'февраля,', 'марта,', 'апреля,', 'мая,', 'июня,', 'июля,', 'августа,', 'сентября,', 'октяюря,', 'ноября,', 'декабря,']
    const d = new Date(date);
    return (d.getDate() + ' ' + monthArray[d.getMonth()] + ' ' + d.getFullYear());
}
function formateDateDayOfWeek(date) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const d = new Date(date);
    return (d.getDate() + ', ' + days[d.getDay()]);

}
function getFormatedWeek(){
    const weekDays = [];
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    for (let i=0; i < 7; i++){
        const d = new Date;
        d.setDate(d.getDate() - i);
        weekDays.push(d.getDate() + ', ' + days[d.getDay()]);
    }
    return weekDays;  
}
function numOfSameDate(dateArray) {
    const result = dateArray.reduce(function (prevVal, item) {
        if (!prevVal[item]) {
            prevVal[item] = 1;
        }
        else {
            prevVal[item] += 1;
        }
        return prevVal;
    }, {});
    return result;
}
function upFirstLetter(str) {
    if (!str) return str; 
    return str[0].toUpperCase() + str.slice(1);
  }
function setImageAnyway(imageUrl){
    return (imageUrl) ? imageUrl :  "../../images/img_card_1.jpg";
}
function getMonth(){
    const monthArray = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октяюрь', 'ноябрь', 'декабрь']
    const date = new Date;
    return monthArray[date.getMonth()];
}

export {formateDate, formateDateDayOfWeek, getFormatedWeek, numOfSameDate, upFirstLetter, setImageAnyway, getMonth};