import {ERROR_THROUTH_REQUEST} from '../constants/const';
export class GitHubApi{
    constructor(conf) {
        this.link = 'https://api.github.com/repos/Vitenberg/diplom/commits';
        this.authorization = 'ec38a0abc27cf5fb892d49ca3897fd6c25c356c0';
    }
    getGitHubCards() {
        return fetch(this.link, {
            headers: {
              authorization: this.authorization,
              'User-Agent': 'Vitenberg'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
           ;
    }
}