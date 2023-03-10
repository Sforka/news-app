function e(e){return e&&e.__esModule?e.default:e}let t="fav-icon-add";function n({publishedDate:e,sectionName:n,articleTitle:a,shortDescription:r,urlOriginalArticle:c,imgUrl:i,articleId:s}){let o=r;if(r.length>110){const e=r.indexOf(" ",110);e>0&&(o=r.slice(0,e)+"...")}let l=a;if(a.length>58){const e=a.indexOf(" ",44);e>0&&(l=a.slice(0,e)+"...")}let d="Add to favorites";const u=localStorage.getItem("favorites");if(u){const e=JSON.parse(u),n=Object.keys(e);for(const a of n){const n=e[`${a}`],{id:r,_id:c,slug_name:i}=n;s===(r||c||i)?(d="Remove from favorites",t="fav-icon-remove"):t="fav-icon-add"}}return`\n      <article class="card" id="${s}">\n\n        <div class="card__img-container" >\n          <div class="card__blur" id_card="${s}">\n            <p class="card__already-read">\n              Already read ✓\n            </p>\n            </div>\n          <img class="card__img" src="${i}" alt="${a}">\n          <p class="card__section-name">\n            ${n}\n          </p>\n          <button class="card__btn" type="button">\n           ${d}\n          </button>\n          ${`<svg class="fav-icon ${t}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95C22 5.216 19.761 3 17 3s-5 3-5 3s-2.239-3-5-3Z"/></svg>`}\n        </div>\n        <h2 class="card__title">\n          ${l}\n        </h2>\n        <p class="card__text">${o}</p>\n        <div class="card__bottom">\n          <span class="card__date">\n            ${e}\n          </span>\n          <a class="card__read-more-search"\n            href="${c}" target="_blank"\n          >\n            Read more\n          </a>\n        </div>\n      </article>\n    `}document.querySelector(".search_mob_btn"),document.querySelector(".search_form"),document.querySelector(".search_input"),document.querySelector(".search_btn");var a={};Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n;return e};function r(e){return function(e){return[c(e.getDate()),c(e.getMonth()+1),e.getFullYear()].join("/")}(new Date(e))}function c(e){return e.toString().padStart(2,"0")}function i({resultsArr:e,clickedArticleId:t,evt:n}){const a="favorites";e.forEach((e=>{if(e.id==t||e.slug_name==t||e._id==t){let r=localStorage.getItem(a);if(r=r?JSON.parse(r):{},r[t]){delete r[`${t}`];return"Remove from favorites"===n.target.textContent.trim()&&(n.target.textContent="Add to favorites"),void localStorage.setItem(a,JSON.stringify(r))}r[t]=e,localStorage.setItem(a,JSON.stringify(r))}}))}function s({resultsArr:e,clickedArticleId:t,evt:n}){const a="read";e.forEach((e=>{if(e.id==t||e.slug_name==t||e._id==t){let n=localStorage.getItem(a);n=n?JSON.parse(n):{},e.dateOfReading=function(){const e=(new Date).getDate(),t=(new Date).getMonth()+1,n=(new Date).getFullYear();return`${e}/${t}/${n}`}(),n[t]=e,localStorage.setItem(a,JSON.stringify(n))}}))}document.querySelector(".news_container");const o=document.querySelector("body"),l=(document.querySelector(".body"),document.querySelector(".search_form"),document.querySelector(".without-news_container"));let d=[],u=[],h=[],g=[],m="",f="",_="",b="",v="";function y(e,t,n){return n.indexOf(e)===t}!function(){if(m=localStorage.getItem("read"),m){!function(e){const t=e,n=Object.keys(t);for(const e of n){const n=t[`${e}`];g.push(n);const{abstract:a,published_date:r,pub_date:c,section:i,section_name:s,title:o,headline:l,media:h,multimedia:m,url:f,web_url:_,id:b,_id:v,slug_name:S,dateOfReading:p}=n;g.forEach((e=>{d.push(e.dateOfReading)})),u=d.filter(y)}}(JSON.parse(m))}else l.style.display="block"}(),function(e){m||(l.style.display="block");f="",e.forEach((e=>(function(e){b=`\n    <section class = "section_read container"\n    <div class = "section-title container">\n    \n    <label class="checkbox-btn checkbox">\n  <input type="checkbox">\n  <span class="btn-label">${e} <svg class=" date-list__btn-icon" width="14" height="9" aria-hidden="true" style="position: absolute;>\n  <symbol id="icon-vector-2-1"="" viewBox="0 0 50 32">\n  <path d="M5.867 0l-5.867 6.080 24.889 25.92 24.889-25.92-5.831-6.080-19.058 19.769-19.058-19.769z"></path>\n  </svg></button></span>\n  <div class="under_line"></div>\n\n    <div class = "news_container popup">`}(e),function(e){h=g.filter((t=>t.dateOfReading==e))}(e),function(e){const t=e,a=Object.keys(t);for(const e of a){const a=t[`${e}`];[].push(a);const{abstract:c,published_date:i,pub_date:s,section:o,section_name:l,title:d,headline:u,media:h,multimedia:g,url:m,web_url:f,id:_,_id:b,slug_name:y,dateOfReading:S}=a,p=_||b||y,E=r(i||s),T=o||l,w=d||u.main,A=c,k=m||f;let O="";try{p===_&&(O=h[0]["media-metadata"][2].url),p===y&&(O=g[2].url),p===b&&(O="https://www.nytimes.com/"+g[0].url)}catch(e){O="https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg"}v+=n({publishedDate:E,sectionName:T,articleTitle:w,shortDescription:A,urlOriginalArticle:k,imgUrl:O,articleId:p})}}(h),_=b+v+"</ul></label> </section>",f+=_,v="",f)))}(u),o.insertAdjacentHTML("beforeend",f);const S=document.querySelector(".switch_input"),p=document.querySelector(".switch_input--mobile"),E=new class{renderTheme(){const e=this.getBoolean();e||(this.themeSwitcherEl.setAttribute("checked",!0),this.mobileSwitcherEl.setAttribute("checked",!0),this.changeBodyClass(this.Theme.DARK,this.Theme.LIGHT),"index"===this.currentPage&&(this.dataSelected.style.color="#F4F4F4",this.dataSelected.style.backgroundColor="#2E2E2E",console.log(this.dataSelected.style.backgroundColor),this.dateField.style.backgroundColor="#2E2E2E")),e&&(this.changeBodyClass(this.Theme.LIGHT,this.Theme.DARK),"index"===this.currentPage&&(this.dataSelected.style.color="#111321",this.dataSelected.style.backgroundColor="#F4F4F4",this.dateField.style.backgroundColor="#F4F4F4"))}changeBodyClass(e,t){document.body.classList.add(e),document.body.classList.remove(t)}getBoolean(){const e=localStorage.getItem(this.THEME_STORAGE_KEY);return e===this.Theme.LIGHT||!e}constructor(t,n){e(a)(this,"onThemeToggle",(()=>{const e=this.getBoolean();e&&localStorage.setItem(this.THEME_STORAGE_KEY,this.Theme.DARK),e||localStorage.setItem(this.THEME_STORAGE_KEY,this.Theme.LIGHT),this.renderTheme()})),this.themeSwitcherEl=t,this.mobileSwitcherEl=n,this.dateField=document.querySelector(".date-field"),this.dataSelected=document.querySelector(".data_selected"),this.currentPage=document.querySelector("body").getAttribute("data-current-page"),this.THEME_STORAGE_KEY="theme",this.Theme={LIGHT:"light",DARK:"dark"}}}(S,p);p.addEventListener("change",E.onThemeToggle),S.addEventListener("change",E.onThemeToggle),E.renderTheme(),o.addEventListener("click",(function(e){if("card__btn"===e.target.className){const t=e.target.closest(".card")?.id||e.target.closest(".card")?.slug_name||e.target.closest(".card")?._id;"Add to favorites"===e.target.textContent.trim()?(e.target.nextElementSibling.classList.remove("fav-icon-add"),e.target.nextElementSibling.classList.add("fav-icon-remove"),e.target.textContent="Remove from favorites"):(e.target.nextElementSibling.classList.remove("fav-icon-remove"),e.target.nextElementSibling.classList.add("fav-icon-add"),e.target.textContent="Add to favorites");i({resultsArr:g,clickedArticleId:t,evt:e})}})),o.addEventListener("click",(function(e){if("card__read-more-search"===e.target.className){const t=e.target.closest(".card")?.id||e.target.closest(".card")?.slug_name||e.target.closest(".card")?._id,n=g;document.querySelector(`[id_card="${t}"]`).style.display="block",s({resultsArr:n,clickedArticleId:t,evt:e})}}));
//# sourceMappingURL=read.0369dad8.js.map