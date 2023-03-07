
let arrDateOfRead = [];
let arrUniqueDateOfRead = [];
let arrArticlesPerDate = [];


let fullMarkup = '';
let sectionMarkup = '';
let startSectionMarkup = '';
let blockMarkup = '';
const endSectionMarkup = '</ul></section>'
const STORAGE_READ_KEY = 'read'

//добавити перевірку на пустий масив
function renderPage(arrUniqueDateOfRead){
    if (!favorites) {
        withoutNewsContainer.style.display =
        'block';
    fullMarkup = '';
    arrUniqueDateOfRead.forEach(date => {
    createSectionMarkup(date);
    getArticlesPerDate(date);
    createBlockMarkup(arrArticlesPerDate);
    sectionMarkup = startSectionMarkup + blockMarkup + endSectionMarkup;
    fullMarkup = fullMarkup + sectionMarkup;
    return fullMarkup;
    })
    body.inserAdjacentHTML('beforeend', fullMarkup)
    body.addEventListener('click', onAddToFavoritesClick); 
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
    arr.forEach(({ publishedDate, sectionName,articleTitle, shortDescription, urlOriginalArticle, imgUrl }) => blockMarkup += createmarkup(publishedDate, sectionName,articleTitle, shortDescription, urlOriginalArticle, imgUrl))
return blockMarkup;
}

//===отримання масиву статей з local storage ==========
function getReadArticlesFromLocStor(){
    read = localStorage.getItem(STORAGE_READ_KEY);
  if (!read) {
    withoutNewsContainer.style.display = 'block';
  } else {
    arrArticlesFromLocStor = JSON.parse(read);
    console.log(arrArticlesFromLocStor)
  }
}

  
  //===отримання масиву дат для створення секцій із даних local storage ==========
  //добавити перевірку на пустий масив
  function getUniqeDateOfRead(arr){
    arr.forEach(article => arrDateOfRead.push(article.DateOfRead))
    arrUniqueDateOfRead = arrDateOfRead.filter(getOnlyUniqueArray) 
  return arrUniqueDateOfRead
  }
  
  //===функція фільтрації для function getUniqeDateOfRead(arr) ==========
  function getOnlyUniqueArray(value, index, self) {
  return self.indexOf(value) === index;
  }
  
  //=== створення масиву статей по даті для блоку секції ==========
  function getArticlesPerDate(arr, date){
    arrArticlesPerDate = arr.filter(article => article.DateOfRead === date)
    return arrArticlesPerDate;
  }

  export { getReadArticlesFromLocStor } 