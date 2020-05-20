export class SearchInput {
    constructor( form, errElem, addButton, searchFunc, threeNews, showLocal){
        this.form = form;
        this.addButton = addButton;
        this.searchFunc = searchFunc;
        this.threeNews = threeNews;
        this.showLocal = showLocal;
        this.errElem = errElem;
    }
    startSearch(){
        event.preventDefault();
        if (this.validate()){       
            this.searchFunc(this.form.input.value);
        }
    }
    addThreeNews(){
        event.preventDefault();
        this.threeNews();
    }
    showFromLocal(){
        this.showLocal();
    }
    addEventListener(){
        this.form.addEventListener('submit', this.startSearch.bind(this));
        this.addButton.addEventListener('click', this.addThreeNews.bind(this));
        window.addEventListener('load', this.showFromLocal.bind(this));
        this.form.addEventListener('input', this.validate.bind(this));
    }
    validate(){
        let validity = false;
        if (this.form.input.validity.valueMissing && (event.type == 'submit')){
            this.errElem.classList.remove('error_hidden');
            this.errElem.textContent = 'Нужно ввести ключевое слово';
        } else if (this.form.input.validity.tooShort && (event.type == 'submit')){
            this.errElem.classList.remove('error_hidden');
            this.errElem.textContent = `Нужно хотябы ${this.form.input.minLength} символа`;
        } else {
            validity = true;
            this.errElem.classList.add('error_hidden');
        }
        return validity;
    }

}