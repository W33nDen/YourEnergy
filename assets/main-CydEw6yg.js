var R=t=>{throw TypeError(t)};var _=(t,a,e)=>a.has(t)||R("Cannot "+e);var O=(t,a,e)=>(_(t,a,"read from private field"),e?e.call(t):a.get(t)),I=(t,a,e)=>a.has(t)?R("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,e);var p=(t,a,e)=>(_(t,a,"access private method"),e);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const se=()=>{var n,s,i,c;const t=window.location.pathname,a=document.querySelectorAll(".nav-link"),e=document.querySelectorAll(".mobile-nav-link");[...a,...e].forEach(f=>{f.classList.remove("active")}),t.includes("favorites")?((n=a[1])==null||n.classList.add("active"),(s=e[1])==null||s.classList.add("active")):((i=a[0])==null||i.classList.add("active"),(c=e[0])==null||c.classList.add("active"))},N=document.querySelector("[data-menu-open]"),Y=document.querySelector("[data-menu-close]"),q=document.querySelector("[data-menu]");N&&Y&&q&&(N.addEventListener("click",()=>{q.classList.add("is-open")}),Y.addEventListener("click",()=>{q.classList.remove("is-open")}));se();var S,g,v;class b{constructor(){I(this,g);I(this,S,"https://your-energy.b.goit.study/api")}async getQuote(){return p(this,g,v).call(this,"/quote")}async getFilters(a="Muscles",e=1,n=12){const s=new URLSearchParams({filter:a,page:e,limit:n});return p(this,g,v).call(this,`/filters?${s}`)}async getExercises({bodypart:a="",muscles:e="",equipment:n="",keyword:s="",page:i=1,limit:c=10}={}){const f=new URLSearchParams({page:i,limit:c});return a&&f.append("bodypart",a),e&&f.append("muscles",e),n&&f.append("equipment",n),s&&f.append("keyword",s),p(this,g,v).call(this,`/exercises?${f}`)}async getExerciseById(a){return p(this,g,v).call(this,`/exercises/${a}`)}async patchRating(a,e){return p(this,g,v).call(this,`/exercises/${a}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async createSubscription(a){return p(this,g,v).call(this,"/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a})})}}S=new WeakMap,g=new WeakSet,v=async function(a,e={}){const n=`${O(this,S)}${a}`;try{const s=await fetch(n,e);if(!s.ok){const i=new Error(`API Error: ${s.status} ${s.statusText}`);throw i.status=s.status,i}return await s.json()}catch(s){throw s}};const ne=new b,j="yourEnergy_quote";function z(){return new Date().toISOString().split("T")[0]}function ie(){try{const t=localStorage.getItem(j);if(!t)return null;const{date:a,quote:e,author:n}=JSON.parse(t);return a===z()?{quote:e,author:n}:null}catch{return null}}function re(t,a){try{const e={date:z(),quote:t,author:a};localStorage.setItem(j,JSON.stringify(e))}catch{}}async function oe(){const t=document.getElementById("quote-wrapper");if(t)try{const a=ie();let e;a?e=a:(e=await ne.getQuote(),re(e.quote,e.author));const n=document.getElementById("quote-text"),s=document.getElementById("quote-author");n&&s&&(n.textContent=e.quote,s.textContent=e.author,t.classList.remove("hidden"))}catch{const e=document.getElementById("quote-text"),n=document.getElementById("quote-author");e&&n&&(e.textContent="The only bad workout is the one that didn't happen.",n.textContent="Unknown",t.classList.remove("hidden"))}}function J(t,a,e=1){if(a<=1){t.innerHTML="";return}let n="";for(let s=1;s<=a;s++)s===1||s===a||s>=e-2&&s<=e+2?n+=`
        <button class="pagination-btn ${s===e?"active":""}" type="button" data-page="${s}">
          ${s}
        </button>
      `:(s===e-3&&e>4||s===e+3&&e<a-3)&&(n+='<span class="pagination-dots">...</span>');t.innerHTML=n}const ce=new b,E=document.getElementById("exercises-container"),L=document.getElementById("pagination"),y=document.getElementById("search-form"),D=document.querySelector(".exercises-title");L&&L.addEventListener("click",me);function le(){return window.innerWidth>=768?10:8}let l={filter:"",name:"",keyword:"",page:1,limit:le()};const de={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};async function ue(t,a){const e=document.getElementById("current-category"),n=document.querySelector(".exercises-category-separator");e&&(e.textContent=a),n&&n.classList.add("visible"),y&&(y.classList.remove("hidden"),y.classList.add("visible"),y.reset(),y.removeEventListener("submit",Q),y.addEventListener("submit",Q)),l.filter=t,l.name=a,l.keyword="",l.page=1,await F()}async function F(){if(E){E.innerHTML='<p class="loader-text">Loading exercises...</p>',L&&(L.innerHTML="");try{const a={[de[l.filter]]:l.name.toLowerCase(),page:l.page,limit:l.limit};l.keyword&&(a.keyword=l.keyword);const e=await ce.getExercises(a);if(!e.results||e.results.length===0){E.innerHTML='<p class="loader-text">No exercises found for this category.</p>';return}ge(e.results),L&&J(L,e.totalPages,Number(e.page))}catch{E.innerHTML='<p class="loader-text" style="color: red">Failed to load exercises. Please try again.</p>'}}}function ge(t){const a=t.map(e=>`
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
  `).join("");E.innerHTML=`<ul class="exercises-list">${a}</ul>`}function me(t){const a=t.target.closest(".pagination-btn");if(!a)return;const e=Number(a.dataset.page);e!==l.page&&(l.page=e,F(),D&&D.scrollIntoView({behavior:"smooth"}))}async function Q(t){t.preventDefault();const e=t.currentTarget.elements.keyword.value.trim();l.keyword=e,l.page=1,await F()}const fe=new b,o={filtersList:document.getElementById("filters-list"),exercisesContainer:document.getElementById("exercises-container"),pagination:document.getElementById("pagination"),currentCategory:document.getElementById("current-category"),categorySeparator:document.querySelector(".exercises-category-separator"),searchForm:document.getElementById("search-form")};function pe(){return window.innerWidth>=768?12:9}let h={filter:"Muscles",page:1,limit:pe()};async function ve(){o.filtersList&&(o.filtersList.addEventListener("click",he),o.exercisesContainer.addEventListener("click",Le),o.pagination&&o.pagination.addEventListener("click",ye),await P())}async function he(t){var e;const a=t.target.closest(".filters-btn");a&&(a.classList.contains("active")||((e=document.querySelector(".filters-btn.active"))==null||e.classList.remove("active"),a.classList.add("active"),o.currentCategory&&(o.currentCategory.textContent=""),o.categorySeparator&&o.categorySeparator.classList.remove("visible"),o.searchForm&&o.searchForm.classList.remove("visible"),h.filter=a.dataset.filter,h.page=1,await P()))}async function ye(t){const a=t.target.closest(".pagination-btn");if(!a)return;const e=Number(a.dataset.page);e!==h.page&&(h.page=e,await P())}async function P(){o.exercisesContainer.innerHTML='<p class="loader-text">Loading categories...</p>';try{const t=await fe.getFilters(h.filter,h.page,h.limit);if(t.results.length===0){o.exercisesContainer.innerHTML='<p class="loader-text">Nothing found.</p>',o.pagination.innerHTML="";return}we(t.results),J(o.pagination,t.totalPages,Number(t.page))}catch{o.exercisesContainer.innerHTML='<p class="loader-text" style="color: red">Something went wrong. Try reloading page.</p>',o.pagination.innerHTML=""}}async function Le(t){const a=t.target.closest(".category-card");if(!a)return;const{filter:e,name:n}=a.dataset;o.pagination.innerHTML="",await ue(e,n)}function we(t){const a=t.map(e=>`
    <li class="category-card" 
         data-name="${e.name}" 
         data-filter="${e.filter}">
      <img class="category-img" src="${e.imgURL}" alt="${e.name}" loading="lazy">
      <div class="category-info">
        <h3 class="category-title">${e.name}</h3>
        <p class="category-filter">${e.filter}</p>
      </div>
    </li>
  `).join("");o.exercisesContainer.innerHTML=`<ul class="categories-list">${a}</ul>`}function d(t,a="success"){const e=document.createElement("div");e.className=`toast ${a}`,e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.classList.add("show")},100),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{document.body.removeChild(e)},300)},3e3)}const be=new b,C=document.getElementById("subscribe-form");function Ee(){C&&C.addEventListener("submit",xe)}async function xe(t){t.preventDefault();const e=C.elements.email.value.trim();if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)){d("Please enter a valid email address.","error");return}try{await be.createSubscription(e),d("We're excited to have you on board!","success"),C.reset()}catch(s){s.status===409?d("You are already subscribed to our updates!","info"):s.status===400?d("Invalid email format. Please check and try again.","error"):d("Something went wrong. Please try again later.","error")}}const x=(t,a)=>{try{const e=JSON.stringify(a);localStorage.setItem(t,e)}catch{}},H=t=>{try{const a=localStorage.getItem(t);return a===null?void 0:JSON.parse(a)}catch{}},Me=t=>{try{localStorage.removeItem(t)}catch{}},k="favorites_ids";function M(){return H(k)||[]}function Ce(t){const a=M();a.includes(t)||(a.push(t),x(k,a))}function K(t){const e=M().filter(n=>n!==t);x(k,e)}function V(t){return M().includes(t)}function Se(){const t=H("favorites");if(t&&Array.isArray(t)&&t.length>0&&typeof t[0]=="object"&&t[0]._id){const a=t.map(e=>e._id);x(k,a),Me("favorites")}}const G=new b,r={exerciseModalBackdrop:document.querySelector("[data-modal]"),exerciseModalContent:document.getElementById("exercise-modal-content"),exerciseModalCloseBtn:document.querySelector("[data-modal-close]"),ratingModalBackdrop:document.querySelector("[data-rating-modal]"),ratingModalContent:document.getElementById("rating-modal-content"),ratingModalCloseBtn:document.querySelector("[data-rating-modal-close]"),ratingForm:document.getElementById("rating-form"),ratingStars:document.getElementById("rating-stars"),ratingValueSpan:document.querySelector(".rating-value"),exercisesContainer:document.getElementById("exercises-container"),favoritesContainer:document.getElementById("favorites-container")};let m=null,w=0;function Z(){r.exercisesContainer&&r.exercisesContainer.addEventListener("click",U),r.favoritesContainer&&r.favoritesContainer.addEventListener("click",U),r.exerciseModalCloseBtn&&r.exerciseModalCloseBtn.addEventListener("click",A),r.ratingModalCloseBtn&&r.ratingModalCloseBtn.addEventListener("click",$),r.ratingStars&&r.ratingStars.addEventListener("click",qe),r.ratingForm&&r.ratingForm.addEventListener("submit",Te),r.exerciseModalBackdrop&&r.exerciseModalBackdrop.addEventListener("click",W),r.ratingModalBackdrop&&r.ratingModalBackdrop.addEventListener("click",W)}function W(t){t.target===r.exerciseModalBackdrop&&A(),t.target===r.ratingModalBackdrop&&$()}function B(t){t.key==="Escape"&&(r.exerciseModalBackdrop.classList.contains("is-hidden")||A(),r.ratingModalBackdrop.classList.contains("is-hidden")||$())}async function U(t){const a=t.target.closest(".start-btn");if(!a)return;const e=a.dataset.id;e&&await X(e)}async function X(t){m=t,r.exerciseModalContent.innerHTML='<p class="loader-text">Loading exercise details...</p>',r.exerciseModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",B);try{const a=await G.getExerciseById(t);Be(a)}catch{r.exerciseModalContent.innerHTML='<p class="loader-text" style="color: red">Failed to load exercise details.</p>'}}function A(){r.exerciseModalBackdrop.classList.add("is-hidden"),r.exerciseModalContent.innerHTML="",m=null,document.body.style.overflow="",r.ratingModalBackdrop.classList.contains("is-hidden")&&document.removeEventListener("keydown",B)}function ke(t){let a="";const e=Math.floor(t),n=t%1!==0;for(let s=0;s<5;s++)s<e?a+='<svg class="star-icon filled" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>';return a}function Be(t){const e=V(t._id)?"Remove from favorites":"Add to favorites",n=`
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
            ${ke(t.rating)}
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
  `;r.exerciseModalContent.innerHTML=n;const s=r.exerciseModalContent.querySelector(".give-rating-btn");s&&s.addEventListener("click",Ie);const i=r.exerciseModalContent.querySelector(".add-to-favorites-btn");i&&i.addEventListener("click",()=>$e(t,i))}function $e(t,a){const e=V(t._id),n='<svg class="heart-icon" width="18" height="18"><use href="/YourEnergy/sprite.svg#icon-heart"></use></svg>';e?(K(t._id),d("Removed from favorites","success"),a.innerHTML=`Add to favorites ${n}`):(Ce(t._id),d("Added to favorites!","success"),a.innerHTML=`Remove from favorites ${n}`)}function Ie(){if(!m)return;const t=m;r.exerciseModalBackdrop.classList.add("is-hidden"),r.exerciseModalContent.innerHTML="",m=t,r.ratingModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",w=0,ee(),r.ratingForm.reset(),document.addEventListener("keydown",B)}function $(){r.ratingModalBackdrop.classList.add("is-hidden"),m=null,document.body.style.overflow="",document.removeEventListener("keydown",B)}function qe(t){const a=t.target.closest(".star-icon");a&&(w=parseInt(a.dataset.rating),ee())}function ee(){const t=r.ratingStars.querySelectorAll(".star-icon");r.ratingValueSpan.textContent=w.toFixed(1),t.forEach((a,e)=>{e<w?a.classList.add("filled"):a.classList.remove("filled")})}async function Te(t){t.preventDefault();const a=new FormData(r.ratingForm),e=a.get("email"),n=a.get("review");if(!m||w===0||!e){d("Please provide a rating and your email.","error");return}const s=m;try{await G.patchRating(m,{rate:w,email:e,review:n}),d("Thank you for your rating!","success"),$(),await X(s)}catch(i){i.status===409?d("You have already rated this exercise.","info"):d("Failed to submit rating. "+(i.message||"Please try again."),"error")}}const te=new b,u={favoritesContainer:document.getElementById("favorites-container"),favoritesEmpty:document.getElementById("favorites-empty"),quoteWrapper:document.getElementById("quote-wrapper")};async function Fe(){Se(),await ae(),u.favoritesContainer.addEventListener("click",Re),Z(),await Pe()}async function Pe(){if(!u.quoteWrapper)return;const t=u.quoteWrapper.querySelector("#quote-text"),a=u.quoteWrapper.querySelector("#quote-author"),e=new Date().toDateString(),n=H("quote");if(n&&n.date===e)s({quote:n.quote,author:n.author});else try{const i=await te.getQuote();if(!i||!i.quote)throw new Error("No quote data");const c={...i,date:e};x("quote",c),s({quote:c.quote,author:c.author})}catch{s({quote:"The only bad workout is the one that didn't happen.",author:"Unknown"})}function s({quote:i,author:c}){t&&(t.textContent=i),a&&(a.textContent=c),u.quoteWrapper.classList.remove("hidden")}}async function ae(){const t=M();if(t.length===0){T();return}u.favoritesEmpty.classList.add("hidden"),u.favoritesContainer.innerHTML='<p class="loader-text">Loading your favorites...</p>';try{const a=t.map(i=>te.getExerciseById(i).catch(()=>null)),n=(await Promise.all(a)).filter(i=>i!==null);if(n.length===0){T();return}const s=n.map(i=>i._id);x("favorites_ids",s),He(n)}catch{u.favoritesContainer.innerHTML='<p class="loader-text" style="color: red">Failed to load favorites. Please try again.</p>'}}function T(){u.favoritesEmpty.classList.remove("hidden"),u.favoritesContainer.innerHTML=""}function He(t){u.favoritesEmpty.classList.add("hidden");const a=t.map(e=>`
    <li class="exercise-card" data-id="${e._id}">
      <div class="exercise-content">
        <div class="exercise-left">
          <span class="workout-badge">Workout</span>
          <div class="rating-wrap">
            <span>${e.rating.toFixed(1)}</span>
            ${Ae(e.rating)}
          </div>
          <div class="exercise-title-box">
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
    `).join("");u.favoritesContainer.innerHTML=`<ul class="favorites-list">${a}</ul>`}function Ae(t){let a="";const e=Math.floor(t),n=t%1!==0;for(let s=0;s<5;s++)s<e?a+='<svg class="star-icon filled" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>';return a}async function Re(t){const a=t.target.closest(".remove-from-favorites-btn");if(!a)return;const e=a.dataset.id;e&&(K(e),d("Exercise removed from favorites!","success"),M().length===0?T():await ae())}document.addEventListener("DOMContentLoaded",()=>{window.location.pathname.includes("favorites.html")?Fe():(oe(),ve(),Z()),Ee()});
//# sourceMappingURL=main-CydEw6yg.js.map
