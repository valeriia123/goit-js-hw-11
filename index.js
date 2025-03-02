import{i as n,S as d}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const m=o=>{const r=`
        <b>Likes:</b> ${o.likes} |
        <b>Views:</b> ${o.views} |
        <b>Comments:</b> ${o.comments} |
        <b>Downloads:</b> ${o.downloads}
    `.trim();return`
        <li class="gallery-item">
            <a class="gallery-link" title="${r}" href="${o.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${o.webformatURL}"
                    alt="${r}" 
                    title="${r}"
                />
            </a>
             <div class="gallery-overlay">${r}</div>
        </li>
    `},y=o=>fetch(`https://pixabay.com/api/?key=49122647-aca4436714a1b5873bcd0147f&image_type=photo&orientation=horizontal&safesearch=true&q=${encodeURIComponent(o)}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}),c=document.querySelector(".js-search-form"),l=document.querySelector(".js-gallery"),u=document.querySelector(".js-loader"),h=()=>{u.classList.remove("is-hidden")},f=()=>{u.classList.add("is-hidden")},g=o=>{o.preventDefault();const r=o.currentTarget.elements.user_search.value.trim();if(r===""){n.error({title:"Error",message:"Sorry, search field cannot be empty. Please try again!"});return}h(),y(r).then(s=>{if(s.hits.length===0){n.warning({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),l.innerHTML="",c.reset();return}const a=s.hits.map(t=>m(t)).join("");l.innerHTML=a,new d(".js-gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"}).refresh()}).catch(s=>{n.error({title:"Error",message:"Sorry, something went wrong!"}),console.error(s)}).finally(()=>f())};c.addEventListener("submit",g);
//# sourceMappingURL=index.js.map
