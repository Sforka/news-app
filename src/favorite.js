import './home';
import './js/header';
import { ThemeSwitcher } from './js/themeSwitcher';
import { calendar } from './js/calendar';
const newsContainerRef = document.querySelector('.news_container');
const withoutNewsContainer = document.querySelector('.without-news_container');
// const body = document.querySelector('body');
const searchInput = document.querySelector('.search_form');

let markupAll = '';

import { onSearchClick } from './js/header';
const btnSearch = document.querySelector('.search_mob_btn');

btnSearch.addEventListener('click', onSearchClick);

const STORAGE_FAVORITES_KEY = 'favorites';

//============= перемикач теми початок ==========

const themeSwitcherEl = document.querySelector('.switch_input');
const mobileSwitcherEl = document.querySelector('.switch_input--mobile');

const themeSwitcher = new ThemeSwitcher(themeSwitcherEl, mobileSwitcherEl);

mobileSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);
themeSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);

themeSwitcher.renderTheme();
//============= перемикач теми кінець ============

import publishedDateFormatter from './js/publishedDateFormatter';
import createmarkup from './js/news-card';
import { onAddToFavoritesClick } from './home.js';

const body = document.querySelector('body');
body.addEventListener('click', onAddToFavoritesClick);

function addFavorite() {
  const favorites = localStorage.getItem(STORAGE_FAVORITES_KEY);

  if (!favorites) {
    withoutNewsContainer.style.display = 'block';
  } else {
    const parsedFavorites = JSON.parse(favorites);
    const favoritesKeys = Object.keys(parsedFavorites);

    for (const favoriteKey of favoritesKeys) {
      const parsedFavorite = parsedFavorites[`${favoriteKey}`];
      const {
        abstract,
        published_date,
        pub_date,
        section,
        section_name,
        title,
        headline,
        media,
        multimedia,
        url,
        web_url,
        id,
        _id,
        slug_name,
      } = parsedFavorite;

      const articleId = id || _id || slug_name;
      const publishedDate = publishedDateFormatter(published_date || pub_date);
      const sectionName = section || section_name;
      const articleTitle = title || headline.main;
      const shortDescription = abstract;
      const urlOriginalArticle = url || web_url;
      let imgUrl = '';
      let imgLink = 'https://www.nytimes.com/';

      //   перевіряемо чи є зображення, де помилка там є відео
      try {
        if (articleId === id) {
          imgUrl = media[0]['media-metadata'][2].url;
          console.log(imgUrl);
        }
        if (articleId === slug_name) {
          imgUrl = multimedia[2].url;
          console.log(imgUrl);
        }
        if (articleId === _id) {
          imgUrl = 'https://www.nytimes.com/' + multimedia[0].url;
          console.log(imgUrl);
        }

        //   якщо треба інший розмір картинки
        // console.log(media[0]['media-metadata']);
      } catch (error) {
        imgUrl =
          'https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg';
      }

      newsContainerRef.innerHTML = markupAll += createmarkup({
        publishedDate,
        sectionName,
        articleTitle,
        shortDescription,
        urlOriginalArticle,
        imgUrl,
        articleId,
      });
    }
  }
}



function onAddToFavoritesClick(evt) {

  if (evt.target.className === 'card__btn') {
    const clickedArticleId =
      evt.target.closest('.card')?.id ||
      evt.target.closest('.card')?.slug_name ||
      evt.target.closest('.card')?._id;
    const resultsArr = favoritesArrFedor
    if ((evt.target.textContent.contains = 'Add to favorites')) {
      evt.target.textContent = 'Remove from favorites';
    } 
    setFavoritesInLocalStor({
      resultsArr,
      clickedArticleId, evt
    });
  }
}

