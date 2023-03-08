import NewsFetchApi from './newsApi';
const newsFetchApi = new NewsFetchApi()

const categRefs = {
currentPage: document.querySelector('body').getAttribute('data-current-page'),
categsBlockEL: document.querySelector('.categories__wrap'),
categsListBtn: null,
newsSection: '',
buttonsQuantity: '0',
listButtonName: 'Categories',
}

async function getSectionListData() {
  try {
    const response = await newsFetchApi.fetchSectionList();
    const { data: { results } } = response;

    const sectionName = results.map(({ section }) => section);
    const displayName = results.map(({ display_name }) => display_name);

    createSectionMarkup (sectionName, displayName);
    
  } catch (error) {
    console.log(error.message);
  }
}

function selectButtonsQuantity() {

  if (window.matchMedia('(min-width: 768px) and (max-width: 1279.98px)').matches) {
    categRefs.buttonsQuantity = 4
  }
  else if (window.matchMedia('(min-width: 1280px)').matches) {
    categRefs.buttonsQuantity = 6
  }
  else {
    categRefs.buttonsQuantity = 0
  }
  return categRefs.buttonsQuantity;
}


function nameListButtonByClick(buttonText){
  categRefs.categsListBtn.textContent = buttonText;
}


function nameListButtonByMedia() {
  if (window.matchMedia('(min-width: 768px)').matches && categRefs.buttonsQuantity != 0) {
    // console.log('у нас не мобилка!')
    categRefs.listButtonName = 'Other'
  }
}

function createSectionMarkup(sectionName, displayName) {
  let sectionMarkup = '';
  selectButtonsQuantity();
  nameListButtonByMedia();

  // Create buttonsQuantity of buttons for first buttonsQuantity results
  for (let i = 0; i < categRefs.buttonsQuantity; i++) {
    sectionMarkup += `<button data-section="${sectionName[i]}" class="section-btn">${displayName[i]}</button>`;
  }
  // Create dropdown list for rest of results
  sectionMarkup += '<div class="dropdown">';
  sectionMarkup += `<button class="other-btn">${categRefs.listButtonName}</button>`;
  sectionMarkup += '<div class="dropdown-content">';

  for (let j = categRefs.buttonsQuantity; j < sectionName.length; j++) {
    sectionMarkup += `<button class ="dropdown-item" type='button' data-section="${sectionName[j]}">${displayName[j]}</button>`;
  }

  sectionMarkup += '</div>'
  sectionMarkup += '<div class="dropdown-ruler"></div>'
  sectionMarkup += '</div>';
  renderSectionMarkup(sectionMarkup);
}

function renderSectionMarkup(sectionMarkup) {
categRefs.categsBlockEL.innerHTML = sectionMarkup;
// Now markup built, we cand find this element 
categRefs.categsListBtn = document.querySelector('.other-btn')
};

export {categRefs, getSectionListData, createSectionMarkup, renderSectionMarkup, nameListButtonByClick };
