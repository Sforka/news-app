!function(){function e(e){return e&&e.__esModule?e.default:e}function t(e){var t=e.publishedDate,n=e.sectionName,r=e.articleTitle,a=e.shortDescription,c=e.urlOriginalArticle,i=e.imgUrl,o=e.articleId,l=a;if(a.length>110){var s=a.indexOf(" ",110);s>0&&(l=a.slice(0,s)+"...")}var u=r;if(r.length>58){var d=r.indexOf(" ",44);d>0&&(u=r.slice(0,d)+"...")}return'\n      <article class="card" id="'.concat(o,'">\n        <div class="card__img-container">\n          <img class="card__img" src="').concat(i,'" alt="').concat(r,'">\n          <p class="card__section-name">\n            ').concat(n,'\n          </p>\n          <button class="card__btn" type="button">\n            Add to favorite <span class="card__btn-heart">&#9825;</span>\n          </button>\n        </div>\n        <h2 class="card__title">\n          ').concat(u,'\n        </h2>\n        <p class="card__text">').concat(l,'</p>\n        <div class="card__bottom">\n          <span class="card__date">\n            ').concat(t,'\n          </span>\n          <a class="card__read-more-search"\n            href="').concat(c,'" target="_blank"\n          >\n            Read more\n          </a>\n        </div>\n      </article>\n    ')}var n=document.querySelector(".search_mob_btn"),r=document.querySelector(".search_form"),a=document.querySelector(".search_input"),c=document.querySelector(".search_btn");n.addEventListener("click",(function(){n.style.display="none",r.style.display="block",a.style.display="block",c.style.display="block"}));var i={};Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var o={};function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e,t,n){t&&l(e.prototype,t);n&&l(e,n);return e};var s={};Object.defineProperty(s,"__esModule",{value:!0}),s.default=function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n;return e};var u=function(){"use strict";function t(n,r){var a=this;e(i)(this,t),e(s)(this,"onThemeToggle",(function(){var e=a.getBoolean();e&&localStorage.setItem(a.THEME_STORAGE_KEY,a.Theme.DARK),e||localStorage.setItem(a.THEME_STORAGE_KEY,a.Theme.LIGHT),a.renderTheme()})),this.themeSwitcherEl=n,this.mobileSwitcherEl=r,this.THEME_STORAGE_KEY="theme",this.Theme={LIGHT:"light",DARK:"dark"}}return e(o)(t,[{key:"renderTheme",value:function(){var e=this.getBoolean();e||(this.themeSwitcherEl.setAttribute("checked",!0),this.mobileSwitcherEl.setAttribute("checked",!0),this.changeBodyClass(this.Theme.DARK,this.Theme.LIGHT)),e&&this.changeBodyClass(this.Theme.LIGHT,this.Theme.DARK)}},{key:"changeBodyClass",value:function(e,t){document.body.classList.add(e),document.body.classList.remove(t)}},{key:"getBoolean",value:function(){var e=localStorage.getItem(this.THEME_STORAGE_KEY);return e===this.Theme.LIGHT||!e}}]),t}(),d=document.querySelector("body").getAttribute("data-current-page");"index"===d?document.querySelector('.nav_link[href="./index.html"]').classList.add("nav_link--current"):"favorite"===d?document.querySelector('.nav_link[href="./favorite.html"]').classList.add("nav_link--current"):"read"===d&&document.querySelector('.nav_link[href="./read.html"]').classList.add("nav_link--current");var h=document.querySelector(".news_container"),m=document.querySelector(".without-news_container"),_=(document.querySelector("body"),document.querySelector(".search_form"),""),f="",y="",v="",b="",g="",T="",p="",S="favorites",E=document.querySelector(".switch_input"),k=document.querySelector(".switch_input--mobile"),w=new u(E,k);function O(e){return function(e){return[q(e.getDate()),q(e.getMonth()+1),e.getFullYear()].join("/")}(new Date(e))}function q(e){return e.toString().padStart(2,"0")}k.addEventListener("change",w.onThemeToggle),E.addEventListener("change",w.onThemeToggle),w.renderTheme(),function(){var e=localStorage.getItem(S);if(e){var n=JSON.parse(e),r=Object.keys(n),a=!0,c=!1,i=void 0;try{for(var o,l=r[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var s=o.value,u=n["".concat(s)],d=u.abstract,E=u.published_date,k=u.section,w=u.title,q=u.media,A=u.url,L=u.id;f=L,y=O(E),v=k,b=w,g=d,T=A;try{p=q[0]["media-metadata"][2].url}catch(e){p="Тут ссылку на заглушку"}h.innerHTML=_+=t({publishedDate:y,sectionName:v,articleTitle:b,shortDescription:g,urlOriginalArticle:T,imgUrl:p,articleId:f})}}catch(e){c=!0,i=e}finally{try{a||null==l.return||l.return()}finally{if(c)throw i}}}else m.style.display="block"}()}();
//# sourceMappingURL=favorite.69175efb.js.map
