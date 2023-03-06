import createmarkup from './news-card';
import publishedDateFormatter from './publishedDateFormatter';

export default class PaginationLogicPopular {
  constructor() {
    this.page = 0;
    this.resultsArr = [];
    // это приходит из функции пагинации
    this.newsPerPage = 7;
    this.markupAll = '<div class="weatherWidget"></div>';
  }

  getResultForPage() {
    return this.resultsArr.slice(
      this.newsPerPage * this.page,
      this.newsPerPage * this.page + this.newsPerPage
    );
  }

  // перебор массива  части статтей  и рендеринг их с погодой
  getMarkupAll() {
    this.markupAll = '<div class="weatherWidget"></div>';
    if (this.getResultForPage().length < this.newsPerPage) {
      console.log('отключить кнопку вперед');
    }
    this.getResultForPage().forEach(
      ({ abstract, published_date, section, title, media, url, id }) => {
        const articleId = id;
        const publishedDate = publishedDateFormatter(published_date);
        const sectionName = section;
        const articleTitle = title;
        const shortDescription = abstract;
        const urlOriginalArticle = url;
        let imgUrl;

        //   перевіряемо чи є зображення, де помилка там є відео
        try {
          imgUrl = media[0]['media-metadata'][2].url;

          //   якщо треба інший розмір картинки
          // console.log(media[0]['media-metadata']);
        } catch (error) {
          imgUrl =
            'Тут ссылку на заглушку ../images/the-new-york-times-logo.jpg';
        }

        // деструктурував необхідні данні для розмітки

        this.markupAll += createmarkup({
          publishedDate,
          sectionName,
          articleTitle,
          shortDescription,
          urlOriginalArticle,
          imgUrl,
          articleId,
        });
      }
    );
    return this.markupAll;
  }
}
