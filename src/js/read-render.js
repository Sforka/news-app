import {addClickListenerToCard} from "./read-localstorage";
let arrDateOfRead = [];
let arrUniqueDateOfRead = [];
// let arrArticlesPerDate = [];
let arrArticlesPerDate = [ {articleId: "100000008796668",
articleTitle: "Inside the Panic at Fox News After the 2020 Election",
dateOfReading: "6/3/2023",
imgUrl: "https://static01.nyt.com/images/2023/03/04/multimedia/04dc-foxnews-topart-01-wlfc/04dc-foxnews-topart-01-wlfc-mediumThreeByTwo440.jpg",
publishedDate: "04/03/2023",
sectionName: "U.S.",
shortDescription: "“If we hadn’t called Arizona,” said Suzanne Scott, the network’s chief executive, according to a recording reviewed...",
urlOriginalArticle: "https://www.nytimes.com/2023/03/04/us/politics/panic-fox-news-2020-election.html",
}];


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


let fullMarkup = '';
let sectionMarkup = '';
let startSectionMarkup = '';
let blockMarkup = '';
const endSectionMarkup = '</ul></section>'

const body = document.querySelector('body');


//добавити перевірку на пустий масив
function renderPage(arrUniqueDateOfRead){
    if (!arrUniqueDateOfRead) {
      console.log("немаэ ще");
    } else {
    fullMarkup = '';
    arrUniqueDateOfRead.forEach(date => {
    console.log("дата в ітерації", date)
    createSectionMarkup(date);
    getArticlesPerDate(arrArticlesFromLocStor, date);
    createBlockMarkup(arrArticlesPerDate);
    sectionMarkup = startSectionMarkup + blockMarkup + endSectionMarkup;
    fullMarkup = fullMarkup + sectionMarkup;
    return fullMarkup;
    })
    body.insertAdjacentHTML('beforeend', fullMarkup);
    // body.addEventListener('click', onAddToFavoritesClick); 
    addClickListenerToCard()
    }
}

function createSectionMarkup(date){
    startSectionMarkup = `
    <section class = "secction"
    <div class = "section-title">
    <p class = "section-title"__text>${date}</p>
    <svg class="section-title__icon" width="12" height="8">
        <use href="./images/symbol-defs.svg#"icon-Vector-Down"></use>
    </svg>
    </div>
    <ul class = "article-list>`
    return startSectionMarkup;
}

function createBlockMarkup(arr){
  console.log(arr);
    arr.forEach(({ publishedDate, sectionName,articleTitle, shortDescription, urlOriginalArticle, imgUrl }) => blockMarkup += createmarkup(publishedDate, sectionName,articleTitle, shortDescription, urlOriginalArticle, imgUrl))

    return blockMarkup;
}

//===отримання масиву статей з local storage ==========
function getReadArticlesFromLocStor(){
  const STORAGE_READ_KEY = 'read';
    read = localStorage.getItem(STORAGE_READ_KEY);
  if (!read) {
    return
  } else {
    arrArticlesFromLocStor = JSON.parse(read);
    console.log("консоль з функції getReadArticlesFromLocStor", arrArticlesFromLocStor)
    return arrArticlesFromLocStor;
  }

}

   //===отримання масиву дат для створення секцій із даних local storage ==========
function getUniqeDateOfRead(arr){
    if (!arr) {
      console.log("немаэ ще")
    } else {
    arr.forEach(article => arrDateOfRead.push(article.dateOfReading))
    arrUniqueDateOfRead = arrDateOfRead.filter(getOnlyUniqueArray) 
    console.log("консоль з функції getUniqeDateOfRead", arrUniqueDateOfRead)
    return arrUniqueDateOfRead
  }
}
  
  //===функція фільтрації для function getUniqeDateOfRead(arr) ==========
  function getOnlyUniqueArray(value, index, self) {
  return self.indexOf(value) === index;
  }
  
  //=== створення масиву статей по даті для блоку секції ==========
  function getArticlesPerDate(arr, date){

    arrArticlesPerDate = arr.filter(article => article.DateOfRead === date)
    console.log("консоль з функції arrArticlesPerDate", arrArticlesPerDate)
    return arrArticlesPerDate;
  }

  export { getReadArticlesFromLocStor, renderPage, getUniqeDateOfRead, getArticlesPerDate} 