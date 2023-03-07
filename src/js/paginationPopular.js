import { popularNewsPagination } from '../home';
import { populateNews } from '../home';

//=== пагинация популярных новостей -- начало
export function onPaginationPopularPrevClick() {
  popularNewsPagination.page -= 1;
  popularNewsPagination.markupAll = '<div class="weatherWidget"></div>';
  const markupAll = popularNewsPagination.getMarkupAll();
  populateNews(markupAll);
  if (popularNewsPagination.page === 0) {
    console.log('отключить кнопку назад');
  }
}
export function onPaginationPopularNextClick() {
  popularNewsPagination.page += 1;
  popularNewsPagination.markupAll = '<div class="weatherWidget"></div>';
  const markupAll = popularNewsPagination.getMarkupAll();
  populateNews(markupAll);
}
//=== пагинация популярных новостей -- конец
