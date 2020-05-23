export class SearchInput {
    constructor( form, errElem, addButton, searchFunc, threeNews, showLocal, dataStorage){
        this.form = form;
        this.addButton = addButton;
        this.searchFunc = searchFunc;
        this.threeNews = threeNews;
        this.showLocal = showLocal;
        this.errElem = errElem;
        this.dataStorage = dataStorage;
    }
    _startSearch(){
        event.preventDefault();
        if (this._validate()){ 
            this.form.input.setAttribute("disabled", "");      
            this.searchFunc(this.form.input.value);        
        }
    }
    _addThreeNews(){
        event.preventDefault();
        this.threeNews();
    }
    _showFromLocal(){
        const searchWord = this.dataStorage.getTextDatafromStorage('searchWord');
        this.form.input.value = searchWord;
        this.showLocal();
    }
    addEventListener(){
        this.form.addEventListener('submit', this._startSearch.bind(this));
        this.addButton.addEventListener('click', this._addThreeNews.bind(this));
        window.addEventListener('load', this._showFromLocal.bind(this));
        this.form.addEventListener('input', this._validate.bind(this));
    }
    _validate(){
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