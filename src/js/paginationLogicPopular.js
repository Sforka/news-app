import createmarkup from './news-card';

export default class PaginationLogicPopular {
  constructor() {
    this.page = 0;
    this.resultsArr = [];
    // это приходит из функции пагинации
    this.newsPerPage = 2;
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
// конецю переформатирование даты
