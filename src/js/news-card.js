const STORAGE_FAVORITES_KEY = 'favorites';

export default function createmarkup({
  publishedDate,
  sectionName,
  articleTitle,
  shortDescription,
  urlOriginalArticle,
  imgUrl,
  articleId,
}) {
  let textLength = shortDescription;
  if (shortDescription.length > 110) {
    const spaceIndex = shortDescription.indexOf(' ', 110);
    if (spaceIndex > 0) {
      textLength = shortDescription.slice(0, spaceIndex) + '...';
    }
  }
  let titleLength = articleTitle;
  if (articleTitle.length > 58) {
    const spaceIndex = articleTitle.indexOf(' ', 44);
    if (spaceIndex > 0) {
      titleLength = articleTitle.slice(0, spaceIndex) + '...';
    }
  }
  // проверка или новость есть в локальном избранное
let favoritesBtnText = "Add to favorite"
  const favorites = localStorage.getItem(STORAGE_FAVORITES_KEY);
  if (favorites) {
    const parsedFavorites = JSON.parse(favorites);
    const favoritesKeys = Object.keys(parsedFavorites);
    for (const favoriteKey of favoritesKeys) {
      const parsedFavorite = parsedFavorites[`${favoriteKey}`];
      const { id, _id, slug_name } = parsedFavorite;

      const articleIdInFavorites = id || _id || slug_name;
      if (articleId === articleIdInFavorites) { favoritesBtnText = 'Remove from favorites' }
    }
  }

  return `
      <article class="card" id="${articleId}">
        <div class="card__img-container">
          <img class="card__img" src="${imgUrl}" alt="${articleTitle}">
          <p class="card__section-name">
            ${sectionName}
          </p>
          <button class="card__btn" type="button">
           ${favoritesBtnText}
          </button>
        </div>
        <h2 class="card__title">
          ${titleLength}
        </h2>
        <p class="card__text">${textLength}</p>
        <div class="card__bottom">
          <span class="card__date">
            ${publishedDate}
          </span>
          <a class="card__read-more-search"
            href="${urlOriginalArticle}" target="_blank"
          >
            Read more
          </a>
        </div>
      </article>
    `;
}
