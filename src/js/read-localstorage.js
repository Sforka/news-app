
let DateOfRead = "";
let readArticle = {};
let arrArticlesFromLocStor = [];

// class Article {
//   constructor({ abstract, published_date, section, title, media, url, id}){
//   this.articleId = articleId
//   this.publishedDate = publishedDate
//   this.sectionName = sectionName
//   this.articleTitle = articleTitle
//   this.shortDescription = shortDescription
//   this.urlOriginalArticle = urlOriginalArticle
//   this.imgUrl = imgUrl
//   this.dateOfReading = ''
//   }
// }
////////// правильніше переписати на дані з картки по Id як у Федора, але уже немає часу

class Article {
  constructor(target){
  this.articleId = target.id
  this.sectionName = target.childNodes[1].childNodes[3].innerText
  this.articleTitle = target.childNodes[3].innerText
  this.shortDescription = target.childNodes[5].innerText
  this.publishedDate = target.children[3].firstElementChild.innerText
  this.urlOriginalArticle = target.children[3].children[1].href
  this.imgUrl = target.childNodes[1].childNodes[1].currentSrc
  this.dateOfReading = ''
  }
}

//===створює об'єкт для перевірки і добавлення в local storage ==========
function createObjectLocalStor(e){
  readArticle = new Article(e)
  readArticle.dateOfReading = getTime();  
  return readArticle
}

//=== генерація дати кліку по read more ==========
function getTime(){
  const date = new Date().getDate();
  const month = (new Date().getMonth() + 1);
  const year = new Date().getFullYear();
  DateOfRead = (`${date}/${month}/${year}`)
  return DateOfRead;
}

//===  запис об'єкта в local storage ==========
function setReadInLocalStor(arr, article) {
let indexReadArticle = arr.findIndex(el => el.id === article.id)
 if (indexReadArticle === -1){
  arr.push(article)
 } else {
  arr.splice(indexReadArticle, 1, article)
 }
}

///////// ДЛЯ ОБРОБКИ CLICK READ MORE /////////
//=== добавляє слухач на картку статті .card для отримання даних для обєкта  ==========
function addClickListenerToCard() {
  document.querySelectorAll('.card').forEach(element => {
    element.addEventListener('click', onClickMore);
  });
}

//=== дія при кліку ==========
function onClickMore(e){
   if (
      e.target.nodeName === 'A' ||
      e.target.className === 'card__favorite'
    ) {
      createObjectLocalStor(target) 

      setReadInLocalStor(arrArticlesFromLocStor, readArticle)
      }
  }

export { onClickMore, addClickListenerToCard}

