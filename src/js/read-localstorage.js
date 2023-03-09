let DateOfRead = "";
let readArticle = {};
// let arrArticlesFromLocStor = [];

let arrArticlesFromLocStor = [
{articleId: "100000008796668",
articleTitle: "Inside the Panic at Fox News After the 2020 Election",
dateOfReading: "6/3/2023",
imgUrl: "https://static01.nyt.com/images/2023/03/04/multimedia/04dc-foxnews-topart-01-wlfc/04dc-foxnews-topart-01-wlfc-mediumThreeByTwo440.jpg",
publishedDate: "04/03/2023",
sectionName: "U.S.",
shortDescription: "“If we hadn’t called Arizona,” said Suzanne Scott, the network’s chief executive, according to a recording reviewed...",
urlOriginalArticle: "https://www.nytimes.com/2023/03/04/us/politics/panic-fox-news-2020-election.html",
},

{articleId: "100000008794897",
articleTitle: "The Daring Ruse That Exposed China’s Campaign...",
dateOfReading: "7/3/2023",
imgUrl: "https://static01.nyt.com/images/2023/03/12/magazine/12mag-spy/12mag-spy-mediumThreeByTwo440-v2.jpg",
publishedDate: "07/03/2023",
sectionName: "Magazine",
shortDescription: "How the downfall of one intelligence agent revealed the astonishing depth of Chinese industrial espionage.",
urlOriginalArticle: "https://www.nytimes.com/2023/03/07/magazine/china-spying-intellectual-property.html"
},

{articleId: "100000008798772",
  articleTitle: "The Rumored ‘Vanderpump Rules’ Affair, Explained",
  dateOfReading: "8/3/2023",
  imgUrl: "https://static01.nyt.com/images/2023/03/06/multimedia/06VANDERPUMP-AFFAIR-bwmv/06VANDERPUMP-AFFAIR-bwmv-mediumThreeByTwo440.jpg",
  publishedDate: "06/03/2023",
  sectionName: "Style",
  shortDescription: "Word of a cheating scandal involving the cast members of a Bravo reality television show has taken the internet...",
  urlOriginalArticle: "https://www.nytimes.com/2023/03/06/style/vanderpump-rules-cheating-explainer.html",
}]

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
// function createObjectLocalStor(e){
//   readArticle = new Article(e)
//   readArticle.dateOfReading = getTime();  
//   console.log(readArticle)
//   return readArticle
// }

//=== генерація дати кліку по read more ==========


//===  запис об'єкта в local storage ==========
function setReadInLocalStor(arr, article) {
const STORAGE_READ_KEY = 'read';
let indexReadArticle = arr.findIndex(el => el.id === article.id)
console.log(indexReadArticle)
 if (indexReadArticle === -1){
  arr.push(article)
  console.log(arr)
  localStorage.setItem(STORAGE_READ_KEY, JSON.stringify(arr))
 } else {
  arr.splice(indexReadArticle, 1, article)
  console.log(arr)
  localStorage.setItem(STORAGE_READ_KEY, JSON.stringify(arr))

  
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
      e.target.className === 'card__read-more-search'
    ) {
      console.log(e.target)
      console.log(e.currentTarget)

      
      createObjectLocalStor(e.currentTarget) 

      setReadInLocalStor(arrArticlesFromLocStor, readArticle)
      }
  }

  /////////// імпортувати в файли де рендери сторінок і добавити в код циклу рендеру статей
export {addClickListenerToCard}

