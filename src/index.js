// треба зробити перевірку чи вибрана дата.
import createmarkup from './js/news-card';
import NewsFetchApi from './js/newsApi';
import onSearchClick from './js/header';
import { ThemeSwitcher } from './js/themeSwitcher';
import createWidget from './js/weatherApi';
import calendar from './js/calendar';
import PaginationLogicPopular from './js/paginationLogicPopular';
import PaginationLogicCategory from './js/paginationLogicCategory';
import { onPaginationPopularNextClick } from './js/paginationPopular';
import { onPaginationPopularPrevClick } from './js/paginationPopular';
import { onPaginationCategoryPrevClick } from './js/paginationCategory';
import { onPaginationCategoryNextClick } from './js/paginationCategory';
import publishedDateFormatter from './js/publishedDateFormatter';

const pagRefs = {
  prev: document.querySelector('.pag-arrow--prev'),
  next: document.querySelector('.pag-arrow--next'),
};

const newsContainerRef = document.querySelector('.news_container');
const body = document.querySelector('body');
const searchInput = document.querySelector('.search_form');

export const newsFetchApi = new NewsFetchApi();
export const popularNewsPagination = new PaginationLogicPopular();
export const categoryNewsPagination = new PaginationLogicCategory();

const STORAGE_FAVORITES_KEY = 'favorites';

let markupAll = '<div class="weatherWidget"></div>';

let articleId = '';
let publishedDate = '';
let sectionName = '';
let articleTitle = '';
let shortDescription = '';
let urlOriginalArticle = '';
let imgUrl = '';
let totalNews = '';
let resultsArr = '';

// приносить список тем
function getSectionList(e) {
  e.preventDefault();
  newsFetchApi.fetchSectionList().then(({ data: { results } }) => {
    results.forEach(({ section, display_name }) => {
      // деструктурував необхідні данні для розмітки.
      const sectionName = section;
      const displayName = display_name;
    });
  });
}

getPopularNews();

// приносить дані популярних новин
function getPopularNews() {
  newsFetchApi
    .fetchPopularNews()
    .then(({ data }) => {
      //   загальна кількість знайдених новин
      totalNews = data.num_results;
      resultsArr = data.results;
      // проверка если нету новостей.
      if (resultsArr.length === 0) {
        newsContainerRef.innerHTML = '';
        document.querySelector('.without-news_container').style.display =
          'block';
      } else {
        pagRefs.prev.addEventListener('click', onPaginationPopularPrevClick);
        pagRefs.next.addEventListener('click', onPaginationPopularNextClick);

        popularNewsPagination.resultsArr = resultsArr;
        const markupAll = popularNewsPagination.getMarkupAll();
        populateNews(markupAll);
      }
    })
    .catch(error => console.log(error));
}

document.querySelector('.test').addEventListener('click', onCategoryClick);
// приносить дані новин по категоріям
function onCategoryClick(evt) {
  // evt.preventDefault();
  // тут треба записати значення обраної категорії з події на яку кнопку клацнули
  newsFetchApi.searchSection = 'business';

  newsFetchApi
    .fetchBySection()
    .then(({ data }) => {
      //   загальна кількість знайдених новин, тут она врёт, на самом деле приходит меньше чем есть.
      totalNews = data.num_results;
      resultsArr = data.results;

      // проверка если нету новостей.
      if (data.results === null) {
        newsContainerRef.innerHTML = '';
        document.querySelector('.without-news_container').style.display =
          'block';
      } else {
        pagRefs.prev.removeEventListener('click', onPaginationPopularPrevClick);
        pagRefs.next.removeEventListener('click', onPaginationPopularNextClick);
        pagRefs.prev.addEventListener('click', onPaginationCategoryPrevClick);
        pagRefs.next.addEventListener('click', onPaginationCategoryNextClick);
        categoryNewsPagination.resultsArr = resultsArr;
        const markupAll = categoryNewsPagination.getMarkupAll();
        populateNews(markupAll);
      }
    })
    .catch(error => console.log(error));
}

searchInput.addEventListener('submit', onSearchInputClick);

// приносить дані за пошуковим запитом
function onSearchInputClick(evt) {
  evt.preventDefault();
  //  значення пошукового запиту
  newsFetchApi.searchQuery = evt.target.elements.searchQuery.value;

  newsFetchApi
    .fetchBySearchQuery()
    .then(({ data: { response } }) => {
      //   загальна кількість знайдених новин
      totalNews = response.meta.hits;
      resultsArr = response.docs;

      // проверка если нету новостей.
      if (resultsArr.length === 0) {
        newsContainerRef.innerHTML = '';
        document.querySelector('.without-news_container').style.display =
          'block';
      } else {
        resultsArr.forEach(
          ({
            abstract,
            pub_date,
            section_name,
            headline,
            multimedia,
            web_url,
            _id,
          }) => {
            // деструктурував необхідні данні для розмітки.
            articleId = _id;
            publishedDate = publishedDateFormatter(pub_date);
            sectionName = section_name;
            articleTitle = headline.main;
            shortDescription = abstract;
            urlOriginalArticle = web_url;
            imgUrl = '';
            try {
              imgUrl = imgUrl = 'https://www.nytimes.com/' + multimedia[0].url;
              //   якщо треба інший розмір картинки
              // console.log(media[0]['media-metadata']);
            } catch (error) {
              imgUrl = 'Тут ссылку на заглушку';
            }

            markupAll += createmarkup({
              publishedDate,
              sectionName,
              articleTitle,
              shortDescription,
              urlOriginalArticle,
              imgUrl,
              articleId,
            });
            numberOfCard += 1;
          }
        );
        newsContainerRef.innerHTML = markupAll;
        markupAll = '<div class="weatherWidget"></div>';

        // Блок добавления погоды
        const weatherWidgetContainer = document.querySelector('.weatherWidget');

        createWidget(weatherWidgetContainer);
        // Конец. Блок добавления погоды

        // Слушатель на клик по Добавить в избранное
        body.addEventListener('click', onAddToFavoritesClick);
     
      }
    })
    .catch(error => console.log(error));
}

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

//============= перемикач теми початок ==========

const themeSwitcherEl = document.querySelector('.switch_input');
const mobileSwitcherEl = document.querySelector('.switch_input--mobile');

const themeSwitcher = new ThemeSwitcher(themeSwitcherEl, mobileSwitcherEl);

mobileSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);
themeSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);

themeSwitcher.renderTheme();
//============= перемикач теми кінець ============

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

//=== Подчеркивание активной ссылки на страницу -- начало

import './js/currentPage';

//=== Подчеркивание активной ссылки на страницу -- конец


// Рендеринг всех карточек на странице. начало
export function populateNews(markupAll) {
  newsContainerRef.innerHTML = markupAll;

  // Блок добавления погоды
  const weatherWidgetContainer = document.querySelector('.weatherWidget');

  createWidget(weatherWidgetContainer);
  // Конец. Блок добавления погоды

  // Слушатель на клик по Добавить в избранное
  body.addEventListener('click', onAddToFavoritesClick);
}
// Рендеринг всех карточек на странице. конец
