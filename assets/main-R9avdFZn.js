var _=e=>{throw TypeError(e)};var O=(e,a,t)=>a.has(e)||_("Cannot "+t);var N=(e,a,t)=>(O(e,a,"read from private field"),t?t.call(e):a.get(e)),I=(e,a,t)=>a.has(e)?_("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(e):a.set(e,t);var p=(e,a,t)=>(O(e,a,"access private method"),t);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const se=()=>{var n,s,i,c;const e=window.location.pathname,a=document.querySelectorAll(".nav-link"),t=document.querySelectorAll(".mobile-nav-link");[...a,...t].forEach(f=>{f.classList.remove("active")}),e.includes("favorites")?((n=a[1])==null||n.classList.add("active"),(s=t[1])==null||s.classList.add("active")):((i=a[0])==null||i.classList.add("active"),(c=t[0])==null||c.classList.add("active"))},Y=document.querySelector("[data-menu-open]"),D=document.querySelector("[data-menu-close]"),q=document.querySelector("[data-menu]");Y&&D&&q&&(Y.addEventListener("click",()=>{q.classList.add("is-open")}),D.addEventListener("click",()=>{q.classList.remove("is-open")}));se();var S,g,v;class b{constructor(){I(this,g);I(this,S,"https://your-energy.b.goit.study/api")}async getQuote(){return p(this,g,v).call(this,"/quote")}async getFilters(a="Muscles",t=1,n=12){const s=new URLSearchParams({filter:a,page:t,limit:n});return p(this,g,v).call(this,`/filters?${s}`)}async getExercises({bodypart:a="",muscles:t="",equipment:n="",keyword:s="",page:i=1,limit:c=10}={}){const f=new URLSearchParams({page:i,limit:c});return a&&f.append("bodypart",a),t&&f.append("muscles",t),n&&f.append("equipment",n),s&&f.append("keyword",s),p(this,g,v).call(this,`/exercises?${f}`)}async getExerciseById(a){return p(this,g,v).call(this,`/exercises/${a}`)}async patchRating(a,t){return p(this,g,v).call(this,`/exercises/${a}/rating`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}async createSubscription(a){return p(this,g,v).call(this,"/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a})})}}S=new WeakMap,g=new WeakSet,v=async function(a,t={}){const n=`${N(this,S)}${a}`;try{const s=await fetch(n,t);if(!s.ok){const i=new Error(`API Error: ${s.status} ${s.statusText}`);throw i.status=s.status,i}return await s.json()}catch(s){throw s}};const ne=new b,z="yourEnergy_quote";function J(){return new Date().toISOString().split("T")[0]}function ie(){try{const e=localStorage.getItem(z);if(!e)return null;const{date:a,quote:t,author:n}=JSON.parse(e);return a===J()?{quote:t,author:n}:null}catch{return null}}function re(e,a){try{const t={date:J(),quote:e,author:a};localStorage.setItem(z,JSON.stringify(t))}catch{}}async function oe(){const e=document.getElementById("quote-wrapper");if(e)try{const a=ie();let t;a?t=a:(t=await ne.getQuote(),re(t.quote,t.author));const n=document.getElementById("quote-text"),s=document.getElementById("quote-author");n&&s&&(n.textContent=t.quote,s.textContent=t.author,e.classList.remove("hidden"))}catch{const t=document.getElementById("quote-text"),n=document.getElementById("quote-author");t&&n&&(t.textContent="The only bad workout is the one that didn't happen.",n.textContent="Unknown",e.classList.remove("hidden"))}}function K(e,a,t=1){if(a<=1){e.innerHTML="";return}let n="";for(let s=1;s<=a;s++)s===1||s===a||s>=t-2&&s<=t+2?n+=`
        <button class="pagination-btn ${s===t?"active":""}" type="button" data-page="${s}">
          ${s}
        </button>
      `:(s===t-3&&t>4||s===t+3&&t<a-3)&&(n+='<span class="pagination-dots">...</span>');e.innerHTML=n}const ce=new b,E=document.getElementById("exercises-container"),w=document.getElementById("pagination"),y=document.getElementById("search-form"),Q=document.querySelector(".exercises-title");w&&w.addEventListener("click",me);function le(){return window.innerWidth>=768?10:8}let l={filter:"",name:"",keyword:"",page:1,limit:le()};const de={Muscles:"muscles","Body parts":"bodypart",Equipment:"equipment"};async function ue(e,a){const t=document.getElementById("current-category"),n=document.querySelector(".exercises-category-separator");t&&(t.textContent=a),n&&n.classList.add("visible"),y&&(y.classList.remove("hidden"),y.classList.add("visible"),y.reset(),y.removeEventListener("submit",W),y.addEventListener("submit",W)),l.filter=e,l.name=a,l.keyword="",l.page=1,await F()}async function F(){if(E){E.innerHTML='<p class="loader-text">Loading exercises...</p>',w&&(w.innerHTML="");try{const a={[de[l.filter]]:l.name.toLowerCase(),page:l.page,limit:l.limit};l.keyword&&(a.keyword=l.keyword);const t=await ce.getExercises(a);if(!t.results||t.results.length===0){E.innerHTML='<p class="loader-text">No exercises found for this category.</p>';return}ge(t.results),w&&K(w,t.totalPages,Number(t.page))}catch{E.innerHTML='<p class="loader-text" style="color: red">Failed to load exercises. Please try again.</p>'}}}function ge(e){const a=e.map(t=>`
    <li class="exercise-card" data-id="${t._id}">
      <!-- Header: Badge + Rating | Start button -->
      <div class="exercise-header">
        <div class="exercise-header-left">
          <span class="workout-badge">WORKOUT</span>
          <div class="rating-wrap">
            <span class="rating-value">${t.rating.toFixed(1)}</span>
            <svg class="rating-icon" width="14" height="14">
              <use href="/YourEnergy/sprite.svg#icon-star"></use>
            </svg>
          </div>
        </div>
        <button class="start-btn" type="button" data-id="${t._id}">
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
        <h3 class="exercise-name">${t.name}</h3>
      </div>
      
      <!-- Details row -->
      <ul class="exercise-details">
        <li class="detail-item"><span class="detail-label">Burned calories:</span> <span class="detail-value">${t.burnedCalories} / ${t.time} min</span></li>
        <li class="detail-item"><span class="detail-label">Body part:</span> <span class="detail-value">${t.bodyPart}</span></li>
        <li class="detail-item"><span class="detail-label">Target:</span> <span class="detail-value">${t.target}</span></li>
      </ul>
    </li>
  `).join("");E.innerHTML=`<ul class="exercises-list">${a}</ul>`}function me(e){const a=e.target.closest(".pagination-btn");if(!a)return;const t=Number(a.dataset.page);t!==l.page&&(l.page=t,F(),Q&&Q.scrollIntoView({behavior:"smooth"}))}async function W(e){e.preventDefault();const t=e.currentTarget.elements.keyword.value.trim();l.keyword=t,l.page=1,await F()}const fe=new b,o={filtersList:document.getElementById("filters-list"),exercisesContainer:document.getElementById("exercises-container"),pagination:document.getElementById("pagination"),currentCategory:document.getElementById("current-category"),categorySeparator:document.querySelector(".exercises-category-separator"),searchForm:document.getElementById("search-form")};function pe(){return window.innerWidth>=768?12:9}let h={filter:"Muscles",page:1,limit:pe()};async function ve(){o.filtersList&&(o.filtersList.addEventListener("click",he),o.exercisesContainer.addEventListener("click",we),o.pagination&&o.pagination.addEventListener("click",ye),await P())}async function he(e){var t;const a=e.target.closest(".filters-btn");a&&(a.classList.contains("active")||((t=document.querySelector(".filters-btn.active"))==null||t.classList.remove("active"),a.classList.add("active"),o.currentCategory&&(o.currentCategory.textContent=""),o.categorySeparator&&o.categorySeparator.classList.remove("visible"),o.searchForm&&o.searchForm.classList.remove("visible"),h.filter=a.dataset.filter,h.page=1,await P()))}async function ye(e){const a=e.target.closest(".pagination-btn");if(!a)return;const t=Number(a.dataset.page);t!==h.page&&(h.page=t,await P())}async function P(){o.exercisesContainer.innerHTML='<p class="loader-text">Loading categories...</p>';try{const e=await fe.getFilters(h.filter,h.page,h.limit);if(e.results.length===0){o.exercisesContainer.innerHTML='<p class="loader-text">Nothing found.</p>',o.pagination.innerHTML="";return}Le(e.results),K(o.pagination,e.totalPages,Number(e.page))}catch{o.exercisesContainer.innerHTML='<p class="loader-text" style="color: red">Something went wrong. Try reloading page.</p>',o.pagination.innerHTML=""}}async function we(e){const a=e.target.closest(".category-card");if(!a)return;const{filter:t,name:n}=a.dataset;o.pagination.innerHTML="",await ue(t,n)}function Le(e){const a=e.map(t=>`
    <li class="category-card" 
         data-name="${t.name}" 
         data-filter="${t.filter}">
      <img class="category-img" src="${t.imgURL}" alt="${t.name}" loading="lazy">
      <div class="category-info">
        <h3 class="category-title">${t.name}</h3>
        <p class="category-filter">${t.filter}</p>
      </div>
    </li>
  `).join("");o.exercisesContainer.innerHTML=`<ul class="categories-list">${a}</ul>`}function d(e,a="success"){const t=document.createElement("div");t.className=`toast ${a}`,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},100),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},3e3)}const be=new b,C=document.getElementById("subscribe-form");function Ee(){C&&C.addEventListener("submit",xe)}async function xe(e){e.preventDefault();const t=C.elements.email.value.trim();if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)){d("Please enter a valid email address.","error");return}try{await be.createSubscription(t),d("We're excited to have you on board!","success"),C.reset()}catch(s){s.status===409?d("You are already subscribed to our updates!","info"):s.status===400?d("Invalid email format. Please check and try again.","error"):d("Something went wrong. Please try again later.","error")}}const x=(e,a)=>{try{const t=JSON.stringify(a);localStorage.setItem(e,t)}catch{}},H=e=>{try{const a=localStorage.getItem(e);return a===null?void 0:JSON.parse(a)}catch{}},Me=e=>{try{localStorage.removeItem(e)}catch{}},k="favorites_ids";function M(){return H(k)||[]}function Ce(e){const a=M();a.includes(e)||(a.push(e),x(k,a))}function V(e){const t=M().filter(n=>n!==e);x(k,t)}function G(e){return M().includes(e)}function Se(){const e=H("favorites");if(e&&Array.isArray(e)&&e.length>0&&typeof e[0]=="object"&&e[0]._id){const a=e.map(t=>t._id);x(k,a),Me("favorites")}}const Z=new b,r={exerciseModalBackdrop:document.querySelector("[data-modal]"),exerciseModalContent:document.getElementById("exercise-modal-content"),exerciseModalCloseBtn:document.querySelector("[data-modal-close]"),ratingModalBackdrop:document.querySelector("[data-rating-modal]"),ratingModalContent:document.getElementById("rating-modal-content"),ratingModalCloseBtn:document.querySelector("[data-rating-modal-close]"),ratingForm:document.getElementById("rating-form"),ratingStars:document.getElementById("rating-stars"),ratingValueSpan:document.querySelector(".rating-value"),exercisesContainer:document.getElementById("exercises-container"),favoritesContainer:document.getElementById("favorites-container")};let m=null,L=0;function X(){r.exercisesContainer&&r.exercisesContainer.addEventListener("click",j),r.favoritesContainer&&r.favoritesContainer.addEventListener("click",j),r.exerciseModalCloseBtn&&r.exerciseModalCloseBtn.addEventListener("click",R),r.ratingModalCloseBtn&&r.ratingModalCloseBtn.addEventListener("click",$),r.ratingStars&&r.ratingStars.addEventListener("click",qe),r.ratingForm&&r.ratingForm.addEventListener("submit",Te),r.exerciseModalBackdrop&&r.exerciseModalBackdrop.addEventListener("click",U),r.ratingModalBackdrop&&r.ratingModalBackdrop.addEventListener("click",U)}function U(e){e.target===r.exerciseModalBackdrop&&R(),e.target===r.ratingModalBackdrop&&$()}function B(e){e.key==="Escape"&&(r.exerciseModalBackdrop.classList.contains("is-hidden")||R(),r.ratingModalBackdrop.classList.contains("is-hidden")||$())}async function j(e){const a=e.target.closest(".start-btn");if(!a)return;const t=a.dataset.id;t&&await A(t)}async function A(e){m=e,r.exerciseModalContent.innerHTML='<p class="loader-text">Loading exercise details...</p>',r.exerciseModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",document.addEventListener("keydown",B);try{const a=await Z.getExerciseById(e);Be(a)}catch{r.exerciseModalContent.innerHTML='<p class="loader-text" style="color: red">Failed to load exercise details.</p>'}}function R(){r.exerciseModalBackdrop.classList.add("is-hidden"),r.exerciseModalContent.innerHTML="",m=null,document.body.style.overflow="",r.ratingModalBackdrop.classList.contains("is-hidden")&&document.removeEventListener("keydown",B)}function ke(e){let a="";const t=Math.floor(e),n=e%1!==0;for(let s=0;s<5;s++)s<t?a+='<svg class="star-icon filled" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>';return a}function Be(e){const t=G(e._id)?"Remove from favorites":"Add to favorites",n=`
    <div class="modal-exercise-card">
      <!-- Left Column: Image -->
      <div class="modal-image-wrap">
        <img class="modal-exercise-img" src="${e.gifUrl}" alt="${e.name}">
      </div>
      
      <!-- Right Column: Content -->
      <div class="modal-exercise-info">
        <h3 class="modal-exercise-name">${e.name}</h3>
        <div class="modal-rating-wrap">
          <span class="modal-rating-value">${e.rating.toFixed(1)}</span>
          <div class="modal-stars">
            ${ke(e.rating)}
          </div>
        </div>
        
        <!-- Stats Grid -->
        <div class="modal-stats-grid">
          <div class="modal-stat-item">
            <span class="modal-stat-label">Target</span>
            <span class="modal-stat-value">${e.target}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Body Part</span>
            <span class="modal-stat-value">${e.bodyPart}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Equipment</span>
            <span class="modal-stat-value">${e.equipment}</span>
          </div>
          <div class="modal-stat-item">
            <span class="modal-stat-label">Popular</span>
            <span class="modal-stat-value">${e.popularity}</span>
          </div>
        </div>
        
        <!-- Burned Calories - Separate -->
        <div class="modal-calories">
          <span class="modal-calories-label">Burned calories</span>
          <span class="modal-calories-value">${e.burnedCalories}/${e.time} min</span>
        </div>
        
        <!-- Description -->
        <p class="modal-exercise-description">${e.description}</p>
        
        <!-- Buttons -->
        <div class="modal-buttons">
          <button class="add-to-favorites-btn" type="button" data-id="${e._id}">
            ${t}
            <svg class="heart-icon" width="18" height="18">
              <use href="/YourEnergy/sprite.svg#icon-heart"></use>
            </svg>
          </button>
          <button class="give-rating-btn" type="button" data-id="${e._id}">Give a rating</button>
        </div>
      </div>
    </div>
  `;r.exerciseModalContent.innerHTML=n;const s=r.exerciseModalContent.querySelector(".give-rating-btn");s&&s.addEventListener("click",Ie);const i=r.exerciseModalContent.querySelector(".add-to-favorites-btn");i&&i.addEventListener("click",()=>$e(e,i))}function $e(e,a){const t=G(e._id),n='<svg class="heart-icon" width="18" height="18"><use href="/YourEnergy/sprite.svg#icon-heart"></use></svg>';t?(V(e._id),d("Removed from favorites","success"),a.innerHTML=`Add to favorites ${n}`):(Ce(e._id),d("Added to favorites!","success"),a.innerHTML=`Remove from favorites ${n}`)}function Ie(){if(!m)return;const e=m;r.exerciseModalBackdrop.classList.add("is-hidden"),r.exerciseModalContent.innerHTML="",m=e,r.ratingModalBackdrop.classList.remove("is-hidden"),document.body.style.overflow="hidden",L=0,ee(),r.ratingForm.reset(),document.addEventListener("keydown",B)}async function $(){const e=m;r.ratingModalBackdrop.classList.add("is-hidden"),e?await A(e):(document.body.style.overflow="",document.removeEventListener("keydown",B))}function qe(e){const a=e.target.closest(".star-icon");a&&(L=parseInt(a.dataset.rating),ee())}function ee(){const e=r.ratingStars.querySelectorAll(".star-icon");r.ratingValueSpan.textContent=L.toFixed(1),e.forEach((a,t)=>{t<L?a.classList.add("filled"):a.classList.remove("filled")})}async function Te(e){e.preventDefault();const a=new FormData(r.ratingForm),t=a.get("email"),n=a.get("review");if(!m||L===0||!t){d("Please provide a rating and your email.","error");return}const s=m;try{await Z.patchRating(m,{rate:L,email:t,review:n}),d("Thank you for your rating!","success"),$(),await A(s)}catch(i){i.status===409?d("You have already rated this exercise.","info"):d("Failed to submit rating. "+(i.message||"Please try again."),"error")}}const te=new b,u={favoritesContainer:document.getElementById("favorites-container"),favoritesEmpty:document.getElementById("favorites-empty"),quoteWrapper:document.getElementById("quote-wrapper")};async function Fe(){Se(),await ae(),u.favoritesContainer.addEventListener("click",Re),X(),await Pe()}async function Pe(){if(!u.quoteWrapper)return;const e=u.quoteWrapper.querySelector("#quote-text"),a=u.quoteWrapper.querySelector("#quote-author"),t=new Date().toDateString(),n=H("quote");if(n&&n.date===t)s({quote:n.quote,author:n.author});else try{const i=await te.getQuote();if(!i||!i.quote)throw new Error("No quote data");const c={...i,date:t};x("quote",c),s({quote:c.quote,author:c.author})}catch{s({quote:"The only bad workout is the one that didn't happen.",author:"Unknown"})}function s({quote:i,author:c}){e&&(e.textContent=i),a&&(a.textContent=c),u.quoteWrapper.classList.remove("hidden")}}async function ae(){const e=M();if(e.length===0){T();return}u.favoritesEmpty.classList.add("hidden"),u.favoritesContainer.innerHTML='<p class="loader-text">Loading your favorites...</p>';try{const a=e.map(i=>te.getExerciseById(i).catch(()=>null)),n=(await Promise.all(a)).filter(i=>i!==null);if(n.length===0){T();return}const s=n.map(i=>i._id);x("favorites_ids",s),He(n)}catch{u.favoritesContainer.innerHTML='<p class="loader-text" style="color: red">Failed to load favorites. Please try again.</p>'}}function T(){u.favoritesEmpty.classList.remove("hidden"),u.favoritesContainer.innerHTML=""}function He(e){u.favoritesEmpty.classList.add("hidden");const a=e.map(t=>`
    <li class="exercise-card" data-id="${t._id}">
      <div class="exercise-content">
        <div class="exercise-left">
          <span class="workout-badge">Workout</span>
          <div class="rating-wrap">
            <span>${t.rating.toFixed(1)}</span>
            ${Ae(t.rating)}
          </div>
          <div class="exercise-title-box">
            <h3 class="exercise-name">${t.name}</h3>
          </div>
          <ul class="exercise-details">
            <li class="detail-item">
              <p class="detail-label">Burned calories:</p>
              <p class="detail-value">${t.burnedCalories} / ${t.time} min</p>
            </li>
            <li class="detail-item">
              <p class="detail-label">Body part:</p>
              <p class="detail-value">${t.bodyPart}</p>
            </li>
            <li class="detail-item">
              <p class="detail-label">Target:</p>
              <p class="detail-value">${t.target}</p>
            </li>
          </ul>
        </div>
        <div class="exercise-right">
          <button class="start-btn" type="button" data-id="${t._id}">Start
            <svg width="14" height="14">
              <use href="/YourEnergy/sprite.svg#icon-arrow"></use>
            </svg>
          </button>
          <button class="remove-from-favorites-btn" type="button" data-id="${t._id}">
            <svg class="icon-trash" width="16" height="16">
              <use href="/YourEnergy/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>
    `).join("");u.favoritesContainer.innerHTML=`<ul class="favorites-list">${a}</ul>`}function Ae(e){let a="";const t=Math.floor(e),n=e%1!==0;for(let s=0;s<5;s++)s<t?a+='<svg class="star-icon filled" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>':a+='<svg class="star-icon" width="14" height="14"><use href="/YourEnergy/sprite.svg#icon-star"></use></svg>';return a}async function Re(e){const a=e.target.closest(".remove-from-favorites-btn");if(!a)return;const t=a.dataset.id;t&&(V(t),d("Exercise removed from favorites!","success"),M().length===0?T():await ae())}document.addEventListener("DOMContentLoaded",()=>{window.location.pathname.includes("favorites.html")?Fe():(oe(),ve(),X()),Ee()});
//# sourceMappingURL=main-R9avdFZn.js.map
