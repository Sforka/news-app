//===добавляет избранное в локальное хранилище ==========


export default function setFavoritesInLocalStor({
  resultsArr,
  clickedArticleId,
  evt,
}) {
  const STORAGE_FAVORITES_KEY = 'favorites';
  resultsArr.forEach(article => {
    if (
      article.id == clickedArticleId ||
      article.slug_name == clickedArticleId ||
      article._id == clickedArticleId
    ) {
      let savedData = localStorage.getItem(STORAGE_FAVORITES_KEY);

      // проверка или есть уже обьект
      savedData = savedData ? JSON.parse(savedData) : {};

      console.dir(evt.target.nextElementSibling);
      if (savedData[clickedArticleId]) {
        delete savedData[`${clickedArticleId}`];

        if ((evt.target.textContent.contains = 'Remove from favorites')) {
          evt.target.textContent = 'Add to favorites'; 

        }

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
