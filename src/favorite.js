import createmarkup from './js/news-card';
import onSearchClick from './js/header';
import { ThemeSwitcher } from './js/themeSwitcher';

const newsContainerRef = document.querySelector('.news_container');
const withoutNewsContainer = document.querySelector('.without-news_container')
const body = document.querySelector('body');
const searchInput = document.querySelector('.search_form');

let markupAll = '';

let articleId = '';
let publishedDate = '';
let sectionName = '';
let articleTitle = '';
let shortDescription = '';
let urlOriginalArticle = '';
let imgUrl = '';
let totalNews = '';
let resultsArr = '';
let numberOfCard = 0;


const STORAGE_FAVORITES_KEY = 'favorites';


//============= перемикач теми початок ==========

const themeSwitcherEl = document.querySelector('.switch_input');
const mobileSwitcherEl = document.querySelector('.switch_input--mobile');

const themeSwitcher = new ThemeSwitcher(themeSwitcherEl, mobileSwitcherEl);

mobileSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);
themeSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);

themeSwitcher.renderTheme();
//============= перемикач теми кінець ============

// начало. переформатирование даты
function publishedDateFormatter(date) {
  return formatDate(new Date(date));
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
// конец. переформатирование даты

// Начало. Проверка на клик по Добавить в избранное
function onAddToFavoritesClick(evt) {
  if (evt.target.className === 'card__btn') {
    const clickedArticleId =
      evt.target.closest('.card')?.id ||
      evt.target.closest('.card')?.slug_name ||
      evt.target.closest('.card')?._id;
    setFavoritesInLocalStor({
      resultsArr,
      clickedArticleId,
    });
  }
}

// Конец. Проверка на клик по Добавить в избранное

//===добавляет избранное в локальное хранилище ==========
function setFavoritesInLocalStor({ resultsArr, clickedArticleId }) {
  resultsArr.forEach(article => {
    if (
      article.id == clickedArticleId ||
      article.slug_name == clickedArticleId ||
      article._id == clickedArticleId
    ) {
      let savedData = localStorage.getItem(STORAGE_FAVORITES_KEY);

      // проверка или есть уже обьект
      savedData = savedData ? JSON.parse(savedData) : {};

      if (savedData[clickedArticleId]) {
        delete savedData[`${clickedArticleId}`];

        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(savedData));
        return;
      } else {
        savedData[clickedArticleId] = article;

        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(savedData));
      }
    }
  });
}
//== добавляет избранное в локальное хранилище. конец ==========

//=== Подчеркивание активной ссылки на страницу -- начало

import './js/currentPage'

//=== Подчеркивание активной ссылки на страницу -- конец



//======  Добавляет карточки новостей на страницу favorite  ======


function addFavorite() {
  const favorites = localStorage.getItem(STORAGE_FAVORITES_KEY);
  
  if (!favorites) {
    withoutNewsContainer.style.display =
    'block';

  } else {
/*  const parsedFavorites = '';

    try {
      parsedFavorites = JSON.parse(favorites);
    } catch(error) {
      console.log(error);
    } */
    const parsedFavorites = JSON.parse(favorites);
    const favoritesKeys = Object.keys(parsedFavorites);

    for (const favoriteKey of favoritesKeys) {
      const parsedFavorite = parsedFavorites[`${favoriteKey}`]
      const { abstract, published_date, section, title, media, url, id } = parsedFavorite;

      articleId = id;
      publishedDate = publishedDateFormatter(published_date);
      sectionName = section;
      articleTitle = title;
      shortDescription = abstract;
      urlOriginalArticle = url;

      try {
        imgUrl = media[0]['media-metadata'][2].url;
          
      } catch (error) {
        imgUrl = 'Тут ссылку на заглушку';
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

addFavorite()

