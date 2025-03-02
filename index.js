import{i as n,S as m}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const d=t=>{const o=`
        <b>Likes:</b> ${t.likes} |
        <b>Views:</b> ${t.views} |
        <b>Comments:</b> ${t.comments} |
        <b>Downloads:</b> ${t.downloads}
    `.trim();return`
        <li class="gallery-item">
            <a class="gallery-link" href="${t.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${t.webformatURL}"
                    alt="${o}" 
                />
            </a>
        </li>
    `},h=t=>fetch(`https://pixabay.com/api/?key=49122647-aca4436714a1b5873bcd0147f&image_type=photo&orientation=horizontal&safesearch=true&q=${encodeURIComponent(t)}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()}),l=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),u=document.querySelector(".js-loader"),y=()=>{u.classList.remove("is-hidden")},f=()=>{u.classList.add("is-hidden")},g=t=>{t.preventDefault();const o=t.currentTarget.elements.user_search.value.trim();if(o===""){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}y(),h(o).then(s=>{if(s.hits.length===0){n.warning({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),c.innerHTML="",l.reset();return}const a=s.hits.map(r=>d(r)).join("");c.innerHTML=a,new m(".js-gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"}).refresh()}).catch(s=>{n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),console.error(s)}).finally(()=>f())};l.addEventListener("submit",g);
//# sourceMappingURL=index.js.map
