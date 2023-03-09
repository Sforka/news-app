import createmarkup from './news-card';
import publishedDateFormatter from './publishedDateFormatter';
let arrDateOfRead = [];
let arrUniqueDateOfRead = [];
let arrArticlesPerDate = [];
let favoritesArrFedor = [];

let fullMarkup = '';
let sectionMarkup = '';
let startSectionMarkup = '';
let blockMarkup = '';
const endSectionMarkup = '</ul></section>';
const STORAGE_READ_KEY = 'read';
//===отримання масиву статей з local storage ==========
function getReadArticlesFromLocStor() {
  read = localStorage.getItem(STORAGE_READ_KEY);
  if (!read) {
    withoutNewsContainer.style.display = 'block';
  } else {
    arrArticlesFromLocStor = JSON.parse(read);
    getUniqeDateOfRead(arrArticlesFromLocStor);
    console.log(arrArticlesFromLocStor);
  }
}

//===отримання масиву дат для створення секцій із даних local storage ==========
//добавити перевірку на пустий масив
function getUniqeDateOfRead(arr) {
  const parsedFavorites = arr;
  const favoritesKeys = Object.keys(parsedFavorites);

  for (const favoriteKey of favoritesKeys) {
    const parsedFavorite = parsedFavorites[`${favoriteKey}`];
    favoritesArrFedor.push(parsedFavorite);
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
      dateOfReading,
    } = parsedFavorite;
    console.log(favoritesArrFedor);
    favoritesArrFedor.forEach(article => {
      return arrDateOfRead.push(article.dateOfReading);
    });
    arrUniqueDateOfRead = arrDateOfRead.filter(getOnlyUniqueArray);
    console.log(arrUniqueDateOfRead);
    return renderPage(arrUniqueDateOfRead);
  }
}







//=== створення масиву статей по даті для блоку секції ==========


//добавити перевірку на пустий масив
function renderPage(arrUniqueDateOfRead) {
  if (!read) {
    withoutNewsContainer.style.display = 'block';
  }
  fullMarkup = '';
  arrUniqueDateOfRead.forEach(date => {
    console.log(date);
    createSectionMarkup(date);
    getArticlesPerDate(date);
    console.log(arrArticlesPerDate);
    createBlockMarkup(arrArticlesPerDate);
    sectionMarkup = startSectionMarkup + blockMarkup + endSectionMarkup;
    fullMarkup = fullMarkup + sectionMarkup;
    console.log(fullMarkup);
    return fullMarkup;
  });
  body.inserAdjacentHTML('beforeend', fullMarkup);
  body.addEventListener('click', onAddToFavoritesClick);
  addClickListenerToCard();
}

function createSectionMarkup(date) {
  console.log(date);
  startSectionMarkup = `
    <section class = "secction"
    <div class = "section-title">
    <p class = "section-title"__text>${date}</p>
    <svg class="section-title__icon" width="12" height="8">
        <use href="./images/symbol-defs.svg#"icon-Vector-Down"></use>
    </svg>
    </div>
    <ul class = "article-list>`;
  return startSectionMarkup;
}

function getArticlesPerDate(date) {
  arrArticlesPerDate = favoritesArrFedor.filter(
    article => article.dateOfReading === date
  );
  return arrArticlesPerDate;
}

function createBlockMarkup(arr) {
  console.log(arr);
  const parsedFavorites = arr;
  const favoritesKeys = Object.keys(parsedFavorites);
  for (const favoriteKey of favoritesKeys) {
    const parsedFavorite = parsedFavorites[`${favoriteKey}`];
    favoritesArrFedor.push(parsedFavorite);
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

    //   перевіряемо чи є зображення, де помилка там є відео
    try {
      if (articleId === id) {
        imgUrl = media[0]['media-metadata'][2].url;
      }
      if (articleId === slug_name) {
        imgUrl = multimedia[2].url;
      }
      if (articleId === _id) {
        imgUrl = 'https://www.nytimes.com/' + multimedia[0].url;
      }

      //   якщо треба інший розмір картинки
      // console.log(media[0]['media-metadata']);
    } catch (error) {
      imgUrl =
        'https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg';
    }

    blockMarkup += createmarkup({
      publishedDate,
      sectionName,
      articleTitle,
      shortDescription,
      urlOriginalArticle,
      imgUrl,
      articleId,
    });

    return blockMarkup;
  }
}

//===функція фільтрації для function getUniqeDateOfRead(arr) ==========
function getOnlyUniqueArray(value, index, self) {
  return self.indexOf(value) === index;
}

export { renderPage };
