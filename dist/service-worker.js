!function(){"use strict";var e={913:function(){try{self["workbox:core:7.0.0"]&&_()}catch(e){}},977:function(){try{self["workbox:precaching:7.0.0"]&&_()}catch(e){}},80:function(){try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},873:function(){try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function s(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,s),a.exports}s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t=new Set,n={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[n.prefix,e,n.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||r(n.precache);function i(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}let c,o;class h{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function l(e,t){const s=t();return e.waitUntil(s),s}function u(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:n}=t;if(!n)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(n,location.href),a=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",s),{cacheKey:r.href,url:a.href}}s(977);class f{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class d{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}function p(e){return"string"==typeof e?new Request(e):e}s(873);class g{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new h,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let n=p(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const a=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:a,response:e});return e}catch(e){throw r&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:r.clone(),request:a.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=p(e);let s;const{cacheName:n,matchOptions:r}=this._strategy,a=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(a,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:r,cachedResponse:s,request:a,event:this.event})||void 0;return s}async cachePut(s,n){const r=p(s);await(0,new Promise((e=>setTimeout(e,0))));const a=await this.getCacheKey(r,"write");if(!n)throw new e("cache-put-with-no-response",{url:(c=a.url,new URL(String(c),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var c;const o=await this._ensureResponseSafeToCache(n);if(!o)return!1;const{cacheName:h,matchOptions:l}=this._strategy,u=await self.caches.open(h),f=this.hasCallback("cacheDidUpdate"),d=f?await async function(e,t,s,n){const r=i(t.url,s);if(t.url===r)return e.match(t,n);const a=Object.assign(Object.assign({},n),{ignoreSearch:!0}),c=await e.keys(t,a);for(const t of c)if(r===i(t.url,s))return e.match(t,n)}(u,a.clone(),["__WB_REVISION__"],l):null;try{await u.put(a,f?o.clone():o)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of t)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:h,oldResponse:d,newResponse:o.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=p(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return t[e](r)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class y{constructor(e={}){this.cacheName=e.cacheName||r(n.runtime),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,r=new g(this,{event:t,request:s,params:n}),a=this._getResponse(r,s,t);return[a,this._awaitComplete(a,r,s,t)]}async _getResponse(t,s,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(r=await this._handle(s,t),!r||"error"===r.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const a of t.iterateCallbacks("handlerDidError"))if(r=await a({error:e,event:n,request:s}),r)break;if(!r)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))r=await e({event:n,request:s,response:r});return r}async _awaitComplete(e,t,s,n){let r,a;try{r=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await t.doneWaiting()}catch(e){e instanceof Error&&(a=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:a}),t.destroy(),a)throw a}}class w extends y{constructor(e={}){e.cacheName=a(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(w.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let n;const r=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=r.integrity,a=t.integrity,i=!a||a===e;n=await s.fetch(new Request(t,{integrity:"no-cors"!==t.mode?a||e:void 0})),e&&i&&"no-cors"!==t.mode&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,n.clone()))}return n}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(t);if(!await s.cachePut(t,n.clone()))throw new e("bad-precaching-response",{url:t.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==w.copyRedirectedCacheableResponsesPlugin&&(n===w.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(w.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}w.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:e}){return!e||e.status>=400?null:e}},w.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:t}){return t.redirected?await async function(t,s){let n=null;if(t.url&&(n=new URL(t.url).origin),n!==self.location.origin)throw new e("cross-origin-copy-response",{origin:n});const r=t.clone(),a={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},i=s?s(a):a,o=function(){if(void 0===c){const e=new Response("");if("body"in e)try{new Response(e.body),c=!0}catch(e){c=!1}c=!1}return c}()?r.body:await r.blob();return new Response(o,i)}(t):t}};class m{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new w({cacheName:a(e),plugins:[...t,new d({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const n of t){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:t,url:r}=u(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==n.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(t,n.integrity)}if(this._urlsToCacheKeys.set(r,t),this._urlsToCacheModes.set(r,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return l(e,(async()=>{const t=new f;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),r=this._urlsToCacheModes.get(t),a=new Request(t,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:a,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return l(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}const _=()=>(o||(o=new m),o);s(80);const v=e=>e&&"object"==typeof e?e:{handle:e};class b{constructor(e,t,s="GET"){this.handler=v(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=v(e)}}class R extends b{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class C{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=a&&a.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:r})}catch(e){o=Promise.reject(e)}const h=a&&a.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:r})}catch(e){e instanceof Error&&(n=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const r=this._routes.get(s.method)||[];for(const a of r){let r;const i=a.match({url:e,sameOrigin:t,request:s,event:n});if(i)return r=i,(Array.isArray(r)&&0===r.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(r=void 0),{route:a,params:r}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,v(e))}setCatchHandler(e){this._catchHandler=v(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let q;function U(t,s,n){let r;if("string"==typeof t){const e=new URL(t,location.href);r=new b((({url:t})=>t.href===e.href),s,n)}else if(t instanceof RegExp)r=new R(t,s,n);else if("function"==typeof t)r=new b(t,s,n);else{if(!(t instanceof b))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=t}return(q||(q=new C,q.addFetchListener(),q.addCacheListener()),q).registerRoute(r),r}class L extends b{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const r of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(a,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(r);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}var k;self.addEventListener("activate",(()=>self.clients.claim())),self.skipWaiting(),U((function(e){var t=e.request;return"navigate"===t.mode&&"GET"===t.method}),(function(e){return t=this,n=void 0,a=function(){var t,n,r,a,i,c;return function(e,t){var s,n,r,a,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(o){return function(c){if(s)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(s=1,n&&(r=2&c[0]?n.return:c[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,c[1])).done)return r;switch(n=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,n=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((r=(r=i.trys).length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){i.label=c[1];break}if(6===c[0]&&i.label<r[1]){i.label=r[1],r=c;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(c);break}r[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],n=0}finally{s=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,o])}}}(this,(function(o){switch(o.label){case 0:t="/index.html",r=new AbortController,a=r.signal,i=s.g.setTimeout((function(){return r.abort()}),2500),o.label=1;case 1:return o.trys.push([1,3,,4]),console.debug("Attempting to fetch ".concat(e.request.url,".")),[4,fetch(e.request.url,{signal:a})];case 2:return n=o.sent(),[3,4];case 3:return c=o.sent(),console.warn("Fetch Error: ".concat(c)),[3,4];case 4:return clearTimeout(i),(null==n?void 0:n.ok)?[3,6]:(console.debug("Failed to fetch ".concat(e.request.url,". Serving ").concat(t," from cache.")),[4,(h=t,_().matchPrecache(h))]);case 5:n=o.sent(),o.label=6;case 6:return[2,n||Response.error()]}var h}))},new((r=void 0)||(r=Promise))((function(e,s){function i(e){try{o(a.next(e))}catch(e){s(e)}}function c(e){try{o(a.throw(e))}catch(e){s(e)}}function o(t){var s;t.done?e(t.value):(s=t.value,s instanceof r?s:new r((function(e){e(s)}))).then(i,c)}o((a=a.apply(t,n||[])).next())}));var t,n,r,a}),"GET"),k=[{'revision':null,'url':'/6ce24c58023cc2f8fd88fe9d219db6c6.svg'},{'revision':'be9c0df4646f3ff1b2bb9ad970aad9a8','url':'/bundle.js'},{'revision':'c92b85a5b907c70211f4ec25e29a8c4a','url':'/favicon.ico'},{'revision':'eeda9de1669689a12b3389e177e488fd','url':'/index.html'},{'revision':'33dbdd0177549353eeeb785d02c294af','url':'/logo192.png'},{'revision':'917515db74ea8d1aee6a246cfbcc0b45','url':'/logo512.png'},{'revision':'d9d975cebe2ec20b6c652e1e4c12ccf0','url':'/manifest.json'}],_().precache(k),function(e){const t=_();U(new L(t,undefined))}()}()}();