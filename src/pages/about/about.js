//подключение файла со стилями

import Swiper from "../../../node_modules/swiper/js/swiper";
import "./about.css";

import {GitHubApi} from '../../js/modules/GithubApi';
import {CommitCard} from '../../js/components/CommitCard';
import {CommitCardList} from '../../js/components/CommitCardList';

var mySwiper = new Swiper('.swiper-container', {
    speed: 300,
    slidesPerView: 1,
    spaceBetween: 8,
    slidesPerGroup: 1,

    breakpoints: {
        // when window width is >= 320px
        350: {
            spaceBetween: 8,
            slidesPerView: 1.3,
            slidesPerGroup: 1
        },
        450: {
            spaceBetween: 8,
            slidesPerView: 1.8,
            slidesPerGroup: 1
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 2.2,
            spaceBetween: 16,
            slidesPerGroup: 2,
        },
        900: {
            slidesPerView: 2.8,
        },
        // when window width is >= 1280px
        1280: {
            slidesPerView: 4,     
            spaceBetween: 16,
            slidesPerGroup: 2,
            centeredSlides: 'true',
        }
    },
 
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const apiGit = new GitHubApi();
const newsGithubCardElem = document.querySelector('.swiper-wrapper');
const createCommitCard = (name, email, date, message, url) => new CommitCard(name, email, date, message, url);

const commitCards = new CommitCardList(apiGit, newsGithubCardElem, createCommitCard);
commitCards.render(mySwiper);

