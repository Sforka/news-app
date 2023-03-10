import NewsFetchApi from './newsApi';
const newsFetchApi = new NewsFetchApi()

const categRefs = {
currentPage: document.querySelector('body').getAttribute('data-current-page'),
categsBlockEL: document.querySelector('.categories__wrap'),
categsListBtn: null,
sectionButtons: null,
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
  // if
  categRefs.categsListBtn.textContent = buttonText;
}


function nameListButtonByMedia() {
  if (window.matchMedia('(min-width: 768px)').matches && categRefs.buttonsQuantity != 0) {
    
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
//new
categRefs.sectionButtons = document.querySelectorAll('.section-btn');
};


function activeBtnColorHandler(evt) {

  // if (evt.target.matches('.section-btn, .other-btn')) {
  //   const buttons = document.querySelectorAll('.section-btn, .other-btn');
  //   buttons.forEach(button => {
  //     button.classList.remove('btn-active');
  //   });
  //   evt.target.classList.add('btn-active');
  // }
  // classList.remove('show')
};


  // categRefs.categsBlockEL.addEventListener('click', categsListClose);

  // const dropdownContent = document.querySelector(".dropdown-content");

  // dropdownContent.addEventListener("click", categsListClose)
  // function categsListClose(event) {
  //   if (event.target.matches(".dropdown-item")) {
  //     dropdownContent.classList.remove("show");
  //   }
  // };
  
  // document.addEventListener("click", (event) => {
  //   if (!event.target.matches(".other-btn") && !event.target.matches(".dropdown-item")) {
  //     dropdownContent.classList.remove("show");
  //   }
  // });
  
  // const dropdownBtn = document.querySelector(".other-btn");
  
  // dropdownBtn.addEventListener("click", () => {
  //   dropdownContent.classList.toggle("show");
  // });

  function categsListClose(evt) {
   
  // const dropdownBtn = evt.target.closest('.other-btn');
  // const dropdownContent = dropdownBtn && dropdownBtn.nextElementSibling;
  
  // if (dropdownBtn) {
  //   dropdownContent.classList.toggle('dropdown-content-visible');
  // }

  // const dropdownItem = evt.target.closest('dropdown-item');
  
  // if (dropdownItem) {
  //   dropdownContent.classList.remove('dropdown-content-visible');
  // }
};

export {categRefs, getSectionListData, createSectionMarkup, renderSectionMarkup, nameListButtonByClick, activeBtnColorHandler, categsListClose };
