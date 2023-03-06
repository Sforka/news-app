import { categoryNewsPagination } from '../index';
import { populateNews } from '../index';
import { newsFetchApi } from '../index';

//=== пагинация по категориям новостей -- начало
export function onPaginationCategoryPrevClick() {
  categoryNewsPagination.page -= 1;

  categoryNewsPagination.markupAll = '<div class="weatherWidget"></div>';
  const markupAll = categoryNewsPagination.getMarkupAll();
  populateNews(markupAll);
  if (categoryNewsPagination.page === 0) {
    console.log('отключить кнопку назад');
  }
}
export function onPaginationCategoryNextClick() {
  categoryNewsPagination.page += 1;

  // так как сервер отдаёт по 20 новостей, а мы отображаем меньше, проверяем или нужно еще догружать
  if (
    categoryNewsPagination.page ===
    Math.floor(
      categoryNewsPagination.resultsArr.length /
        categoryNewsPagination.newsPerPage
      // тут -1 - загружаем следующую страницу за 1 страницу раньше, на случай если догрузим не полный массив, что б отображалось по 7, а не 6, потом догрузили 7, и потом остаток
    ) -
      1
  ) {
    newsFetchApi.offset += 20;

    newsFetchApi
      .fetchBySection()
      .then(({ data }) => {
        //   загальна кількість знайдених новин
        totalNews = data.num_results;
        const extraResultsArr = data.results;

        categoryNewsPagination.resultsArr.push(...extraResultsArr);
      })
      .catch(error => console.log(error));
  }

  categoryNewsPagination.markupAll = '<div class="weatherWidget"></div>';
  const markupAll = categoryNewsPagination.getMarkupAll();
  populateNews(markupAll);
}
//=== пагинация по категориям новостей -- конец
