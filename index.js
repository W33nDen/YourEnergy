var h=s=>{throw TypeError(s)};var v=(s,e,t)=>e.has(s)||h("Cannot "+t);var L=(s,e,t)=>(v(s,e,"read from private field"),t?t.call(s):e.get(s)),m=(s,e,t)=>e.has(s)?h("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t);var l=(s,e,t)=>(v(s,e,"access private method"),t);/* empty css                      */(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();var f,c,d;class y{constructor(){m(this,c);m(this,f,"https://your-energy.b.goit.study/api")}async getQuote(){return l(this,c,d).call(this,"/quote")}async getFilters(e="Muscles",t=1,n=12){const r=new URLSearchParams({filter:e,page:t,limit:n});return l(this,c,d).call(this,`/filters?${r}`)}async getExercises({bodypart:e="",muscles:t="",equipment:n="",keyword:r="",page:a=1,limit:i=10}={}){const o=new URLSearchParams({page:a,limit:i});return e&&o.append("bodypart",e),t&&o.append("muscles",t),n&&o.append("equipment",n),r&&o.append("keyword",r),l(this,c,d).call(this,`/exercises?${o}`)}async getExerciseById(e){return l(this,c,d).call(this,`/exercises/${e}`)}async patchRating(e,t){return l(this,c,d).call(this,`/exercises/${e}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async createSubscription(e){return l(this,c,d).call(this,"/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})})}}f=new WeakMap,c=new WeakSet,d=async function(e,t={}){const n=`${L(this,f)}${e}`;try{const r=await fetch(n,t);if(!r.ok)throw new Error(`API Error: ${r.status} ${r.statusText}`);return await r.json()}catch(r){throw console.error(`Request failed: ${n}`,r),r}};const $=(s,e)=>{try{const t=JSON.stringify(e);localStorage.setItem(s,t)}catch(t){console.error("Set state error: ",t.message)}},E=s=>{try{const e=localStorage.getItem(s);return e===null?void 0:JSON.parse(e)}catch(e){console.error("Get state error: ",e.message)}},b=new y,g=document.getElementById("exercises-container"),x=document.getElementById("search-form"),S=document.querySelector(".exercises-title"),C={"Body parts":"bodypart",Muscles:"muscles",Equipment:"equipment"};async function T(s,e){S.innerHTML=`Exercises / <span class="breadcrumbs">${s}</span> / <span class="breadcrumbs-current">${e}</span>`,x&&x.classList.remove("hidden"),g.innerHTML='<p class="loader-text">Loading exercises...</p>';try{const n={[C[s]]:e.toLowerCase(),page:1,limit:10},r=await b.getExercises(n);if(!r.results||r.results.length===0){g.innerHTML='<p class="loader-text">No exercises found.</p>';return}q(r.results)}catch(t){console.error(t),g.innerHTML='<p class="loader-text" style="color: red">Error loading exercises.</p>'}}function q(s){const e=s.map(t=>`
    <div class="exercise-card">
      <div class="exercise-top">
        <div class="workout-badge">WORKOUT</div>
        <div class="rating-wrap">
          <span class="rating-value">${t.rating.toFixed(1)}</span>
          <svg class="rating-icon" width="18" height="18">
            <use href="./img/sprite.svg#icon-star"></use>
          </svg>
        </div>
        <button class="start-btn" type="button" data-id="${t._id}">
          Start
          <svg width="16" height="16" stroke="currentColor">
            <use href="./img/sprite.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="exercise-title-box">
        <div class="icon-run-wrapper">
           <svg class="icon-run" width="14" height="16">
            <use href="./img/sprite.svg#icon-run"></use>
          </svg>
        </div>
        <h3 class="exercise-name">${t.name}</h3>
      </div>

      <ul class="exercise-details">
        <li class="detail-item">Burned calories: <span class="detail-value">${t.burnedCalories} / ${t.time} min</span></li>
        <li class="detail-item">Body part: <span class="detail-value">${t.bodyPart}</span></li>
        <li class="detail-item">Target: <span class="detail-value">${t.target}</span></li>
      </ul>
    </div>
  `).join("");g.innerHTML=e}const M=new y,u={filtersList:document.querySelector(".filters-list"),exercisesContainer:document.getElementById("exercises-container"),pagination:document.getElementById("pagination")};let p={filter:"Muscles",page:1,limit:12};async function I(){u.filtersList&&(u.filtersList.addEventListener("click",O),u.exercisesContainer.addEventListener("click",P),await w())}async function O(s){var t;const e=s.target.closest(".filters-btn");e&&(e.classList.contains("active")||((t=document.querySelector(".filters-btn.active"))==null||t.classList.remove("active"),e.classList.add("active"),p.filter=e.dataset.filter,p.page=1,await w()))}async function w(){u.exercisesContainer.innerHTML='<p class="loader-text">Loading categories...</p>';try{const s=await M.getFilters(p.filter,p.page,p.limit);if(s.results.length===0){u.exercisesContainer.innerHTML='<p class="loader-text">Nothing found.</p>';return}B(s.results)}catch(s){console.error(s),u.exercisesContainer.innerHTML='<p class="loader-text" style="color: red">Something went wrong. Try reloading the page.</p>'}}async function P(s){const e=s.target.closest(".category-card");if(!e)return;const{filter:t,name:n}=e.dataset;await T(t,n)}function B(s){const e=s.map(t=>`
    <div class="category-card" 
         data-name="${t.name}" 
         data-filter="${t.filter}">
      <img class="category-img" src="${t.imgURL}" alt="${t.name}" loading="lazy">
      <div class="category-info">
        <h3 class="category-title">${t.name}</h3>
        <p class="category-filter">${t.filter}</p>
      </div>
    </div>
  `).join("");u.exercisesContainer.innerHTML=`<div class="categories-list">${e}</div>`}const N=new y;async function F(){const s=document.getElementById("quote-wrapper"),e=document.getElementById("quote-text"),t=document.getElementById("quote-author");if(!s)return;const n=new Date().toDateString(),r=E("quote");if(r&&r.date===n)console.log("Quote loaded from cache"),a(r);else try{console.log("Fetching new quote...");const o={...await N.getQuote(),date:n};$("quote",o),a(o)}catch(i){console.error("Failed to fetch quote:",i)}function a({quote:i,author:o}){e.textContent=i,t.textContent=o,s.classList.remove("hidden")}}document.addEventListener("DOMContentLoaded",()=>{F(),I()});
//# sourceMappingURL=index.js.map
