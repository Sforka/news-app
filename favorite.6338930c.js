var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire7309;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequire7309=o),o("bUb57");var r=o("lMgIy"),i=o("eUZtB"),l=o("1n11p"),c=o("2Fivl");const a=document.querySelector(".news_container"),d=document.querySelector(".without-news_container");document.querySelector(".search_form");let s="";const u=document.querySelector(".switch_input"),m=document.querySelector(".switch_input--mobile"),f=new(0,r.ThemeSwitcher)(u,m);m.addEventListener("change",f.onThemeToggle),u.addEventListener("change",f.onThemeToggle),f.renderTheme();document.querySelector("body").addEventListener("click",c.onAddToFavoritesClick),function(){const e=localStorage.getItem("favorites");if(e){const t=JSON.parse(e),n=Object.keys(t);for(const e of n){const n=t[`${e}`],{abstract:o,published_date:r,section:c,section_name:d,title:u,headline:m,media:f,multimedia:p,url:h,web_url:g,id:w,_id:y,slug_name:_}=n,b=w||y||_,T=(0,i.default)(r),v=c||d,S=u||m.main,q=o,E=h||g;let L;try{L=f[0]["media-metadata"][2].url||"https://www.nytimes.com/"+p[0].url}catch(e){L="https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg"}a.innerHTML=s+=(0,l.default)({publishedDate:T,sectionName:v,articleTitle:S,shortDescription:q,urlOriginalArticle:E,imgUrl:L,articleId:b})}}else d.style.display="block"}();
//# sourceMappingURL=favorite.6338930c.js.map
