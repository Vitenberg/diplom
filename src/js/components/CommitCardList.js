import {ERROR_THROUTH_REQUEST} from '../constants/const';
export class CommitCardList {
    constructor(api, cardListElem, createCard) {
        this.api = api;
        this.cardListElem = cardListElem;
        this.createCard = createCard;
    }
    addGitHubCard(card) {
        this.cardListElem.appendChild(card.create());
    }
    render(swiper) {
        this.api.getGitHubCards()
            .then((cards) => {
                for (const elem of cards) {
                    const card = this.createCard(elem.commit.committer.name,
                        elem.commit.committer.email,
                        elem.commit.committer.date,
                        elem.commit.message,
                        elem.author.avatar_url
                    );
                    this.addGitHubCard(card);
                }
                swiper.update();
            })
            .catch((err) => {
                console.log(ERROR_THROUTH_REQUEST, err);
            })
            ;
    }
}