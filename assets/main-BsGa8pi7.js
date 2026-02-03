var A=t=>{throw TypeError(t)};var R=(t,a,e)=>a.has(t)||A("Cannot "+e);var _=(t,a,e)=>(R(t,a,"read from private field"),e?e.call(t):a.get(t)),$=(t,a,e)=>a.has(t)?A("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,e);var f=(t,a,e)=>(R(t,a,"access private method"),e);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const X=()=>{var n,s,r,c;const t=window.location.pathname,a=document.querySelectorAll(".nav-link"),e=document.querySelectorAll(".mobile-nav-link");[...a,...e].forEach(p=>{p.classList.remove("active")}),t.includes("favorites")?((n=a[1])==null||n.classList.add("active"),(s=e[1])==null||s.classList.add("active")):((r=a[0])==null||r.classList.add("active"),(c=e[0])==null||c.classList.add("active"))},N=document.querySelector("[data-menu-open]"),O=document.querySelector("[data-menu-close]"),q=document.querySelector("[data-menu]");N&&O&&q&&(N.addEventListener("click",()=>{q.classList.add("is-open")}),O.addEventListener("click",()=>{q.classList.remove("is-open")}));X();var M,u,v;class w{constructor(){$(this,u);$(this,M,"https://your-energy.b.goit.study/api")}async getQuote(){return f(this,u,v).call(this,"/quote")}async getFilters(a="Muscles",e=1,n=12){const s=new URLSearchParams({filter:a,page:e,limit:n});return f(this,u,v).call(this,`/filters?${s}`)}async getExercises({bodypart:a="",muscles:e="",equipment:n="",keyword:s="",page:r=1,limit:c=10}={}){const p=new URLSearchParams({page:r,limit:c});return a&&p.append("bodypart",a),e&&p.append("muscles",e),n&&p.append("equipment",n),s&&p.append("keyword",s),f(this,u,v).call(this,`/exercises?${p}`)}async getExerciseById(a){return f(this,u,v).call(this,`/exercises/${a}`)}async patchRating(a,e){return f(this,u,v).call(this,`/exercises/${a}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async createSubscription(a){return f(this,u,v).call(this,"/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a})})}}M=new WeakMap,u=new WeakSet,v=async function(a,e={}){const n=`${_(this,M)}${a}`;try{const s=await fetch(n,e);if(!s.ok){const r=new Error(`API Error: ${s.status} ${s.statusText}`);throw r.status=s.status,r}return await s.json()}catch(s){throw s}};const ee=new w,W="yourEnergy_quote";function j(){return new Date().toISOString().split("T")[0]}function te(){try{const t=localStorage.getItem(W);if(!t)return null;const{date:a,quote:e,author:n}=JSON.parse(t);return a===j()?{quote:e,author:n}:null}catch{return null}}function ae(t,a){try{const e={date:j(),quote:t,author:a};localStorage.setItem(W,JSON.stringify(e))}catch{}}async function se(){const t=document.getElementById("quote-wrapper");if(t)try{const a=te();let e;a?e=a:(e=await ee.getQuote(),ae(e.quote,e.author));const n=document.getElementById("quote-text"),s=document.getElementById("quote-author");n&&s&&(n.textContent=e.quote,s.textContent=e.author,t.classList.remove("hidden"))}catch{const e=document.getElementById("quote-text"),n=document.getElementById("quote-author");e&&n&&(e.textContent="The only bad workout is the one that didn't happen.",n.textContent="Unknown",t.classList.remove("hidden"))}}function z(t,a,e=1){if(a<=1){t.innerHTML="";return}let n="";for(let s=1;s<=a;s++)s===1||s===a||s>=e-2&&s<=e+2?n+=`
        <button class="pagination-btn ${s===e?"active":""}" type="button" data-page="${s}">
          ${s}
        </button>
      `:(s===e-3&&e>4||s===e+3&&e<a-3)&&(n+='<span class="pagination-dots">...</span>');t.innerHTML=n}const ne=new w,E=document.getElementById("exercises-container"),b=document.getElementById("pagination"),y=document.getElementById("search-form"),Y=document.querySelector(".exercises-title");b&&b.addEventListener("click",ce);let l={filter:"",name:"",keyword:"",page:1,limit:10};const ie={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};async function re(t,a){const e=document.getElementById("current-category"),n=document.querySelector(".exercises-category-separator");e&&(e.textContent=a),n&&n.classList.add("visible"),y&&(y.classList.remove("hidden"),y.classList.add("visible"),y.reset(),y.removeEventListener("submit",D),y.addEventListener("submit",D)),l.filter=t,l.name=a,l.keyword="",l.page=1,await T()}async function T(){if(E){E.innerHTML='<p class="loader-text">Loading exercises...</p>',b&&(b.innerHTML="");try{const a={[ie[l.filter]]:l.name.toLowerCase(),page:l.page,limit:l.limit};l.keyword&&(a.keyword=l.keyword);const e=await ne.getExercises(a);if(!e.results||e.results.length===0){E.innerHTML='<p class="loader-text">No exercises found for this category.</p>';return}oe(e.results),b&&z(b,e.totalPages,Number(e.page))}catch{E.innerHTML='<p class="loader-text" style="color: red">Failed to load exercises. Please try again.</p>'}}}function oe(t){const a=t.map(e=>`
    <li class="exercise-card" data-id="${e._id}">
      <!-- Header: Badge + Rating | Start button -->
      <div class="exercise-header">
        <div class="exercise-header-left">
          <span class="workout-badge">WORKOUT</span>
          <div class="rating-wrap">
            <span class="rating-value">${e.rating.toFixed(1)}</span>
            <svg class="rating-icon" width="14" height="14">
              <use href="/YourEnergy/sprite.svg#icon-star"></use>
            </svg>
          </div>
        </div>
        <button class="start-btn" type="button" data-id="${e._id}">
          Start
          <svg width="16" height="16">
            <use href="/YourEnergy/sprite.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>
      
      <!-- Title with icon -->
      <div class="exercise-title-box">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="14" height="14">
            <use href="/YourEnergy/sprite.svg#icon-run"></use>
          </svg>
        </div>
        <h3 class="exercise-name">${e.name}</h3>
      </div>
      
      <!-- Details row -->
      <ul class="exercise-details">
        <li class="detail-item"><span class="detail-label">Burned calories:</span> <span class="detail-value">${e.burnedCalories} / ${e.time} min</span></li>
        <li class="detail-item"><span class="detail-label">Body part:</span> <span class="detail-value">${e.bodyPart}</span></li>
        <li class="detail-item"><span class="detail-label">Target:</span> <span class="detail-value">${e.target}</span></li>
      </ul>
    </li>
  `).join("");E.innerHTML=`<ul class="exercises-list">${a}</ul>`}function ce(t){const a=t.target.closest(".pagination-btn");if(!a)return;const e=Number(a.dataset.page);e!==l.page&&(l.page=e,T(),Y&&Y.scrollIntoView({behavior:"smooth"}))}async function D(t){t.preventDefault();const e=t.currentTarget.elements.keyword.value.trim();l.keyword=e,l.page=1,await T()}const le=new w,o={filtersList:document.getElementById("filters-list"),exercisesContainer:document.getElementById("exercises-container"),pagination:document.getElementById("pagination"),currentCategory:document.getElementById("current-category"),categorySeparator:document.querySelector(".exercises-category-separator"),searchForm:document.getElementById("search-form")};let h={filter:"Muscles",page:1,limit:12};async function de(){o.filtersList&&(o.filtersList.addEventListener("click",ue),o.exercisesContainer.addEventListener("click",me),o.pagination&&o.pagination.addEventListener("click",ge),await I())}async function ue(t){var e;const a=t.target.closest(".filters-btn");a&&(a.classList.contains("active")||((e=document.querySelector(".filters-btn.active"))==null||e.classList.remove("active"),a.classList.add("active"),o.currentCategory&&(o.currentCategory.textContent=""),o.categorySeparator&&o.categorySeparator.classList.remove("visible"),o.searchForm&&o.searchForm.classList.remove("visible"),h.filter=a.dataset.filter,h.page=1,await I()))}async function ge(t){const a=t.target.closest(".pagination-btn");if(!a)return;const e=Number(a.dataset.page);e!==h.page&&(h.page=e,await I())}async function I(){o.exercisesContainer.innerHTML='<p class="loader-text">Loading categories...</p>';try{const t=await le.getFilters(h.filter,h.page,h.limit);if(t.results.length===0){o.exercisesContainer.innerHTML='<p class="loader-text">Nothing found.</p>',o.pagination.innerHTML="";return}pe(t.results),z(o.pagination,t.totalPages,Number(t.page))}catch{o.exercisesContainer.innerHTML='<p class="loader-text" style="color: red">Something went wrong. Try reloading page.</p>',o.pagination.innerHTML=""}}async function me(t){const a=t.target.closest(".category-card");if(!a)return;const{filter:e,name:n}=a.dataset;o.pagination.innerHTML="",await re(e,n)}function pe(t){const a=t.map(e=>`
    <li class="category-card" 
         data-name="${e.name}" 
         data-filter="${e.filter}">
      <img class="category-img" src="${e.imgURL}" alt="${e.name}" loading="lazy">
      <div class="category-info">
        <h3 class="category-title">${e.name}</h3>
        <p class="category-filter">${e.filter}</p>
      </div>
    </li>
  `).join("");o.exercisesContainer.innerHTML=`<ul class="categories-list">${a}</ul>`}function d(t,a="success"){const e=document.createElement("div");e.className=`toast ${a}`,e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.classList.add("show")},100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}const fe=new w,x=document.getElementById("subscribe-form");function ve(){x&&x.addEventListener("submit",he)}async function he(t){t.preventDefault();const e=x.elements.email.value.trim();if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)){d("Please enter a valid email address.","error");return}try{await fe.createSubscription(e),d("We're excited to have you on board!","success"),x.reset()}catch(s){s.status===409?d("You are already subscribed to our updates!","info"):s.status===400?d("Invalid email format. Please check and try again.","error"):d("Something went wrong. Please try again later.","error")}}const k=(t,a)=>{try{const e=JSON.stringify(a);localStorage.setItem(t,e)}catch{}},S=t=>{try{const a=localStorage.getItem(t);return a===null?void 0:JSON.parse(a)}catch{}},F="favorites";function H(){return S(F)||[]}function ye(t){const a=H();a.some(e=>e._id===t._id)||(a.push(t),k(F,a))}function be(t){const e=H().filter(n=>n._id!==t);k(F,e)}function J(t){return H().some(e=>e._id===t)}const K=new w,i={exerciseModalBackdrop:document.querySelector("[data-modal]"),exerciseModalContent:document.getElementById("exercise-modal-content"),exerciseModalCloseBtn:document.querySelector("[data-modal-close]"),ratingModalBackdrop:document.querySelector("[data-rating-modal]"),ratingModalContent:document.getElementById("rating-modal-content"),ratingModalCloseBtn:document.querySelector("[data-rating-modal-close]"),ratingForm:document.getElementById("rating-form"),ratingStars:document.getElementById("rating-stars"),ratingValueSpan:document.querySelector(".rating-value"),exercisesContainer:document.getElementById("exercises-container"),favoritesContainer:document.getElementById("favorites-container")};let m=null,L=0;function V(){i.exercisesContainer&&i.exercisesContainer.addEventListener("click",U),i.favoritesContainer&&i.favoritesContainer.addEventListener("click",U),i.exerciseModalCloseBtn&&i.exerciseModalCloseBtn.addEventListener("click",P),i.ratingModalCloseBtn&&i.ratingModalCloseBtn.addEventListener("click",B),i.ratingStars&&i.ratingStars.addEventListener("click",ke),i.ratingForm&&i.ratingForm.addEventListener("submit",Se),i.exerciseModalBackdrop&&i.exerciseModalBackdrop.addEventListener("click",Q),i.ratingModalBackdrop&&i.ratingModalBackdrop.addEventListener("click",Q)}function Q(t){t.target===i.exerciseModalBackdrop&&P(),t.target===i.ratingModalBackdrop&&B()}function C(t){t.key==="Escape"&&(i.exerciseModalBackdrop.classList.contains("is-hidden")||P(),i.ratingModalBackdrop.classList.contains("is-hidden")||B())}async function U(t){const a=t.target.closest(".start-btn");if(!a)return;const e=a.dataset.id;e&&await Le(e)}async function Le(t){m=t,i.exerciseModalContent.innerHTML='<p class="loader-text">Loading exercise details...</p>',i.exerciseModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",C);try{const a=await K.getExerciseById(t);Ee(a)}catch{i.exerciseModalContent.innerHTML='<p class="loader-text" style="color: red">Failed to load exercise details.</p>'}}function P(){i.exerciseModalBackdrop.classList.add("is-hidden"),i.exerciseModalContent.innerHTML="",m=null,document.body.style.overflow="",i.ratingModalBackdrop.classList.contains("is-hidden")&&document.removeEventListener("keydown",C)}function we(t){let a="";const e=Math.floor(t),n=t%1!==0;for(let s=0;s<5;s++)s<e?a+='<svg class="star-icon filled" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>';return a}function Ee(t){const e=J(t._id)?"Remove from favorites":"Add to favorites",n=`
    <div class="modal-exercise-card">
      <!-- Left Column: Image -->
      <div class="modal-image-wrap">
        <img class="modal-exercise-img" src="${t.gifUrl}" alt="${t.name}">
      </div>
      
      <!-- Right Column: Content -->
      <div class="modal-exercise-info">
        <h3 class="modal-exercise-name">${t.name}</h3>
        <div class="modal-rating-wrap">
          <span class="modal-rating-value">${t.rating.toFixed(1)}</span>
          <div class="modal-stars">
            ${we(t.rating)}
          </div>
        </div>
        
        <!-- Stats Grid -->
        <div class="modal-stats-grid">
          <div class="modal-stat-item">
            <span class="modal-stat-label">Target</span>
            <span class="modal-stat-value">${t.target}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Body Part</span>
            <span class="modal-stat-value">${t.bodyPart}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Equipment</span>
            <span class="modal-stat-value">${t.equipment}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Popular</span>
            <span class="modal-stat-value">${t.popularity}</span>
          </div>
        </div>
        
        <!-- Burned Calories - Separate -->
        <div class="modal-calories">
          <span class="modal-calories-label">Burned calories</span>
          <span class="modal-calories-value">${t.burnedCalories}/${t.time} min</span>
        </div>
        
        <!-- Description -->
        <p class="modal-exercise-description">${t.description}</p>
        
        <!-- Buttons -->
        <div class="modal-buttons">
          <button class="add-to-favorites-btn" type="button" data-id="${t._id}">
            ${e}
            <svg class="heart-icon" width="18" height="18">
              <use href="/YourEnergy/sprite.svg#icon-heart"></use>
            </svg>
          </button>
          <button class="give-rating-btn" type="button" data-id="${t._id}">Give a rating</button>
        </div>
      </div>
    </div>
  `;i.exerciseModalContent.innerHTML=n;const s=i.exerciseModalContent.querySelector(".give-rating-btn");s&&s.addEventListener("click",Me);const r=i.exerciseModalContent.querySelector(".add-to-favorites-btn");r&&r.addEventListener("click",()=>xe(t,r))}function xe(t,a){const e=J(t._id),n='<svg class="heart-icon" width="18" height="18"><use href="/YourEnergy/sprite.svg#icon-heart"></use></svg>';e?(be(t._id),d("Removed from favorites","success"),a.innerHTML=`Add to favorites ${n}`):(ye(t),d("Added to favorites!","success"),a.innerHTML=`Remove from favorites ${n}`)}function Me(){if(!m)return;const t=m;i.exerciseModalBackdrop.classList.add("is-hidden"),i.exerciseModalContent.innerHTML="",m=t,i.ratingModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",L=0,G(),i.ratingForm.reset(),document.addEventListener("keydown",C)}function B(){i.ratingModalBackdrop.classList.add("is-hidden"),m=null,document.body.style.overflow="",document.removeEventListener("keydown",C)}function ke(t){const a=t.target.closest(".star-icon");a&&(L=parseInt(a.dataset.rating),G())}function G(){const t=i.ratingStars.querySelectorAll(".star-icon");i.ratingValueSpan.textContent=L.toFixed(1),t.forEach((a,e)=>{e<L?a.classList.add("filled"):a.classList.remove("filled")})}async function Se(t){t.preventDefault();const a=new FormData(i.ratingForm),e=a.get("email"),n=a.get("review");if(!m||L===0||!e){d("Please provide a rating and your email.","error");return}try{const s=await K.addRating(m,{rate:L,email:e,review:n});d("Thank you for your rating!","success"),B()}catch(s){d("Failed to submit rating. "+(s.message||"Please try again."),"error")}}const Ce=new w,g={favoritesContainer:document.getElementById("favorites-container"),favoritesEmpty:document.getElementById("favorites-empty"),quoteWrapper:document.getElementById("quote-wrapper")};async function Be(){Z(),g.favoritesContainer.addEventListener("click",Te),V(),await $e()}async function $e(){if(!g.quoteWrapper)return;const t=g.quoteWrapper.querySelector("#quote-text"),a=g.quoteWrapper.querySelector("#quote-author"),e=new Date().toDateString(),n=S("quote");if(n&&n.date===e)s({quote:n.quote,author:n.author});else try{const r=await Ce.getQuote();if(!r||!r.quote)throw new Error("No quote data");const c={...r,date:e};k("quote",c),s({quote:c.quote,author:c.author})}catch{s({quote:"The only bad workout is the one that didn't happen.",author:"Unknown"})}function s({quote:r,author:c}){t&&(t.textContent=r),a&&(a.textContent=c),g.quoteWrapper.classList.remove("hidden")}}function Z(){const t=S("favorites")||[];if(t.length===0){g.favoritesEmpty.classList.remove("hidden"),g.favoritesContainer.innerHTML="";return}g.favoritesEmpty.classList.add("hidden");const a=t.map(e=>`
    <li class="exercise-card" data-id="${e._id}">
      <div class="exercise-content">
        <div class="exercise-left">
          <span class="workout-badge">Workout</span>
          <div class="rating-wrap">
            <span>${e.rating.toFixed(1)}</span>
            ${qe(e.rating)}
          </div>
          <div class="exercise-title-box">
            <div class="icon-run-wrapper">
              <svg class="icon-run" width="12" height="12">
                <use href="/YourEnergy/sprite.svg#icon-run"></use>
              </svg>
            </div>
            <h3 class="exercise-name">${e.name}</h3>
          </div>
          <ul class="exercise-details">
            <li class="detail-item">
              <p class="detail-label">Burned calories:</p>
              <p class="detail-value">${e.burnedCalories} / ${e.time} min</p>
            </li>
            <li class="detail-item">
              <p class="detail-label">Body part:</p>
              <p class="detail-value">${e.bodyPart}</p>
            </li>
            <li class="detail-item">
              <p class="detail-label">Target:</p>
              <p class="detail-value">${e.target}</p>
            </li>
          </ul>
        </div>
        <div class="exercise-right">
          <button class="start-btn" type="button" data-id="${e._id}">Start
            <svg width="14" height="14">
              <use href="/YourEnergy/sprite.svg#icon-arrow"></use>
            </svg>
          </button>
          <button class="remove-from-favorites-btn" type="button" data-id="${e._id}">
            <svg class="icon-trash" width="16" height="16">
              <use href="/YourEnergy/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
    `).join("");g.favoritesContainer.innerHTML=`<ul class="favorites-list">${a}</ul>`}function qe(t){let a="";const e=Math.floor(t),n=t%1!==0;for(let s=0;s<5;s++)s<e?a+='<svg class="star-icon filled" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>';return a}function Te(t){const a=t.target.closest(".remove-from-favorites-btn");if(!a)return;const e=a.dataset.id;if(e){let n=S("favorites")||[];n=n.filter(s=>s._id!==e),k("favorites",n),d("Exercise removed from favorites!","success"),Z()}}document.addEventListener("DOMContentLoaded",()=>{window.location.pathname.includes("favorites.html")?Be():(se(),de(),V()),ve()});
//# sourceMappingURL=main-BsGa8pi7.js.map
