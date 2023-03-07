import './js/header';
import { ThemeSwitcher } from './js/themeSwitcher';
import { onSearchInputClick } from './index.js';

const newsContainerRef = document.querySelector('.news_container');
const withoutNewsContainer = document.querySelector('.without-news_container');
// const body = document.querySelector('body');
const searchInput = document.querySelector('.search_form');

let markupAll = '';

const STORAGE_FAVORITES_KEY = 'favorites';

//============= перемикач теми початок ==========

const themeSwitcherEl = document.querySelector('.switch_input');
const mobileSwitcherEl = document.querySelector('.switch_input--mobile');

const themeSwitcher = new ThemeSwitcher(themeSwitcherEl, mobileSwitcherEl);

mobileSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);
themeSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);

themeSwitcher.renderTheme();
//============= перемикач теми кінець ============

// ------------------------------------------------------ GBPLTW -------------------------------- //
import publishedDateFormatter from './js/publishedDateFormatter';
import createmarkup from './js/news-card';
import { setFavoritesInLocalStor } from './index.js';


const body = document.querySelector('body');
let favoritesArrFedor = [];


function addFavorite() {
  const favorites = localStorage.getItem(STORAGE_FAVORITES_KEY);

  if (!favorites) {
    withoutNewsContainer.style.display = 'block';
  } else {
   const parsedFavorites = JSON.parse(favorites);
    
    const favoritesKeys = Object.keys(parsedFavorites);
   
    body.addEventListener('click',onAddToFavoritesClick);


    for (const favoriteKey of favoritesKeys) {
      const parsedFavorite = parsedFavorites[`${favoriteKey}`];
      favoritesArrFedor.push(parsedFavorite);
      const {
        abstract,
        pub_date,
        published_date,
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
      let imgUrl = '0';

      //   перевіряемо чи є зображення, де помилка там є відео
      try {
        if (media[0]['media-metadata'][2].url === undefined) {
          imgUrl = media[0]['media-metadata'][2].url;
        } else if ('https://www.nytimes.com/' + multimedia[0].url === undefined) {
          imgUrl = 'https://www.nytimes.com/' + multimedia[0].url;
        } else( multimedia[2].url=== undefined)
        {
          imgUrl = multimedia[2]?.url;
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

addFavorite();

function onAddToFavoritesClick(evt) {
  console.log(favoritesArrFedor);
  if (evt.target.className === 'card__btn') {
    const clickedArticleId =
      evt.target.closest('.card')?.id ||
      evt.target.closest('.card')?.slug_name ||
      evt.target.closest('.card')?._id;
    const resultsArr = favoritesArrFedor
    setFavoritesInLocalStor({
      resultsArr,
      clickedArticleId,
    });
  }
}