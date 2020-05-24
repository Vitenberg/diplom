import {formateDate} from '../utils/functions.js';
export class CommitCard{
    constructor(name, email, date, message, avatar){
        this.message = message;
        this.date = formateDate(date);
        this.name = name;
        this.email = email;
        this.avatar = avatar;
    }
    create(){
        const cardTemplateNode = document.querySelector('[data-component="github-card"]').content.cloneNode(true);
        const githubCardElem = cardTemplateNode.querySelector('.swiper-slide');    
        githubCardElem.querySelector('.commit__text').textContent = this.message;
        githubCardElem.querySelector('.commit__date').textContent = this.date;
        githubCardElem.querySelector('.commit__user-fio').textContent = this.name;
        githubCardElem.querySelector('.commit__user-mail').textContent = this.email;
        githubCardElem.querySelector('.commit__user-photo').src = this.avatar;

        return githubCardElem;
    }
}