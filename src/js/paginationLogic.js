export default class PaginationLogic {
  constructor() {
    this.page = 0;
    this.resultsArr = [];
    // это приходит из функции пагинации
      this.newsPerPage = 2;
  }

  getResultForPage() {
    return this.resultsArr.slice(
      this.newsPerPage * this.page,
      this.newsPerPage * this.page + this.newsPerPage
    );
  }
}
