// дублируется
import NewsFetchApi from './newsApi';
const newsFetchApi = new NewsFetchApi();

// дублируется переменная из currentPage.js !
let currentPage = document.querySelector('body').getAttribute('data-current-page'); 
const categsBlockEL = document.querySelector('.wrap__categories')

if (currentPage === "index") {
    document.addEventListener('DOMContentLoaded', getSectionListData)
}

//getSectionListData
async function getSectionListData() {
  try {
    const response = await newsFetchApi.fetchSectionList();
    const { data: { results } } = response;

    // console.log({ results }) 
    const sectionName = results.map(({ section }) => section);
    const displayName = results.map(({ display_name }) => display_name);
    // return { sectionName, displayName };
    createSectionMarkup (sectionName, displayName);
    
  } catch (error) {
    console.log(error);
  }
}

  function createSectionMarkup(sectionName, displayName) {
    let sectionMarkup = '';
  
    // Create 6 buttons for first 6 results
    for (let i = 0; i < 6; i++) {
      sectionMarkup += `<button data-attribute="${sectionName[i]}" class="btn">${displayName[i]}</button>`;
    }
  
    // Create dropdown list for rest of results
    sectionMarkup += '<select>';
    for (let j = 6; j < sectionName.length; j++) {
      sectionMarkup += `<li data-attribute="${sectionName[j]}">${displayName[j]}</li>`;
    }
    sectionMarkup += '</select>';
    console.log(sectionMarkup);
    renderSectionMarkup(sectionMarkup);
  }

function renderSectionMarkup(sectionMarkup) {
  categsBlockEL.innerHTML = sectionMarkup;
};