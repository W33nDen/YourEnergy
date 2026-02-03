var A=t=>{throw TypeError(t)};var R=(t,a,e)=>a.has(t)||A("Cannot "+e);var _=(t,a,e)=>(R(t,a,"read from private field"),e?e.call(t):a.get(t)),B=(t,a,e)=>a.has(t)?A("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,e);var f=(t,a,e)=>(R(t,a,"access private method"),e);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const Z=()=>{var n,s,i,c;const t=window.location.pathname,a=document.querySelectorAll(".nav-link"),e=document.querySelectorAll(".mobile-nav-link");[...a,...e].forEach(p=>{p.classList.remove("active")}),t.includes("favorites")?((n=a[1])==null||n.classList.add("active"),(s=e[1])==null||s.classList.add("active")):((i=a[0])==null||i.classList.add("active"),(c=e[0])==null||c.classList.add("active"))},N=document.querySelector("[data-menu-open]"),O=document.querySelector("[data-menu-close]"),q=document.querySelector("[data-menu]");N&&O&&q&&(N.addEventListener("click",()=>{q.classList.add("is-open")}),O.addEventListener("click",()=>{q.classList.remove("is-open")}));Z();var S,u,v;class w{constructor(){B(this,u);B(this,S,"https://your-energy.b.goit.study/api")}async getQuote(){return f(this,u,v).call(this,"/quote")}async getFilters(a="Muscles",e=1,n=12){const s=new URLSearchParams({filter:a,page:e,limit:n});return f(this,u,v).call(this,`/filters?${s}`)}async getExercises({bodypart:a="",muscles:e="",equipment:n="",keyword:s="",page:i=1,limit:c=10}={}){const p=new URLSearchParams({page:i,limit:c});return a&&p.append("bodypart",a),e&&p.append("muscles",e),n&&p.append("equipment",n),s&&p.append("keyword",s),f(this,u,v).call(this,`/exercises?${p}`)}async getExerciseById(a){return f(this,u,v).call(this,`/exercises/${a}`)}async patchRating(a,e){return f(this,u,v).call(this,`/exercises/${a}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async createSubscription(a){return f(this,u,v).call(this,"/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a})})}}S=new WeakMap,u=new WeakSet,v=async function(a,e={}){const n=`${_(this,S)}${a}`;try{const s=await fetch(n,e);if(!s.ok){const i=new Error(`API Error: ${s.status} ${s.statusText}`);throw i.status=s.status,i}return await s.json()}catch(s){throw s}};const X=new w,W="yourEnergy_quote";function j(){return new Date().toISOString().split("T")[0]}function ee(){try{const t=localStorage.getItem(W);if(!t)return null;const{date:a,quote:e,author:n}=JSON.parse(t);return a===j()?{quote:e,author:n}:null}catch{return null}}function te(t,a){try{const e={date:j(),quote:t,author:a};localStorage.setItem(W,JSON.stringify(e))}catch{}}async function ae(){const t=document.getElementById("quote-wrapper");if(t)try{const a=ee();let e;a?e=a:(e=await X.getQuote(),te(e.quote,e.author));const n=document.getElementById("quote-text"),s=document.getElementById("quote-author");n&&s&&(n.textContent=e.quote,s.textContent=e.author,t.classList.remove("hidden"))}catch{const e=document.getElementById("quote-text"),n=document.getElementById("quote-author");e&&n&&(e.textContent="The only bad workout is the one that didn't happen.",n.textContent="Unknown",t.classList.remove("hidden"))}}function z(t,a,e=1){if(a<=1){t.innerHTML="";return}let n="";for(let s=1;s<=a;s++)s===1||s===a||s>=e-2&&s<=e+2?n+=`
        <button class="pagination-btn ${s===e?"active":""}" type="button" data-page="${s}">
          ${s}
        </button>
      `:(s===e-3&&e>4||s===e+3&&e<a-3)&&(n+='<span class="pagination-dots">...</span>');t.innerHTML=n}const se=new w,E=document.getElementById("exercises-container"),b=document.getElementById("pagination"),y=document.getElementById("search-form"),D=document.querySelector(".exercises-title");b&&b.addEventListener("click",oe);let l={filter:"",name:"",keyword:"",page:1,limit:10};const ne={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};async function ie(t,a){const e=document.getElementById("current-category"),n=document.querySelector(".exercises-category-separator");e&&(e.textContent=a),n&&n.classList.add("visible"),y&&(y.classList.remove("hidden"),y.classList.add("visible"),y.reset(),y.removeEventListener("submit",Q),y.addEventListener("submit",Q)),l.filter=t,l.name=a,l.keyword="",l.page=1,await T()}async function T(){if(E){E.innerHTML='<p class="loader-text">Loading exercises...</p>',b&&(b.innerHTML="");try{const a={[ne[l.filter]]:l.name.toLowerCase(),page:l.page,limit:l.limit};l.keyword&&(a.keyword=l.keyword);const e=await se.getExercises(a);if(!e.results||e.results.length===0){E.innerHTML='<p class="loader-text">No exercises found for this category.</p>';return}re(e.results),b&&z(b,e.totalPages,Number(e.page))}catch{E.innerHTML='<p class="loader-text" style="color: red">Failed to load exercises. Please try again.</p>'}}}function re(t){const a=t.map(e=>`
    <li class="exercise-card" data-id="${e._id}">
      <!-- Header: Badge + Rating | Start button -->
      <div class="exercise-header">
        <div class="exercise-header-left">
          <span class="workout-badge">WORKOUT</span>
          <div class="rating-wrap">
            <span class="rating-value">${e.rating.toFixed(1)}</span>
            <svg class="rating-icon" width="14" height="14">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
          </div>
        </div>
        <button class="start-btn" type="button" data-id="${e._id}">
          Start
          <svg width="16" height="16">
            <use href="./img/sprite.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>
      
      <!-- Title with icon -->
      <div class="exercise-title-box">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="14" height="14">
            <use href="./img/sprite.svg#icon-run"></use>
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
  `).join("");E.innerHTML=`<ul class="exercises-list">${a}</ul>`}function oe(t){const a=t.target.closest(".pagination-btn");if(!a)return;const e=Number(a.dataset.page);e!==l.page&&(l.page=e,T(),D&&D.scrollIntoView({behavior:"smooth"}))}async function Q(t){t.preventDefault();const e=t.currentTarget.elements.keyword.value.trim();l.keyword=e,l.page=1,await T()}const ce=new w,o={filtersList:document.getElementById("filters-list"),exercisesContainer:document.getElementById("exercises-container"),pagination:document.getElementById("pagination"),currentCategory:document.getElementById("current-category"),categorySeparator:document.querySelector(".exercises-category-separator"),searchForm:document.getElementById("search-form")};let h={filter:"Muscles",page:1,limit:12};async function le(){o.filtersList&&(o.filtersList.addEventListener("click",de),o.exercisesContainer.addEventListener("click",me),o.pagination&&o.pagination.addEventListener("click",ue),await I())}async function de(t){var e;const a=t.target.closest(".filters-btn");a&&(a.classList.contains("active")||((e=document.querySelector(".filters-btn.active"))==null||e.classList.remove("active"),a.classList.add("active"),o.currentCategory&&(o.currentCategory.textContent=""),o.categorySeparator&&o.categorySeparator.classList.remove("visible"),o.searchForm&&o.searchForm.classList.remove("visible"),h.filter=a.dataset.filter,h.page=1,await I()))}async function ue(t){const a=t.target.closest(".pagination-btn");if(!a)return;const e=Number(a.dataset.page);e!==h.page&&(h.page=e,await I())}async function I(){o.exercisesContainer.innerHTML='<p class="loader-text">Loading categories...</p>';try{const t=await ce.getFilters(h.filter,h.page,h.limit);if(t.results.length===0){o.exercisesContainer.innerHTML='<p class="loader-text">Nothing found.</p>',o.pagination.innerHTML="";return}ge(t.results),z(o.pagination,t.totalPages,Number(t.page))}catch{o.exercisesContainer.innerHTML='<p class="loader-text" style="color: red">Something went wrong. Try reloading page.</p>',o.pagination.innerHTML=""}}async function me(t){const a=t.target.closest(".category-card");if(!a)return;const{filter:e,name:n}=a.dataset;o.pagination.innerHTML="",await ie(e,n)}function ge(t){const a=t.map(e=>`
    <li class="category-card" 
         data-name="${e.name}" 
         data-filter="${e.filter}">
      <img class="category-img" src="${e.imgURL}" alt="${e.name}" loading="lazy">
      <div class="category-info">
        <h3 class="category-title">${e.name}</h3>
        <p class="category-filter">${e.filter}</p>
      </div>
    </li>
  `).join("");o.exercisesContainer.innerHTML=`<ul class="categories-list">${a}</ul>`}function d(t,a="success"){const e=document.createElement("div");e.className=`toast ${a}`,e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.classList.add("show")},100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}const pe=new w,x=document.getElementById("subscribe-form");function fe(){x&&x.addEventListener("submit",ve)}async function ve(t){t.preventDefault();const e=x.elements.email.value.trim();if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)){d("Please enter a valid email address.","error");return}try{await pe.createSubscription(e),d("We're excited to have you on board!","success"),x.reset()}catch(s){s.status===409?d("You are already subscribed to our updates!","info"):s.status===400?d("Invalid email format. Please check and try again.","error"):d("Something went wrong. Please try again later.","error")}}const k=(t,a)=>{try{const e=JSON.stringify(a);localStorage.setItem(t,e)}catch{}},M=t=>{try{const a=localStorage.getItem(t);return a===null?void 0:JSON.parse(a)}catch{}},F="favorites";function H(){return M(F)||[]}function he(t){const a=H();a.some(e=>e._id===t._id)||(a.push(t),k(F,a))}function ye(t){const e=H().filter(n=>n._id!==t);k(F,e)}function J(t){return H().some(e=>e._id===t)}const K=new w,r={exerciseModalBackdrop:document.querySelector("[data-modal]"),exerciseModalContent:document.getElementById("exercise-modal-content"),exerciseModalCloseBtn:document.querySelector("[data-modal-close]"),ratingModalBackdrop:document.querySelector("[data-rating-modal]"),ratingModalContent:document.getElementById("rating-modal-content"),ratingModalCloseBtn:document.querySelector("[data-rating-modal-close]"),ratingForm:document.getElementById("rating-form"),ratingStars:document.getElementById("rating-stars"),ratingValueSpan:document.querySelector(".rating-value"),exercisesContainer:document.getElementById("exercises-container")};let g=null,L=0;function V(){r.exercisesContainer.addEventListener("click",be),r.exerciseModalCloseBtn.addEventListener("click",P),r.ratingModalCloseBtn.addEventListener("click",$),r.ratingStars.addEventListener("click",ke),r.ratingForm.addEventListener("submit",Me),r.exerciseModalBackdrop.addEventListener("click",U),r.ratingModalBackdrop.addEventListener("click",U)}function U(t){t.target===r.exerciseModalBackdrop&&P(),t.target===r.ratingModalBackdrop&&$()}function C(t){t.key==="Escape"&&(r.exerciseModalBackdrop.classList.contains("is-hidden")||P(),r.ratingModalBackdrop.classList.contains("is-hidden")||$())}async function be(t){const a=t.target.closest(".start-btn");if(!a)return;const e=a.dataset.id;e&&await Le(e)}async function Le(t){g=t,r.exerciseModalContent.innerHTML='<p class="loader-text">Loading exercise details...</p>',r.exerciseModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",C);try{const a=await K.getExerciseById(t);Ee(a)}catch{r.exerciseModalContent.innerHTML='<p class="loader-text" style="color: red">Failed to load exercise details.</p>'}}function P(){r.exerciseModalBackdrop.classList.add("is-hidden"),r.exerciseModalContent.innerHTML="",g=null,document.body.style.overflow="",r.ratingModalBackdrop.classList.contains("is-hidden")&&document.removeEventListener("keydown",C)}function we(t){let a="";const e=Math.floor(t),n=t%1!==0;for(let s=0;s<5;s++)s<e?a+='<svg class="star-icon filled" width="14" height="14"><use href="./img/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="./img/sprite.svg#icon-star"></use></svg>';return a}function Ee(t){const e=J(t._id)?"Remove from favorites":"Add to favorites",n=`
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
              <use href="./img/sprite.svg#icon-heart"></use>
            </svg>
          </button>
          <button class="give-rating-btn" type="button" data-id="${t._id}">Give a rating</button>
        </div>
      </div>
    </div>
  `;r.exerciseModalContent.innerHTML=n;const s=r.exerciseModalContent.querySelector(".give-rating-btn");s&&s.addEventListener("click",Se);const i=r.exerciseModalContent.querySelector(".add-to-favorites-btn");i&&i.addEventListener("click",()=>xe(t,i))}function xe(t,a){const e=J(t._id),n='<svg class="heart-icon" width="18" height="18"><use href="./img/sprite.svg#icon-heart"></use></svg>';e?(ye(t._id),d("Removed from favorites","success"),a.innerHTML=`Add to favorites ${n}`):(he(t),d("Added to favorites!","success"),a.innerHTML=`Remove from favorites ${n}`)}function Se(){if(!g)return;const t=g;r.exerciseModalBackdrop.classList.add("is-hidden"),r.exerciseModalContent.innerHTML="",g=t,r.ratingModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",L=0,Y(),r.ratingForm.reset(),document.addEventListener("keydown",C)}function $(){r.ratingModalBackdrop.classList.add("is-hidden"),g=null,document.body.style.overflow="",document.removeEventListener("keydown",C)}function ke(t){const a=t.target.closest(".star-icon");a&&(L=parseInt(a.dataset.rating),Y())}function Y(){const t=r.ratingStars.querySelectorAll(".star-icon");r.ratingValueSpan.textContent=L.toFixed(1),t.forEach((a,e)=>{e<L?a.classList.add("filled"):a.classList.remove("filled")})}async function Me(t){t.preventDefault();const a=new FormData(r.ratingForm),e=a.get("email"),n=a.get("review");if(!g||L===0||!e){d("Please provide a rating and your email.","error");return}try{const s=await K.addRating(g,{rate:L,email:e,review:n});d("Thank you for your rating!","success"),$()}catch(s){d("Failed to submit rating. "+(s.message||"Please try again."),"error")}}const Ce=new w,m={favoritesContainer:document.getElementById("favorites-container"),favoritesEmpty:document.getElementById("favorites-empty"),quoteWrapper:document.getElementById("quote-wrapper")};async function $e(){G(),m.favoritesContainer.addEventListener("click",Te),V(),await Be()}async function Be(){if(!m.quoteWrapper)return;const t=m.quoteWrapper.querySelector("#quote-text"),a=m.quoteWrapper.querySelector("#quote-author"),e=new Date().toDateString(),n=M("quote");if(n&&n.date===e)s({quote:n.quote,author:n.author});else try{const i=await Ce.getQuote();if(!i||!i.quote)throw new Error("No quote data");const c={...i,date:e};k("quote",c),s({quote:c.quote,author:c.author})}catch{s({quote:"The only bad workout is the one that didn't happen.",author:"Unknown"})}function s({quote:i,author:c}){t&&(t.textContent=i),a&&(a.textContent=c),m.quoteWrapper.classList.remove("hidden")}}function G(){const t=M("favorites")||[];if(t.length===0){m.favoritesEmpty.classList.remove("hidden"),m.favoritesContainer.innerHTML="";return}m.favoritesEmpty.classList.add("hidden");const a=t.map(e=>`
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
                <use href="./img/sprite.svg#icon-run"></use>
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
              <use href="./img/sprite.svg#icon-arrow"></use>
            </svg>
          </button>
          <button class="remove-from-favorites-btn" type="button" data-id="${e._id}">
            <svg class="icon-trash" width="16" height="16">
              <use href="./img/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
    `).join("");m.favoritesContainer.innerHTML=`<ul class="favorites-list">${a}</ul>`}function qe(t){let a="";const e=Math.floor(t),n=t%1!==0;for(let s=0;s<5;s++)s<e?a+='<svg class="star-icon filled" width="14" height="14"><use href="./img/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="./img/sprite.svg#icon-star"></use></svg>';return a}function Te(t){const a=t.target.closest(".remove-from-favorites-btn");if(!a)return;const e=a.dataset.id;if(e){let n=M("favorites")||[];n=n.filter(s=>s._id!==e),k("favorites",n),d("Exercise removed from favorites!","success"),G()}}document.addEventListener("DOMContentLoaded",()=>{ae(),le(),fe(),V(),window.location.pathname.includes("favorites.html")&&$e()});
//# sourceMappingURL=main-DxIinQ6l.js.map
