// дублируется вызов и создание экземпляра
import NewsFetchApi from './newsApi';
const newsFetchApi = new NewsFetchApi();

// дублируется переменная из currentPage.js
let currentPage = document.querySelector('body').getAttribute('data-current-page'); 
const categsBlockEL = document.querySelector('.wrap__categories')

if (currentPage === "index") {
    document.addEventListener('DOMContentLoaded', getSectionListData)
    categsBlockEL.addEventListener('click', onCategoryClick)
}

async function getSectionListData() {
  try {
    const response = await newsFetchApi.fetchSectionList();
    const { data: { results } } = response;

    const sectionName = results.map(({ section }) => section);
    const displayName = results.map(({ display_name }) => display_name);

    createSectionMarkup (sectionName, displayName);
    
  } catch (error) {
    console.log(error);
  }
}

  function createSectionMarkup(sectionName, displayName) {
    let sectionMarkup = '';
    // Create 6 buttons for first 6 results
    for (let i = 0; i < 6; i++) {
      sectionMarkup += `<button data-section="${sectionName[i]}" class="section-btn">${displayName[i]}</button>`;
    }
    // Create dropdown list for rest of results
    sectionMarkup += '<div class="dropdown">';
    sectionMarkup += '<button class="other-btn">Other</button>';
    sectionMarkup += '<div class="dropdown-content">';

    for (let j = 6; j < sectionName.length; j++) {
      sectionMarkup += `<button class ="dropdown-item" type='button' data-section="${sectionName[j]}">${displayName[j]}</button>`;
    }

    sectionMarkup += '</div>'
    sectionMarkup += '<div class="dropdown-ruler"></div>'
    sectionMarkup += '</div>';
    renderSectionMarkup(sectionMarkup);
  }

function renderSectionMarkup(sectionMarkup) {
  categsBlockEL.innerHTML = sectionMarkup;
};

function onCategoryClick(e) {
  const target = e.target;

  // проверяем, является ли элемент кнопкой или элементом списка
  if (target.classList.contains('section-btn') || target.classList.contains('dropdown-item')) {
    const section = target.dataset.section;
    // console.log(section);
  // вызываем 
  onCategoryClick(evt)
  }
}
