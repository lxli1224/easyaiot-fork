var nd=Object.defineProperty;var id=(n,t,e)=>t in n?nd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var te=(n,t,e)=>id(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.35
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function fl(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const ae={},Es=[],Un=()=>{},rh=()=>!1,To=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Ao=n=>n.startsWith("onUpdate:"),Ie=Object.assign,dl=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},sd=Object.prototype.hasOwnProperty,ne=(n,t)=>sd.call(n,t),Nt=Array.isArray,bs=n=>mr(n)==="[object Map]",wo=n=>mr(n)==="[object Set]",Wl=n=>mr(n)==="[object Date]",Ht=n=>typeof n=="function",ve=n=>typeof n=="string",On=n=>typeof n=="symbol",oe=n=>n!==null&&typeof n=="object",oh=n=>(oe(n)||Ht(n))&&Ht(n.then)&&Ht(n.catch),ah=Object.prototype.toString,mr=n=>ah.call(n),rd=n=>mr(n).slice(8,-1),lh=n=>mr(n)==="[object Object]",pl=n=>ve(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,er=fl(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Co=n=>{const t=Object.create(null);return e=>t[e]||(t[e]=n(e))},od=/-\w/g,xn=Co(n=>n.replace(od,t=>t.slice(1).toUpperCase())),ad=/\B([A-Z])/g,$i=Co(n=>n.replace(ad,"-$1").toLowerCase()),ch=Co(n=>n.charAt(0).toUpperCase()+n.slice(1)),jo=Co(n=>n?`on${ch(n)}`:""),Pn=(n,t)=>!Object.is(n,t),to=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},uh=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Ro=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Xl;const Po=()=>Xl||(Xl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Lo(n){if(Nt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=ve(i)?hd(i):Lo(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(ve(n)||oe(n))return n}const ld=/;(?![^(]*\))/g,cd=/:([^]+)/,ud=/\/\*[^]*?\*\//g;function hd(n){const t={};return n.replace(ud,"").split(ld).forEach(e=>{if(e){const i=e.split(cd);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function ue(n){let t="";if(ve(n))t=n;else if(Nt(n))for(let e=0;e<n.length;e++){const i=ue(n[e]);i&&(t+=i+" ")}else if(oe(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const fd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",dd=fl(fd);function hh(n){return!!n||n===""}function pd(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=gr(n[i],t[i]);return e}function gr(n,t){if(n===t)return!0;let e=Wl(n),i=Wl(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=On(n),i=On(t),e||i)return n===t;if(e=Nt(n),i=Nt(t),e||i)return e&&i?pd(n,t):!1;if(e=oe(n),i=oe(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!gr(n[o],t[o]))return!1}}return String(n)===String(t)}function md(n,t){return n.findIndex(e=>gr(e,t))}const fh=n=>!!(n&&n.__v_isRef===!0),mt=n=>ve(n)?n:n==null?"":Nt(n)||oe(n)&&(n.toString===ah||!Ht(n.toString))?fh(n)?mt(n.value):JSON.stringify(n,dh,2):String(n),dh=(n,t)=>fh(t)?dh(n,t.value):bs(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[qo(i,r)+" =>"]=s,e),{})}:wo(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>qo(e))}:On(t)?qo(t):oe(t)&&!Nt(t)&&!lh(t)?String(t):t,qo=(n,t="")=>{var e;return On(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.35
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let De;class gd{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&De&&(De.active?(this.parent=De,this.index=(De.scopes||(De.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=De;try{return De=this,t()}finally{De=e}}}on(){++this._on===1&&(this.prevScope=De,De=this)}off(){if(this._on>0&&--this._on===0){if(De===this)De=this.prevScope;else{let t=De;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function _d(){return De}let le;const Yo=new WeakSet;class ph{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,De&&(De.active?De.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Yo.has(this)&&(Yo.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||gh(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,$l(this),_h(this);const t=le,e=Mn;le=this,Mn=!0;try{return this.fn()}finally{vh(this),le=t,Mn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)_l(t);this.deps=this.depsTail=void 0,$l(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Yo.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Va(this)&&this.run()}get dirty(){return Va(this)}}let mh=0,nr,ir;function gh(n,t=!1){if(n.flags|=8,t){n.next=ir,ir=n;return}n.next=nr,nr=n}function ml(){mh++}function gl(){if(--mh>0)return;if(ir){let t=ir;for(ir=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;nr;){let t=nr;for(nr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function _h(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function vh(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),_l(i),vd(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Va(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(xh(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function xh(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===cr)||(n.globalVersion=cr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Va(n))))return;n.flags|=2;const t=n.dep,e=le,i=Mn;le=n,Mn=!0;try{_h(n);const s=n.fn(n._value);(t.version===0||Pn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{le=e,Mn=i,vh(n),n.flags&=-3}}function _l(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)_l(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function vd(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Mn=!0;const Mh=[];function Qn(){Mh.push(Mn),Mn=!1}function ti(){const n=Mh.pop();Mn=n===void 0?!0:n}function $l(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=le;le=void 0;try{t()}finally{le=e}}}let cr=0;class xd{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class vl{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!le||!Mn||le===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==le)e=this.activeLink=new xd(le,this),le.deps?(e.prevDep=le.depsTail,le.depsTail.nextDep=e,le.depsTail=e):le.deps=le.depsTail=e,Sh(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=le.depsTail,e.nextDep=void 0,le.depsTail.nextDep=e,le.depsTail=e,le.deps===e&&(le.deps=i)}return e}trigger(t){this.version++,cr++,this.notify(t)}notify(t){ml();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{gl()}}}function Sh(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Sh(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Ga=new WeakMap,Vi=Symbol(""),Wa=Symbol(""),ur=Symbol("");function Fe(n,t,e){if(Mn&&le){let i=Ga.get(n);i||Ga.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new vl),s.map=i,s.key=e),s.track()}}function Yn(n,t,e,i,s,r){const o=Ga.get(n);if(!o){cr++;return}const a=l=>{l&&l.trigger()};if(ml(),t==="clear")o.forEach(a);else{const l=Nt(n),c=l&&pl(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===ur||!On(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(ur)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Vi)),bs(n)&&a(o.get(Wa)));break;case"delete":l||(a(o.get(Vi)),bs(n)&&a(o.get(Wa)));break;case"set":bs(n)&&a(o.get(Vi));break}}gl()}function Ki(n){const t=ee(n);return t===n?t:(Fe(t,"iterate",ur),cn(n)?t:t.map(yn))}function Do(n){return Fe(n=ee(n),"iterate",ur),n}function wn(n,t){return ei(n)?Is(Gi(n)?yn(t):t):yn(t)}const Md={__proto__:null,[Symbol.iterator](){return Ko(this,Symbol.iterator,n=>wn(this,n))},concat(...n){return Ki(this).concat(...n.map(t=>Nt(t)?Ki(t):t))},entries(){return Ko(this,"entries",n=>(n[1]=wn(this,n[1]),n))},every(n,t){return Hn(this,"every",n,t,void 0,arguments)},filter(n,t){return Hn(this,"filter",n,t,e=>e.map(i=>wn(this,i)),arguments)},find(n,t){return Hn(this,"find",n,t,e=>wn(this,e),arguments)},findIndex(n,t){return Hn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Hn(this,"findLast",n,t,e=>wn(this,e),arguments)},findLastIndex(n,t){return Hn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Hn(this,"forEach",n,t,void 0,arguments)},includes(...n){return Zo(this,"includes",n)},indexOf(...n){return Zo(this,"indexOf",n)},join(n){return Ki(this).join(n)},lastIndexOf(...n){return Zo(this,"lastIndexOf",n)},map(n,t){return Hn(this,"map",n,t,void 0,arguments)},pop(){return ks(this,"pop")},push(...n){return ks(this,"push",n)},reduce(n,...t){return jl(this,"reduce",n,t)},reduceRight(n,...t){return jl(this,"reduceRight",n,t)},shift(){return ks(this,"shift")},some(n,t){return Hn(this,"some",n,t,void 0,arguments)},splice(...n){return ks(this,"splice",n)},toReversed(){return Ki(this).toReversed()},toSorted(n){return Ki(this).toSorted(n)},toSpliced(...n){return Ki(this).toSpliced(...n)},unshift(...n){return ks(this,"unshift",n)},values(){return Ko(this,"values",n=>wn(this,n))}};function Ko(n,t,e){const i=Do(n),s=i[t]();return i!==n&&!cn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const Sd=Array.prototype;function Hn(n,t,e,i,s,r){const o=Do(n),a=o!==n&&!cn(n),l=o[t];if(l!==Sd[t]){const h=l.apply(n,r);return a?yn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,wn(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function jl(n,t,e,i){const s=Do(n),r=s!==n&&!cn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=wn(n,c)),e.call(this,c,wn(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?wn(n,l):l}function Zo(n,t,e){const i=ee(n);Fe(i,"iterate",ur);const s=i[t](...e);return(s===-1||s===!1)&&yl(e[0])?(e[0]=ee(e[0]),i[t](...e)):s}function ks(n,t,e=[]){Qn(),ml();const i=ee(n)[t].apply(n,e);return gl(),ti(),i}const yd=fl("__proto__,__v_isRef,__isVue"),yh=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(On));function Ed(n){On(n)||(n=String(n));const t=ee(this);return Fe(t,"has",n),t.hasOwnProperty(n)}class Eh{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?Id:wh:r?Ah:Th).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Nt(t);if(!s){let l;if(o&&(l=Md[e]))return l;if(e==="hasOwnProperty")return Ed}const a=Reflect.get(t,e,Be(t)?t:i);if((On(e)?yh.has(e):yd(e))||(s||Fe(t,"get",e),r))return a;if(Be(a)){const l=o&&pl(e)?a:a.value;return s&&oe(l)?$a(l):l}return oe(a)?s?$a(a):Ml(a):a}}class bh extends Eh{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Nt(t)&&pl(e);if(!this._isShallow){const c=ei(r);if(!cn(i)&&!ei(i)&&(r=ee(r),i=ee(i)),!o&&Be(r)&&!Be(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:ne(t,e),l=Reflect.set(t,e,i,Be(t)?t:s);return t===ee(s)&&(a?Pn(i,r)&&Yn(t,"set",e,i):Yn(t,"add",e,i)),l}deleteProperty(t,e){const i=ne(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&Yn(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!On(e)||!yh.has(e))&&Fe(t,"has",e),i}ownKeys(t){return Fe(t,"iterate",Nt(t)?"length":Vi),Reflect.ownKeys(t)}}class bd extends Eh{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Td=new bh,Ad=new bd,wd=new bh(!0);const Xa=n=>n,Er=n=>Reflect.getPrototypeOf(n);function Cd(n,t,e){return function(...i){const s=this.__v_raw,r=ee(s),o=bs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?Xa:t?Is:yn;return!t&&Fe(r,"iterate",l?Wa:Vi),Ie(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function br(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function Rd(n,t){const e={get(s){const r=this.__v_raw,o=ee(r),a=ee(s);n||(Pn(s,a)&&Fe(o,"get",s),Fe(o,"get",a));const{has:l}=Er(o),c=t?Xa:n?Is:yn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Fe(ee(s),"iterate",Vi),s.size},has(s){const r=this.__v_raw,o=ee(r),a=ee(s);return n||(Pn(s,a)&&Fe(o,"has",s),Fe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ee(a),c=t?Xa:n?Is:yn;return!n&&Fe(l,"iterate",Vi),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Ie(e,n?{add:br("add"),set:br("set"),delete:br("delete"),clear:br("clear")}:{add(s){const r=ee(this),o=Er(r),a=ee(s),l=!t&&!cn(s)&&!ei(s)?a:s;return o.has.call(r,l)||Pn(s,l)&&o.has.call(r,s)||Pn(a,l)&&o.has.call(r,a)||(r.add(l),Yn(r,"add",l,l)),this},set(s,r){!t&&!cn(r)&&!ei(r)&&(r=ee(r));const o=ee(this),{has:a,get:l}=Er(o);let c=a.call(o,s);c||(s=ee(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?Pn(r,u)&&Yn(o,"set",s,r):Yn(o,"add",s,r),this},delete(s){const r=ee(this),{has:o,get:a}=Er(r);let l=o.call(r,s);l||(s=ee(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Yn(r,"delete",s,void 0),c},clear(){const s=ee(this),r=s.size!==0,o=s.clear();return r&&Yn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Cd(s,n,t)}),e}function xl(n,t){const e=Rd(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ne(e,s)&&s in i?e:i,s,r)}const Pd={get:xl(!1,!1)},Ld={get:xl(!1,!0)},Dd={get:xl(!0,!1)};const Th=new WeakMap,Ah=new WeakMap,wh=new WeakMap,Id=new WeakMap;function Ud(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ml(n){return ei(n)?n:Sl(n,!1,Td,Pd,Th)}function Nd(n){return Sl(n,!1,wd,Ld,Ah)}function $a(n){return Sl(n,!0,Ad,Dd,wh)}function Sl(n,t,e,i,s){if(!oe(n)||n.__v_raw&&!(t&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=s.get(n);if(r)return r;const o=Ud(rd(n));if(o===0)return n;const a=new Proxy(n,o===2?i:e);return s.set(n,a),a}function Gi(n){return ei(n)?Gi(n.__v_raw):!!(n&&n.__v_isReactive)}function ei(n){return!!(n&&n.__v_isReadonly)}function cn(n){return!!(n&&n.__v_isShallow)}function yl(n){return n?!!n.__v_raw:!1}function ee(n){const t=n&&n.__v_raw;return t?ee(t):n}function Od(n){return!ne(n,"__v_skip")&&Object.isExtensible(n)&&uh(n,"__v_skip",!0),n}const yn=n=>oe(n)?Ml(n):n,Is=n=>oe(n)?$a(n):n;function Be(n){return n?n.__v_isRef===!0:!1}function Kt(n){return Fd(n,!1)}function Fd(n,t){return Be(n)?n:new Bd(n,t)}class Bd{constructor(t,e){this.dep=new vl,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ee(t),this._value=e?t:yn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||cn(t)||ei(t);t=i?t:ee(t),Pn(t,e)&&(this._rawValue=t,this._value=i?t:yn(t),this.dep.trigger())}}function zd(n){return Be(n)?n.value:n}const Hd={get:(n,t,e)=>t==="__v_raw"?n:zd(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return Be(s)&&!Be(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Ch(n){return Gi(n)?n:new Proxy(n,Hd)}class kd{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new vl(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=cr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&le!==this)return gh(this,!0),!0}get value(){const t=this.dep.track();return xh(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Vd(n,t,e=!1){let i,s;return Ht(n)?i=n:(i=n.get,s=n.set),new kd(i,s,e)}const Tr={},oo=new WeakMap;let Ui;function Gd(n,t=!1,e=Ui){if(e){let i=oo.get(e);i||oo.set(e,i=[]),i.push(n)}}function Wd(n,t,e=ae){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=C=>s?C:cn(C)||s===!1||s===0?Kn(C,1):Kn(C);let u,h,f,p,x=!1,v=!1;if(Be(n)?(h=()=>n.value,x=cn(n)):Gi(n)?(h=()=>c(n),x=!0):Nt(n)?(v=!0,x=n.some(C=>Gi(C)||cn(C)),h=()=>n.map(C=>{if(Be(C))return C.value;if(Gi(C))return c(C);if(Ht(C))return l?l(C,2):C()})):Ht(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){Qn();try{f()}finally{ti()}}const C=Ui;Ui=u;try{return l?l(n,3,[p]):n(p)}finally{Ui=C}}:h=Un,t&&s){const C=h,z=s===!0?1/0:s;h=()=>Kn(C(),z)}const m=_d(),d=()=>{u.stop(),m&&m.active&&dl(m.effects,u)};if(r&&t){const C=t;t=(...z)=>{C(...z),d()}}let A=v?new Array(n.length).fill(Tr):Tr;const M=C=>{if(!(!(u.flags&1)||!u.dirty&&!C))if(t){const z=u.run();if(s||x||(v?z.some((D,P)=>Pn(D,A[P])):Pn(z,A))){f&&f();const D=Ui;Ui=u;try{const P=[z,A===Tr?void 0:v&&A[0]===Tr?[]:A,p];A=z,l?l(t,3,P):t(...P)}finally{Ui=D}}}else u.run()};return a&&a(M),u=new ph(h),u.scheduler=o?()=>o(M,!1):M,p=C=>Gd(C,!1,u),f=u.onStop=()=>{const C=oo.get(u);if(C){if(l)l(C,4);else for(const z of C)z();oo.delete(u)}},t?i?M(!0):A=u.run():o?o(M.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function Kn(n,t=1/0,e){if(t<=0||!oe(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,Be(n))Kn(n.value,t,e);else if(Nt(n))for(let i=0;i<n.length;i++)Kn(n[i],t,e);else if(wo(n)||bs(n))n.forEach(i=>{Kn(i,t,e)});else if(lh(n)){for(const i in n)Kn(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Kn(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.35
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function _r(n,t,e,i){try{return i?n(...i):n()}catch(s){Io(s,t,e)}}function En(n,t,e,i){if(Ht(n)){const s=_r(n,t,e,i);return s&&oh(s)&&s.catch(r=>{Io(r,t,e)}),s}if(Nt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(En(n[r],t,e,i));return s}}function Io(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||ae;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){Qn(),_r(r,null,10,[n,l,c]),ti();return}}Xd(n,e,s,i,o)}function Xd(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const Ve=[];let Tn=-1;const Ts=[];let hi=null,Ms=0;const Rh=Promise.resolve();let ao=null;function Ph(n){const t=ao||Rh;return n?t.then(this?n.bind(this):n):t}function $d(n){let t=Tn+1,e=Ve.length;for(;t<e;){const i=t+e>>>1,s=Ve[i],r=hr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function El(n){if(!(n.flags&1)){const t=hr(n),e=Ve[Ve.length-1];!e||!(n.flags&2)&&t>=hr(e)?Ve.push(n):Ve.splice($d(t),0,n),n.flags|=1,Lh()}}function Lh(){ao||(ao=Rh.then(Ih))}function jd(n){Nt(n)?Ts.push(...n):hi&&n.id===-1?hi.splice(Ms+1,0,n):n.flags&1||(Ts.push(n),n.flags|=1),Lh()}function ql(n,t,e=Tn+1){for(;e<Ve.length;e++){const i=Ve[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Ve.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Dh(n){if(Ts.length){const t=[...new Set(Ts)].sort((e,i)=>hr(e)-hr(i));if(Ts.length=0,hi){hi.push(...t);return}for(hi=t,Ms=0;Ms<hi.length;Ms++){const e=hi[Ms];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}hi=null,Ms=0}}const hr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Ih(n){try{for(Tn=0;Tn<Ve.length;Tn++){const t=Ve[Tn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),_r(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Tn<Ve.length;Tn++){const t=Ve[Tn];t&&(t.flags&=-2)}Tn=-1,Ve.length=0,Dh(),ao=null,(Ve.length||Ts.length)&&Ih()}}let an=null,Uh=null;function lo(n){const t=an;return an=n,Uh=n&&n.type.__scopeId||null,t}function qd(n,t=an,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&rc(-1);const r=lo(t);let o;try{o=n(...s)}finally{lo(r),i._d&&rc(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Pe(n,t){if(an===null)return n;const e=Bo(an),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=ae]=t[s];r&&(Ht(r)&&(r={mounted:r,updated:r}),r.deep&&Kn(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Ai(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Qn(),En(l,e,8,[n.el,a,n,t]),ti())}}function Yd(n,t){if(We){let e=We.provides;const i=We.parent&&We.parent.provides;i===e&&(e=We.provides=Object.create(i)),e[n]=t}}function eo(n,t,e=!1){const i=qp();if(i||As){let s=As?As._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Ht(t)?t.call(i&&i.proxy):t}}const Kd=Symbol.for("v-scx"),Zd=()=>eo(Kd);function Jo(n,t,e){return Nh(n,t,e)}function Nh(n,t,e=ae){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ie({},e),l=t&&i||!t&&r!=="post";let c;if(dr){if(r==="sync"){const p=Zd();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Un,p.resume=Un,p.pause=Un,p}}const u=We;a.call=(p,x,v)=>En(p,u,x,v);let h=!1;r==="post"?a.scheduler=p=>{$e(p,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(p,x)=>{x?p():El(p)}),a.augmentJob=p=>{t&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=Wd(n,t,a);return dr&&(c?c.push(f):l&&f()),f}function Jd(n,t,e){const i=this.proxy,s=ve(n)?n.includes(".")?Oh(i,n):()=>i[n]:n.bind(i,i);let r;Ht(t)?r=t:(r=t.handler,e=t);const o=vr(this),a=Nh(s,r.bind(i),e);return o(),a}function Oh(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const Qd=Symbol("_vte"),tp=n=>n.__isTeleport,Qo=Symbol("_leaveCb");function bl(n,t){n.shapeFlag&6&&n.component?(n.transition=t,bl(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function Fh(n,t){return Ht(n)?Ie({name:n.name},t,{setup:n}):n}function Bh(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Yl(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const co=new WeakMap;function sr(n,t,e,i,s=!1){if(Nt(n)){n.forEach((v,m)=>sr(v,t&&(Nt(t)?t[m]:t),e,i,s));return}if(rr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&sr(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Bo(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===ae?a.refs={}:a.refs,h=a.setupState,f=ee(h),p=h===ae?rh:v=>Yl(u,v)?!1:ne(f,v),x=(v,m)=>!(m&&Yl(u,m));if(c!=null&&c!==l){if(Kl(t),ve(c))u[c]=null,p(c)&&(h[c]=null);else if(Be(c)){const v=t;x(c,v.k)&&(c.value=null),v.k&&(u[v.k]=null)}}if(Ht(l))_r(l,a,12,[o,u]);else{const v=ve(l),m=Be(l);if(v||m){const d=()=>{if(n.f){const A=v?p(l)?h[l]:u[l]:x()||!n.k?l.value:u[n.k];if(s)Nt(A)&&dl(A,r);else if(Nt(A))A.includes(r)||A.push(r);else if(v)u[l]=[r],p(l)&&(h[l]=u[l]);else{const M=[r];x(l,n.k)&&(l.value=M),n.k&&(u[n.k]=M)}}else v?(u[l]=o,p(l)&&(h[l]=o)):m&&(x(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const A=()=>{d(),co.delete(n)};A.id=-1,co.set(n,A),$e(A,e)}else Kl(n),d()}}}function Kl(n){const t=co.get(n);t&&(t.flags|=8,co.delete(n))}Po().requestIdleCallback;Po().cancelIdleCallback;const rr=n=>!!n.type.__asyncLoader,zh=n=>n.type.__isKeepAlive;function ep(n,t){Hh(n,"a",t)}function np(n,t){Hh(n,"da",t)}function Hh(n,t,e=We){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Uo(t,i,e),e){let s=e.parent;for(;s&&s.parent;)zh(s.parent.vnode)&&ip(i,t,e,s),s=s.parent}}function ip(n,t,e,i){const s=Uo(t,n,i,!0);No(()=>{dl(i[t],s)},e)}function Uo(n,t,e=We,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{Qn();const a=vr(e),l=En(t,e,n,o);return a(),ti(),l});return i?s.unshift(r):s.push(r),r}}const ni=n=>(t,e=We)=>{(!dr||n==="sp")&&Uo(n,(...i)=>t(...i),e)},sp=ni("bm"),Tl=ni("m"),rp=ni("bu"),op=ni("u"),ap=ni("bum"),No=ni("um"),lp=ni("sp"),cp=ni("rtg"),up=ni("rtc");function hp(n,t=We){Uo("ec",n,t)}const fp=Symbol.for("v-ndc");function gn(n,t,e,i){let s;const r=e,o=Nt(n);if(o||ve(n)){const a=o&&Gi(n);let l=!1,c=!1;a&&(l=!cn(n),c=ei(n),n=Do(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Is(yn(n[u])):yn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(oe(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const ja=n=>n?cf(n)?Bo(n):ja(n.parent):null,or=Ie(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>ja(n.parent),$root:n=>ja(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Vh(n),$forceUpdate:n=>n.f||(n.f=()=>{El(n.update)}),$nextTick:n=>n.n||(n.n=Ph.bind(n.proxy)),$watch:n=>Jd.bind(n)}),ta=(n,t)=>n!==ae&&!n.__isScriptSetup&&ne(n,t),dp={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(ta(i,t))return o[t]=1,i[t];if(s!==ae&&ne(s,t))return o[t]=2,s[t];if(ne(r,t))return o[t]=3,r[t];if(e!==ae&&ne(e,t))return o[t]=4,e[t];qa&&(o[t]=0)}}const c=or[t];let u,h;if(c)return t==="$attrs"&&Fe(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==ae&&ne(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,ne(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return ta(s,t)?(s[t]=e,!0):i!==ae&&ne(i,t)?(i[t]=e,!0):ne(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==ae&&a[0]!=="$"&&ne(n,a)||ta(t,a)||ne(r,a)||ne(i,a)||ne(or,a)||ne(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:ne(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Zl(n){return Nt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let qa=!0;function pp(n){const t=Vh(n),e=n.proxy,i=n.ctx;qa=!1,t.beforeCreate&&Jl(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:x,activated:v,deactivated:m,beforeDestroy:d,beforeUnmount:A,destroyed:M,unmounted:C,render:z,renderTracked:D,renderTriggered:P,errorCaptured:X,serverPrefetch:T,expose:y,inheritAttrs:G,components:Z,directives:O,filters:nt}=t;if(c&&mp(c,i,null),o)for(const I in o){const H=o[I];Ht(H)&&(i[I]=H.bind(e))}if(s){const I=s.call(e,e);oe(I)&&(n.data=Ml(I))}if(qa=!0,r)for(const I in r){const H=r[I],ct=Ht(H)?H.bind(e,e):Ht(H.get)?H.get.bind(e,e):Un,ht=!Ht(H)&&Ht(H.set)?H.set.bind(e):Un,xt=fo({get:ct,set:ht});Object.defineProperty(i,I,{enumerable:!0,configurable:!0,get:()=>xt.value,set:Pt=>xt.value=Pt})}if(a)for(const I in a)kh(a[I],i,e,I);if(l){const I=Ht(l)?l.call(e):l;Reflect.ownKeys(I).forEach(H=>{Yd(H,I[H])})}u&&Jl(u,n,"c");function R(I,H){Nt(H)?H.forEach(ct=>I(ct.bind(e))):H&&I(H.bind(e))}if(R(sp,h),R(Tl,f),R(rp,p),R(op,x),R(ep,v),R(np,m),R(hp,X),R(up,D),R(cp,P),R(ap,A),R(No,C),R(lp,T),Nt(y))if(y.length){const I=n.exposed||(n.exposed={});y.forEach(H=>{Object.defineProperty(I,H,{get:()=>e[H],set:ct=>e[H]=ct,enumerable:!0})})}else n.exposed||(n.exposed={});z&&n.render===Un&&(n.render=z),G!=null&&(n.inheritAttrs=G),Z&&(n.components=Z),O&&(n.directives=O),T&&Bh(n)}function mp(n,t,e=Un){Nt(n)&&(n=Ya(n));for(const i in n){const s=n[i];let r;oe(s)?"default"in s?r=eo(s.from||i,s.default,!0):r=eo(s.from||i):r=eo(s),Be(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function Jl(n,t,e){En(Nt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function kh(n,t,e,i){let s=i.includes(".")?Oh(e,i):()=>e[i];if(ve(n)){const r=t[n];Ht(r)&&Jo(s,r)}else if(Ht(n))Jo(s,n.bind(e));else if(oe(n))if(Nt(n))n.forEach(r=>kh(r,t,e,i));else{const r=Ht(n.handler)?n.handler.bind(e):t[n.handler];Ht(r)&&Jo(s,r,n)}}function Vh(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>uo(l,c,o,!0)),uo(l,t,o)),oe(t)&&r.set(t,l),l}function uo(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&uo(n,r,e,!0),s&&s.forEach(o=>uo(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=gp[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const gp={data:Ql,props:tc,emits:tc,methods:Js,computed:Js,beforeCreate:He,created:He,beforeMount:He,mounted:He,beforeUpdate:He,updated:He,beforeDestroy:He,beforeUnmount:He,destroyed:He,unmounted:He,activated:He,deactivated:He,errorCaptured:He,serverPrefetch:He,components:Js,directives:Js,watch:vp,provide:Ql,inject:_p};function Ql(n,t){return t?n?function(){return Ie(Ht(n)?n.call(this,this):n,Ht(t)?t.call(this,this):t)}:t:n}function _p(n,t){return Js(Ya(n),Ya(t))}function Ya(n){if(Nt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function He(n,t){return n?[...new Set([].concat(n,t))]:t}function Js(n,t){return n?Ie(Object.create(null),n,t):t}function tc(n,t){return n?Nt(n)&&Nt(t)?[...new Set([...n,...t])]:Ie(Object.create(null),Zl(n),Zl(t??{})):t}function vp(n,t){if(!n)return t;if(!t)return n;const e=Ie(Object.create(null),n);for(const i in t)e[i]=He(n[i],t[i]);return e}function Gh(){return{app:null,config:{isNativeTag:rh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let xp=0;function Mp(n,t){return function(i,s=null){Ht(i)||(i=Ie({},i)),s!=null&&!oe(s)&&(s=null);const r=Gh(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:xp++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:tm,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Ht(u.install)?(o.add(u),u.install(c,...h)):Ht(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||Nn(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,Bo(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(En(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=As;As=c;try{return u()}finally{As=h}}};return c}}let As=null;const Sp=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${xn(t)}Modifiers`]||n[`${$i(t)}Modifiers`];function yp(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||ae;let s=e;const r=t.startsWith("update:"),o=r&&Sp(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>ve(u)?u.trim():u)),o.number&&(s=e.map(Ro)));let a,l=i[a=jo(t)]||i[a=jo(xn(t))];!l&&r&&(l=i[a=jo($i(t))]),l&&En(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,En(c,n,6,s)}}const Ep=new WeakMap;function Wh(n,t,e=!1){const i=e?Ep:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Ht(n)){const l=c=>{const u=Wh(c,t,!0);u&&(a=!0,Ie(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(oe(n)&&i.set(n,null),null):(Nt(r)?r.forEach(l=>o[l]=null):Ie(o,r),oe(n)&&i.set(n,o),o)}function Oo(n,t){return!n||!To(t)?!1:(t=t.slice(2).replace(/Once$/,""),ne(n,t[0].toLowerCase()+t.slice(1))||ne(n,$i(t))||ne(n,t))}function ec(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:x,inheritAttrs:v}=n,m=lo(n);let d,A;try{if(e.shapeFlag&4){const C=s||i,z=C;d=Cn(c.call(z,C,u,h,p,f,x)),A=a}else{const C=t;d=Cn(C.length>1?C(h,{attrs:a,slots:o,emit:l}):C(h,null)),A=t.props?a:bp(a)}}catch(C){ar.length=0,Io(C,n,1),d=Nn(Mi)}let M=d;if(A&&v!==!1){const C=Object.keys(A),{shapeFlag:z}=M;C.length&&z&7&&(r&&C.some(Ao)&&(A=Tp(A,r)),M=Us(M,A,!1,!0))}return e.dirs&&(M=Us(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(e.dirs):e.dirs),e.transition&&bl(M,e.transition),d=M,lo(m),d}const bp=n=>{let t;for(const e in n)(e==="class"||e==="style"||To(e))&&((t||(t={}))[e]=n[e]);return t},Tp=(n,t)=>{const e={};for(const i in n)(!Ao(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function Ap(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?nc(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(Xh(o,i,f)&&!Oo(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?nc(i,o,c):!0:!!o;return!1}function nc(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Xh(t,n,r)&&!Oo(e,r))return!0}return!1}function Xh(n,t,e){const i=n[e],s=t[e];return e==="style"&&oe(i)&&oe(s)?!gr(i,s):i!==s}function wp({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const $h={},jh=()=>Object.create($h),qh=n=>Object.getPrototypeOf(n)===$h;function Cp(n,t,e,i=!1){const s={},r=jh();n.propsDefaults=Object.create(null),Yh(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Nd(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Rp(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ee(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Oo(n.emitsOptions,f))continue;const p=t[f];if(l)if(ne(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const x=xn(f);s[x]=Ka(l,a,x,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{Yh(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!ne(t,h)&&((u=$i(h))===h||!ne(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=Ka(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!ne(t,h))&&(delete r[h],c=!0)}c&&Yn(n.attrs,"set","")}function Yh(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(er(l))continue;const c=t[l];let u;s&&ne(s,u=xn(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Oo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ee(e),c=a||ae;for(let u=0;u<r.length;u++){const h=r[u];e[h]=Ka(s,l,h,c[h],n,!ne(c,h))}}return o}function Ka(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=ne(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ht(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=vr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===$i(e))&&(i=!0))}return i}const Pp=new WeakMap;function Kh(n,t,e=!1){const i=e?Pp:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Ht(n)){const u=h=>{l=!0;const[f,p]=Kh(h,t,!0);Ie(o,f),p&&a.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return oe(n)&&i.set(n,Es),Es;if(Nt(r))for(let u=0;u<r.length;u++){const h=xn(r[u]);ic(h)&&(o[h]=ae)}else if(r)for(const u in r){const h=xn(u);if(ic(h)){const f=r[u],p=o[h]=Nt(f)||Ht(f)?{type:f}:Ie({},f),x=p.type;let v=!1,m=!0;if(Nt(x))for(let d=0;d<x.length;++d){const A=x[d],M=Ht(A)&&A.name;if(M==="Boolean"){v=!0;break}else M==="String"&&(m=!1)}else v=Ht(x)&&x.name==="Boolean";p[0]=v,p[1]=m,(v||ne(p,"default"))&&a.push(h)}}const c=[o,a];return oe(n)&&i.set(n,c),c}function ic(n){return n[0]!=="$"&&!er(n)}const Al=n=>n==="_"||n==="_ctx"||n==="$stable",wl=n=>Nt(n)?n.map(Cn):[Cn(n)],Lp=(n,t,e)=>{if(t._n)return t;const i=qd((...s)=>wl(t(...s)),e);return i._c=!1,i},Zh=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Al(s))continue;const r=n[s];if(Ht(r))t[s]=Lp(s,r,i);else if(r!=null){const o=wl(r);t[s]=()=>o}}},Jh=(n,t)=>{const e=wl(t);n.slots.default=()=>e},Qh=(n,t,e)=>{for(const i in t)(e||!Al(i))&&(n[i]=t[i])},Dp=(n,t,e)=>{const i=n.slots=jh();if(n.vnode.shapeFlag&32){const s=t._;s?(Qh(i,t,e),e&&uh(i,"_",s,!0)):Zh(t,i)}else t&&Jh(n,t)},Ip=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=ae;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:Qh(s,t,e):(r=!t.$stable,Zh(t,s)),o=t}else t&&(Jh(n,t),o={default:1});if(r)for(const a in s)!Al(a)&&o[a]==null&&delete s[a]},$e=Bp;function Up(n){return Np(n)}function Np(n,t){const e=Po();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=Un,insertStaticContent:x}=n,v=(w,L,j,Y=null,it=null,S=null,_=void 0,U=null,F=!!L.dynamicChildren)=>{if(w===L)return;w&&!Vs(w,L)&&(Y=V(w),Pt(w,it,S,!0),w=null),L.patchFlag===-2&&(F=!1,L.dynamicChildren=null);const{type:N,ref:q,shapeFlag:rt}=L;switch(N){case Fo:m(w,L,j,Y);break;case Mi:d(w,L,j,Y);break;case no:w==null&&A(L,j,Y,_);break;case Ee:Z(w,L,j,Y,it,S,_,U,F);break;default:rt&1?z(w,L,j,Y,it,S,_,U,F):rt&6?O(w,L,j,Y,it,S,_,U,F):(rt&64||rt&128)&&N.process(w,L,j,Y,it,S,_,U,F,At)}q!=null&&it?sr(q,w&&w.ref,S,L||w,!L):q==null&&w&&w.ref!=null&&sr(w.ref,null,S,w,!0)},m=(w,L,j,Y)=>{if(w==null)i(L.el=a(L.children),j,Y);else{const it=L.el=w.el;L.children!==w.children&&c(it,L.children)}},d=(w,L,j,Y)=>{w==null?i(L.el=l(L.children||""),j,Y):L.el=w.el},A=(w,L,j,Y)=>{[w.el,w.anchor]=x(w.children,L,j,Y,w.el,w.anchor)},M=({el:w,anchor:L},j,Y)=>{let it;for(;w&&w!==L;)it=f(w),i(w,j,Y),w=it;i(L,j,Y)},C=({el:w,anchor:L})=>{let j;for(;w&&w!==L;)j=f(w),s(w),w=j;s(L)},z=(w,L,j,Y,it,S,_,U,F)=>{if(L.type==="svg"?_="svg":L.type==="math"&&(_="mathml"),w==null)D(L,j,Y,it,S,_,U,F);else{const N=w.el&&w.el._isVueCE?w.el:null;try{N&&N._beginPatch(),T(w,L,it,S,_,U,F)}finally{N&&N._endPatch()}}},D=(w,L,j,Y,it,S,_,U)=>{let F,N;const{props:q,shapeFlag:rt,transition:J,dirs:ft}=w;if(F=w.el=o(w.type,S,q&&q.is,q),rt&8?u(F,w.children):rt&16&&X(w.children,F,null,Y,it,ea(w,S),_,U),ft&&Ai(w,null,Y,"created"),P(F,w,w.scopeId,_,Y),q){for(const ut in q)ut!=="value"&&!er(ut)&&r(F,ut,null,q[ut],S,Y);"value"in q&&r(F,"value",null,q.value,S),(N=q.onVnodeBeforeMount)&&bn(N,Y,w)}ft&&Ai(w,null,Y,"beforeMount");const gt=Op(it,J);gt&&J.beforeEnter(F),i(F,L,j),((N=q&&q.onVnodeMounted)||gt||ft)&&$e(()=>{try{N&&bn(N,Y,w),gt&&J.enter(F),ft&&Ai(w,null,Y,"mounted")}finally{}},it)},P=(w,L,j,Y,it)=>{if(j&&p(w,j),Y)for(let S=0;S<Y.length;S++)p(w,Y[S]);if(it){let S=it.subTree;if(L===S||sf(S.type)&&(S.ssContent===L||S.ssFallback===L)){const _=it.vnode;P(w,_,_.scopeId,_.slotScopeIds,it.parent)}}},X=(w,L,j,Y,it,S,_,U,F=0)=>{for(let N=F;N<w.length;N++){const q=w[N]=U?qn(w[N]):Cn(w[N]);v(null,q,L,j,Y,it,S,_,U)}},T=(w,L,j,Y,it,S,_)=>{const U=L.el=w.el;let{patchFlag:F,dynamicChildren:N,dirs:q}=L;F|=w.patchFlag&16;const rt=w.props||ae,J=L.props||ae;let ft;if(j&&wi(j,!1),(ft=J.onVnodeBeforeUpdate)&&bn(ft,j,L,w),q&&Ai(L,w,j,"beforeUpdate"),j&&wi(j,!0),(rt.innerHTML&&J.innerHTML==null||rt.textContent&&J.textContent==null)&&u(U,""),N?y(w.dynamicChildren,N,U,j,Y,ea(L,it),S):_||H(w,L,U,null,j,Y,ea(L,it),S,!1),F>0){if(F&16)G(U,rt,J,j,it);else if(F&2&&rt.class!==J.class&&r(U,"class",null,J.class,it),F&4&&r(U,"style",rt.style,J.style,it),F&8){const gt=L.dynamicProps;for(let ut=0;ut<gt.length;ut++){const pt=gt[ut],Et=rt[pt],vt=J[pt];(vt!==Et||pt==="value")&&r(U,pt,Et,vt,it,j)}}F&1&&w.children!==L.children&&u(U,L.children)}else!_&&N==null&&G(U,rt,J,j,it);((ft=J.onVnodeUpdated)||q)&&$e(()=>{ft&&bn(ft,j,L,w),q&&Ai(L,w,j,"updated")},Y)},y=(w,L,j,Y,it,S,_)=>{for(let U=0;U<L.length;U++){const F=w[U],N=L[U],q=F.el&&(F.type===Ee||!Vs(F,N)||F.shapeFlag&198)?h(F.el):j;v(F,N,q,null,Y,it,S,_,!0)}},G=(w,L,j,Y,it)=>{if(L!==j){if(L!==ae)for(const S in L)!er(S)&&!(S in j)&&r(w,S,L[S],null,it,Y);for(const S in j){if(er(S))continue;const _=j[S],U=L[S];_!==U&&S!=="value"&&r(w,S,U,_,it,Y)}"value"in j&&r(w,"value",L.value,j.value,it)}},Z=(w,L,j,Y,it,S,_,U,F)=>{const N=L.el=w?w.el:a(""),q=L.anchor=w?w.anchor:a("");let{patchFlag:rt,dynamicChildren:J,slotScopeIds:ft}=L;ft&&(U=U?U.concat(ft):ft),w==null?(i(N,j,Y),i(q,j,Y),X(L.children||[],j,q,it,S,_,U,F)):rt>0&&rt&64&&J&&w.dynamicChildren&&w.dynamicChildren.length===J.length?(y(w.dynamicChildren,J,j,it,S,_,U),(L.key!=null||it&&L===it.subTree)&&tf(w,L,!0)):H(w,L,j,q,it,S,_,U,F)},O=(w,L,j,Y,it,S,_,U,F)=>{L.slotScopeIds=U,w==null?L.shapeFlag&512?it.ctx.activate(L,j,Y,_,F):nt(L,j,Y,it,S,_,F):k(w,L,F)},nt=(w,L,j,Y,it,S,_)=>{const U=w.component=jp(w,Y,it);if(zh(w)&&(U.ctx.renderer=At),Yp(U,!1,_),U.asyncDep){if(it&&it.registerDep(U,R,_),!w.el){const F=U.subTree=Nn(Mi);d(null,F,L,j),w.placeholder=F.el}}else R(U,w,L,j,it,S,_)},k=(w,L,j)=>{const Y=L.component=w.component;if(Ap(w,L,j))if(Y.asyncDep&&!Y.asyncResolved){I(Y,L,j);return}else Y.next=L,Y.update();else L.el=w.el,Y.vnode=L},R=(w,L,j,Y,it,S,_)=>{const U=()=>{if(w.isMounted){let{next:rt,bu:J,u:ft,parent:gt,vnode:ut}=w;{const Dt=ef(w);if(Dt){rt&&(rt.el=ut.el,I(w,rt,_)),Dt.asyncDep.then(()=>{$e(()=>{w.isUnmounted||N()},it)});return}}let pt=rt,Et;wi(w,!1),rt?(rt.el=ut.el,I(w,rt,_)):rt=ut,J&&to(J),(Et=rt.props&&rt.props.onVnodeBeforeUpdate)&&bn(Et,gt,rt,ut),wi(w,!0);const vt=ec(w),yt=w.subTree;w.subTree=vt,v(yt,vt,h(yt.el),V(yt),w,it,S),rt.el=vt.el,pt===null&&wp(w,vt.el),ft&&$e(ft,it),(Et=rt.props&&rt.props.onVnodeUpdated)&&$e(()=>bn(Et,gt,rt,ut),it)}else{let rt;const{el:J,props:ft}=L,{bm:gt,m:ut,parent:pt,root:Et,type:vt}=w,yt=rr(L);wi(w,!1),gt&&to(gt),!yt&&(rt=ft&&ft.onVnodeBeforeMount)&&bn(rt,pt,L),wi(w,!0);{Et.ce&&Et.ce._hasShadowRoot()&&Et.ce._injectChildStyle(vt,w.parent?w.parent.type:void 0);const Dt=w.subTree=ec(w);v(null,Dt,j,Y,w,it,S),L.el=Dt.el}if(ut&&$e(ut,it),!yt&&(rt=ft&&ft.onVnodeMounted)){const Dt=L;$e(()=>bn(rt,pt,Dt),it)}(L.shapeFlag&256||pt&&rr(pt.vnode)&&pt.vnode.shapeFlag&256)&&w.a&&$e(w.a,it),w.isMounted=!0,L=j=Y=null}};w.scope.on();const F=w.effect=new ph(U);w.scope.off();const N=w.update=F.run.bind(F),q=w.job=F.runIfDirty.bind(F);q.i=w,q.id=w.uid,F.scheduler=()=>El(q),wi(w,!0),N()},I=(w,L,j)=>{L.component=w;const Y=w.vnode.props;w.vnode=L,w.next=null,Rp(w,L.props,Y,j),Ip(w,L.children,j),Qn(),ql(w),ti()},H=(w,L,j,Y,it,S,_,U,F=!1)=>{const N=w&&w.children,q=w?w.shapeFlag:0,rt=L.children,{patchFlag:J,shapeFlag:ft}=L;if(J>0){if(J&128){ht(N,rt,j,Y,it,S,_,U,F);return}else if(J&256){ct(N,rt,j,Y,it,S,_,U,F);return}}ft&8?(q&16&&at(N,it,S),rt!==N&&u(j,rt)):q&16?ft&16?ht(N,rt,j,Y,it,S,_,U,F):at(N,it,S,!0):(q&8&&u(j,""),ft&16&&X(rt,j,Y,it,S,_,U,F))},ct=(w,L,j,Y,it,S,_,U,F)=>{w=w||Es,L=L||Es;const N=w.length,q=L.length,rt=Math.min(N,q);let J;for(J=0;J<rt;J++){const ft=L[J]=F?qn(L[J]):Cn(L[J]);v(w[J],ft,j,null,it,S,_,U,F)}N>q?at(w,it,S,!0,!1,rt):X(L,j,Y,it,S,_,U,F,rt)},ht=(w,L,j,Y,it,S,_,U,F)=>{let N=0;const q=L.length;let rt=w.length-1,J=q-1;for(;N<=rt&&N<=J;){const ft=w[N],gt=L[N]=F?qn(L[N]):Cn(L[N]);if(Vs(ft,gt))v(ft,gt,j,null,it,S,_,U,F);else break;N++}for(;N<=rt&&N<=J;){const ft=w[rt],gt=L[J]=F?qn(L[J]):Cn(L[J]);if(Vs(ft,gt))v(ft,gt,j,null,it,S,_,U,F);else break;rt--,J--}if(N>rt){if(N<=J){const ft=J+1,gt=ft<q?L[ft].el:Y;for(;N<=J;)v(null,L[N]=F?qn(L[N]):Cn(L[N]),j,gt,it,S,_,U,F),N++}}else if(N>J)for(;N<=rt;)Pt(w[N],it,S,!0),N++;else{const ft=N,gt=N,ut=new Map;for(N=gt;N<=J;N++){const It=L[N]=F?qn(L[N]):Cn(L[N]);It.key!=null&&ut.set(It.key,N)}let pt,Et=0;const vt=J-gt+1;let yt=!1,Dt=0;const kt=new Array(vt);for(N=0;N<vt;N++)kt[N]=0;for(N=ft;N<=rt;N++){const It=w[N];if(Et>=vt){Pt(It,it,S,!0);continue}let Bt;if(It.key!=null)Bt=ut.get(It.key);else for(pt=gt;pt<=J;pt++)if(kt[pt-gt]===0&&Vs(It,L[pt])){Bt=pt;break}Bt===void 0?Pt(It,it,S,!0):(kt[Bt-gt]=N+1,Bt>=Dt?Dt=Bt:yt=!0,v(It,L[Bt],j,null,it,S,_,U,F),Et++)}const Jt=yt?Fp(kt):Es;for(pt=Jt.length-1,N=vt-1;N>=0;N--){const It=gt+N,Bt=L[It],wt=L[It+1],g=It+1<q?wt.el||nf(wt):Y;kt[N]===0?v(null,Bt,j,g,it,S,_,U,F):yt&&(pt<0||N!==Jt[pt]?xt(Bt,j,g,2):pt--)}}},xt=(w,L,j,Y,it=null)=>{const{el:S,type:_,transition:U,children:F,shapeFlag:N}=w;if(N&6){xt(w.component.subTree,L,j,Y);return}if(N&128){w.suspense.move(L,j,Y);return}if(N&64){_.move(w,L,j,At);return}if(_===Ee){i(S,L,j);for(let rt=0;rt<F.length;rt++)xt(F[rt],L,j,Y);i(w.anchor,L,j);return}if(_===no){M(w,L,j);return}if(Y!==2&&N&1&&U)if(Y===0)U.persisted&&!S[Qo]?i(S,L,j):(U.beforeEnter(S),i(S,L,j),$e(()=>U.enter(S),it));else{const{leave:rt,delayLeave:J,afterLeave:ft}=U,gt=()=>{w.ctx.isUnmounted?s(S):i(S,L,j)},ut=()=>{const pt=S._isLeaving||!!S[Qo];S._isLeaving&&S[Qo](!0),U.persisted&&!pt?gt():rt(S,()=>{gt(),ft&&ft()})};J?J(S,gt,ut):ut()}else i(S,L,j)},Pt=(w,L,j,Y=!1,it=!1)=>{const{type:S,props:_,ref:U,children:F,dynamicChildren:N,shapeFlag:q,patchFlag:rt,dirs:J,cacheIndex:ft,memo:gt}=w;if(rt===-2&&(it=!1),U!=null&&(Qn(),sr(U,null,j,w,!0),ti()),ft!=null&&(L.renderCache[ft]=void 0),q&256){L.ctx.deactivate(w);return}const ut=q&1&&J,pt=!rr(w);let Et;if(pt&&(Et=_&&_.onVnodeBeforeUnmount)&&bn(Et,L,w),q&6)dt(w.component,j,Y);else{if(q&128){w.suspense.unmount(j,Y);return}ut&&Ai(w,null,L,"beforeUnmount"),q&64?w.type.remove(w,L,j,At,Y):N&&!N.hasOnce&&(S!==Ee||rt>0&&rt&64)?at(N,L,j,!1,!0):(S===Ee&&rt&384||!it&&q&16)&&at(F,L,j),Y&&Yt(w)}const vt=gt!=null&&ft==null;(pt&&(Et=_&&_.onVnodeUnmounted)||ut||vt)&&$e(()=>{Et&&bn(Et,L,w),ut&&Ai(w,null,L,"unmounted"),vt&&(w.el=null)},j)},Yt=w=>{const{type:L,el:j,anchor:Y,transition:it}=w;if(L===Ee){st(j,Y);return}if(L===no){C(w);return}const S=()=>{s(j),it&&!it.persisted&&it.afterLeave&&it.afterLeave()};if(w.shapeFlag&1&&it&&!it.persisted){const{leave:_,delayLeave:U}=it,F=()=>_(j,S);U?U(w.el,S,F):F()}else S()},st=(w,L)=>{let j;for(;w!==L;)j=f(w),s(w),w=j;s(L)},dt=(w,L,j)=>{const{bum:Y,scope:it,job:S,subTree:_,um:U,m:F,a:N}=w;sc(F),sc(N),Y&&to(Y),it.stop(),S&&(S.flags|=8,Pt(_,w,L,j)),U&&$e(U,L),$e(()=>{w.isUnmounted=!0},L)},at=(w,L,j,Y=!1,it=!1,S=0)=>{for(let _=S;_<w.length;_++)Pt(w[_],L,j,Y,it)},V=w=>{if(w.shapeFlag&6)return V(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const L=f(w.anchor||w.el),j=L&&L[Qd];return j?f(j):L};let lt=!1;const Tt=(w,L,j)=>{let Y;w==null?L._vnode&&(Pt(L._vnode,null,null,!0),Y=L._vnode.component):v(L._vnode||null,w,L,null,null,null,j),L._vnode=w,lt||(lt=!0,ql(Y),Dh(),lt=!1)},At={p:v,um:Pt,m:xt,r:Yt,mt:nt,mc:X,pc:H,pbc:y,n:V,o:n};return{render:Tt,hydrate:void 0,createApp:Mp(Tt)}}function ea({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function wi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function Op(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function tf(n,t,e=!1){const i=n.children,s=t.children;if(Nt(i)&&Nt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=qn(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&tf(o,a)),a.type===Fo&&(a.patchFlag===-1&&(a=s[r]=qn(a)),a.el=o.el),a.type===Mi&&!a.el&&(a.el=o.el)}}function Fp(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function ef(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ef(t)}function sc(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function nf(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?nf(t.subTree):null}const sf=n=>n.__isSuspense;function Bp(n,t){t&&t.pendingBranch?Nt(n)?t.effects.push(...n):t.effects.push(n):jd(n)}const Ee=Symbol.for("v-fgt"),Fo=Symbol.for("v-txt"),Mi=Symbol.for("v-cmt"),no=Symbol.for("v-stc"),ar=[];let tn=null;function Ut(n=!1){ar.push(tn=n?null:[])}function zp(){ar.pop(),tn=ar[ar.length-1]||null}let fr=1;function rc(n,t=!1){fr+=n,n<0&&tn&&t&&(tn.hasOnce=!0)}function rf(n){return n.dynamicChildren=fr>0?tn||Es:null,zp(),fr>0&&tn&&tn.push(n),n}function Ft(n,t,e,i,s,r){return rf(E(n,t,e,i,s,r,!0))}function Hp(n,t,e,i,s){return rf(Nn(n,t,e,i,s,!0))}function of(n){return n?n.__v_isVNode===!0:!1}function Vs(n,t){return n.type===t.type&&n.key===t.key}const af=({key:n})=>n??null,io=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?ve(n)||Be(n)||Ht(n)?{i:an,r:n,k:t,f:!!e}:n:null);function E(n,t=null,e=null,i=0,s=null,r=n===Ee?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&af(t),ref:t&&io(t),scopeId:Uh,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:an};return a?(Cl(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=ve(e)?8:16),fr>0&&!o&&tn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&tn.push(l),l}const Nn=kp;function kp(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===fp)&&(n=Mi),of(n)){const a=Us(n,t,!0);return e&&Cl(a,e),fr>0&&!r&&tn&&(a.shapeFlag&6?tn[tn.indexOf(n)]=a:tn.push(a)),a.patchFlag=-2,a}if(Qp(n)&&(n=n.__vccOpts),t){t=Vp(t);let{class:a,style:l}=t;a&&!ve(a)&&(t.class=ue(a)),oe(l)&&(yl(l)&&!Nt(l)&&(l=Ie({},l)),t.style=Lo(l))}const o=ve(n)?1:sf(n)?128:tp(n)?64:oe(n)?4:Ht(n)?2:0;return E(n,t,e,i,s,o,r,!0)}function Vp(n){return n?yl(n)||qh(n)?Ie({},n):n:null}function Us(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?Wp(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&af(c),ref:t&&t.ref?e&&r?Nt(r)?r.concat(io(t)):[r,io(t)]:io(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Ee?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Us(n.ssContent),ssFallback:n.ssFallback&&Us(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&bl(u,l.clone(u)),u}function lf(n=" ",t=0){return Nn(Fo,null,n,t)}function Gp(n,t){const e=Nn(no,null,n);return e.staticCount=t,e}function be(n="",t=!1){return t?(Ut(),Hp(Mi,null,n)):Nn(Mi,null,n)}function Cn(n){return n==null||typeof n=="boolean"?Nn(Mi):Nt(n)?Nn(Ee,null,n.slice()):of(n)?qn(n):Nn(Fo,null,String(n))}function qn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Us(n)}function Cl(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Nt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Cl(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!qh(t)?t._ctx=an:s===3&&an&&(an.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Ht(t)?(t={default:t,_ctx:an},e=32):(t=String(t),i&64?(e=16,t=[lf(t)]):e=8);n.children=t,n.shapeFlag|=e}function Wp(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=ue([t.class,i.class]));else if(s==="style")t.style=Lo([t.style,i.style]);else if(To(s)){const r=t[s],o=i[s];o&&r!==o&&!(Nt(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!Ao(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function bn(n,t,e,i=null){En(n,t,7,[e,i])}const Xp=Gh();let $p=0;function jp(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||Xp,r={uid:$p++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new gd(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Kh(i,s),emitsOptions:Wh(i,s),emit:null,emitted:null,propsDefaults:ae,inheritAttrs:i.inheritAttrs,ctx:ae,data:ae,props:ae,attrs:ae,slots:ae,refs:ae,setupState:ae,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=yp.bind(null,r),n.ce&&n.ce(r),r}let We=null;const qp=()=>We||an;let ho,Za;{const n=Po(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};ho=t("__VUE_INSTANCE_SETTERS__",e=>We=e),Za=t("__VUE_SSR_SETTERS__",e=>dr=e)}const vr=n=>{const t=We;return ho(n),n.scope.on(),()=>{n.scope.off(),ho(t)}},oc=()=>{We&&We.scope.off(),ho(null)};function cf(n){return n.vnode.shapeFlag&4}let dr=!1;function Yp(n,t=!1,e=!1){t&&Za(t);const{props:i,children:s}=n.vnode,r=cf(n);Cp(n,i,r,t),Dp(n,s,e||t);const o=r?Kp(n,t):void 0;return t&&Za(!1),o}function Kp(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,dp);const{setup:i}=e;if(i){Qn();const s=n.setupContext=i.length>1?Jp(n):null,r=vr(n),o=_r(i,n,0,[n.props,s]),a=oh(o);if(ti(),r(),(a||n.sp)&&!rr(n)&&Bh(n),a){if(o.then(oc,oc),t)return o.then(l=>{ac(n,l)}).catch(l=>{Io(l,n,0)});n.asyncDep=o}else ac(n,o)}else uf(n)}function ac(n,t,e){Ht(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:oe(t)&&(n.setupState=Ch(t)),uf(n)}function uf(n,t,e){const i=n.type;n.render||(n.render=i.render||Un);{const s=vr(n);Qn();try{pp(n)}finally{ti(),s()}}}const Zp={get(n,t){return Fe(n,"get",""),n[t]}};function Jp(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,Zp),slots:n.slots,emit:n.emit,expose:t}}function Bo(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Ch(Od(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in or)return or[e](n)},has(t,e){return e in t||e in or}})):n.proxy}function Qp(n){return Ht(n)&&"__vccOpts"in n}const fo=(n,t)=>Vd(n,t,dr),tm="3.5.35";/**
* @vue/runtime-dom v3.5.35
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ja;const lc=typeof window<"u"&&window.trustedTypes;if(lc)try{Ja=lc.createPolicy("vue",{createHTML:n=>n})}catch{}const hf=Ja?n=>Ja.createHTML(n):n=>n,em="http://www.w3.org/2000/svg",nm="http://www.w3.org/1998/Math/MathML",jn=typeof document<"u"?document:null,cc=jn&&jn.createElement("template"),im={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?jn.createElementNS(em,n):t==="mathml"?jn.createElementNS(nm,n):e?jn.createElement(n,{is:e}):jn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>jn.createTextNode(n),createComment:n=>jn.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>jn.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{cc.innerHTML=hf(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=cc.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},sm=Symbol("_vtc");function rm(n,t,e){const i=n[sm];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const po=Symbol("_vod"),ff=Symbol("_vsh"),uc={name:"show",beforeMount(n,{value:t},{transition:e}){n[po]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):Gs(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),Gs(n,!0),i.enter(n)):i.leave(n,()=>{Gs(n,!1)}):Gs(n,t))},beforeUnmount(n,{value:t}){Gs(n,t)}};function Gs(n,t){n.style.display=t?n[po]:"none",n[ff]=!t}const om=Symbol(""),am=/(?:^|;)\s*display\s*:/;function lm(n,t,e){const i=n.style,s=ve(e);let r=!1;if(e&&!s){if(t)if(ve(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Qs(i,a,"")}else for(const o in t)e[o]==null&&Qs(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?um(n,o,!ve(t)&&t?t[o]:void 0,a)||Qs(i,o,a):Qs(i,o,"")}}else if(s){if(t!==e){const o=i[om];o&&(e+=";"+o),i.cssText=e,r=am.test(e)}}else t&&n.removeAttribute("style");po in n&&(n[po]=r?i.display:"",n[ff]&&(i.display="none"))}const hc=/\s*!important$/;function Qs(n,t,e){if(Nt(e))e.forEach(i=>Qs(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=cm(n,t);hc.test(e)?n.setProperty($i(i),e.replace(hc,""),"important"):n[i]=e}}const fc=["Webkit","Moz","ms"],na={};function cm(n,t){const e=na[t];if(e)return e;let i=xn(t);if(i!=="filter"&&i in n)return na[t]=i;i=ch(i);for(let s=0;s<fc.length;s++){const r=fc[s]+i;if(r in n)return na[t]=r}return t}function um(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&ve(i)&&e===i}const dc="http://www.w3.org/1999/xlink";function pc(n,t,e,i,s,r=dd(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(dc,t.slice(6,t.length)):n.setAttributeNS(dc,t,e):e==null||r&&!hh(e)?n.removeAttribute(t):n.setAttribute(t,r?"":On(e)?String(e):e)}function mc(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?hf(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=hh(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Oi(n,t,e,i){n.addEventListener(t,e,i)}function hm(n,t,e,i){n.removeEventListener(t,e,i)}const gc=Symbol("_vei");function fm(n,t,e,i,s=null){const r=n[gc]||(n[gc]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=dm(t);if(i){const c=r[t]=gm(i,s);Oi(n,a,c,l)}else o&&(hm(n,a,o,l),r[t]=void 0)}}const _c=/(?:Once|Passive|Capture)$/;function dm(n){let t;if(_c.test(n)){t={};let i;for(;i=n.match(_c);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):$i(n.slice(2)),t]}let ia=0;const pm=Promise.resolve(),mm=()=>ia||(pm.then(()=>ia=0),ia=Date.now());function gm(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;const s=e.value;if(Nt(s)){const r=i.stopImmediatePropagation;i.stopImmediatePropagation=()=>{r.call(i),i._stopped=!0};const o=s.slice(),a=[i];for(let l=0;l<o.length&&!i._stopped;l++){const c=o[l];c&&En(c,t,5,a)}}else En(s,t,5,[i])};return e.value=n,e.attached=mm(),e}const vc=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,_m=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?rm(n,i,o):t==="style"?lm(n,e,i):To(t)?Ao(t)||fm(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):vm(n,t,i,o))?(mc(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&pc(n,t,i,o,r,t!=="value")):n._isVueCE&&(xm(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!ve(i)))?mc(n,xn(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),pc(n,t,i,o))};function vm(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&vc(t)&&Ht(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return vc(t)&&ve(e)?!1:t in n}function xm(n,t){const e=n._def.props;if(!e)return!1;const i=xn(t);return Array.isArray(e)?e.some(s=>xn(s)===i):Object.keys(e).some(s=>xn(s)===i)}const mo=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Nt(t)?e=>to(t,e):t};function Mm(n){n.target.composing=!0}function xc(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const ws=Symbol("_assign");function Mc(n,t,e){return t&&(n=n.trim()),e&&(n=Ro(n)),n}const sn={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n[ws]=mo(s);const r=i||s.props&&s.props.type==="number";Oi(n,t?"change":"input",o=>{o.target.composing||n[ws](Mc(n.value,e,r))}),(e||r)&&Oi(n,"change",()=>{n.value=Mc(n.value,e,r)}),t||(Oi(n,"compositionstart",Mm),Oi(n,"compositionend",xc),Oi(n,"change",xc))},mounted(n,{value:t}){n.value=t??""},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[ws]=mo(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?Ro(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},Ar={deep:!0,created(n,{value:t,modifiers:{number:e}},i){const s=wo(t);Oi(n,"change",()=>{const r=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>e?Ro(go(o)):go(o));n[ws](n.multiple?s?new Set(r):r:r[0]),n._assigning=!0,Ph(()=>{n._assigning=!1})}),n[ws]=mo(i)},mounted(n,{value:t}){Sc(n,t)},beforeUpdate(n,t,e){n[ws]=mo(e)},updated(n,{value:t}){n._assigning||Sc(n,t)}};function Sc(n,t){const e=n.multiple,i=Nt(t);if(!(e&&!i&&!wo(t))){for(let s=0,r=n.options.length;s<r;s++){const o=n.options[s],a=go(o);if(e)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=t.some(c=>String(c)===String(a)):o.selected=md(t,a)>-1}else o.selected=t.has(a);else if(gr(go(o),t)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!e&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function go(n){return"_value"in n?n._value:n.value}const Sm=["ctrl","shift","alt","meta"],ym={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>Sm.some(e=>n[`${e}Key`]&&!t.includes(e))},Qa=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=(s,...r)=>{for(let o=0;o<t.length;o++){const a=ym[t[o]];if(a&&a(s,t))return}return n(s,...r)})},Em=Ie({patchProp:_m},im);let yc;function bm(){return yc||(yc=Up(Em))}const Tm=(...n)=>{const t=bm().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=wm(i);if(!s)return;const r=t._component;!Ht(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,Am(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t};function Am(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function wm(n){return ve(n)?document.querySelector(n):n}const tl="/digital-twin/logo.svg";/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rl="163",Zi={ROTATE:0,DOLLY:1,PAN:2},Ji={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Cm=0,Ec=1,Rm=2,df=1,pf=2,$n=3,Si=0,je=1,on=2,gi=0,Cs=1,bc=2,Tc=3,Ac=4,Pm=5,Fi=100,Lm=101,Dm=102,Im=103,Um=104,Nm=200,Om=201,Fm=202,Bm=203,el=204,nl=205,zm=206,Hm=207,km=208,Vm=209,Gm=210,Wm=211,Xm=212,$m=213,jm=214,qm=0,Ym=1,Km=2,_o=3,Zm=4,Jm=5,Qm=6,tg=7,mf=0,eg=1,ng=2,_i=0,ig=1,sg=2,rg=3,gf=4,og=5,ag=6,lg=7,_f=300,Ns=301,Os=302,il=303,sl=304,zo=306,rl=1e3,zi=1001,ol=1002,ln=1003,cg=1004,wr=1005,_n=1006,sa=1007,Hi=1008,vi=1009,ug=1010,hg=1011,vf=1012,xf=1013,Fs=1014,mi=1015,vo=1016,Mf=1017,Sf=1018,xr=1020,fg=35902,dg=1021,pg=1022,In=1023,mg=1024,gg=1025,Rs=1026,pr=1027,_g=1028,yf=1029,vg=1030,Ef=1031,bf=1033,ra=33776,oa=33777,aa=33778,la=33779,wc=35840,Cc=35841,Rc=35842,Pc=35843,Tf=36196,Lc=37492,Dc=37496,Ic=37808,Uc=37809,Nc=37810,Oc=37811,Fc=37812,Bc=37813,zc=37814,Hc=37815,kc=37816,Vc=37817,Gc=37818,Wc=37819,Xc=37820,$c=37821,ca=36492,jc=36494,qc=36495,xg=36283,Yc=36284,Kc=36285,Zc=36286,Mg=3200,Sg=3201,Af=0,yg=1,pi="",An="srgb",Ei="srgb-linear",Pl="display-p3",Ho="display-p3-linear",xo="linear",ce="srgb",Mo="rec709",So="p3",Qi=7680,Jc=519,Eg=512,bg=513,Tg=514,wf=515,Ag=516,wg=517,Cg=518,Rg=519,al=35044,Qc="300 es",Jn=2e3,yo=2001;class ji{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],so=Math.PI/180,ll=180/Math.PI;function xi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Ge(n,t,e){return Math.max(t,Math.min(e,n))}function Pg(n,t){return(n%t+t)%t}function ua(n,t,e){return(1-e)*n+e*t}function Ln(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function se(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Lg={DEG2RAD:so};class Ct{constructor(t=0,e=0){Ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ge(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,i,s,r,o,a,l,c){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],x=i[8],v=s[0],m=s[3],d=s[6],A=s[1],M=s[4],C=s[7],z=s[2],D=s[5],P=s[8];return r[0]=o*v+a*A+l*z,r[3]=o*m+a*M+l*D,r[6]=o*d+a*C+l*P,r[1]=c*v+u*A+h*z,r[4]=c*m+u*M+h*D,r[7]=c*d+u*C+h*P,r[2]=f*v+p*A+x*z,r[5]=f*m+p*M+x*D,r[8]=f*d+p*C+x*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,p=c*r-o*l,x=e*h+i*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return t[0]=h*v,t[1]=(s*c-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=p*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ha.makeScale(t,e)),this}rotate(t){return this.premultiply(ha.makeRotation(-t)),this}translate(t,e){return this.premultiply(ha.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ha=new $t;function Cf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Eo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Dg(){const n=Eo("canvas");return n.style.display="block",n}const tu={};function Rf(n){n in tu||(tu[n]=!0,console.warn(n))}const eu=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nu=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Cr={[Ei]:{transfer:xo,primaries:Mo,toReference:n=>n,fromReference:n=>n},[An]:{transfer:ce,primaries:Mo,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ho]:{transfer:xo,primaries:So,toReference:n=>n.applyMatrix3(nu),fromReference:n=>n.applyMatrix3(eu)},[Pl]:{transfer:ce,primaries:So,toReference:n=>n.convertSRGBToLinear().applyMatrix3(nu),fromReference:n=>n.applyMatrix3(eu).convertLinearToSRGB()}},Ig=new Set([Ei,Ho]),re={enabled:!0,_workingColorSpace:Ei,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Ig.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Cr[t].toReference,s=Cr[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Cr[n].primaries},getTransfer:function(n){return n===pi?xo:Cr[n].transfer}};function Ps(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ts;class Ug{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ts===void 0&&(ts=Eo("canvas")),ts.width=t.width,ts.height=t.height;const i=ts.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ts}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Eo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ps(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ps(e[i]/255)*255):e[i]=Ps(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ng=0;class Pf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=xi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(da(s[o].image)):r.push(da(s[o]))}else r=da(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function da(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ug.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Og=0;class Xe extends ji{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,i=zi,s=zi,r=_n,o=Hi,a=In,l=vi,c=Xe.DEFAULT_ANISOTROPY,u=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=xi(),this.name="",this.source=new Pf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_f)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case rl:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case ol:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case rl:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case ol:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=_f;Xe.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,e=0,i=0,s=1){pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],x=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(x+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,C=(p+1)/2,z=(d+1)/2,D=(u+f)/4,P=(h+v)/4,X=(x+m)/4;return M>C&&M>z?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=D/i,r=P/i):C>z?C<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(C),i=D/s,r=X/s):z<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(z),i=P/r,s=X/r),this.set(i,s,r,e),this}let A=Math.sqrt((m-x)*(m-x)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(m-x)/A,this.y=(h-v)/A,this.z=(f-u)/A,this.w=Math.acos((c+p+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fg extends ji{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},i);const r=new Xe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Pf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wi extends Fg{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Lf extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bg extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],p=r[o+1],x=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=x,t[e+3]=v;return}if(h!==v||l!==f||c!==p||u!==x){let m=1-a;const d=l*f+c*p+u*x+h*v,A=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const z=Math.sqrt(M),D=Math.atan2(z,d*A);m=Math.sin(m*D)/z,a=Math.sin(a*D)/z}const C=a*A;if(l=l*m+f*C,c=c*m+p*C,u=u*m+x*C,h=h*m+v*C,m===1-a){const z=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=z,c*=z,u*=z,h*=z}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],p=r[o+2],x=r[o+3];return t[e]=a*x+u*h+l*p-c*f,t[e+1]=l*x+u*f+c*h-a*p,t[e+2]=c*x+u*p+a*f-l*h,t[e+3]=u*x-a*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),p=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*p*x,this._y=c*p*h-f*u*x,this._z=c*u*x+f*p*h,this._w=c*u*h-f*p*x;break;case"YXZ":this._x=f*u*h+c*p*x,this._y=c*p*h-f*u*x,this._z=c*u*x-f*p*h,this._w=c*u*h+f*p*x;break;case"ZXY":this._x=f*u*h-c*p*x,this._y=c*p*h+f*u*x,this._z=c*u*x+f*p*h,this._w=c*u*h-f*p*x;break;case"ZYX":this._x=f*u*h-c*p*x,this._y=c*p*h+f*u*x,this._z=c*u*x-f*p*h,this._w=c*u*h+f*p*x;break;case"YZX":this._x=f*u*h+c*p*x,this._y=c*p*h+f*u*x,this._z=c*u*x-f*p*h,this._w=c*u*h-f*p*x;break;case"XZY":this._x=f*u*h-c*p*x,this._y=c*p*h-f*u*x,this._z=c*u*x+f*p*h,this._w=c*u*h+f*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ge(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,i=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(iu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(iu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return pa.copy(this).projectOnVector(t),this.sub(pa)}reflect(t){return this.sub(pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ge(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new B,iu=new Xi;class Mr{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,un):un.fromBufferAttribute(r,o),un.applyMatrix4(t.matrixWorld),this.expandByPoint(un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Rr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Rr.copy(i.boundingBox)),Rr.applyMatrix4(t.matrixWorld),this.union(Rr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ws),Pr.subVectors(this.max,Ws),es.subVectors(t.a,Ws),ns.subVectors(t.b,Ws),is.subVectors(t.c,Ws),ri.subVectors(ns,es),oi.subVectors(is,ns),Ci.subVectors(es,is);let e=[0,-ri.z,ri.y,0,-oi.z,oi.y,0,-Ci.z,Ci.y,ri.z,0,-ri.x,oi.z,0,-oi.x,Ci.z,0,-Ci.x,-ri.y,ri.x,0,-oi.y,oi.x,0,-Ci.y,Ci.x,0];return!ma(e,es,ns,is,Pr)||(e=[1,0,0,0,1,0,0,0,1],!ma(e,es,ns,is,Pr))?!1:(Lr.crossVectors(ri,oi),e=[Lr.x,Lr.y,Lr.z],ma(e,es,ns,is,Pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const kn=[new B,new B,new B,new B,new B,new B,new B,new B],un=new B,Rr=new Mr,es=new B,ns=new B,is=new B,ri=new B,oi=new B,Ci=new B,Ws=new B,Pr=new B,Lr=new B,Ri=new B;function ma(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ri.fromArray(n,r);const a=s.x*Math.abs(Ri.x)+s.y*Math.abs(Ri.y)+s.z*Math.abs(Ri.z),l=t.dot(Ri),c=e.dot(Ri),u=i.dot(Ri);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const zg=new Mr,Xs=new B,ga=new B;class Sr{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):zg.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xs.subVectors(t,this.center);const e=Xs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ga.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xs.copy(t.center).add(ga)),this.expandByPoint(Xs.copy(t.center).sub(ga))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Vn=new B,_a=new B,Dr=new B,ai=new B,va=new B,Ir=new B,xa=new B;class ko{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Vn.copy(this.origin).addScaledVector(this.direction,e),Vn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){_a.copy(t).add(e).multiplyScalar(.5),Dr.copy(e).sub(t).normalize(),ai.copy(this.origin).sub(_a);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Dr),a=ai.dot(this.direction),l=-ai.dot(Dr),c=ai.lengthSq(),u=Math.abs(1-o*o);let h,f,p,x;if(u>0)if(h=o*l-a,f=o*a-l,x=r*u,h>=0)if(f>=-x)if(f<=x){const v=1/u;h*=v,f*=v,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-x?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=x?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(_a).addScaledVector(Dr,f),p}intersectSphere(t,e){Vn.subVectors(t.center,this.origin);const i=Vn.dot(this.direction),s=Vn.dot(Vn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Vn)!==null}intersectTriangle(t,e,i,s,r){va.subVectors(e,t),Ir.subVectors(i,t),xa.crossVectors(va,Ir);let o=this.direction.dot(xa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ai.subVectors(this.origin,t);const l=a*this.direction.dot(Ir.crossVectors(ai,Ir));if(l<0)return null;const c=a*this.direction.dot(va.cross(ai));if(c<0||l+c>o)return null;const u=-a*ai.dot(xa);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,i,s,r,o,a,l,c,u,h,f,p,x,v,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,p,x,v,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,p,x,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=x,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/ss.setFromMatrixColumn(t,0).length(),r=1/ss.setFromMatrixColumn(t,1).length(),o=1/ss.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,p=o*h,x=a*u,v=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+x*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=x+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,x=c*u,v=c*h;e[0]=f+v*a,e[4]=x*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-x,e[6]=v+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,x=c*u,v=c*h;e[0]=f-v*a,e[4]=-o*h,e[8]=x+p*a,e[1]=p+x*a,e[5]=o*u,e[9]=v-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,p=o*h,x=a*u,v=a*h;e[0]=l*u,e[4]=x*c-p,e[8]=f*c+v,e[1]=l*h,e[5]=v*c+f,e[9]=p*c-x,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,x=a*l,v=a*c;e[0]=l*u,e[4]=v-f*h,e[8]=x*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*h+x,e[10]=f-v*h}else if(t.order==="XZY"){const f=o*l,p=o*c,x=a*l,v=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+v,e[5]=o*u,e[9]=p*h-x,e[2]=x*h-p,e[6]=a*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hg,t,kg)}lookAt(t,e,i){const s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),li.crossVectors(i,Ze),li.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),li.crossVectors(i,Ze)),li.normalize(),Ur.crossVectors(Ze,li),s[0]=li.x,s[4]=Ur.x,s[8]=Ze.x,s[1]=li.y,s[5]=Ur.y,s[9]=Ze.y,s[2]=li.z,s[6]=Ur.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],x=i[2],v=i[6],m=i[10],d=i[14],A=i[3],M=i[7],C=i[11],z=i[15],D=s[0],P=s[4],X=s[8],T=s[12],y=s[1],G=s[5],Z=s[9],O=s[13],nt=s[2],k=s[6],R=s[10],I=s[14],H=s[3],ct=s[7],ht=s[11],xt=s[15];return r[0]=o*D+a*y+l*nt+c*H,r[4]=o*P+a*G+l*k+c*ct,r[8]=o*X+a*Z+l*R+c*ht,r[12]=o*T+a*O+l*I+c*xt,r[1]=u*D+h*y+f*nt+p*H,r[5]=u*P+h*G+f*k+p*ct,r[9]=u*X+h*Z+f*R+p*ht,r[13]=u*T+h*O+f*I+p*xt,r[2]=x*D+v*y+m*nt+d*H,r[6]=x*P+v*G+m*k+d*ct,r[10]=x*X+v*Z+m*R+d*ht,r[14]=x*T+v*O+m*I+d*xt,r[3]=A*D+M*y+C*nt+z*H,r[7]=A*P+M*G+C*k+z*ct,r[11]=A*X+M*Z+C*R+z*ht,r[15]=A*T+M*O+C*I+z*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],x=t[3],v=t[7],m=t[11],d=t[15];return x*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*p-i*l*p)+v*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*u-r*l*u)+m*(+e*c*h-e*a*p-r*o*h+i*o*p+r*a*u-i*c*u)+d*(-s*a*u-e*l*h+e*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],x=t[12],v=t[13],m=t[14],d=t[15],A=h*m*c-v*f*c+v*l*p-a*m*p-h*l*d+a*f*d,M=x*f*c-u*m*c-x*l*p+o*m*p+u*l*d-o*f*d,C=u*v*c-x*h*c+x*a*p-o*v*p-u*a*d+o*h*d,z=x*h*l-u*v*l-x*a*f+o*v*f+u*a*m-o*h*m,D=e*A+i*M+s*C+r*z;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/D;return t[0]=A*P,t[1]=(v*f*r-h*m*r-v*s*p+i*m*p+h*s*d-i*f*d)*P,t[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*d+i*l*d)*P,t[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*p-i*l*p)*P,t[4]=M*P,t[5]=(u*m*r-x*f*r+x*s*p-e*m*p-u*s*d+e*f*d)*P,t[6]=(x*l*r-o*m*r-x*s*c+e*m*c+o*s*d-e*l*d)*P,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*p+e*l*p)*P,t[8]=C*P,t[9]=(x*h*r-u*v*r-x*i*p+e*v*p+u*i*d-e*h*d)*P,t[10]=(o*v*r-x*a*r+x*i*c-e*v*c-o*i*d+e*a*d)*P,t[11]=(u*a*r-o*h*r-u*i*c+e*h*c+o*i*p-e*a*p)*P,t[12]=z*P,t[13]=(u*v*s-x*h*s+x*i*f-e*v*f-u*i*m+e*h*m)*P,t[14]=(x*a*s-o*v*s-x*i*l+e*v*l+o*i*m-e*a*m)*P,t[15]=(o*h*s-u*a*s+u*i*l-e*h*l-o*i*f+e*a*f)*P,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,p=r*u,x=r*h,v=o*u,m=o*h,d=a*h,A=l*c,M=l*u,C=l*h,z=i.x,D=i.y,P=i.z;return s[0]=(1-(v+d))*z,s[1]=(p+C)*z,s[2]=(x-M)*z,s[3]=0,s[4]=(p-C)*D,s[5]=(1-(f+d))*D,s[6]=(m+A)*D,s[7]=0,s[8]=(x+M)*P,s[9]=(m-A)*P,s[10]=(1-(f+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=ss.set(s[0],s[1],s[2]).length();const o=ss.set(s[4],s[5],s[6]).length(),a=ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const c=1/r,u=1/o,h=1/a;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=h,hn.elements[9]*=h,hn.elements[10]*=h,e.setFromRotationMatrix(hn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Jn){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s);let p,x;if(a===Jn)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===yo)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Jn){const l=this.elements,c=1/(e-t),u=1/(i-s),h=1/(o-r),f=(e+t)*c,p=(i+s)*u;let x,v;if(a===Jn)x=(o+r)*h,v=-2*h;else if(a===yo)x=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ss=new B,hn=new he,Hg=new B(0,0,0),kg=new B(1,1,1),li=new B,Ur=new B,Ze=new B,su=new he,ru=new Xi;class Fn{constructor(t=0,e=0,i=0,s=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return su.makeRotationFromQuaternion(t),this.setFromRotationMatrix(su,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ru.setFromEuler(this),this.setFromQuaternion(ru,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class Ll{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Vg=0;const ou=new B,rs=new Xi,Gn=new he,Nr=new B,$s=new B,Gg=new B,Wg=new Xi,au=new B(1,0,0),lu=new B(0,1,0),cu=new B(0,0,1),uu={type:"added"},Xg={type:"removed"},os={type:"childadded",child:null},Ma={type:"childremoved",child:null};class Le extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new B,e=new Fn,i=new Xi,s=new B(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new $t}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ll,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.multiply(rs),this}rotateOnWorldAxis(t,e){return rs.setFromAxisAngle(t,e),this.quaternion.premultiply(rs),this}rotateX(t){return this.rotateOnAxis(au,t)}rotateY(t){return this.rotateOnAxis(lu,t)}rotateZ(t){return this.rotateOnAxis(cu,t)}translateOnAxis(t,e){return ou.copy(t).applyQuaternion(this.quaternion),this.position.add(ou.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(au,t)}translateY(t){return this.translateOnAxis(lu,t)}translateZ(t){return this.translateOnAxis(cu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Nr.copy(t):Nr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt($s,Nr,this.up):Gn.lookAt(Nr,$s,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Gn),this.quaternion.premultiply(rs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(uu),os.child=t,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xg),Ma.child=t,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(uu),os.child=t,this.dispatchEvent(os),os.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,t,Gg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,Wg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++){const r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),x=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Le.DEFAULT_UP=new B(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new B,Wn=new B,Sa=new B,Xn=new B,as=new B,ls=new B,hu=new B,ya=new B,Ea=new B,ba=new B;class vn{constructor(t=new B,e=new B,i=new B){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),fn.subVectors(t,e),s.cross(fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){fn.subVectors(s,e),Wn.subVectors(i,e),Sa.subVectors(t,e);const o=fn.dot(fn),a=fn.dot(Wn),l=fn.dot(Sa),c=Wn.dot(Wn),u=Wn.dot(Sa),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,x=(o*u-a*l)*f;return r.set(1-p-x,x,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Xn.x),l.addScaledVector(o,Xn.y),l.addScaledVector(a,Xn.z),l)}static isFrontFacing(t,e,i,s){return fn.subVectors(i,e),Wn.subVectors(t,e),fn.cross(Wn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),fn.cross(Wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return vn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;as.subVectors(s,i),ls.subVectors(r,i),ya.subVectors(t,i);const l=as.dot(ya),c=ls.dot(ya);if(l<=0&&c<=0)return e.copy(i);Ea.subVectors(t,s);const u=as.dot(Ea),h=ls.dot(Ea);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(as,o);ba.subVectors(t,r);const p=as.dot(ba),x=ls.dot(ba);if(x>=0&&p<=x)return e.copy(r);const v=p*c-l*x;if(v<=0&&c>=0&&x<=0)return a=c/(c-x),e.copy(i).addScaledVector(ls,a);const m=u*x-p*h;if(m<=0&&h-u>=0&&p-x>=0)return hu.subVectors(r,s),a=(h-u)/(h-u+(p-x)),e.copy(s).addScaledVector(hu,a);const d=1/(m+v+f);return o=v*d,a=f*d,e.copy(i).addScaledVector(as,o).addScaledVector(ls,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},Or={h:0,s:0,l:0};function Ta(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=An){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=i,re.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=re.workingColorSpace){if(t=Pg(t,1),e=Ge(e,0,1),i=Ge(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Ta(o,r,t+1/3),this.g=Ta(o,r,t),this.b=Ta(o,r,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=An){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=An){const i=Df[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ps(t.r),this.g=Ps(t.g),this.b=Ps(t.b),this}copyLinearToSRGB(t){return this.r=fa(t.r),this.g=fa(t.g),this.b=fa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=An){return re.fromWorkingColorSpace(Oe.copy(this),t),Math.round(Ge(Oe.r*255,0,255))*65536+Math.round(Ge(Oe.g*255,0,255))*256+Math.round(Ge(Oe.b*255,0,255))}getHexString(t=An){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(Oe.copy(this),e);const i=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=An){re.fromWorkingColorSpace(Oe.copy(this),t);const e=Oe.r,i=Oe.g,s=Oe.b;return t!==An?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ci),this.setHSL(ci.h+t,ci.s+e,ci.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ci),t.getHSL(Or);const i=ua(ci.h,Or.h,e),s=ua(ci.s,Or.s,e),r=ua(ci.l,Or.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new jt;jt.NAMES=Df;let $g=0;class qi extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=xi(),this.name="",this.type="Material",this.blending=Cs,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=nl,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=_o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Cs&&(i.blending=this.blending),this.side!==Si&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==el&&(i.blendSrc=this.blendSrc),this.blendDst!==nl&&(i.blendDst=this.blendDst),this.blendEquation!==Fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_o&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class pn extends qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new B,Fr=new Ct;class Sn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=al,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Rf("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Fr.fromBufferAttribute(this,e),Fr.applyMatrix3(t),this.setXY(e,Fr.x,Fr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=se(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),i=se(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==al&&(t.usage=this.usage),t}}class If extends Sn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Uf extends Sn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class _e extends Sn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let jg=0;const rn=new he,Aa=new Le,cs=new B,Je=new Mr,js=new Mr,Re=new B;class qe extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=xi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cf(t)?Uf:If)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return rn.makeRotationFromQuaternion(t),this.applyMatrix4(rn),this}rotateX(t){return rn.makeRotationX(t),this.applyMatrix4(rn),this}rotateY(t){return rn.makeRotationY(t),this.applyMatrix4(rn),this}rotateZ(t){return rn.makeRotationZ(t),this.applyMatrix4(rn),this}translate(t,e,i){return rn.makeTranslation(t,e,i),this.applyMatrix4(rn),this}scale(t,e,i){return rn.makeScale(t,e,i),this.applyMatrix4(rn),this}lookAt(t){return Aa.lookAt(t),Aa.updateMatrix(),this.applyMatrix4(Aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new _e(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const i=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];js.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(Je.min,js.min),Je.expandByPoint(Re),Re.addVectors(Je.max,js.max),Je.expandByPoint(Re)):(Je.expandByPoint(js.min),Je.expandByPoint(js.max))}Je.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Re));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Re.fromBufferAttribute(a,c),l&&(cs.fromBufferAttribute(t,c),Re.add(cs)),s=Math.max(s,i.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let X=0;X<i.count;X++)a[X]=new B,l[X]=new B;const c=new B,u=new B,h=new B,f=new Ct,p=new Ct,x=new Ct,v=new B,m=new B;function d(X,T,y){c.fromBufferAttribute(i,X),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,y),f.fromBufferAttribute(r,X),p.fromBufferAttribute(r,T),x.fromBufferAttribute(r,y),u.sub(c),h.sub(c),p.sub(f),x.sub(f);const G=1/(p.x*x.y-x.x*p.y);isFinite(G)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(h,-p.y).multiplyScalar(G),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(G),a[X].add(v),a[T].add(v),a[y].add(v),l[X].add(m),l[T].add(m),l[y].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let X=0,T=A.length;X<T;++X){const y=A[X],G=y.start,Z=y.count;for(let O=G,nt=G+Z;O<nt;O+=3)d(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const M=new B,C=new B,z=new B,D=new B;function P(X){z.fromBufferAttribute(s,X),D.copy(z);const T=a[X];M.copy(T),M.sub(z.multiplyScalar(z.dot(T))).normalize(),C.crossVectors(D,T);const G=C.dot(l[X])<0?-1:1;o.setXYZW(X,M.x,M.y,M.z,G)}for(let X=0,T=A.length;X<T;++X){const y=A[X],G=y.start,Z=y.count;for(let O=G,nt=G+Z;O<nt;O+=3)P(t.getX(O+0)),P(t.getX(O+1)),P(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Sn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new B,r=new B,o=new B,a=new B,l=new B,c=new B,u=new B,h=new B;if(t)for(let f=0,p=t.count;f<p;f+=3){const x=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,x=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*u;for(let d=0;d<u;d++)f[x++]=c[p++]}return new Sn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new qe,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fu=new he,Pi=new ko,Br=new Sr,du=new B,us=new B,hs=new B,fs=new B,wa=new B,zr=new B,Hr=new Ct,kr=new Ct,Vr=new Ct,pu=new B,mu=new B,gu=new B,Gr=new B,Wr=new B;class Qt extends Le{constructor(t=new qe,e=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){zr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(wa.fromBufferAttribute(h,t),o?zr.addScaledVector(wa,u):zr.addScaledVector(wa.sub(e),u))}e.add(zr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(r),Pi.copy(t.ray).recast(t.near),!(Br.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Br,du)===null||Pi.origin.distanceToSquared(du)>(t.far-t.near)**2))&&(fu.copy(r).invert(),Pi.copy(t.ray).applyMatrix4(fu),!(i.boundingBox!==null&&Pi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Pi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,v=f.length;x<v;x++){const m=f[x],d=o[m.materialIndex],A=Math.max(m.start,p.start),M=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let C=A,z=M;C<z;C+=3){const D=a.getX(C),P=a.getX(C+1),X=a.getX(C+2);s=Xr(this,d,t,i,c,u,h,D,P,X),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=x,d=v;m<d;m+=3){const A=a.getX(m),M=a.getX(m+1),C=a.getX(m+2);s=Xr(this,o,t,i,c,u,h,A,M,C),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,v=f.length;x<v;x++){const m=f[x],d=o[m.materialIndex],A=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let C=A,z=M;C<z;C+=3){const D=C,P=C+1,X=C+2;s=Xr(this,d,t,i,c,u,h,D,P,X),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=x,d=v;m<d;m+=3){const A=m,M=m+1,C=m+2;s=Xr(this,o,t,i,c,u,h,A,M,C),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function qg(n,t,e,i,s,r,o,a){let l;if(t.side===je?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Si,a),l===null)return null;Wr.copy(a),Wr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Wr);return c<e.near||c>e.far?null:{distance:c,point:Wr.clone(),object:n}}function Xr(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,us),n.getVertexPosition(l,hs),n.getVertexPosition(c,fs);const u=qg(n,t,e,i,us,hs,fs,Gr);if(u){s&&(Hr.fromBufferAttribute(s,a),kr.fromBufferAttribute(s,l),Vr.fromBufferAttribute(s,c),u.uv=vn.getInterpolation(Gr,us,hs,fs,Hr,kr,Vr,new Ct)),r&&(Hr.fromBufferAttribute(r,a),kr.fromBufferAttribute(r,l),Vr.fromBufferAttribute(r,c),u.uv1=vn.getInterpolation(Gr,us,hs,fs,Hr,kr,Vr,new Ct)),o&&(pu.fromBufferAttribute(o,a),mu.fromBufferAttribute(o,l),gu.fromBufferAttribute(o,c),u.normal=vn.getInterpolation(Gr,us,hs,fs,pu,mu,gu,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new B,materialIndex:0};vn.getNormal(us,hs,fs,h.normal),u.face=h}return u}class Dn extends qe{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;x("z","y","x",-1,-1,i,e,t,o,r,0),x("z","y","x",1,-1,i,e,-t,o,r,1),x("x","z","y",1,1,t,i,e,s,o,2),x("x","z","y",1,-1,t,i,-e,s,o,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(u,3)),this.setAttribute("uv",new _e(h,2));function x(v,m,d,A,M,C,z,D,P,X,T){const y=C/P,G=z/X,Z=C/2,O=z/2,nt=D/2,k=P+1,R=X+1;let I=0,H=0;const ct=new B;for(let ht=0;ht<R;ht++){const xt=ht*G-O;for(let Pt=0;Pt<k;Pt++){const Yt=Pt*y-Z;ct[v]=Yt*A,ct[m]=xt*M,ct[d]=nt,c.push(ct.x,ct.y,ct.z),ct[v]=0,ct[m]=0,ct[d]=D>0?1:-1,u.push(ct.x,ct.y,ct.z),h.push(Pt/P),h.push(1-ht/X),I+=1}}for(let ht=0;ht<X;ht++)for(let xt=0;xt<P;xt++){const Pt=f+xt+k*ht,Yt=f+xt+k*(ht+1),st=f+(xt+1)+k*(ht+1),dt=f+(xt+1)+k*ht;l.push(Pt,Yt,dt),l.push(Yt,st,dt),H+=6}a.addGroup(p,H,T),p+=H,f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Bs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ke(n){const t={};for(let e=0;e<n.length;e++){const i=Bs(n[e]);for(const s in i)t[s]=i[s]}return t}function Yg(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Nf(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const Kg={clone:Bs,merge:ke};var Zg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zg,this.fragmentShader=Jg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Bs(t.uniforms),this.uniformsGroups=Yg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Of extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Jn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ui=new B,_u=new Ct,vu=new Ct;class Qe extends Of{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ll*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ll*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,_u,vu),e.subVectors(vu,_u)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(so*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ds=-90,ps=1;class Qg extends Le{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Qe(ds,ps,t,e);s.layers=this.layers,this.add(s);const r=new Qe(ds,ps,t,e);r.layers=this.layers,this.add(r);const o=new Qe(ds,ps,t,e);o.layers=this.layers,this.add(o);const a=new Qe(ds,ps,t,e);a.layers=this.layers,this.add(a);const l=new Qe(ds,ps,t,e);l.layers=this.layers,this.add(l);const c=new Qe(ds,ps,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Jn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===yo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Ff extends Xe{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Ns,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class t_ extends Wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Ff(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:_n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Dn(5,5,5),r=new yi({name:"CubemapFromEquirect",uniforms:Bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:je,blending:gi});r.uniforms.tEquirect.value=e;const o=new Qt(s,r),a=e.minFilter;return e.minFilter===Hi&&(e.minFilter=_n),new Qg(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Ca=new B,e_=new B,n_=new $t;class fi{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ca.subVectors(i,e).cross(e_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ca),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||n_.getNormalMatrix(t),s=this.coplanarPoint(Ca).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Sr,$r=new B;class Dl{constructor(t=new fi,e=new fi,i=new fi,s=new fi,r=new fi,o=new fi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Jn){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],p=s[8],x=s[9],v=s[10],m=s[11],d=s[12],A=s[13],M=s[14],C=s[15];if(i[0].setComponents(l-r,f-c,m-p,C-d).normalize(),i[1].setComponents(l+r,f+c,m+p,C+d).normalize(),i[2].setComponents(l+o,f+u,m+x,C+A).normalize(),i[3].setComponents(l-o,f-u,m-x,C-A).normalize(),i[4].setComponents(l-a,f-h,m-v,C-M).normalize(),e===Jn)i[5].setComponents(l+a,f+h,m+v,C+M).normalize();else if(e===yo)i[5].setComponents(a,h,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if($r.x=s.normal.x>0?t.max.x:t.min.x,$r.y=s.normal.y>0?t.max.y:t.min.y,$r.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bf(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function i_(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l._updateRange,f=l.updateRanges;if(n.bindBuffer(c,a),h.count===-1&&f.length===0&&n.bufferSubData(c,0,u),f.length!==0){for(let p=0,x=f.length;p<x;p++){const v=f[p];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}h.count!==-1&&(n.bufferSubData(c,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Zn extends qe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,p=[],x=[],v=[],m=[];for(let d=0;d<u;d++){const A=d*f-o;for(let M=0;M<c;M++){const C=M*h-r;x.push(C,-A,0),v.push(0,0,1),m.push(M/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<a;A++){const M=A+c*d,C=A+c*(d+1),z=A+1+c*(d+1),D=A+1+c*d;p.push(M,C,D),p.push(C,z,D)}this.setIndex(p),this.setAttribute("position",new _e(x,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zn(t.width,t.height,t.widthSegments,t.heightSegments)}}var s_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,r_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,o_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,l_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,c_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,u_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,h_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,f_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,d_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,p_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,m_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,g_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,__=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,v_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,x_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,S_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,E_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,b_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,T_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,A_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,w_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,C_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,R_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,P_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,L_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,I_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,U_="gl_FragColor = linearToOutputTexel( gl_FragColor );",N_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,O_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,F_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,B_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,z_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,H_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,k_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,V_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,W_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,j_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,q_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Y_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,K_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Z_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,J_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Q_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ev=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,iv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ov=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,av=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_v=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Mv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Sv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,yv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ev=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Av=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Iv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Uv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ov=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,kv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$v=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,t0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,i0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const s0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,r0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,c0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,h0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,f0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,d0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,p0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,m0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,v0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,E0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,T0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,A0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,R0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,L0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,I0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,U0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,O0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:s_,alphahash_pars_fragment:r_,alphamap_fragment:o_,alphamap_pars_fragment:a_,alphatest_fragment:l_,alphatest_pars_fragment:c_,aomap_fragment:u_,aomap_pars_fragment:h_,batching_pars_vertex:f_,batching_vertex:d_,begin_vertex:p_,beginnormal_vertex:m_,bsdfs:g_,iridescence_fragment:__,bumpmap_pars_fragment:v_,clipping_planes_fragment:x_,clipping_planes_pars_fragment:M_,clipping_planes_pars_vertex:S_,clipping_planes_vertex:y_,color_fragment:E_,color_pars_fragment:b_,color_pars_vertex:T_,color_vertex:A_,common:w_,cube_uv_reflection_fragment:C_,defaultnormal_vertex:R_,displacementmap_pars_vertex:P_,displacementmap_vertex:L_,emissivemap_fragment:D_,emissivemap_pars_fragment:I_,colorspace_fragment:U_,colorspace_pars_fragment:N_,envmap_fragment:O_,envmap_common_pars_fragment:F_,envmap_pars_fragment:B_,envmap_pars_vertex:z_,envmap_physical_pars_fragment:Z_,envmap_vertex:H_,fog_vertex:k_,fog_pars_vertex:V_,fog_fragment:G_,fog_pars_fragment:W_,gradientmap_pars_fragment:X_,lightmap_fragment:$_,lightmap_pars_fragment:j_,lights_lambert_fragment:q_,lights_lambert_pars_fragment:Y_,lights_pars_begin:K_,lights_toon_fragment:J_,lights_toon_pars_fragment:Q_,lights_phong_fragment:tv,lights_phong_pars_fragment:ev,lights_physical_fragment:nv,lights_physical_pars_fragment:iv,lights_fragment_begin:sv,lights_fragment_maps:rv,lights_fragment_end:ov,logdepthbuf_fragment:av,logdepthbuf_pars_fragment:lv,logdepthbuf_pars_vertex:cv,logdepthbuf_vertex:uv,map_fragment:hv,map_pars_fragment:fv,map_particle_fragment:dv,map_particle_pars_fragment:pv,metalnessmap_fragment:mv,metalnessmap_pars_fragment:gv,morphinstance_vertex:_v,morphcolor_vertex:vv,morphnormal_vertex:xv,morphtarget_pars_vertex:Mv,morphtarget_vertex:Sv,normal_fragment_begin:yv,normal_fragment_maps:Ev,normal_pars_fragment:bv,normal_pars_vertex:Tv,normal_vertex:Av,normalmap_pars_fragment:wv,clearcoat_normal_fragment_begin:Cv,clearcoat_normal_fragment_maps:Rv,clearcoat_pars_fragment:Pv,iridescence_pars_fragment:Lv,opaque_fragment:Dv,packing:Iv,premultiplied_alpha_fragment:Uv,project_vertex:Nv,dithering_fragment:Ov,dithering_pars_fragment:Fv,roughnessmap_fragment:Bv,roughnessmap_pars_fragment:zv,shadowmap_pars_fragment:Hv,shadowmap_pars_vertex:kv,shadowmap_vertex:Vv,shadowmask_pars_fragment:Gv,skinbase_vertex:Wv,skinning_pars_vertex:Xv,skinning_vertex:$v,skinnormal_vertex:jv,specularmap_fragment:qv,specularmap_pars_fragment:Yv,tonemapping_fragment:Kv,tonemapping_pars_fragment:Zv,transmission_fragment:Jv,transmission_pars_fragment:Qv,uv_pars_fragment:t0,uv_pars_vertex:e0,uv_vertex:n0,worldpos_vertex:i0,background_vert:s0,background_frag:r0,backgroundCube_vert:o0,backgroundCube_frag:a0,cube_vert:l0,cube_frag:c0,depth_vert:u0,depth_frag:h0,distanceRGBA_vert:f0,distanceRGBA_frag:d0,equirect_vert:p0,equirect_frag:m0,linedashed_vert:g0,linedashed_frag:_0,meshbasic_vert:v0,meshbasic_frag:x0,meshlambert_vert:M0,meshlambert_frag:S0,meshmatcap_vert:y0,meshmatcap_frag:E0,meshnormal_vert:b0,meshnormal_frag:T0,meshphong_vert:A0,meshphong_frag:w0,meshphysical_vert:C0,meshphysical_frag:R0,meshtoon_vert:P0,meshtoon_frag:L0,points_vert:D0,points_frag:I0,shadow_vert:U0,shadow_frag:N0,sprite_vert:O0,sprite_frag:F0},Mt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Rn={basic:{uniforms:ke([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:ke([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:ke([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:ke([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:ke([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:ke([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:ke([Mt.points,Mt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:ke([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:ke([Mt.common,Mt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:ke([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:ke([Mt.sprite,Mt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:ke([Mt.common,Mt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:ke([Mt.lights,Mt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Rn.physical={uniforms:ke([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const jr={r:0,b:0,g:0},Di=new Fn,B0=new he;function z0(n,t,e,i,s,r,o){const a=new jt(0);let l=r===!0?0:1,c,u,h=null,f=0,p=null;function x(m,d){let A=!1,M=d.isScene===!0?d.background:null;M&&M.isTexture&&(M=(d.backgroundBlurriness>0?e:t).get(M)),M===null?v(a,l):M&&M.isColor&&(v(M,1),A=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||A)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),M&&(M.isCubeTexture||M.mapping===zo)?(u===void 0&&(u=new Qt(new Dn(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:Bs(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(z,D,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Di.copy(d.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(B0.makeRotationFromEuler(Di)),u.material.toneMapped=re.getTransfer(M.colorSpace)!==ce,(h!==M||f!==M.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Qt(new Zn(2,2),new yi({name:"BackgroundMaterial",uniforms:Bs(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=re.getTransfer(M.colorSpace)!==ce,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,d){m.getRGB(jr,Nf(n)),i.buffers.color.setClear(jr.r,jr.g,jr.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),l=d,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(a,l)},render:x}}function H0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(y,G,Z,O,nt){let k=!1;const R=h(O,Z,G);r!==R&&(r=R,c(r.object)),k=p(y,O,Z,nt),k&&x(y,O,Z,nt),nt!==null&&t.update(nt,n.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,C(y,G,Z,O),nt!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(nt).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function h(y,G,Z){const O=Z.wireframe===!0;let nt=i[y.id];nt===void 0&&(nt={},i[y.id]=nt);let k=nt[G.id];k===void 0&&(k={},nt[G.id]=k);let R=k[O];return R===void 0&&(R=f(l()),k[O]=R),R}function f(y){const G=[],Z=[],O=[];for(let nt=0;nt<e;nt++)G[nt]=0,Z[nt]=0,O[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:Z,attributeDivisors:O,object:y,attributes:{},index:null}}function p(y,G,Z,O){const nt=r.attributes,k=G.attributes;let R=0;const I=Z.getAttributes();for(const H in I)if(I[H].location>=0){const ht=nt[H];let xt=k[H];if(xt===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(xt=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(xt=y.instanceColor)),ht===void 0||ht.attribute!==xt||xt&&ht.data!==xt.data)return!0;R++}return r.attributesNum!==R||r.index!==O}function x(y,G,Z,O){const nt={},k=G.attributes;let R=0;const I=Z.getAttributes();for(const H in I)if(I[H].location>=0){let ht=k[H];ht===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor));const xt={};xt.attribute=ht,ht&&ht.data&&(xt.data=ht.data),nt[H]=xt,R++}r.attributes=nt,r.attributesNum=R,r.index=O}function v(){const y=r.newAttributes;for(let G=0,Z=y.length;G<Z;G++)y[G]=0}function m(y){d(y,0)}function d(y,G){const Z=r.newAttributes,O=r.enabledAttributes,nt=r.attributeDivisors;Z[y]=1,O[y]===0&&(n.enableVertexAttribArray(y),O[y]=1),nt[y]!==G&&(n.vertexAttribDivisor(y,G),nt[y]=G)}function A(){const y=r.newAttributes,G=r.enabledAttributes;for(let Z=0,O=G.length;Z<O;Z++)G[Z]!==y[Z]&&(n.disableVertexAttribArray(Z),G[Z]=0)}function M(y,G,Z,O,nt,k,R){R===!0?n.vertexAttribIPointer(y,G,Z,nt,k):n.vertexAttribPointer(y,G,Z,O,nt,k)}function C(y,G,Z,O){v();const nt=O.attributes,k=Z.getAttributes(),R=G.defaultAttributeValues;for(const I in k){const H=k[I];if(H.location>=0){let ct=nt[I];if(ct===void 0&&(I==="instanceMatrix"&&y.instanceMatrix&&(ct=y.instanceMatrix),I==="instanceColor"&&y.instanceColor&&(ct=y.instanceColor)),ct!==void 0){const ht=ct.normalized,xt=ct.itemSize,Pt=t.get(ct);if(Pt===void 0)continue;const Yt=Pt.buffer,st=Pt.type,dt=Pt.bytesPerElement,at=st===n.INT||st===n.UNSIGNED_INT||ct.gpuType===xf;if(ct.isInterleavedBufferAttribute){const V=ct.data,lt=V.stride,Tt=ct.offset;if(V.isInstancedInterleavedBuffer){for(let At=0;At<H.locationSize;At++)d(H.location+At,V.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let At=0;At<H.locationSize;At++)m(H.location+At);n.bindBuffer(n.ARRAY_BUFFER,Yt);for(let At=0;At<H.locationSize;At++)M(H.location+At,xt/H.locationSize,st,ht,lt*dt,(Tt+xt/H.locationSize*At)*dt,at)}else{if(ct.isInstancedBufferAttribute){for(let V=0;V<H.locationSize;V++)d(H.location+V,ct.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let V=0;V<H.locationSize;V++)m(H.location+V);n.bindBuffer(n.ARRAY_BUFFER,Yt);for(let V=0;V<H.locationSize;V++)M(H.location+V,xt/H.locationSize,st,ht,xt*dt,xt/H.locationSize*V*dt,at)}}else if(R!==void 0){const ht=R[I];if(ht!==void 0)switch(ht.length){case 2:n.vertexAttrib2fv(H.location,ht);break;case 3:n.vertexAttrib3fv(H.location,ht);break;case 4:n.vertexAttrib4fv(H.location,ht);break;default:n.vertexAttrib1fv(H.location,ht)}}}}A()}function z(){X();for(const y in i){const G=i[y];for(const Z in G){const O=G[Z];for(const nt in O)u(O[nt].object),delete O[nt];delete G[Z]}delete i[y]}}function D(y){if(i[y.id]===void 0)return;const G=i[y.id];for(const Z in G){const O=G[Z];for(const nt in O)u(O[nt].object),delete O[nt];delete G[Z]}delete i[y.id]}function P(y){for(const G in i){const Z=i[G];if(Z[y.id]===void 0)continue;const O=Z[y.id];for(const nt in O)u(O[nt].object),delete O[nt];delete Z[y.id]}}function X(){T(),o=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:X,resetDefaultState:T,dispose:z,releaseStatesOfGeometry:D,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:A}}function k0(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function a(l,c,u){if(u===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let f=0;f<u;f++)this.render(l[f],c[f]);else{h.multiDrawArraysWEBGL(i,l,0,c,0,u);let f=0;for(let p=0;p<u;p++)f+=c[p];e.update(f,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function V0(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const M=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(M){if(M==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=e.precision!==void 0?e.precision:"highp";const a=r(o);a!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",a,"instead."),o=a);const l=e.logarithmicDepthBuffer===!0,c=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),u=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),m=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),d=u>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:l,maxTextures:c,maxVertexTextures:u,maxTextureSize:h,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:m,vertexTextures:d,maxSamples:A}}function G0(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new fi,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const x=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!s||x===null||x.length===0||r&&!m)r?u(null):c();else{const A=r?0:i,M=A*4;let C=d.clippingState||null;l.value=C,C=u(x,f,M,p);for(let z=0;z!==M;++z)C[z]=e[z];d.clippingState=C,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,x){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,x!==!0||m===null){const d=p+v*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,C=p;M!==v;++M,C+=4)o.copy(h[M]).applyMatrix4(A,a),o.normal.toArray(m,C),m[C+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function W0(n){let t=new WeakMap;function e(o,a){return a===il?o.mapping=Ns:a===sl&&(o.mapping=Os),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===il||a===sl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new t_(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class zf extends Of{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ss=4,xu=[.125,.215,.35,.446,.526,.582],Bi=20,Ra=new zf,Mu=new jt;let Pa=null,La=0,Da=0,Ia=!1;const Ni=(1+Math.sqrt(5))/2,ms=1/Ni,Su=[new B(1,1,1),new B(-1,1,1),new B(1,1,-1),new B(-1,1,-1),new B(0,Ni,ms),new B(0,Ni,-ms),new B(ms,0,Ni),new B(-ms,0,Ni),new B(Ni,ms,0),new B(-Ni,ms,0)];class yu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Pa,La,Da),this._renderer.xr.enabled=Ia,t.scissorTest=!1,qr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ns||t.mapping===Os?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Da=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:vo,format:In,colorSpace:Ei,depthBuffer:!1},s=Eu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Eu(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=X0(r)),this._blurMaterial=$0(r,t,e)}return s}_compileMaterial(t){const e=new Qt(this._lodPlanes[0],t);this._renderer.compile(e,Ra)}_sceneToCubeUV(t,e,i,s){const a=new Qe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Mu),u.toneMapping=_i,u.autoClear=!1;const p=new pn({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1}),x=new Qt(new Dn,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Mu),v=!0);for(let d=0;d<6;d++){const A=d%3;A===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):A===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const M=this._cubeSize;qr(s,A*M,d>2?M:0,M,M),u.setRenderTarget(s),v&&u.render(x,a),u.render(t,a)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ns||t.mapping===Os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Qt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;qr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Ra)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Su[(s-1)%Su.length];this._blur(t,s-1,s,r,o)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Qt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Bi-1),v=r/x,m=isFinite(r)?1+Math.floor(u*v):Bi;m>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);const d=[];let A=0;for(let P=0;P<Bi;++P){const X=P/v,T=Math.exp(-X*X/2);d.push(T),P===0?A+=T:P<m&&(A+=2*T)}for(let P=0;P<d.length;P++)d[P]=d[P]/A;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=x,f.mipInt.value=M-i;const C=this._sizeLods[s],z=3*C*(s>M-Ss?s-M+Ss:0),D=4*(this._cubeSize-C);qr(e,z,D,3*C,2*C),l.setRenderTarget(e),l.render(h,Ra)}}function X0(n){const t=[],e=[],i=[];let s=n;const r=n-Ss+1+xu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ss?l=xu[o-n+Ss-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,x=6,v=3,m=2,d=1,A=new Float32Array(v*x*p),M=new Float32Array(m*x*p),C=new Float32Array(d*x*p);for(let D=0;D<p;D++){const P=D%3*2/3-1,X=D>2?0:-1,T=[P,X,0,P+2/3,X,0,P+2/3,X+1,0,P,X,0,P+2/3,X+1,0,P,X+1,0];A.set(T,v*x*D),M.set(f,m*x*D);const y=[D,D,D,D,D,D];C.set(y,d*x*D)}const z=new qe;z.setAttribute("position",new Sn(A,v)),z.setAttribute("uv",new Sn(M,m)),z.setAttribute("faceIndex",new Sn(C,d)),t.push(z),s>Ss&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Eu(n,t,e){const i=new Wi(n,t,e);return i.texture.mapping=zo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function $0(n,t,e){const i=new Float32Array(Bi),s=new B(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function bu(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Tu(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Il(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Il(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function j0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===il||l===sl,u=l===Ns||l===Os;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new yu(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new yu(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function q0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Y0(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const x in f.attributes)t.remove(f.attributes[x]);for(const x in f.morphAttributes){const v=f.morphAttributes[x];for(let m=0,d=v.length;m<d;m++)t.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const x in f)t.update(f[x],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const x in p){const v=p[x];for(let m=0,d=v.length;m<d;m++)t.update(v[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,x=h.attributes.position;let v=0;if(p!==null){const A=p.array;v=p.version;for(let M=0,C=A.length;M<C;M+=3){const z=A[M+0],D=A[M+1],P=A[M+2];f.push(z,D,D,P,P,z)}}else if(x!==void 0){const A=x.array;v=x.version;for(let M=0,C=A.length/3-1;M<C;M+=3){const z=M+0,D=M+1,P=M+2;f.push(z,D,D,P,P,z)}}else return;const m=new(Cf(f)?Uf:If)(f,1);m.version=v;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function K0(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*o),e.update(f,i,1)}function c(h,f,p){p!==0&&(n.drawElementsInstanced(i,f,r,h*o,p),e.update(f,i,p))}function u(h,f,p){if(p===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let v=0;v<p;v++)this.render(h[v]/o,f[v]);else{x.multiDrawElementsWEBGL(i,f,0,r,h,0,p);let v=0;for(let m=0;m<p;m++)v+=f[m];e.update(v,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Z0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function J0(n,t,e){const i=new WeakMap,s=new pe;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let y=function(){X.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const x=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let C=0;x===!0&&(C=1),v===!0&&(C=2),m===!0&&(C=3);let z=a.attributes.position.count*C,D=1;z>t.maxTextureSize&&(D=Math.ceil(z/t.maxTextureSize),z=t.maxTextureSize);const P=new Float32Array(z*D*4*h),X=new Lf(P,z,D,h);X.type=mi,X.needsUpdate=!0;const T=C*4;for(let G=0;G<h;G++){const Z=d[G],O=A[G],nt=M[G],k=z*D*4*G;for(let R=0;R<Z.count;R++){const I=R*T;x===!0&&(s.fromBufferAttribute(Z,R),P[k+I+0]=s.x,P[k+I+1]=s.y,P[k+I+2]=s.z,P[k+I+3]=0),v===!0&&(s.fromBufferAttribute(O,R),P[k+I+4]=s.x,P[k+I+5]=s.y,P[k+I+6]=s.z,P[k+I+7]=0),m===!0&&(s.fromBufferAttribute(nt,R),P[k+I+8]=s.x,P[k+I+9]=s.y,P[k+I+10]=s.z,P[k+I+11]=nt.itemSize===4?s.w:1)}}f={count:h,texture:X,size:new Ct(z,D)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let x=0;for(let m=0;m<c.length;m++)x+=c[m];const v=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Q0(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Hf extends Xe{constructor(t,e,i,s,r,o,a,l,c,u){if(u=u!==void 0?u:Rs,u!==Rs&&u!==pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Rs&&(i=Fs),i===void 0&&u===pr&&(i=xr),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ln,this.minFilter=l!==void 0?l:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const kf=new Xe,Vf=new Hf(1,1);Vf.compareFunction=wf;const Gf=new Lf,Wf=new Bg,Xf=new Ff,Au=[],wu=[],Cu=new Float32Array(16),Ru=new Float32Array(9),Pu=new Float32Array(4);function zs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Au[s];if(r===void 0&&(r=new Float32Array(s),Au[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Te(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ae(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Vo(n,t){let e=wu[t];e===void 0&&(e=new Int32Array(t),wu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function tx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function ex(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2fv(this.addr,t),Ae(e,t)}}function nx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;n.uniform3fv(this.addr,t),Ae(e,t)}}function ix(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4fv(this.addr,t),Ae(e,t)}}function sx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,i))return;Pu.set(i),n.uniformMatrix2fv(this.addr,!1,Pu),Ae(e,i)}}function rx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,i))return;Ru.set(i),n.uniformMatrix3fv(this.addr,!1,Ru),Ae(e,i)}}function ox(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,i))return;Cu.set(i),n.uniformMatrix4fv(this.addr,!1,Cu),Ae(e,i)}}function ax(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function lx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2iv(this.addr,t),Ae(e,t)}}function cx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3iv(this.addr,t),Ae(e,t)}}function ux(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4iv(this.addr,t),Ae(e,t)}}function hx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function fx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2uiv(this.addr,t),Ae(e,t)}}function dx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3uiv(this.addr,t),Ae(e,t)}}function px(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4uiv(this.addr,t),Ae(e,t)}}function mx(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Vf:kf;e.setTexture2D(t||r,s)}function gx(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Wf,s)}function _x(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Xf,s)}function vx(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Gf,s)}function xx(n){switch(n){case 5126:return tx;case 35664:return ex;case 35665:return nx;case 35666:return ix;case 35674:return sx;case 35675:return rx;case 35676:return ox;case 5124:case 35670:return ax;case 35667:case 35671:return lx;case 35668:case 35672:return cx;case 35669:case 35673:return ux;case 5125:return hx;case 36294:return fx;case 36295:return dx;case 36296:return px;case 35678:case 36198:case 36298:case 36306:case 35682:return mx;case 35679:case 36299:case 36307:return gx;case 35680:case 36300:case 36308:case 36293:return _x;case 36289:case 36303:case 36311:case 36292:return vx}}function Mx(n,t){n.uniform1fv(this.addr,t)}function Sx(n,t){const e=zs(t,this.size,2);n.uniform2fv(this.addr,e)}function yx(n,t){const e=zs(t,this.size,3);n.uniform3fv(this.addr,e)}function Ex(n,t){const e=zs(t,this.size,4);n.uniform4fv(this.addr,e)}function bx(n,t){const e=zs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Tx(n,t){const e=zs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Ax(n,t){const e=zs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wx(n,t){n.uniform1iv(this.addr,t)}function Cx(n,t){n.uniform2iv(this.addr,t)}function Rx(n,t){n.uniform3iv(this.addr,t)}function Px(n,t){n.uniform4iv(this.addr,t)}function Lx(n,t){n.uniform1uiv(this.addr,t)}function Dx(n,t){n.uniform2uiv(this.addr,t)}function Ix(n,t){n.uniform3uiv(this.addr,t)}function Ux(n,t){n.uniform4uiv(this.addr,t)}function Nx(n,t,e){const i=this.cache,s=t.length,r=Vo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||kf,r[o])}function Ox(n,t,e){const i=this.cache,s=t.length,r=Vo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Wf,r[o])}function Fx(n,t,e){const i=this.cache,s=t.length,r=Vo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Xf,r[o])}function Bx(n,t,e){const i=this.cache,s=t.length,r=Vo(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Gf,r[o])}function zx(n){switch(n){case 5126:return Mx;case 35664:return Sx;case 35665:return yx;case 35666:return Ex;case 35674:return bx;case 35675:return Tx;case 35676:return Ax;case 5124:case 35670:return wx;case 35667:case 35671:return Cx;case 35668:case 35672:return Rx;case 35669:case 35673:return Px;case 5125:return Lx;case 36294:return Dx;case 36295:return Ix;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Nx;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Fx;case 36289:case 36303:case 36311:case 36292:return Bx}}class Hx{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=xx(e.type)}}class kx{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zx(e.type)}}class Vx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Ua=/(\w+)(\])?(\[|\.)?/g;function Lu(n,t){n.seq.push(t),n.map[t.id]=t}function Gx(n,t,e){const i=n.name,s=i.length;for(Ua.lastIndex=0;;){const r=Ua.exec(i),o=Ua.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Lu(e,c===void 0?new Hx(a,n,t):new kx(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new Vx(a),Lu(e,h)),e=h}}}class ro{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Gx(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Du(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Wx=37297;let Xx=0;function $x(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function jx(n){const t=re.getPrimaries(re.workingColorSpace),e=re.getPrimaries(n);let i;switch(t===e?i="":t===So&&e===Mo?i="LinearDisplayP3ToLinearSRGB":t===Mo&&e===So&&(i="LinearSRGBToLinearDisplayP3"),n){case Ei:case Ho:return[i,"LinearTransferOETF"];case An:case Pl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Iu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+$x(n.getShaderSource(t),o)}else return s}function qx(n,t){const e=jx(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Yx(n,t){let e;switch(t){case ig:e="Linear";break;case sg:e="Reinhard";break;case rg:e="OptimizedCineon";break;case gf:e="ACESFilmic";break;case ag:e="AgX";break;case lg:e="Neutral";break;case og:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Kx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function Zx(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Jx(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function tr(n){return n!==""}function Uu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qx=/^[ \t]*#include +<([\w\d./]+)>/gm;function cl(n){return n.replace(Qx,eM)}const tM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function eM(n,t){let e=Xt[t];if(e===void 0){const i=tM.get(t);if(i!==void 0)e=Xt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return cl(e)}const nM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ou(n){return n.replace(nM,iM)}function iM(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fu(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sM(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===df?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===pf?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$n&&(t="SHADOWMAP_TYPE_VSM"),t}function rM(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ns:case Os:t="ENVMAP_TYPE_CUBE";break;case zo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function oM(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Os:t="ENVMAP_MODE_REFRACTION";break}return t}function aM(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case mf:t="ENVMAP_BLENDING_MULTIPLY";break;case eg:t="ENVMAP_BLENDING_MIX";break;case ng:t="ENVMAP_BLENDING_ADD";break}return t}function lM(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function cM(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=sM(e),c=rM(e),u=oM(e),h=aM(e),f=lM(e),p=Kx(e),x=Zx(r),v=s.createProgram();let m,d,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(tr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(tr).join(`
`),d.length>0&&(d+=`
`)):(m=[Fu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),d=[Fu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_i?"#define TONE_MAPPING":"",e.toneMapping!==_i?Xt.tonemapping_pars_fragment:"",e.toneMapping!==_i?Yx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,qx("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(tr).join(`
`)),o=cl(o),o=Uu(o,e),o=Nu(o,e),a=cl(a),a=Uu(a,e),a=Nu(a,e),o=Ou(o),a=Ou(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=A+m+o,C=A+d+a,z=Du(s,s.VERTEX_SHADER,M),D=Du(s,s.FRAGMENT_SHADER,C);s.attachShader(v,z),s.attachShader(v,D),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(G){if(n.debug.checkShaderErrors){const Z=s.getProgramInfoLog(v).trim(),O=s.getShaderInfoLog(z).trim(),nt=s.getShaderInfoLog(D).trim();let k=!0,R=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,z,D);else{const I=Iu(s,z,"vertex"),H=Iu(s,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+Z+`
`+I+`
`+H)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(O===""||nt==="")&&(R=!1);R&&(G.diagnostics={runnable:k,programLog:Z,vertexShader:{log:O,prefix:m},fragmentShader:{log:nt,prefix:d}})}s.deleteShader(z),s.deleteShader(D),X=new ro(s,v),T=Jx(s,v)}let X;this.getUniforms=function(){return X===void 0&&P(this),X};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,Wx)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xx++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=z,this.fragmentShader=D,this}let uM=0;class hM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new fM(t),e.set(t,i)),i}}class fM{constructor(t){this.id=uM++,this.code=t,this.usedTimes=0}}function dM(n,t,e,i,s,r,o){const a=new Ll,l=new hM,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,y,G,Z,O){const nt=Z.fog,k=O.geometry,R=T.isMeshStandardMaterial?Z.environment:null,I=(T.isMeshStandardMaterial?e:t).get(T.envMap||R),H=I&&I.mapping===zo?I.image.height:null,ct=x[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const ht=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,xt=ht!==void 0?ht.length:0;let Pt=0;k.morphAttributes.position!==void 0&&(Pt=1),k.morphAttributes.normal!==void 0&&(Pt=2),k.morphAttributes.color!==void 0&&(Pt=3);let Yt,st,dt,at;if(ct){const we=Rn[ct];Yt=we.vertexShader,st=we.fragmentShader}else Yt=T.vertexShader,st=T.fragmentShader,l.update(T),dt=l.getVertexShaderID(T),at=l.getFragmentShaderID(T);const V=n.getRenderTarget(),lt=O.isInstancedMesh===!0,Tt=O.isBatchedMesh===!0,At=!!T.map,$=!!T.matcap,w=!!I,L=!!T.aoMap,j=!!T.lightMap,Y=!!T.bumpMap,it=!!T.normalMap,S=!!T.displacementMap,_=!!T.emissiveMap,U=!!T.metalnessMap,F=!!T.roughnessMap,N=T.anisotropy>0,q=T.clearcoat>0,rt=T.iridescence>0,J=T.sheen>0,ft=T.transmission>0,gt=N&&!!T.anisotropyMap,ut=q&&!!T.clearcoatMap,pt=q&&!!T.clearcoatNormalMap,Et=q&&!!T.clearcoatRoughnessMap,vt=rt&&!!T.iridescenceMap,yt=rt&&!!T.iridescenceThicknessMap,Dt=J&&!!T.sheenColorMap,kt=J&&!!T.sheenRoughnessMap,Jt=!!T.specularMap,It=!!T.specularColorMap,Bt=!!T.specularIntensityMap,wt=ft&&!!T.transmissionMap,g=ft&&!!T.thicknessMap,K=!!T.gradientMap,ot=!!T.alphaMap,_t=T.alphaTest>0,bt=!!T.alphaHash,Zt=!!T.extensions;let qt=_i;T.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(qt=n.toneMapping);const fe={shaderID:ct,shaderType:T.type,shaderName:T.name,vertexShader:Yt,fragmentShader:st,defines:T.defines,customVertexShaderID:dt,customFragmentShaderID:at,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Tt,instancing:lt,instancingColor:lt&&O.instanceColor!==null,instancingMorph:lt&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:V===null?n.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Ei,alphaToCoverage:!!T.alphaToCoverage,map:At,matcap:$,envMap:w,envMapMode:w&&I.mapping,envMapCubeUVHeight:H,aoMap:L,lightMap:j,bumpMap:Y,normalMap:it,displacementMap:f&&S,emissiveMap:_,normalMapObjectSpace:it&&T.normalMapType===yg,normalMapTangentSpace:it&&T.normalMapType===Af,metalnessMap:U,roughnessMap:F,anisotropy:N,anisotropyMap:gt,clearcoat:q,clearcoatMap:ut,clearcoatNormalMap:pt,clearcoatRoughnessMap:Et,iridescence:rt,iridescenceMap:vt,iridescenceThicknessMap:yt,sheen:J,sheenColorMap:Dt,sheenRoughnessMap:kt,specularMap:Jt,specularColorMap:It,specularIntensityMap:Bt,transmission:ft,transmissionMap:wt,thicknessMap:g,gradientMap:K,opaque:T.transparent===!1&&T.blending===Cs&&T.alphaToCoverage===!1,alphaMap:ot,alphaTest:_t,alphaHash:bt,combine:T.combine,mapUv:At&&v(T.map.channel),aoMapUv:L&&v(T.aoMap.channel),lightMapUv:j&&v(T.lightMap.channel),bumpMapUv:Y&&v(T.bumpMap.channel),normalMapUv:it&&v(T.normalMap.channel),displacementMapUv:S&&v(T.displacementMap.channel),emissiveMapUv:_&&v(T.emissiveMap.channel),metalnessMapUv:U&&v(T.metalnessMap.channel),roughnessMapUv:F&&v(T.roughnessMap.channel),anisotropyMapUv:gt&&v(T.anisotropyMap.channel),clearcoatMapUv:ut&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:pt&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:kt&&v(T.sheenRoughnessMap.channel),specularMapUv:Jt&&v(T.specularMap.channel),specularColorMapUv:It&&v(T.specularColorMap.channel),specularIntensityMapUv:Bt&&v(T.specularIntensityMap.channel),transmissionMapUv:wt&&v(T.transmissionMap.channel),thicknessMapUv:g&&v(T.thicknessMap.channel),alphaMapUv:ot&&v(T.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(it||N),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!k.attributes.uv&&(At||ot),fog:!!nt,useFog:T.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:O.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Pt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&G.length>0,shadowMapType:n.shadowMap.type,toneMapping:qt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:At&&T.map.isVideoTexture===!0&&re.getTransfer(T.map.colorSpace)===ce,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===on,flipSided:T.side===je,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Zt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Zt&&T.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return fe.vertexUv1s=c.has(1),fe.vertexUv2s=c.has(2),fe.vertexUv3s=c.has(3),c.clear(),fe}function d(T){const y=[];if(T.shaderID?y.push(T.shaderID):(y.push(T.customVertexShaderID),y.push(T.customFragmentShaderID)),T.defines!==void 0)for(const G in T.defines)y.push(G),y.push(T.defines[G]);return T.isRawShaderMaterial===!1&&(A(y,T),M(y,T),y.push(n.outputColorSpace)),y.push(T.customProgramCacheKey),y.join()}function A(T,y){T.push(y.precision),T.push(y.outputColorSpace),T.push(y.envMapMode),T.push(y.envMapCubeUVHeight),T.push(y.mapUv),T.push(y.alphaMapUv),T.push(y.lightMapUv),T.push(y.aoMapUv),T.push(y.bumpMapUv),T.push(y.normalMapUv),T.push(y.displacementMapUv),T.push(y.emissiveMapUv),T.push(y.metalnessMapUv),T.push(y.roughnessMapUv),T.push(y.anisotropyMapUv),T.push(y.clearcoatMapUv),T.push(y.clearcoatNormalMapUv),T.push(y.clearcoatRoughnessMapUv),T.push(y.iridescenceMapUv),T.push(y.iridescenceThicknessMapUv),T.push(y.sheenColorMapUv),T.push(y.sheenRoughnessMapUv),T.push(y.specularMapUv),T.push(y.specularColorMapUv),T.push(y.specularIntensityMapUv),T.push(y.transmissionMapUv),T.push(y.thicknessMapUv),T.push(y.combine),T.push(y.fogExp2),T.push(y.sizeAttenuation),T.push(y.morphTargetsCount),T.push(y.morphAttributeCount),T.push(y.numDirLights),T.push(y.numPointLights),T.push(y.numSpotLights),T.push(y.numSpotLightMaps),T.push(y.numHemiLights),T.push(y.numRectAreaLights),T.push(y.numDirLightShadows),T.push(y.numPointLightShadows),T.push(y.numSpotLightShadows),T.push(y.numSpotLightShadowsWithMaps),T.push(y.numLightProbes),T.push(y.shadowMapType),T.push(y.toneMapping),T.push(y.numClippingPlanes),T.push(y.numClipIntersection),T.push(y.depthPacking)}function M(T,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),T.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),T.push(a.mask)}function C(T){const y=x[T.type];let G;if(y){const Z=Rn[y];G=Kg.clone(Z.uniforms)}else G=T.uniforms;return G}function z(T,y){let G;for(let Z=0,O=u.length;Z<O;Z++){const nt=u[Z];if(nt.cacheKey===y){G=nt,++G.usedTimes;break}}return G===void 0&&(G=new cM(n,y,T,r),u.push(G)),G}function D(T){if(--T.usedTimes===0){const y=u.indexOf(T);u[y]=u[u.length-1],u.pop(),T.destroy()}}function P(T){l.remove(T)}function X(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:C,acquireProgram:z,releaseProgram:D,releaseShaderCache:P,programs:u,dispose:X}}function pM(){let n=new WeakMap;function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function e(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function mM(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Bu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function zu(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h,f,p,x,v,m){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:x,renderOrder:h.renderOrder,z:v,group:m},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=x,d.renderOrder=h.renderOrder,d.z=v,d.group=m),t++,d}function a(h,f,p,x,v,m){const d=o(h,f,p,x,v,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(h,f,p,x,v,m){const d=o(h,f,p,x,v,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||mM),i.length>1&&i.sort(f||Bu),s.length>1&&s.sort(f||Bu)}function u(){for(let h=t,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function gM(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new zu,n.set(i,[o])):s>=r.length?(o=new zu,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function _M(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new jt};break;case"SpotLight":e={position:new B,direction:new B,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new B,halfWidth:new B,halfHeight:new B};break}return n[t.id]=e,e}}}function vM(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let xM=0;function MM(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function SM(n){const t=new _M,e=vM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const s=new B,r=new he,o=new he;function a(c,u){let h=0,f=0,p=0;for(let G=0;G<9;G++)i.probe[G].set(0,0,0);let x=0,v=0,m=0,d=0,A=0,M=0,C=0,z=0,D=0,P=0,X=0;c.sort(MM);const T=u===!0?Math.PI:1;for(let G=0,Z=c.length;G<Z;G++){const O=c[G],nt=O.color,k=O.intensity,R=O.distance,I=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)h+=nt.r*k*T,f+=nt.g*k*T,p+=nt.b*k*T;else if(O.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(O.sh.coefficients[H],k);X++}else if(O.isDirectionalLight){const H=t.get(O);if(H.color.copy(O.color).multiplyScalar(O.intensity*T),O.castShadow){const ct=O.shadow,ht=e.get(O);ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,i.directionalShadow[x]=ht,i.directionalShadowMap[x]=I,i.directionalShadowMatrix[x]=O.shadow.matrix,M++}i.directional[x]=H,x++}else if(O.isSpotLight){const H=t.get(O);H.position.setFromMatrixPosition(O.matrixWorld),H.color.copy(nt).multiplyScalar(k*T),H.distance=R,H.coneCos=Math.cos(O.angle),H.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),H.decay=O.decay,i.spot[m]=H;const ct=O.shadow;if(O.map&&(i.spotLightMap[D]=O.map,D++,ct.updateMatrices(O),O.castShadow&&P++),i.spotLightMatrix[m]=ct.matrix,O.castShadow){const ht=e.get(O);ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,i.spotShadow[m]=ht,i.spotShadowMap[m]=I,z++}m++}else if(O.isRectAreaLight){const H=t.get(O);H.color.copy(nt).multiplyScalar(k),H.halfWidth.set(O.width*.5,0,0),H.halfHeight.set(0,O.height*.5,0),i.rectArea[d]=H,d++}else if(O.isPointLight){const H=t.get(O);if(H.color.copy(O.color).multiplyScalar(O.intensity*T),H.distance=O.distance,H.decay=O.decay,O.castShadow){const ct=O.shadow,ht=e.get(O);ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,ht.shadowCameraNear=ct.camera.near,ht.shadowCameraFar=ct.camera.far,i.pointShadow[v]=ht,i.pointShadowMap[v]=I,i.pointShadowMatrix[v]=O.shadow.matrix,C++}i.point[v]=H,v++}else if(O.isHemisphereLight){const H=t.get(O);H.skyColor.copy(O.color).multiplyScalar(k*T),H.groundColor.copy(O.groundColor).multiplyScalar(k*T),i.hemi[A]=H,A++}}d>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=p;const y=i.hash;(y.directionalLength!==x||y.pointLength!==v||y.spotLength!==m||y.rectAreaLength!==d||y.hemiLength!==A||y.numDirectionalShadows!==M||y.numPointShadows!==C||y.numSpotShadows!==z||y.numSpotMaps!==D||y.numLightProbes!==X)&&(i.directional.length=x,i.spot.length=m,i.rectArea.length=d,i.point.length=v,i.hemi.length=A,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=z,i.spotShadowMap.length=z,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=z+D-P,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=X,y.directionalLength=x,y.pointLength=v,y.spotLength=m,y.rectAreaLength=d,y.hemiLength=A,y.numDirectionalShadows=M,y.numPointShadows=C,y.numSpotShadows=z,y.numSpotMaps=D,y.numLightProbes=X,i.version=xM++)}function l(c,u){let h=0,f=0,p=0,x=0,v=0;const m=u.matrixWorldInverse;for(let d=0,A=c.length;d<A;d++){const M=c[d];if(M.isDirectionalLight){const C=i.directional[h];C.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(m),h++}else if(M.isSpotLight){const C=i.spot[p];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(m),C.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const C=i.rectArea[x];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),C.halfWidth.set(M.width*.5,0,0),C.halfHeight.set(0,M.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const C=i.hemi[v];C.direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function Hu(n){const t=new SM(n),e=[],i=[];function s(){e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(u){t.setup(e,u)}function l(u){t.setupView(e,u)}return{init:s,state:{lightsArray:e,shadowsArray:i,lights:t,transmissionRenderTarget:null},setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function yM(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Hu(n),t.set(s,[a])):r>=o.length?(a=new Hu(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class EM extends qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bM extends qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const TM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function wM(n,t,e){let i=new Dl;const s=new Ct,r=new Ct,o=new pe,a=new EM({depthPacking:Sg}),l=new bM,c={},u=e.maxTextureSize,h={[Si]:je,[je]:Si,[on]:on},f=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:TM,fragmentShader:AM}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const x=new qe;x.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Qt(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=df;let d=this.type;this.render=function(D,P,X){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||D.length===0)return;const T=n.getRenderTarget(),y=n.getActiveCubeFace(),G=n.getActiveMipmapLevel(),Z=n.state;Z.setBlending(gi),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const O=d!==$n&&this.type===$n,nt=d===$n&&this.type!==$n;for(let k=0,R=D.length;k<R;k++){const I=D[k],H=I.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ct=H.getFrameExtents();if(s.multiply(ct),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ct.x),s.x=r.x*ct.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ct.y),s.y=r.y*ct.y,H.mapSize.y=r.y)),H.map===null||O===!0||nt===!0){const xt=this.type!==$n?{minFilter:ln,magFilter:ln}:{};H.map!==null&&H.map.dispose(),H.map=new Wi(s.x,s.y,xt),H.map.texture.name=I.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ht=H.getViewportCount();for(let xt=0;xt<ht;xt++){const Pt=H.getViewport(xt);o.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),Z.viewport(o),H.updateMatrices(I,xt),i=H.getFrustum(),C(P,X,H.camera,I,this.type)}H.isPointLightShadow!==!0&&this.type===$n&&A(H,X),H.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(T,y,G)};function A(D,P){const X=t.update(v);f.defines.VSM_SAMPLES!==D.blurSamples&&(f.defines.VSM_SAMPLES=D.blurSamples,p.defines.VSM_SAMPLES=D.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Wi(s.x,s.y)),f.uniforms.shadow_pass.value=D.map.texture,f.uniforms.resolution.value=D.mapSize,f.uniforms.radius.value=D.radius,n.setRenderTarget(D.mapPass),n.clear(),n.renderBufferDirect(P,null,X,f,v,null),p.uniforms.shadow_pass.value=D.mapPass.texture,p.uniforms.resolution.value=D.mapSize,p.uniforms.radius.value=D.radius,n.setRenderTarget(D.map),n.clear(),n.renderBufferDirect(P,null,X,p,v,null)}function M(D,P,X,T){let y=null;const G=X.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(G!==void 0)y=G;else if(y=X.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const Z=y.uuid,O=P.uuid;let nt=c[Z];nt===void 0&&(nt={},c[Z]=nt);let k=nt[O];k===void 0&&(k=y.clone(),nt[O]=k,P.addEventListener("dispose",z)),y=k}if(y.visible=P.visible,y.wireframe=P.wireframe,T===$n?y.side=P.shadowSide!==null?P.shadowSide:P.side:y.side=P.shadowSide!==null?P.shadowSide:h[P.side],y.alphaMap=P.alphaMap,y.alphaTest=P.alphaTest,y.map=P.map,y.clipShadows=P.clipShadows,y.clippingPlanes=P.clippingPlanes,y.clipIntersection=P.clipIntersection,y.displacementMap=P.displacementMap,y.displacementScale=P.displacementScale,y.displacementBias=P.displacementBias,y.wireframeLinewidth=P.wireframeLinewidth,y.linewidth=P.linewidth,X.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const Z=n.properties.get(y);Z.light=X}return y}function C(D,P,X,T,y){if(D.visible===!1)return;if(D.layers.test(P.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&y===$n)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,D.matrixWorld);const O=t.update(D),nt=D.material;if(Array.isArray(nt)){const k=O.groups;for(let R=0,I=k.length;R<I;R++){const H=k[R],ct=nt[H.materialIndex];if(ct&&ct.visible){const ht=M(D,ct,T,y);D.onBeforeShadow(n,D,P,X,O,ht,H),n.renderBufferDirect(X,null,O,ht,D,H),D.onAfterShadow(n,D,P,X,O,ht,H)}}}else if(nt.visible){const k=M(D,nt,T,y);D.onBeforeShadow(n,D,P,X,O,k,null),n.renderBufferDirect(X,null,O,k,D,null),D.onAfterShadow(n,D,P,X,O,k,null)}}const Z=D.children;for(let O=0,nt=Z.length;O<nt;O++)C(Z[O],P,X,T,y)}function z(D){D.target.removeEventListener("dispose",z);for(const X in c){const T=c[X],y=D.target.uuid;y in T&&(T[y].dispose(),delete T[y])}}}function CM(n){function t(){let g=!1;const K=new pe;let ot=null;const _t=new pe(0,0,0,0);return{setMask:function(bt){ot!==bt&&!g&&(n.colorMask(bt,bt,bt,bt),ot=bt)},setLocked:function(bt){g=bt},setClear:function(bt,Zt,qt,fe,we){we===!0&&(bt*=fe,Zt*=fe,qt*=fe),K.set(bt,Zt,qt,fe),_t.equals(K)===!1&&(n.clearColor(bt,Zt,qt,fe),_t.copy(K))},reset:function(){g=!1,ot=null,_t.set(-1,0,0,0)}}}function e(){let g=!1,K=null,ot=null,_t=null;return{setTest:function(bt){bt?at(n.DEPTH_TEST):V(n.DEPTH_TEST)},setMask:function(bt){K!==bt&&!g&&(n.depthMask(bt),K=bt)},setFunc:function(bt){if(ot!==bt){switch(bt){case qm:n.depthFunc(n.NEVER);break;case Ym:n.depthFunc(n.ALWAYS);break;case Km:n.depthFunc(n.LESS);break;case _o:n.depthFunc(n.LEQUAL);break;case Zm:n.depthFunc(n.EQUAL);break;case Jm:n.depthFunc(n.GEQUAL);break;case Qm:n.depthFunc(n.GREATER);break;case tg:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ot=bt}},setLocked:function(bt){g=bt},setClear:function(bt){_t!==bt&&(n.clearDepth(bt),_t=bt)},reset:function(){g=!1,K=null,ot=null,_t=null}}}function i(){let g=!1,K=null,ot=null,_t=null,bt=null,Zt=null,qt=null,fe=null,we=null;return{setTest:function(ie){g||(ie?at(n.STENCIL_TEST):V(n.STENCIL_TEST))},setMask:function(ie){K!==ie&&!g&&(n.stencilMask(ie),K=ie)},setFunc:function(ie,Me,Se){(ot!==ie||_t!==Me||bt!==Se)&&(n.stencilFunc(ie,Me,Se),ot=ie,_t=Me,bt=Se)},setOp:function(ie,Me,Se){(Zt!==ie||qt!==Me||fe!==Se)&&(n.stencilOp(ie,Me,Se),Zt=ie,qt=Me,fe=Se)},setLocked:function(ie){g=ie},setClear:function(ie){we!==ie&&(n.clearStencil(ie),we=ie)},reset:function(){g=!1,K=null,ot=null,_t=null,bt=null,Zt=null,qt=null,fe=null,we=null}}}const s=new t,r=new e,o=new i,a=new WeakMap,l=new WeakMap;let c={},u={},h=new WeakMap,f=[],p=null,x=!1,v=null,m=null,d=null,A=null,M=null,C=null,z=null,D=new jt(0,0,0),P=0,X=!1,T=null,y=null,G=null,Z=null,O=null;const nt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,R=0;const I=n.getParameter(n.VERSION);I.indexOf("WebGL")!==-1?(R=parseFloat(/^WebGL (\d)/.exec(I)[1]),k=R>=1):I.indexOf("OpenGL ES")!==-1&&(R=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),k=R>=2);let H=null,ct={};const ht=n.getParameter(n.SCISSOR_BOX),xt=n.getParameter(n.VIEWPORT),Pt=new pe().fromArray(ht),Yt=new pe().fromArray(xt);function st(g,K,ot,_t){const bt=new Uint8Array(4),Zt=n.createTexture();n.bindTexture(g,Zt),n.texParameteri(g,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(g,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let qt=0;qt<ot;qt++)g===n.TEXTURE_3D||g===n.TEXTURE_2D_ARRAY?n.texImage3D(K,0,n.RGBA,1,1,_t,0,n.RGBA,n.UNSIGNED_BYTE,bt):n.texImage2D(K+qt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,bt);return Zt}const dt={};dt[n.TEXTURE_2D]=st(n.TEXTURE_2D,n.TEXTURE_2D,1),dt[n.TEXTURE_CUBE_MAP]=st(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),dt[n.TEXTURE_2D_ARRAY]=st(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),dt[n.TEXTURE_3D]=st(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),at(n.DEPTH_TEST),r.setFunc(_o),Y(!1),it(Ec),at(n.CULL_FACE),L(gi);function at(g){c[g]!==!0&&(n.enable(g),c[g]=!0)}function V(g){c[g]!==!1&&(n.disable(g),c[g]=!1)}function lt(g,K){return u[g]!==K?(n.bindFramebuffer(g,K),u[g]=K,g===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=K),g===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=K),!0):!1}function Tt(g,K){let ot=f,_t=!1;if(g){ot=h.get(K),ot===void 0&&(ot=[],h.set(K,ot));const bt=g.textures;if(ot.length!==bt.length||ot[0]!==n.COLOR_ATTACHMENT0){for(let Zt=0,qt=bt.length;Zt<qt;Zt++)ot[Zt]=n.COLOR_ATTACHMENT0+Zt;ot.length=bt.length,_t=!0}}else ot[0]!==n.BACK&&(ot[0]=n.BACK,_t=!0);_t&&n.drawBuffers(ot)}function At(g){return p!==g?(n.useProgram(g),p=g,!0):!1}const $={[Fi]:n.FUNC_ADD,[Lm]:n.FUNC_SUBTRACT,[Dm]:n.FUNC_REVERSE_SUBTRACT};$[Im]=n.MIN,$[Um]=n.MAX;const w={[Nm]:n.ZERO,[Om]:n.ONE,[Fm]:n.SRC_COLOR,[el]:n.SRC_ALPHA,[Gm]:n.SRC_ALPHA_SATURATE,[km]:n.DST_COLOR,[zm]:n.DST_ALPHA,[Bm]:n.ONE_MINUS_SRC_COLOR,[nl]:n.ONE_MINUS_SRC_ALPHA,[Vm]:n.ONE_MINUS_DST_COLOR,[Hm]:n.ONE_MINUS_DST_ALPHA,[Wm]:n.CONSTANT_COLOR,[Xm]:n.ONE_MINUS_CONSTANT_COLOR,[$m]:n.CONSTANT_ALPHA,[jm]:n.ONE_MINUS_CONSTANT_ALPHA};function L(g,K,ot,_t,bt,Zt,qt,fe,we,ie){if(g===gi){x===!0&&(V(n.BLEND),x=!1);return}if(x===!1&&(at(n.BLEND),x=!0),g!==Pm){if(g!==v||ie!==X){if((m!==Fi||M!==Fi)&&(n.blendEquation(n.FUNC_ADD),m=Fi,M=Fi),ie)switch(g){case Cs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bc:n.blendFunc(n.ONE,n.ONE);break;case Tc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ac:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",g);break}else switch(g){case Cs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Tc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ac:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",g);break}d=null,A=null,C=null,z=null,D.set(0,0,0),P=0,v=g,X=ie}return}bt=bt||K,Zt=Zt||ot,qt=qt||_t,(K!==m||bt!==M)&&(n.blendEquationSeparate($[K],$[bt]),m=K,M=bt),(ot!==d||_t!==A||Zt!==C||qt!==z)&&(n.blendFuncSeparate(w[ot],w[_t],w[Zt],w[qt]),d=ot,A=_t,C=Zt,z=qt),(fe.equals(D)===!1||we!==P)&&(n.blendColor(fe.r,fe.g,fe.b,we),D.copy(fe),P=we),v=g,X=!1}function j(g,K){g.side===on?V(n.CULL_FACE):at(n.CULL_FACE);let ot=g.side===je;K&&(ot=!ot),Y(ot),g.blending===Cs&&g.transparent===!1?L(gi):L(g.blending,g.blendEquation,g.blendSrc,g.blendDst,g.blendEquationAlpha,g.blendSrcAlpha,g.blendDstAlpha,g.blendColor,g.blendAlpha,g.premultipliedAlpha),r.setFunc(g.depthFunc),r.setTest(g.depthTest),r.setMask(g.depthWrite),s.setMask(g.colorWrite);const _t=g.stencilWrite;o.setTest(_t),_t&&(o.setMask(g.stencilWriteMask),o.setFunc(g.stencilFunc,g.stencilRef,g.stencilFuncMask),o.setOp(g.stencilFail,g.stencilZFail,g.stencilZPass)),_(g.polygonOffset,g.polygonOffsetFactor,g.polygonOffsetUnits),g.alphaToCoverage===!0?at(n.SAMPLE_ALPHA_TO_COVERAGE):V(n.SAMPLE_ALPHA_TO_COVERAGE)}function Y(g){T!==g&&(g?n.frontFace(n.CW):n.frontFace(n.CCW),T=g)}function it(g){g!==Cm?(at(n.CULL_FACE),g!==y&&(g===Ec?n.cullFace(n.BACK):g===Rm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):V(n.CULL_FACE),y=g}function S(g){g!==G&&(k&&n.lineWidth(g),G=g)}function _(g,K,ot){g?(at(n.POLYGON_OFFSET_FILL),(Z!==K||O!==ot)&&(n.polygonOffset(K,ot),Z=K,O=ot)):V(n.POLYGON_OFFSET_FILL)}function U(g){g?at(n.SCISSOR_TEST):V(n.SCISSOR_TEST)}function F(g){g===void 0&&(g=n.TEXTURE0+nt-1),H!==g&&(n.activeTexture(g),H=g)}function N(g,K,ot){ot===void 0&&(H===null?ot=n.TEXTURE0+nt-1:ot=H);let _t=ct[ot];_t===void 0&&(_t={type:void 0,texture:void 0},ct[ot]=_t),(_t.type!==g||_t.texture!==K)&&(H!==ot&&(n.activeTexture(ot),H=ot),n.bindTexture(g,K||dt[g]),_t.type=g,_t.texture=K)}function q(){const g=ct[H];g!==void 0&&g.type!==void 0&&(n.bindTexture(g.type,null),g.type=void 0,g.texture=void 0)}function rt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function J(){try{n.compressedTexImage3D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function ft(){try{n.texSubImage2D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function gt(){try{n.texSubImage3D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function ut(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function pt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function Et(){try{n.texStorage2D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function vt(){try{n.texStorage3D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function yt(){try{n.texImage2D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function Dt(){try{n.texImage3D.apply(n,arguments)}catch(g){console.error("THREE.WebGLState:",g)}}function kt(g){Pt.equals(g)===!1&&(n.scissor(g.x,g.y,g.z,g.w),Pt.copy(g))}function Jt(g){Yt.equals(g)===!1&&(n.viewport(g.x,g.y,g.z,g.w),Yt.copy(g))}function It(g,K){let ot=l.get(K);ot===void 0&&(ot=new WeakMap,l.set(K,ot));let _t=ot.get(g);_t===void 0&&(_t=n.getUniformBlockIndex(K,g.name),ot.set(g,_t))}function Bt(g,K){const _t=l.get(K).get(g);a.get(K)!==_t&&(n.uniformBlockBinding(K,_t,g.__bindingPointIndex),a.set(K,_t))}function wt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},H=null,ct={},u={},h=new WeakMap,f=[],p=null,x=!1,v=null,m=null,d=null,A=null,M=null,C=null,z=null,D=new jt(0,0,0),P=0,X=!1,T=null,y=null,G=null,Z=null,O=null,Pt.set(0,0,n.canvas.width,n.canvas.height),Yt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:at,disable:V,bindFramebuffer:lt,drawBuffers:Tt,useProgram:At,setBlending:L,setMaterial:j,setFlipSided:Y,setCullFace:it,setLineWidth:S,setPolygonOffset:_,setScissorTest:U,activeTexture:F,bindTexture:N,unbindTexture:q,compressedTexImage2D:rt,compressedTexImage3D:J,texImage2D:yt,texImage3D:Dt,updateUBOMapping:It,uniformBlockBinding:Bt,texStorage2D:Et,texStorage3D:vt,texSubImage2D:ft,texSubImage3D:gt,compressedTexSubImage2D:ut,compressedTexSubImage3D:pt,scissor:kt,viewport:Jt,reset:wt}}function RM(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(S,_){return p?new OffscreenCanvas(S,_):Eo("canvas")}function v(S,_,U){let F=1;const N=it(S);if((N.width>U||N.height>U)&&(F=U/Math.max(N.width,N.height)),F<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const q=Math.floor(F*N.width),rt=Math.floor(F*N.height);h===void 0&&(h=x(q,rt));const J=_?x(q,rt):h;return J.width=q,J.height=rt,J.getContext("2d").drawImage(S,0,0,q,rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+q+"x"+rt+")."),J}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),S;return S}function m(S){return S.generateMipmaps&&S.minFilter!==ln&&S.minFilter!==_n}function d(S){n.generateMipmap(S)}function A(S,_,U,F,N=!1){if(S!==null){if(n[S]!==void 0)return n[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let q=_;if(_===n.RED&&(U===n.FLOAT&&(q=n.R32F),U===n.HALF_FLOAT&&(q=n.R16F),U===n.UNSIGNED_BYTE&&(q=n.R8)),_===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.R8UI),U===n.UNSIGNED_SHORT&&(q=n.R16UI),U===n.UNSIGNED_INT&&(q=n.R32UI),U===n.BYTE&&(q=n.R8I),U===n.SHORT&&(q=n.R16I),U===n.INT&&(q=n.R32I)),_===n.RG&&(U===n.FLOAT&&(q=n.RG32F),U===n.HALF_FLOAT&&(q=n.RG16F),U===n.UNSIGNED_BYTE&&(q=n.RG8)),_===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.RG8UI),U===n.UNSIGNED_SHORT&&(q=n.RG16UI),U===n.UNSIGNED_INT&&(q=n.RG32UI),U===n.BYTE&&(q=n.RG8I),U===n.SHORT&&(q=n.RG16I),U===n.INT&&(q=n.RG32I)),_===n.RGB&&U===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),_===n.RGBA){const rt=N?xo:re.getTransfer(F);U===n.FLOAT&&(q=n.RGBA32F),U===n.HALF_FLOAT&&(q=n.RGBA16F),U===n.UNSIGNED_BYTE&&(q=rt===ce?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function M(S,_){return m(S)===!0||S.isFramebufferTexture&&S.minFilter!==ln&&S.minFilter!==_n?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function C(S){const _=S.target;_.removeEventListener("dispose",C),D(_),_.isVideoTexture&&u.delete(_)}function z(S){const _=S.target;_.removeEventListener("dispose",z),X(_)}function D(S){const _=i.get(S);if(_.__webglInit===void 0)return;const U=S.source,F=f.get(U);if(F){const N=F[_.__cacheKey];N.usedTimes--,N.usedTimes===0&&P(S),Object.keys(F).length===0&&f.delete(U)}i.remove(S)}function P(S){const _=i.get(S);n.deleteTexture(_.__webglTexture);const U=S.source,F=f.get(U);delete F[_.__cacheKey],o.memory.textures--}function X(S){const _=i.get(S);if(S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(_.__webglFramebuffer[F]))for(let N=0;N<_.__webglFramebuffer[F].length;N++)n.deleteFramebuffer(_.__webglFramebuffer[F][N]);else n.deleteFramebuffer(_.__webglFramebuffer[F]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[F])}else{if(Array.isArray(_.__webglFramebuffer))for(let F=0;F<_.__webglFramebuffer.length;F++)n.deleteFramebuffer(_.__webglFramebuffer[F]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let F=0;F<_.__webglColorRenderbuffer.length;F++)_.__webglColorRenderbuffer[F]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[F]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=S.textures;for(let F=0,N=U.length;F<N;F++){const q=i.get(U[F]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(U[F])}i.remove(S)}let T=0;function y(){T=0}function G(){const S=T;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),T+=1,S}function Z(S){const _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function O(S,_){const U=i.get(S);if(S.isVideoTexture&&j(S),S.isRenderTargetTexture===!1&&S.version>0&&U.__version!==S.version){const F=S.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Pt(U,S,_);return}}e.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+_)}function nt(S,_){const U=i.get(S);if(S.version>0&&U.__version!==S.version){Pt(U,S,_);return}e.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+_)}function k(S,_){const U=i.get(S);if(S.version>0&&U.__version!==S.version){Pt(U,S,_);return}e.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+_)}function R(S,_){const U=i.get(S);if(S.version>0&&U.__version!==S.version){Yt(U,S,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+_)}const I={[rl]:n.REPEAT,[zi]:n.CLAMP_TO_EDGE,[ol]:n.MIRRORED_REPEAT},H={[ln]:n.NEAREST,[cg]:n.NEAREST_MIPMAP_NEAREST,[wr]:n.NEAREST_MIPMAP_LINEAR,[_n]:n.LINEAR,[sa]:n.LINEAR_MIPMAP_NEAREST,[Hi]:n.LINEAR_MIPMAP_LINEAR},ct={[Eg]:n.NEVER,[Rg]:n.ALWAYS,[bg]:n.LESS,[wf]:n.LEQUAL,[Tg]:n.EQUAL,[Cg]:n.GEQUAL,[Ag]:n.GREATER,[wg]:n.NOTEQUAL};function ht(S,_){if(_.type===mi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===_n||_.magFilter===sa||_.magFilter===wr||_.magFilter===Hi||_.minFilter===_n||_.minFilter===sa||_.minFilter===wr||_.minFilter===Hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,I[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,I[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,I[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,H[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,H[_.minFilter]),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,ct[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===ln||_.minFilter!==wr&&_.minFilter!==Hi||_.type===mi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const U=t.get("EXT_texture_filter_anisotropic");n.texParameterf(S,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function xt(S,_){let U=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",C));const F=_.source;let N=f.get(F);N===void 0&&(N={},f.set(F,N));const q=Z(_);if(q!==S.__cacheKey){N[q]===void 0&&(N[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),N[q].usedTimes++;const rt=N[S.__cacheKey];rt!==void 0&&(N[S.__cacheKey].usedTimes--,rt.usedTimes===0&&P(_)),S.__cacheKey=q,S.__webglTexture=N[q].texture}return U}function Pt(S,_,U){let F=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(F=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(F=n.TEXTURE_3D);const N=xt(S,_),q=_.source;e.bindTexture(F,S.__webglTexture,n.TEXTURE0+U);const rt=i.get(q);if(q.version!==rt.__version||N===!0){e.activeTexture(n.TEXTURE0+U);const J=re.getPrimaries(re.workingColorSpace),ft=_.colorSpace===pi?null:re.getPrimaries(_.colorSpace),gt=_.colorSpace===pi||J===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let ut=v(_.image,!1,s.maxTextureSize);ut=Y(_,ut);const pt=r.convert(_.format,_.colorSpace),Et=r.convert(_.type);let vt=A(_.internalFormat,pt,Et,_.colorSpace,_.isVideoTexture);ht(F,_);let yt;const Dt=_.mipmaps,kt=_.isVideoTexture!==!0&&vt!==Tf,Jt=rt.__version===void 0||N===!0,It=q.dataReady,Bt=M(_,ut);if(_.isDepthTexture)vt=n.DEPTH_COMPONENT16,_.type===mi?vt=n.DEPTH_COMPONENT32F:_.type===Fs?vt=n.DEPTH_COMPONENT24:_.type===xr&&(vt=n.DEPTH24_STENCIL8),Jt&&(kt?e.texStorage2D(n.TEXTURE_2D,1,vt,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,vt,ut.width,ut.height,0,pt,Et,null));else if(_.isDataTexture)if(Dt.length>0){kt&&Jt&&e.texStorage2D(n.TEXTURE_2D,Bt,vt,Dt[0].width,Dt[0].height);for(let wt=0,g=Dt.length;wt<g;wt++)yt=Dt[wt],kt?It&&e.texSubImage2D(n.TEXTURE_2D,wt,0,0,yt.width,yt.height,pt,Et,yt.data):e.texImage2D(n.TEXTURE_2D,wt,vt,yt.width,yt.height,0,pt,Et,yt.data);_.generateMipmaps=!1}else kt?(Jt&&e.texStorage2D(n.TEXTURE_2D,Bt,vt,ut.width,ut.height),It&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,pt,Et,ut.data)):e.texImage2D(n.TEXTURE_2D,0,vt,ut.width,ut.height,0,pt,Et,ut.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){kt&&Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Bt,vt,Dt[0].width,Dt[0].height,ut.depth);for(let wt=0,g=Dt.length;wt<g;wt++)yt=Dt[wt],_.format!==In?pt!==null?kt?It&&e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,wt,0,0,0,yt.width,yt.height,ut.depth,pt,yt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,wt,vt,yt.width,yt.height,ut.depth,0,yt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?It&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,wt,0,0,0,yt.width,yt.height,ut.depth,pt,Et,yt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,wt,vt,yt.width,yt.height,ut.depth,0,pt,Et,yt.data)}else{kt&&Jt&&e.texStorage2D(n.TEXTURE_2D,Bt,vt,Dt[0].width,Dt[0].height);for(let wt=0,g=Dt.length;wt<g;wt++)yt=Dt[wt],_.format!==In?pt!==null?kt?It&&e.compressedTexSubImage2D(n.TEXTURE_2D,wt,0,0,yt.width,yt.height,pt,yt.data):e.compressedTexImage2D(n.TEXTURE_2D,wt,vt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?It&&e.texSubImage2D(n.TEXTURE_2D,wt,0,0,yt.width,yt.height,pt,Et,yt.data):e.texImage2D(n.TEXTURE_2D,wt,vt,yt.width,yt.height,0,pt,Et,yt.data)}else if(_.isDataArrayTexture)kt?(Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Bt,vt,ut.width,ut.height,ut.depth),It&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,pt,Et,ut.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,vt,ut.width,ut.height,ut.depth,0,pt,Et,ut.data);else if(_.isData3DTexture)kt?(Jt&&e.texStorage3D(n.TEXTURE_3D,Bt,vt,ut.width,ut.height,ut.depth),It&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,pt,Et,ut.data)):e.texImage3D(n.TEXTURE_3D,0,vt,ut.width,ut.height,ut.depth,0,pt,Et,ut.data);else if(_.isFramebufferTexture){if(Jt)if(kt)e.texStorage2D(n.TEXTURE_2D,Bt,vt,ut.width,ut.height);else{let wt=ut.width,g=ut.height;for(let K=0;K<Bt;K++)e.texImage2D(n.TEXTURE_2D,K,vt,wt,g,0,pt,Et,null),wt>>=1,g>>=1}}else if(Dt.length>0){if(kt&&Jt){const wt=it(Dt[0]);e.texStorage2D(n.TEXTURE_2D,Bt,vt,wt.width,wt.height)}for(let wt=0,g=Dt.length;wt<g;wt++)yt=Dt[wt],kt?It&&e.texSubImage2D(n.TEXTURE_2D,wt,0,0,pt,Et,yt):e.texImage2D(n.TEXTURE_2D,wt,vt,pt,Et,yt);_.generateMipmaps=!1}else if(kt){if(Jt){const wt=it(ut);e.texStorage2D(n.TEXTURE_2D,Bt,vt,wt.width,wt.height)}It&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,Et,ut)}else e.texImage2D(n.TEXTURE_2D,0,vt,pt,Et,ut);m(_)&&d(F),rt.__version=q.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Yt(S,_,U){if(_.image.length!==6)return;const F=xt(S,_),N=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+U);const q=i.get(N);if(N.version!==q.__version||F===!0){e.activeTexture(n.TEXTURE0+U);const rt=re.getPrimaries(re.workingColorSpace),J=_.colorSpace===pi?null:re.getPrimaries(_.colorSpace),ft=_.colorSpace===pi||rt===J?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const gt=_.isCompressedTexture||_.image[0].isCompressedTexture,ut=_.image[0]&&_.image[0].isDataTexture,pt=[];for(let g=0;g<6;g++)!gt&&!ut?pt[g]=v(_.image[g],!0,s.maxCubemapSize):pt[g]=ut?_.image[g].image:_.image[g],pt[g]=Y(_,pt[g]);const Et=pt[0],vt=r.convert(_.format,_.colorSpace),yt=r.convert(_.type),Dt=A(_.internalFormat,vt,yt,_.colorSpace),kt=_.isVideoTexture!==!0,Jt=q.__version===void 0||F===!0,It=N.dataReady;let Bt=M(_,Et);ht(n.TEXTURE_CUBE_MAP,_);let wt;if(gt){kt&&Jt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Bt,Dt,Et.width,Et.height);for(let g=0;g<6;g++){wt=pt[g].mipmaps;for(let K=0;K<wt.length;K++){const ot=wt[K];_.format!==In?vt!==null?kt?It&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K,0,0,ot.width,ot.height,vt,ot.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K,Dt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?It&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K,0,0,ot.width,ot.height,vt,yt,ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K,Dt,ot.width,ot.height,0,vt,yt,ot.data)}}}else{if(wt=_.mipmaps,kt&&Jt){wt.length>0&&Bt++;const g=it(pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Bt,Dt,g.width,g.height)}for(let g=0;g<6;g++)if(ut){kt?It&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,0,0,0,pt[g].width,pt[g].height,vt,yt,pt[g].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,0,Dt,pt[g].width,pt[g].height,0,vt,yt,pt[g].data);for(let K=0;K<wt.length;K++){const _t=wt[K].image[g].image;kt?It&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K+1,0,0,_t.width,_t.height,vt,yt,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K+1,Dt,_t.width,_t.height,0,vt,yt,_t.data)}}else{kt?It&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,0,0,0,vt,yt,pt[g]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,0,Dt,vt,yt,pt[g]);for(let K=0;K<wt.length;K++){const ot=wt[K];kt?It&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K+1,0,0,vt,yt,ot.image[g]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+g,K+1,Dt,vt,yt,ot.image[g])}}}m(_)&&d(n.TEXTURE_CUBE_MAP),q.__version=N.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function st(S,_,U,F,N,q){const rt=r.convert(U.format,U.colorSpace),J=r.convert(U.type),ft=A(U.internalFormat,rt,J,U.colorSpace);if(!i.get(_).__hasExternalTextures){const ut=Math.max(1,_.width>>q),pt=Math.max(1,_.height>>q);N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?e.texImage3D(N,q,ft,ut,pt,_.depth,0,rt,J,null):e.texImage2D(N,q,ft,ut,pt,0,rt,J,null)}e.bindFramebuffer(n.FRAMEBUFFER,S),L(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,N,i.get(U).__webglTexture,0,w(_)):(N===n.TEXTURE_2D||N>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&N<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,F,N,i.get(U).__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function dt(S,_,U){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer&&!_.stencilBuffer){let F=n.DEPTH_COMPONENT24;if(U||L(_)){const N=_.depthTexture;N&&N.isDepthTexture&&(N.type===mi?F=n.DEPTH_COMPONENT32F:N.type===Fs&&(F=n.DEPTH_COMPONENT24));const q=w(_);L(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,q,F,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,q,F,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,F,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,S)}else if(_.depthBuffer&&_.stencilBuffer){const F=w(_);U&&L(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,F,n.DEPTH24_STENCIL8,_.width,_.height):L(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,F,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,S)}else{const F=_.textures;for(let N=0;N<F.length;N++){const q=F[N],rt=r.convert(q.format,q.colorSpace),J=r.convert(q.type),ft=A(q.internalFormat,rt,J,q.colorSpace),gt=w(_);U&&L(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,ft,_.width,_.height):L(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,ft,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ft,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function at(S,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),O(_.depthTexture,0);const F=i.get(_.depthTexture).__webglTexture,N=w(_);if(_.depthTexture.format===Rs)L(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,F,0,N):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,F,0);else if(_.depthTexture.format===pr)L(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,F,0,N):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,F,0);else throw new Error("Unknown depthTexture format")}function V(S){const _=i.get(S),U=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!_.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");at(_.__webglFramebuffer,S)}else if(U){_.__webglDepthbuffer=[];for(let F=0;F<6;F++)e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[F]),_.__webglDepthbuffer[F]=n.createRenderbuffer(),dt(_.__webglDepthbuffer[F],S,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),dt(_.__webglDepthbuffer,S,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(S,_,U){const F=i.get(S);_!==void 0&&st(F.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&V(S)}function Tt(S){const _=S.texture,U=i.get(S),F=i.get(_);S.addEventListener("dispose",z);const N=S.textures,q=S.isWebGLCubeRenderTarget===!0,rt=N.length>1;if(rt||(F.__webglTexture===void 0&&(F.__webglTexture=n.createTexture()),F.__version=_.version,o.memory.textures++),q){U.__webglFramebuffer=[];for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[J]=[];for(let ft=0;ft<_.mipmaps.length;ft++)U.__webglFramebuffer[J][ft]=n.createFramebuffer()}else U.__webglFramebuffer[J]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let J=0;J<_.mipmaps.length;J++)U.__webglFramebuffer[J]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(rt)for(let J=0,ft=N.length;J<ft;J++){const gt=i.get(N[J]);gt.__webglTexture===void 0&&(gt.__webglTexture=n.createTexture(),o.memory.textures++)}if(S.samples>0&&L(S)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let J=0;J<N.length;J++){const ft=N[J];U.__webglColorRenderbuffer[J]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[J]);const gt=r.convert(ft.format,ft.colorSpace),ut=r.convert(ft.type),pt=A(ft.internalFormat,gt,ut,ft.colorSpace,S.isXRRenderTarget===!0),Et=w(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,pt,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+J,n.RENDERBUFFER,U.__webglColorRenderbuffer[J])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),dt(U.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture),ht(n.TEXTURE_CUBE_MAP,_);for(let J=0;J<6;J++)if(_.mipmaps&&_.mipmaps.length>0)for(let ft=0;ft<_.mipmaps.length;ft++)st(U.__webglFramebuffer[J][ft],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft);else st(U.__webglFramebuffer[J],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(_)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let J=0,ft=N.length;J<ft;J++){const gt=N[J],ut=i.get(gt);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),ht(n.TEXTURE_2D,gt),st(U.__webglFramebuffer,S,gt,n.COLOR_ATTACHMENT0+J,n.TEXTURE_2D,0),m(gt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let J=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(J=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(J,F.__webglTexture),ht(J,_),_.mipmaps&&_.mipmaps.length>0)for(let ft=0;ft<_.mipmaps.length;ft++)st(U.__webglFramebuffer[ft],S,_,n.COLOR_ATTACHMENT0,J,ft);else st(U.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,J,0);m(_)&&d(J),e.unbindTexture()}S.depthBuffer&&V(S)}function At(S){const _=S.textures;for(let U=0,F=_.length;U<F;U++){const N=_[U];if(m(N)){const q=S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,rt=i.get(N).__webglTexture;e.bindTexture(q,rt),d(q),e.unbindTexture()}}}function $(S){if(S.samples>0&&L(S)===!1){const _=S.textures,U=S.width,F=S.height;let N=n.COLOR_BUFFER_BIT;const q=[],rt=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=i.get(S),ft=_.length>1;if(ft)for(let gt=0;gt<_.length;gt++)e.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,J.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,J.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,J.__webglFramebuffer);for(let gt=0;gt<_.length;gt++){q.push(n.COLOR_ATTACHMENT0+gt),S.depthBuffer&&q.push(rt);const ut=J.__ignoreDepthValues!==void 0?J.__ignoreDepthValues:!1;if(ut===!1&&(S.depthBuffer&&(N|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&J.__isTransmissionRenderTarget!==!0&&(N|=n.STENCIL_BUFFER_BIT)),ft&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,J.__webglColorRenderbuffer[gt]),ut===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[rt]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[rt])),ft){const pt=i.get(_[gt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,pt,0)}n.blitFramebuffer(0,0,U,F,0,0,U,F,N,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,q)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ft)for(let gt=0;gt<_.length;gt++){e.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,J.__webglColorRenderbuffer[gt]);const ut=i.get(_[gt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,J.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,ut,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,J.__webglMultisampledFramebuffer)}}function w(S){return Math.min(s.maxSamples,S.samples)}function L(S){const _=i.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function j(S){const _=o.render.frame;u.get(S)!==_&&(u.set(S,_),S.update())}function Y(S,_){const U=S.colorSpace,F=S.format,N=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||U!==Ei&&U!==pi&&(re.getTransfer(U)===ce?(F!==In||N!==vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),_}function it(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=y,this.setTexture2D=O,this.setTexture2DArray=nt,this.setTexture3D=k,this.setTextureCube=R,this.rebindTextures=lt,this.setupRenderTarget=Tt,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=V,this.setupFrameBufferTexture=st,this.useMultisampledRTT=L}function PM(n,t){function e(i,s=pi){let r;const o=re.getTransfer(s);if(i===vi)return n.UNSIGNED_BYTE;if(i===Mf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Sf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fg)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ug)return n.BYTE;if(i===hg)return n.SHORT;if(i===vf)return n.UNSIGNED_SHORT;if(i===xf)return n.INT;if(i===Fs)return n.UNSIGNED_INT;if(i===mi)return n.FLOAT;if(i===vo)return n.HALF_FLOAT;if(i===dg)return n.ALPHA;if(i===pg)return n.RGB;if(i===In)return n.RGBA;if(i===mg)return n.LUMINANCE;if(i===gg)return n.LUMINANCE_ALPHA;if(i===Rs)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===_g)return n.RED;if(i===yf)return n.RED_INTEGER;if(i===vg)return n.RG;if(i===Ef)return n.RG_INTEGER;if(i===bf)return n.RGBA_INTEGER;if(i===ra||i===oa||i===aa||i===la)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===wc||i===Cc||i===Rc||i===Pc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===wc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Tf)return r=t.get("WEBGL_compressed_texture_etc1"),r!==null?r.COMPRESSED_RGB_ETC1_WEBGL:null;if(i===Lc||i===Dc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Lc)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Dc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ic||i===Uc||i===Nc||i===Oc||i===Fc||i===Bc||i===zc||i===Hc||i===kc||i===Vc||i===Gc||i===Wc||i===Xc||i===$c)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ic)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Uc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Nc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===kc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===$c)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ca||i===jc||i===qc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ca)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===jc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xg||i===Yc||i===Kc||i===Zc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ca)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Kc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class LM extends Qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}let mn=class extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}};const DM={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,x=.005;c.inputState.pinching&&f>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(DM)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new mn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const IM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,UM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class NM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Xe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const i=e.cameras[0].viewport,s=new yi({vertexShader:IM,fragmentShader:UM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Qt(new Zn(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class OM extends ji{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,x=null;const v=new NM,m=e.getContextAttributes();let d=null,A=null;const M=[],C=[],z=new Ct;let D=null;const P=new Qe;P.layers.enable(1),P.viewport=new pe;const X=new Qe;X.layers.enable(2),X.viewport=new pe;const T=[P,X],y=new LM;y.layers.enable(1),y.layers.enable(2);let G=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let dt=M[st];return dt===void 0&&(dt=new Na,M[st]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(st){let dt=M[st];return dt===void 0&&(dt=new Na,M[st]=dt),dt.getGripSpace()},this.getHand=function(st){let dt=M[st];return dt===void 0&&(dt=new Na,M[st]=dt),dt.getHandSpace()};function O(st){const dt=C.indexOf(st.inputSource);if(dt===-1)return;const at=M[dt];at!==void 0&&(at.update(st.inputSource,st.frame,c||o),at.dispatchEvent({type:st.type,data:st.inputSource}))}function nt(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",nt),s.removeEventListener("inputsourceschange",k);for(let st=0;st<M.length;st++){const dt=C[st];dt!==null&&(C[st]=null,M[st].disconnect(dt))}G=null,Z=null,v.reset(),t.setRenderTarget(d),p=null,f=null,h=null,s=null,A=null,Yt.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(z.width,z.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){r=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){a=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(st){c=st},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(st){if(s=st,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",nt),s.addEventListener("inputsourceschange",k),m.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(z),s.renderState.layers===void 0){const dt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,dt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new Wi(p.framebufferWidth,p.framebufferHeight,{format:In,type:vi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let dt=null,at=null,V=null;m.depth&&(V=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=m.stencil?pr:Rs,at=m.stencil?xr:Fs);const lt={colorFormat:e.RGBA8,depthFormat:V,scaleFactor:r};h=new XRWebGLBinding(s,e),f=h.createProjectionLayer(lt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),A=new Wi(f.textureWidth,f.textureHeight,{format:In,type:vi,depthTexture:new Hf(f.textureWidth,f.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0});const Tt=t.properties.get(A);Tt.__ignoreDepthValues=f.ignoreDepthValues}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function k(st){for(let dt=0;dt<st.removed.length;dt++){const at=st.removed[dt],V=C.indexOf(at);V>=0&&(C[V]=null,M[V].disconnect(at))}for(let dt=0;dt<st.added.length;dt++){const at=st.added[dt];let V=C.indexOf(at);if(V===-1){for(let Tt=0;Tt<M.length;Tt++)if(Tt>=C.length){C.push(at),V=Tt;break}else if(C[Tt]===null){C[Tt]=at,V=Tt;break}if(V===-1)break}const lt=M[V];lt&&lt.connect(at)}}const R=new B,I=new B;function H(st,dt,at){R.setFromMatrixPosition(dt.matrixWorld),I.setFromMatrixPosition(at.matrixWorld);const V=R.distanceTo(I),lt=dt.projectionMatrix.elements,Tt=at.projectionMatrix.elements,At=lt[14]/(lt[10]-1),$=lt[14]/(lt[10]+1),w=(lt[9]+1)/lt[5],L=(lt[9]-1)/lt[5],j=(lt[8]-1)/lt[0],Y=(Tt[8]+1)/Tt[0],it=At*j,S=At*Y,_=V/(-j+Y),U=_*-j;dt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(U),st.translateZ(_),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert();const F=At+_,N=$+_,q=it-U,rt=S+(V-U),J=w*$/N*F,ft=L*$/N*F;st.projectionMatrix.makePerspective(q,rt,J,ft,F,N),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}function ct(st,dt){dt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(dt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(s===null)return;v.texture!==null&&(st.near=v.depthNear,st.far=v.depthFar),y.near=X.near=P.near=st.near,y.far=X.far=P.far=st.far,(G!==y.near||Z!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),G=y.near,Z=y.far,P.near=G,P.far=Z,X.near=G,X.far=Z,P.updateProjectionMatrix(),X.updateProjectionMatrix(),st.updateProjectionMatrix());const dt=st.parent,at=y.cameras;ct(y,dt);for(let V=0;V<at.length;V++)ct(at[V],dt);at.length===2?H(y,P,X):y.projectionMatrix.copy(P.projectionMatrix),ht(st,y,dt)};function ht(st,dt,at){at===null?st.matrix.copy(dt.matrixWorld):(st.matrix.copy(at.matrixWorld),st.matrix.invert(),st.matrix.multiply(dt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(dt.projectionMatrix),st.projectionMatrixInverse.copy(dt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=ll*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(st){l=st,f!==null&&(f.fixedFoveation=st),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=st)},this.hasDepthSensing=function(){return v.texture!==null};let xt=null;function Pt(st,dt){if(u=dt.getViewerPose(c||o),x=dt,u!==null){const at=u.views;p!==null&&(t.setRenderTargetFramebuffer(A,p.framebuffer),t.setRenderTarget(A));let V=!1;at.length!==y.cameras.length&&(y.cameras.length=0,V=!0);for(let Tt=0;Tt<at.length;Tt++){const At=at[Tt];let $=null;if(p!==null)$=p.getViewport(At);else{const L=h.getViewSubImage(f,At);$=L.viewport,Tt===0&&(t.setRenderTargetTextures(A,L.colorTexture,f.ignoreDepthValues?void 0:L.depthStencilTexture),t.setRenderTarget(A))}let w=T[Tt];w===void 0&&(w=new Qe,w.layers.enable(Tt),w.viewport=new pe,T[Tt]=w),w.matrix.fromArray(At.transform.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale),w.projectionMatrix.fromArray(At.projectionMatrix),w.projectionMatrixInverse.copy(w.projectionMatrix).invert(),w.viewport.set($.x,$.y,$.width,$.height),Tt===0&&(y.matrix.copy(w.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),V===!0&&y.cameras.push(w)}const lt=s.enabledFeatures;if(lt&&lt.includes("depth-sensing")){const Tt=h.getDepthInformation(at[0]);Tt&&Tt.isValid&&Tt.texture&&v.init(t,Tt,s.renderState)}}for(let at=0;at<M.length;at++){const V=C[at],lt=M[at];V!==null&&lt!==void 0&&lt.update(V,dt,c||o)}v.render(t,y),xt&&xt(st,dt),dt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:dt}),x=null}const Yt=new Bf;Yt.setAnimationLoop(Pt),this.setAnimationLoop=function(st){xt=st},this.dispose=function(){}}}const Ii=new Fn,FM=new he;function BM(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Nf(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,A,M,C){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,C)):d.isMeshMatcapMaterial?(r(m,d),x(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),v(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,A,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===je&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===je&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const A=t.get(d),M=A.envMap,C=A.envMapRotation;if(M&&(m.envMap.value=M,Ii.copy(C),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),m.envMapRotation.value.setFromMatrix4(FM.makeRotationFromEuler(Ii)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const z=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*z,e(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,A,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=M*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===je&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const A=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function zM(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,M){const C=M.program;i.uniformBlockBinding(A,C)}function c(A,M){let C=s[A.id];C===void 0&&(x(A),C=u(A),s[A.id]=C,A.addEventListener("dispose",m));const z=M.program;i.updateUBOMapping(A,z);const D=t.render.frame;r[A.id]!==D&&(f(A),r[A.id]=D)}function u(A){const M=h();A.__bindingPointIndex=M;const C=n.createBuffer(),z=A.__size,D=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,z,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,C),C}function h(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const M=s[A.id],C=A.uniforms,z=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let D=0,P=C.length;D<P;D++){const X=Array.isArray(C[D])?C[D]:[C[D]];for(let T=0,y=X.length;T<y;T++){const G=X[T];if(p(G,D,T,z)===!0){const Z=G.__offset,O=Array.isArray(G.value)?G.value:[G.value];let nt=0;for(let k=0;k<O.length;k++){const R=O[k],I=v(R);typeof R=="number"||typeof R=="boolean"?(G.__data[0]=R,n.bufferSubData(n.UNIFORM_BUFFER,Z+nt,G.__data)):R.isMatrix3?(G.__data[0]=R.elements[0],G.__data[1]=R.elements[1],G.__data[2]=R.elements[2],G.__data[3]=0,G.__data[4]=R.elements[3],G.__data[5]=R.elements[4],G.__data[6]=R.elements[5],G.__data[7]=0,G.__data[8]=R.elements[6],G.__data[9]=R.elements[7],G.__data[10]=R.elements[8],G.__data[11]=0):(R.toArray(G.__data,nt),nt+=I.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Z,G.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(A,M,C,z){const D=A.value,P=M+"_"+C;if(z[P]===void 0)return typeof D=="number"||typeof D=="boolean"?z[P]=D:z[P]=D.clone(),!0;{const X=z[P];if(typeof D=="number"||typeof D=="boolean"){if(X!==D)return z[P]=D,!0}else if(X.equals(D)===!1)return X.copy(D),!0}return!1}function x(A){const M=A.uniforms;let C=0;const z=16;for(let P=0,X=M.length;P<X;P++){const T=Array.isArray(M[P])?M[P]:[M[P]];for(let y=0,G=T.length;y<G;y++){const Z=T[y],O=Array.isArray(Z.value)?Z.value:[Z.value];for(let nt=0,k=O.length;nt<k;nt++){const R=O[nt],I=v(R),H=C%z;H!==0&&z-H<I.boundary&&(C+=z-H),Z.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=C,C+=I.storage}}}const D=C%z;return D>0&&(C+=z-D),A.__size=C,A.__cache={},this}function v(A){const M={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(M.boundary=4,M.storage=4):A.isVector2?(M.boundary=8,M.storage=8):A.isVector3||A.isColor?(M.boundary=16,M.storage=12):A.isVector4?(M.boundary=16,M.storage=16):A.isMatrix3?(M.boundary=48,M.storage=48):A.isMatrix4?(M.boundary=64,M.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),M}function m(A){const M=A.target;M.removeEventListener("dispose",m);const C=o.indexOf(M.__bindingPointIndex);o.splice(C,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(const A in s)n.deleteBuffer(s[A]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class HM{constructor(t={}){const{canvas:e=Dg(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),x=new Int32Array(4);let v=null,m=null;const d=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=An,this._useLegacyLights=!1,this.toneMapping=_i,this.toneMappingExposure=1;const M=this;let C=!1,z=0,D=0,P=null,X=-1,T=null;const y=new pe,G=new pe;let Z=null;const O=new jt(0);let nt=0,k=e.width,R=e.height,I=1,H=null,ct=null;const ht=new pe(0,0,k,R),xt=new pe(0,0,k,R);let Pt=!1;const Yt=new Dl;let st=!1,dt=!1;const at=new he,V=new Ct,lt=new B,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function At(){return P===null?I:1}let $=i;function w(b,W){const tt=e.getContext(b,W);return tt!==null?tt:null}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Rl}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",ot,!1),e.addEventListener("webglcontextcreationerror",_t,!1),$===null){const W="webgl2";if($=w(W,b),$===null)throw w(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let L,j,Y,it,S,_,U,F,N,q,rt,J,ft,gt,ut,pt,Et,vt,yt,Dt,kt,Jt,It,Bt;function wt(){L=new q0($),L.init(),j=new V0($,L,t),Jt=new PM($,L),Y=new CM($),it=new Z0($),S=new pM,_=new RM($,L,Y,S,j,Jt,it),U=new W0(M),F=new j0(M),N=new i_($),It=new H0($,N),q=new Y0($,N,it,It),rt=new Q0($,q,N,it),yt=new J0($,j,_),pt=new G0(S),J=new dM(M,U,F,L,j,It,pt),ft=new BM(M,S),gt=new gM,ut=new yM(L),vt=new z0(M,U,F,Y,rt,f,l),Et=new wM(M,rt,j),Bt=new zM($,it,j,Y),Dt=new k0($,L,it),kt=new K0($,L,it),it.programs=J.programs,M.capabilities=j,M.extensions=L,M.properties=S,M.renderLists=gt,M.shadowMap=Et,M.state=Y,M.info=it}wt();const g=new OM(M,$);this.xr=g,this.getContext=function(){return $},this.getContextAttributes=function(){return $.getContextAttributes()},this.forceContextLoss=function(){const b=L.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=L.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(b){b!==void 0&&(I=b,this.setSize(k,R,!1))},this.getSize=function(b){return b.set(k,R)},this.setSize=function(b,W,tt=!0){if(g.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=b,R=W,e.width=Math.floor(b*I),e.height=Math.floor(W*I),tt===!0&&(e.style.width=b+"px",e.style.height=W+"px"),this.setViewport(0,0,b,W)},this.getDrawingBufferSize=function(b){return b.set(k*I,R*I).floor()},this.setDrawingBufferSize=function(b,W,tt){k=b,R=W,I=tt,e.width=Math.floor(b*tt),e.height=Math.floor(W*tt),this.setViewport(0,0,b,W)},this.getCurrentViewport=function(b){return b.copy(y)},this.getViewport=function(b){return b.copy(ht)},this.setViewport=function(b,W,tt,et){b.isVector4?ht.set(b.x,b.y,b.z,b.w):ht.set(b,W,tt,et),Y.viewport(y.copy(ht).multiplyScalar(I).round())},this.getScissor=function(b){return b.copy(xt)},this.setScissor=function(b,W,tt,et){b.isVector4?xt.set(b.x,b.y,b.z,b.w):xt.set(b,W,tt,et),Y.scissor(G.copy(xt).multiplyScalar(I).round())},this.getScissorTest=function(){return Pt},this.setScissorTest=function(b){Y.setScissorTest(Pt=b)},this.setOpaqueSort=function(b){H=b},this.setTransparentSort=function(b){ct=b},this.getClearColor=function(b){return b.copy(vt.getClearColor())},this.setClearColor=function(){vt.setClearColor.apply(vt,arguments)},this.getClearAlpha=function(){return vt.getClearAlpha()},this.setClearAlpha=function(){vt.setClearAlpha.apply(vt,arguments)},this.clear=function(b=!0,W=!0,tt=!0){let et=0;if(b){let Q=!1;if(P!==null){const St=P.texture.format;Q=St===bf||St===Ef||St===yf}if(Q){const St=P.texture.type,Rt=St===vi||St===Fs||St===vf||St===xr||St===Mf||St===Sf,Lt=vt.getClearColor(),Ot=vt.getClearAlpha(),Vt=Lt.r,zt=Lt.g,Gt=Lt.b;Rt?(p[0]=Vt,p[1]=zt,p[2]=Gt,p[3]=Ot,$.clearBufferuiv($.COLOR,0,p)):(x[0]=Vt,x[1]=zt,x[2]=Gt,x[3]=Ot,$.clearBufferiv($.COLOR,0,x))}else et|=$.COLOR_BUFFER_BIT}W&&(et|=$.DEPTH_BUFFER_BIT),tt&&(et|=$.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",ot,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),gt.dispose(),ut.dispose(),S.dispose(),U.dispose(),F.dispose(),rt.dispose(),It.dispose(),Bt.dispose(),J.dispose(),g.dispose(),g.removeEventListener("sessionstart",Me),g.removeEventListener("sessionend",Se),Ye.stop()};function K(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ot(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const b=it.autoReset,W=Et.enabled,tt=Et.autoUpdate,et=Et.needsUpdate,Q=Et.type;wt(),it.autoReset=b,Et.enabled=W,Et.autoUpdate=tt,Et.needsUpdate=et,Et.type=Q}function _t(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function bt(b){const W=b.target;W.removeEventListener("dispose",bt),Zt(W)}function Zt(b){qt(b),S.remove(b)}function qt(b){const W=S.get(b).programs;W!==void 0&&(W.forEach(function(tt){J.releaseProgram(tt)}),b.isShaderMaterial&&J.releaseShaderCache(b))}this.renderBufferDirect=function(b,W,tt,et,Q,St){W===null&&(W=Tt);const Rt=Q.isMesh&&Q.matrixWorld.determinant()<0,Lt=Jf(b,W,tt,et,Q);Y.setMaterial(et,Rt);let Ot=tt.index,Vt=1;if(et.wireframe===!0){if(Ot=q.getWireframeAttribute(tt),Ot===void 0)return;Vt=2}const zt=tt.drawRange,Gt=tt.attributes.position;let xe=zt.start*Vt,Ke=(zt.start+zt.count)*Vt;St!==null&&(xe=Math.max(xe,St.start*Vt),Ke=Math.min(Ke,(St.start+St.count)*Vt)),Ot!==null?(xe=Math.max(xe,0),Ke=Math.min(Ke,Ot.count)):Gt!=null&&(xe=Math.max(xe,0),Ke=Math.min(Ke,Gt.count));const Ce=Ke-xe;if(Ce<0||Ce===1/0)return;It.setup(Q,et,Lt,tt,Ot);let zn,me=Dt;if(Ot!==null&&(zn=N.get(Ot),me=kt,me.setIndex(zn)),Q.isMesh)et.wireframe===!0?(Y.setLineWidth(et.wireframeLinewidth*At()),me.setMode($.LINES)):me.setMode($.TRIANGLES);else if(Q.isLine){let Wt=et.linewidth;Wt===void 0&&(Wt=1),Y.setLineWidth(Wt*At()),Q.isLineSegments?me.setMode($.LINES):Q.isLineLoop?me.setMode($.LINE_LOOP):me.setMode($.LINE_STRIP)}else Q.isPoints?me.setMode($.POINTS):Q.isSprite&&me.setMode($.TRIANGLES);if(Q.isBatchedMesh)me.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else if(Q.isInstancedMesh)me.renderInstances(xe,Ce,Q.count);else if(tt.isInstancedBufferGeometry){const Wt=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,Go=Math.min(tt.instanceCount,Wt);me.renderInstances(xe,Ce,Go)}else me.render(xe,Ce)};function fe(b,W,tt){b.transparent===!0&&b.side===on&&b.forceSinglePass===!1?(b.side=je,b.needsUpdate=!0,yr(b,W,tt),b.side=Si,b.needsUpdate=!0,yr(b,W,tt),b.side=on):yr(b,W,tt)}this.compile=function(b,W,tt=null){tt===null&&(tt=b),m=ut.get(tt),m.init(),A.push(m),tt.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(m.pushLight(Q),Q.castShadow&&m.pushShadow(Q))}),b!==tt&&b.traverseVisible(function(Q){Q.isLight&&Q.layers.test(W.layers)&&(m.pushLight(Q),Q.castShadow&&m.pushShadow(Q))}),m.setupLights(M._useLegacyLights);const et=new Set;return b.traverse(function(Q){const St=Q.material;if(St)if(Array.isArray(St))for(let Rt=0;Rt<St.length;Rt++){const Lt=St[Rt];fe(Lt,tt,Q),et.add(Lt)}else fe(St,tt,Q),et.add(St)}),A.pop(),m=null,et},this.compileAsync=function(b,W,tt=null){const et=this.compile(b,W,tt);return new Promise(Q=>{function St(){if(et.forEach(function(Rt){S.get(Rt).currentProgram.isReady()&&et.delete(Rt)}),et.size===0){Q(b);return}setTimeout(St,10)}L.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let we=null;function ie(b){we&&we(b)}function Me(){Ye.stop()}function Se(){Ye.start()}const Ye=new Bf;Ye.setAnimationLoop(ie),typeof self<"u"&&Ye.setContext(self),this.setAnimationLoop=function(b){we=b,g.setAnimationLoop(b),b===null?Ye.stop():Ye.start()},g.addEventListener("sessionstart",Me),g.addEventListener("sessionend",Se),this.render=function(b,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),g.enabled===!0&&g.isPresenting===!0&&(g.cameraAutoUpdate===!0&&g.updateCamera(W),W=g.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,W,P),m=ut.get(b,A.length),m.init(),A.push(m),at.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Yt.setFromProjectionMatrix(at),dt=this.localClippingEnabled,st=pt.init(this.clippingPlanes,dt),v=gt.get(b,d.length),v.init(),d.push(v),en(b,W,0,M.sortObjects),v.finish(),M.sortObjects===!0&&v.sort(H,ct),this.info.render.frame++,st===!0&&pt.beginShadows();const tt=m.state.shadowsArray;if(Et.render(tt,b,W),st===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(g.enabled===!1||g.isPresenting===!1||g.hasDepthSensing()===!1)&&vt.render(v,b),m.setupLights(M._useLegacyLights),W.isArrayCamera){const et=W.cameras;for(let Q=0,St=et.length;Q<St;Q++){const Rt=et[Q];ii(v,b,Rt,Rt.viewport)}}else ii(v,b,W);P!==null&&(_.updateMultisampleRenderTarget(P),_.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(M,b,W),It.resetDefaultState(),X=-1,T=null,A.pop(),A.length>0?m=A[A.length-1]:m=null,d.pop(),d.length>0?v=d[d.length-1]:v=null};function en(b,W,tt,et){if(b.visible===!1)return;if(b.layers.test(W.layers)){if(b.isGroup)tt=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(W);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Yt.intersectsSprite(b)){et&&lt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(at);const Rt=rt.update(b),Lt=b.material;Lt.visible&&v.push(b,Rt,Lt,tt,lt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Yt.intersectsObject(b))){const Rt=rt.update(b),Lt=b.material;if(et&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),lt.copy(b.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),lt.copy(Rt.boundingSphere.center)),lt.applyMatrix4(b.matrixWorld).applyMatrix4(at)),Array.isArray(Lt)){const Ot=Rt.groups;for(let Vt=0,zt=Ot.length;Vt<zt;Vt++){const Gt=Ot[Vt],xe=Lt[Gt.materialIndex];xe&&xe.visible&&v.push(b,Rt,xe,tt,lt.z,Gt)}}else Lt.visible&&v.push(b,Rt,Lt,tt,lt.z,null)}}const St=b.children;for(let Rt=0,Lt=St.length;Rt<Lt;Rt++)en(St[Rt],W,tt,et)}function ii(b,W,tt,et){const Q=b.opaque,St=b.transmissive,Rt=b.transparent;m.setupLightsView(tt),st===!0&&pt.setGlobalState(M.clippingPlanes,tt),St.length>0&&Yi(Q,St,W,tt),et&&Y.viewport(y.copy(et)),Q.length>0&&bi(Q,W,tt),St.length>0&&bi(St,W,tt),Rt.length>0&&bi(Rt,W,tt),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function Yi(b,W,tt,et){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;if(m.state.transmissionRenderTarget===null){m.state.transmissionRenderTarget=new Wi(1,1,{generateMipmaps:!0,type:L.has("EXT_color_buffer_half_float")||L.has("EXT_color_buffer_float")?vo:vi,minFilter:Hi,samples:4,stencilBuffer:r});const Vt=S.get(m.state.transmissionRenderTarget);Vt.__isTransmissionRenderTarget=!0}const St=m.state.transmissionRenderTarget;M.getDrawingBufferSize(V),St.setSize(V.x,V.y);const Rt=M.getRenderTarget();M.setRenderTarget(St),M.getClearColor(O),nt=M.getClearAlpha(),nt<1&&M.setClearColor(16777215,.5),M.clear();const Lt=M.toneMapping;M.toneMapping=_i,bi(b,tt,et),_.updateMultisampleRenderTarget(St),_.updateRenderTargetMipmap(St);let Ot=!1;for(let Vt=0,zt=W.length;Vt<zt;Vt++){const Gt=W[Vt],xe=Gt.object,Ke=Gt.geometry,Ce=Gt.material,zn=Gt.group;if(Ce.side===on&&xe.layers.test(et.layers)){const me=Ce.side;Ce.side=je,Ce.needsUpdate=!0,zl(xe,tt,et,Ke,Ce,zn),Ce.side=me,Ce.needsUpdate=!0,Ot=!0}}Ot===!0&&(_.updateMultisampleRenderTarget(St),_.updateRenderTargetMipmap(St)),M.setRenderTarget(Rt),M.setClearColor(O,nt),M.toneMapping=Lt}function bi(b,W,tt){const et=W.isScene===!0?W.overrideMaterial:null;for(let Q=0,St=b.length;Q<St;Q++){const Rt=b[Q],Lt=Rt.object,Ot=Rt.geometry,Vt=et===null?Rt.material:et,zt=Rt.group;Lt.layers.test(tt.layers)&&zl(Lt,W,tt,Ot,Vt,zt)}}function zl(b,W,tt,et,Q,St){b.onBeforeRender(M,W,tt,et,Q,St),b.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Q.onBeforeRender(M,W,tt,et,b,St),Q.transparent===!0&&Q.side===on&&Q.forceSinglePass===!1?(Q.side=je,Q.needsUpdate=!0,M.renderBufferDirect(tt,W,et,Q,b,St),Q.side=Si,Q.needsUpdate=!0,M.renderBufferDirect(tt,W,et,Q,b,St),Q.side=on):M.renderBufferDirect(tt,W,et,Q,b,St),b.onAfterRender(M,W,tt,et,Q,St)}function yr(b,W,tt){W.isScene!==!0&&(W=Tt);const et=S.get(b),Q=m.state.lights,St=m.state.shadowsArray,Rt=Q.state.version,Lt=J.getParameters(b,Q.state,St,W,tt),Ot=J.getProgramCacheKey(Lt);let Vt=et.programs;et.environment=b.isMeshStandardMaterial?W.environment:null,et.fog=W.fog,et.envMap=(b.isMeshStandardMaterial?F:U).get(b.envMap||et.environment),et.envMapRotation=et.environment!==null&&b.envMap===null?W.environmentRotation:b.envMapRotation,Vt===void 0&&(b.addEventListener("dispose",bt),Vt=new Map,et.programs=Vt);let zt=Vt.get(Ot);if(zt!==void 0){if(et.currentProgram===zt&&et.lightsStateVersion===Rt)return kl(b,Lt),zt}else Lt.uniforms=J.getUniforms(b),b.onBuild(tt,Lt,M),b.onBeforeCompile(Lt,M),zt=J.acquireProgram(Lt,Ot),Vt.set(Ot,zt),et.uniforms=Lt.uniforms;const Gt=et.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Gt.clippingPlanes=pt.uniform),kl(b,Lt),et.needsLights=td(b),et.lightsStateVersion=Rt,et.needsLights&&(Gt.ambientLightColor.value=Q.state.ambient,Gt.lightProbe.value=Q.state.probe,Gt.directionalLights.value=Q.state.directional,Gt.directionalLightShadows.value=Q.state.directionalShadow,Gt.spotLights.value=Q.state.spot,Gt.spotLightShadows.value=Q.state.spotShadow,Gt.rectAreaLights.value=Q.state.rectArea,Gt.ltc_1.value=Q.state.rectAreaLTC1,Gt.ltc_2.value=Q.state.rectAreaLTC2,Gt.pointLights.value=Q.state.point,Gt.pointLightShadows.value=Q.state.pointShadow,Gt.hemisphereLights.value=Q.state.hemi,Gt.directionalShadowMap.value=Q.state.directionalShadowMap,Gt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Gt.spotShadowMap.value=Q.state.spotShadowMap,Gt.spotLightMatrix.value=Q.state.spotLightMatrix,Gt.spotLightMap.value=Q.state.spotLightMap,Gt.pointShadowMap.value=Q.state.pointShadowMap,Gt.pointShadowMatrix.value=Q.state.pointShadowMatrix),et.currentProgram=zt,et.uniformsList=null,zt}function Hl(b){if(b.uniformsList===null){const W=b.currentProgram.getUniforms();b.uniformsList=ro.seqWithValue(W.seq,b.uniforms)}return b.uniformsList}function kl(b,W){const tt=S.get(b);tt.outputColorSpace=W.outputColorSpace,tt.batching=W.batching,tt.instancing=W.instancing,tt.instancingColor=W.instancingColor,tt.instancingMorph=W.instancingMorph,tt.skinning=W.skinning,tt.morphTargets=W.morphTargets,tt.morphNormals=W.morphNormals,tt.morphColors=W.morphColors,tt.morphTargetsCount=W.morphTargetsCount,tt.numClippingPlanes=W.numClippingPlanes,tt.numIntersection=W.numClipIntersection,tt.vertexAlphas=W.vertexAlphas,tt.vertexTangents=W.vertexTangents,tt.toneMapping=W.toneMapping}function Jf(b,W,tt,et,Q){W.isScene!==!0&&(W=Tt),_.resetTextureUnits();const St=W.fog,Rt=et.isMeshStandardMaterial?W.environment:null,Lt=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ei,Ot=(et.isMeshStandardMaterial?F:U).get(et.envMap||Rt),Vt=et.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,zt=!!tt.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),Gt=!!tt.morphAttributes.position,xe=!!tt.morphAttributes.normal,Ke=!!tt.morphAttributes.color;let Ce=_i;et.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Ce=M.toneMapping);const zn=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,me=zn!==void 0?zn.length:0,Wt=S.get(et),Go=m.state.lights;if(st===!0&&(dt===!0||b!==T)){const nn=b===T&&et.id===X;pt.setState(et,b,nn)}let de=!1;et.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Go.state.version||Wt.outputColorSpace!==Lt||Q.isBatchedMesh&&Wt.batching===!1||!Q.isBatchedMesh&&Wt.batching===!0||Q.isInstancedMesh&&Wt.instancing===!1||!Q.isInstancedMesh&&Wt.instancing===!0||Q.isSkinnedMesh&&Wt.skinning===!1||!Q.isSkinnedMesh&&Wt.skinning===!0||Q.isInstancedMesh&&Wt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Wt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Wt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Wt.instancingMorph===!1&&Q.morphTexture!==null||Wt.envMap!==Ot||et.fog===!0&&Wt.fog!==St||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==pt.numPlanes||Wt.numIntersection!==pt.numIntersection)||Wt.vertexAlphas!==Vt||Wt.vertexTangents!==zt||Wt.morphTargets!==Gt||Wt.morphNormals!==xe||Wt.morphColors!==Ke||Wt.toneMapping!==Ce||Wt.morphTargetsCount!==me)&&(de=!0):(de=!0,Wt.__version=et.version);let Ti=Wt.currentProgram;de===!0&&(Ti=yr(et,W,Q));let Vl=!1,Hs=!1,Wo=!1;const Ue=Ti.getUniforms(),si=Wt.uniforms;if(Y.useProgram(Ti.program)&&(Vl=!0,Hs=!0,Wo=!0),et.id!==X&&(X=et.id,Hs=!0),Vl||T!==b){Ue.setValue($,"projectionMatrix",b.projectionMatrix),Ue.setValue($,"viewMatrix",b.matrixWorldInverse);const nn=Ue.map.cameraPosition;nn!==void 0&&nn.setValue($,lt.setFromMatrixPosition(b.matrixWorld)),j.logarithmicDepthBuffer&&Ue.setValue($,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&Ue.setValue($,"isOrthographic",b.isOrthographicCamera===!0),T!==b&&(T=b,Hs=!0,Wo=!0)}if(Q.isSkinnedMesh){Ue.setOptional($,Q,"bindMatrix"),Ue.setOptional($,Q,"bindMatrixInverse");const nn=Q.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),Ue.setValue($,"boneTexture",nn.boneTexture,_))}Q.isBatchedMesh&&(Ue.setOptional($,Q,"batchingTexture"),Ue.setValue($,"batchingTexture",Q._matricesTexture,_));const Xo=tt.morphAttributes;if((Xo.position!==void 0||Xo.normal!==void 0||Xo.color!==void 0)&&yt.update(Q,tt,Ti),(Hs||Wt.receiveShadow!==Q.receiveShadow)&&(Wt.receiveShadow=Q.receiveShadow,Ue.setValue($,"receiveShadow",Q.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(si.envMap.value=Ot,si.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&W.environment!==null&&(si.envMapIntensity.value=W.environmentIntensity),Hs&&(Ue.setValue($,"toneMappingExposure",M.toneMappingExposure),Wt.needsLights&&Qf(si,Wo),St&&et.fog===!0&&ft.refreshFogUniforms(si,St),ft.refreshMaterialUniforms(si,et,I,R,m.state.transmissionRenderTarget),ro.upload($,Hl(Wt),si,_)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(ro.upload($,Hl(Wt),si,_),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&Ue.setValue($,"center",Q.center),Ue.setValue($,"modelViewMatrix",Q.modelViewMatrix),Ue.setValue($,"normalMatrix",Q.normalMatrix),Ue.setValue($,"modelMatrix",Q.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){const nn=et.uniformsGroups;for(let $o=0,ed=nn.length;$o<ed;$o++){const Gl=nn[$o];Bt.update(Gl,Ti),Bt.bind(Gl,Ti)}}return Ti}function Qf(b,W){b.ambientLightColor.needsUpdate=W,b.lightProbe.needsUpdate=W,b.directionalLights.needsUpdate=W,b.directionalLightShadows.needsUpdate=W,b.pointLights.needsUpdate=W,b.pointLightShadows.needsUpdate=W,b.spotLights.needsUpdate=W,b.spotLightShadows.needsUpdate=W,b.rectAreaLights.needsUpdate=W,b.hemisphereLights.needsUpdate=W}function td(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,W,tt){S.get(b.texture).__webglTexture=W,S.get(b.depthTexture).__webglTexture=tt;const et=S.get(b);et.__hasExternalTextures=!0,et.__autoAllocateDepthBuffer=tt===void 0,et.__autoAllocateDepthBuffer||L.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),et.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,W){const tt=S.get(b);tt.__webglFramebuffer=W,tt.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(b,W=0,tt=0){P=b,z=W,D=tt;let et=!0,Q=null,St=!1,Rt=!1;if(b){const Ot=S.get(b);Ot.__useDefaultFramebuffer!==void 0?(Y.bindFramebuffer($.FRAMEBUFFER,null),et=!1):Ot.__webglFramebuffer===void 0?_.setupRenderTarget(b):Ot.__hasExternalTextures&&_.rebindTextures(b,S.get(b.texture).__webglTexture,S.get(b.depthTexture).__webglTexture);const Vt=b.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Rt=!0);const zt=S.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(zt[W])?Q=zt[W][tt]:Q=zt[W],St=!0):b.samples>0&&_.useMultisampledRTT(b)===!1?Q=S.get(b).__webglMultisampledFramebuffer:Array.isArray(zt)?Q=zt[tt]:Q=zt,y.copy(b.viewport),G.copy(b.scissor),Z=b.scissorTest}else y.copy(ht).multiplyScalar(I).floor(),G.copy(xt).multiplyScalar(I).floor(),Z=Pt;if(Y.bindFramebuffer($.FRAMEBUFFER,Q)&&et&&Y.drawBuffers(b,Q),Y.viewport(y),Y.scissor(G),Y.setScissorTest(Z),St){const Ot=S.get(b.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ot.__webglTexture,tt)}else if(Rt){const Ot=S.get(b.texture),Vt=W||0;$.framebufferTextureLayer($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,Ot.__webglTexture,tt||0,Vt)}X=-1},this.readRenderTargetPixels=function(b,W,tt,et,Q,St,Rt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=S.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(Lt=Lt[Rt]),Lt){Y.bindFramebuffer($.FRAMEBUFFER,Lt);try{const Ot=b.texture,Vt=Ot.format,zt=Ot.type;if(Vt!==In&&Jt.convert(Vt)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Gt=zt===vo&&(L.has("EXT_color_buffer_half_float")||L.has("EXT_color_buffer_float"));if(zt!==vi&&Jt.convert(zt)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_TYPE)&&zt!==mi&&!Gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=b.width-et&&tt>=0&&tt<=b.height-Q&&$.readPixels(W,tt,et,Q,Jt.convert(Vt),Jt.convert(zt),St)}finally{const Ot=P!==null?S.get(P).__webglFramebuffer:null;Y.bindFramebuffer($.FRAMEBUFFER,Ot)}}},this.copyFramebufferToTexture=function(b,W,tt=0){const et=Math.pow(2,-tt),Q=Math.floor(W.image.width*et),St=Math.floor(W.image.height*et);_.setTexture2D(W,0),$.copyTexSubImage2D($.TEXTURE_2D,tt,0,0,b.x,b.y,Q,St),Y.unbindTexture()},this.copyTextureToTexture=function(b,W,tt,et=0){const Q=W.image.width,St=W.image.height,Rt=Jt.convert(tt.format),Lt=Jt.convert(tt.type);_.setTexture2D(tt,0),$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,tt.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,tt.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,tt.unpackAlignment),W.isDataTexture?$.texSubImage2D($.TEXTURE_2D,et,b.x,b.y,Q,St,Rt,Lt,W.image.data):W.isCompressedTexture?$.compressedTexSubImage2D($.TEXTURE_2D,et,b.x,b.y,W.mipmaps[0].width,W.mipmaps[0].height,Rt,W.mipmaps[0].data):$.texSubImage2D($.TEXTURE_2D,et,b.x,b.y,Rt,Lt,W.image),et===0&&tt.generateMipmaps&&$.generateMipmap($.TEXTURE_2D),Y.unbindTexture()},this.copyTextureToTexture3D=function(b,W,tt,et,Q=0){const St=Math.round(b.max.x-b.min.x),Rt=Math.round(b.max.y-b.min.y),Lt=b.max.z-b.min.z+1,Ot=Jt.convert(et.format),Vt=Jt.convert(et.type);let zt;if(et.isData3DTexture)_.setTexture3D(et,0),zt=$.TEXTURE_3D;else if(et.isDataArrayTexture||et.isCompressedArrayTexture)_.setTexture2DArray(et,0),zt=$.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,et.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,et.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,et.unpackAlignment);const Gt=$.getParameter($.UNPACK_ROW_LENGTH),xe=$.getParameter($.UNPACK_IMAGE_HEIGHT),Ke=$.getParameter($.UNPACK_SKIP_PIXELS),Ce=$.getParameter($.UNPACK_SKIP_ROWS),zn=$.getParameter($.UNPACK_SKIP_IMAGES),me=tt.isCompressedTexture?tt.mipmaps[Q]:tt.image;$.pixelStorei($.UNPACK_ROW_LENGTH,me.width),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,me.height),$.pixelStorei($.UNPACK_SKIP_PIXELS,b.min.x),$.pixelStorei($.UNPACK_SKIP_ROWS,b.min.y),$.pixelStorei($.UNPACK_SKIP_IMAGES,b.min.z),tt.isDataTexture||tt.isData3DTexture?$.texSubImage3D(zt,Q,W.x,W.y,W.z,St,Rt,Lt,Ot,Vt,me.data):et.isCompressedArrayTexture?$.compressedTexSubImage3D(zt,Q,W.x,W.y,W.z,St,Rt,Lt,Ot,me.data):$.texSubImage3D(zt,Q,W.x,W.y,W.z,St,Rt,Lt,Ot,Vt,me),$.pixelStorei($.UNPACK_ROW_LENGTH,Gt),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,xe),$.pixelStorei($.UNPACK_SKIP_PIXELS,Ke),$.pixelStorei($.UNPACK_SKIP_ROWS,Ce),$.pixelStorei($.UNPACK_SKIP_IMAGES,zn),Q===0&&et.generateMipmaps&&$.generateMipmap(zt),Y.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?_.setTextureCube(b,0):b.isData3DTexture?_.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?_.setTexture2DArray(b,0):_.setTexture2D(b,0),Y.unbindTexture()},this.resetState=function(){z=0,D=0,P=null,Y.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Pl?"display-p3":"srgb",e.unpackColorSpace=re.workingColorSpace===Ho?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Ul{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new jt(t),this.near=e,this.far=i}clone(){return new Ul(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class kM extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class VM{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=al,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=xi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Rf("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ze=new B;class bo{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=se(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ln(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),i=se(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),i=se(i,this.array),s=se(s,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Sn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new bo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class $f extends qi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let gs;const qs=new B,_s=new B,vs=new B,xs=new Ct,Ys=new Ct,jf=new he,Yr=new B,Ks=new B,Kr=new B,ku=new Ct,Oa=new Ct,Vu=new Ct;class GM extends Le{constructor(t=new $f){if(super(),this.isSprite=!0,this.type="Sprite",gs===void 0){gs=new qe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new VM(e,5);gs.setIndex([0,1,2,0,2,3]),gs.setAttribute("position",new bo(i,3,0,!1)),gs.setAttribute("uv",new bo(i,2,3,!1))}this.geometry=gs,this.material=t,this.center=new Ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_s.setFromMatrixScale(this.matrixWorld),jf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),vs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_s.multiplyScalar(-vs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Zr(Yr.set(-.5,-.5,0),vs,o,_s,s,r),Zr(Ks.set(.5,-.5,0),vs,o,_s,s,r),Zr(Kr.set(.5,.5,0),vs,o,_s,s,r),ku.set(0,0),Oa.set(1,0),Vu.set(1,1);let a=t.ray.intersectTriangle(Yr,Ks,Kr,!1,qs);if(a===null&&(Zr(Ks.set(-.5,.5,0),vs,o,_s,s,r),Oa.set(0,1),a=t.ray.intersectTriangle(Yr,Kr,Ks,!1,qs),a===null))return;const l=t.ray.origin.distanceTo(qs);l<t.near||l>t.far||e.push({distance:l,point:qs.clone(),uv:vn.getInterpolation(qs,Yr,Ks,Kr,ku,Oa,Vu,new Ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Zr(n,t,e,i,s,r){xs.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(Ys.x=r*xs.x-s*xs.y,Ys.y=s*xs.x+r*xs.y):Ys.copy(xs),n.copy(t),n.x+=Ys.x,n.y+=Ys.y,n.applyMatrix4(jf)}class qf extends qi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Gu=new B,Wu=new B,Xu=new he,Fa=new ko,Jr=new Sr;class WM extends Le{constructor(t=new qe,e=new qf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Gu.fromBufferAttribute(e,s-1),Wu.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Gu.distanceTo(Wu);t.setAttribute("lineDistance",new _e(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jr.copy(i.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=r,t.ray.intersectsSphere(Jr)===!1)return;Xu.copy(s).invert(),Fa.copy(t.ray).applyMatrix4(Xu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new B,u=new B,h=new B,f=new B,p=this.isLineSegments?2:1,x=i.index,m=i.attributes.position;if(x!==null){const d=Math.max(0,o.start),A=Math.min(x.count,o.start+o.count);for(let M=d,C=A-1;M<C;M+=p){const z=x.getX(M),D=x.getX(M+1);if(c.fromBufferAttribute(m,z),u.fromBufferAttribute(m,D),Fa.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const X=t.ray.origin.distanceTo(f);X<t.near||X>t.far||e.push({distance:X,point:h.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,o.start),A=Math.min(m.count,o.start+o.count);for(let M=d,C=A-1;M<C;M+=p){if(c.fromBufferAttribute(m,M),u.fromBufferAttribute(m,M+1),Fa.distanceSqToSegment(c,u,f,h)>l)continue;f.applyMatrix4(this.matrixWorld);const D=t.ray.origin.distanceTo(f);D<t.near||D>t.far||e.push({distance:D,point:h.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const $u=new B,ju=new B;class XM extends WM{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)$u.fromBufferAttribute(e,s),ju.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+$u.distanceTo(ju);t.setAttribute("lineDistance",new _e(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $M extends Xe{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nl extends qe{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new B,u=new Ct;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const p=i+h/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new _e(o,3)),this.setAttribute("normal",new _e(a,3)),this.setAttribute("uv",new _e(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ls extends qe{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],p=[];let x=0;const v=[],m=i/2;let d=0;A(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new _e(h,3)),this.setAttribute("normal",new _e(f,3)),this.setAttribute("uv",new _e(p,2));function A(){const C=new B,z=new B;let D=0;const P=(e-t)/i;for(let X=0;X<=r;X++){const T=[],y=X/r,G=y*(e-t)+t;for(let Z=0;Z<=s;Z++){const O=Z/s,nt=O*l+a,k=Math.sin(nt),R=Math.cos(nt);z.x=G*k,z.y=-y*i+m,z.z=G*R,h.push(z.x,z.y,z.z),C.set(k,P,R).normalize(),f.push(C.x,C.y,C.z),p.push(O,1-y),T.push(x++)}v.push(T)}for(let X=0;X<s;X++)for(let T=0;T<r;T++){const y=v[T][X],G=v[T+1][X],Z=v[T+1][X+1],O=v[T][X+1];u.push(y,G,O),u.push(G,Z,O),D+=6}c.addGroup(d,D,0),d+=D}function M(C){const z=x,D=new Ct,P=new B;let X=0;const T=C===!0?t:e,y=C===!0?1:-1;for(let Z=1;Z<=s;Z++)h.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),x++;const G=x;for(let Z=0;Z<=s;Z++){const nt=Z/s*l+a,k=Math.cos(nt),R=Math.sin(nt);P.x=T*R,P.y=m*y,P.z=T*k,h.push(P.x,P.y,P.z),f.push(0,y,0),D.x=k*.5+.5,D.y=R*.5*y+.5,p.push(D.x,D.y),x++}for(let Z=0;Z<s;Z++){const O=z+Z,nt=G+Z;C===!0?u.push(nt,nt+1,O):u.push(nt+1,nt,O),X+=3}c.addGroup(d,X,C===!0?1:2),d+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ls(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ol extends Ls{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ol(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class lr extends qe{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let h=t;const f=(e-t)/s,p=new B,x=new Ct;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const d=r+m/i*o;p.x=h*Math.cos(d),p.y=h*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),x.x=(p.x/e+1)/2,x.y=(p.y/e+1)/2,u.push(x.x,x.y)}h+=f}for(let v=0;v<s;v++){const m=v*(i+1);for(let d=0;d<i;d++){const A=d+m,M=A,C=A+i+1,z=A+i+2,D=A+1;a.push(M,C,D),a.push(C,z,D)}}this.setIndex(a),this.setAttribute("position",new _e(l,3)),this.setAttribute("normal",new _e(c,3)),this.setAttribute("uv",new _e(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class di extends qe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new B,f=new B,p=[],x=[],v=[],m=[];for(let d=0;d<=i;d++){const A=[],M=d/i;let C=0;d===0&&o===0?C=.5/e:d===i&&l===Math.PI&&(C=-.5/e);for(let z=0;z<=e;z++){const D=z/e;h.x=-t*Math.cos(s+D*r)*Math.sin(o+M*a),h.y=t*Math.cos(o+M*a),h.z=t*Math.sin(s+D*r)*Math.sin(o+M*a),x.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(D+C,1-M),A.push(c++)}u.push(A)}for(let d=0;d<i;d++)for(let A=0;A<e;A++){const M=u[d][A+1],C=u[d][A],z=u[d+1][A],D=u[d+1][A+1];(d!==0||o>0)&&p.push(M,C,D),(d!==i-1||l<Math.PI)&&p.push(C,z,D)}this.setIndex(p),this.setAttribute("position",new _e(x,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new di(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class dn extends qi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Af,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fl extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Ba=new he,qu=new B,Yu=new B;class Yf{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dl,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;qu.setFromMatrixPosition(t.matrixWorld),e.position.copy(qu),Yu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yu),e.updateMatrixWorld(),Ba.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ba),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ba)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ku=new he,Zs=new B,za=new B;class jM extends Yf{constructor(){super(new Qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new pe(2,1,1,1),new pe(0,1,1,1),new pe(3,1,1,1),new pe(1,1,1,1),new pe(3,0,1,1),new pe(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Zs.setFromMatrixPosition(t.matrixWorld),i.position.copy(Zs),za.copy(i.position),za.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(za),i.updateMatrixWorld(),s.makeTranslation(-Zs.x,-Zs.y,-Zs.z),Ku.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ku)}}class Ha extends Fl{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new jM}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class qM extends Yf{constructor(){super(new zf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zu extends Fl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new qM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class YM extends Fl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class KM{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ju(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ju();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ju(){return(typeof performance>"u"?Date:performance).now()}const Qu=new he;class ZM{constructor(t,e,i=0,s=1/0){this.ray=new ko(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ll,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Qu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qu),this}intersectObject(t,e=!0,i=[]){return ul(t,this,i,e),i.sort(th),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)ul(t[s],this,i,e);return i.sort(th),i}}function th(n,t){return n.distance-t.distance}function ul(n,t,e,i){if(n.layers.test(t.layers)&&n.raycast(t,e),i===!0){const s=n.children;for(let r=0,o=s.length;r<o;r++)ul(s[r],t,e,!0)}}class eh{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ge(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class JM extends XM{constructor(t=10,e=10,i=4473924,s=8947848){i=new jt(i),s=new jt(s);const r=e/2,o=t/e,a=t/2,l=[],c=[];for(let f=0,p=0,x=-a;f<=e;f++,x+=o){l.push(-a,0,x,a,0,x),l.push(x,0,-a,x,0,a);const v=f===r?i:s;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const u=new qe;u.setAttribute("position",new _e(l,3)),u.setAttribute("color",new _e(c,3));const h=new qf({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rl);const nh={type:"change"},ka={type:"start"},ih={type:"end"},Qr=new ko,sh=new fi,QM=Math.cos(70*Lg.DEG2RAD);class tS extends ji{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Zi.ROTATE,MIDDLE:Zi.DOLLY,RIGHT:Zi.PAN},this.touches={ONE:Ji.ROTATE,TWO:Ji.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(g){g.addEventListener("keydown",pt),this._domElementKeyEvents=g},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",pt),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(nh),i.update(),r=s.NONE},this.update=function(){const g=new B,K=new Xi().setFromUnitVectors(t.up,new B(0,1,0)),ot=K.clone().invert(),_t=new B,bt=new Xi,Zt=new B,qt=2*Math.PI;return function(we=null){const ie=i.object.position;g.copy(ie).sub(i.target),g.applyQuaternion(K),a.setFromVector3(g),i.autoRotate&&r===s.NONE&&Z(y(we)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Me=i.minAzimuthAngle,Se=i.maxAzimuthAngle;isFinite(Me)&&isFinite(Se)&&(Me<-Math.PI?Me+=qt:Me>Math.PI&&(Me-=qt),Se<-Math.PI?Se+=qt:Se>Math.PI&&(Se-=qt),Me<=Se?a.theta=Math.max(Me,Math.min(Se,a.theta)):a.theta=a.theta>(Me+Se)/2?Math.max(Me,a.theta):Math.min(Se,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor);let Ye=!1;if(i.zoomToCursor&&D||i.object.isOrthographicCamera)a.radius=ht(a.radius);else{const en=a.radius;a.radius=ht(a.radius*c),Ye=en!=a.radius}if(g.setFromSpherical(a),g.applyQuaternion(ot),ie.copy(i.target).add(g),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),i.zoomToCursor&&D){let en=null;if(i.object.isPerspectiveCamera){const ii=g.length();en=ht(ii*c);const Yi=ii-en;i.object.position.addScaledVector(C,Yi),i.object.updateMatrixWorld(),Ye=!!Yi}else if(i.object.isOrthographicCamera){const ii=new B(z.x,z.y,0);ii.unproject(i.object);const Yi=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),Ye=Yi!==i.object.zoom;const bi=new B(z.x,z.y,0);bi.unproject(i.object),i.object.position.sub(bi).add(ii),i.object.updateMatrixWorld(),en=g.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;en!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(en).add(i.object.position):(Qr.origin.copy(i.object.position),Qr.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Qr.direction))<QM?t.lookAt(i.target):(sh.setFromNormalAndCoplanarPoint(i.object.up,i.target),Qr.intersectPlane(sh,i.target))))}else if(i.object.isOrthographicCamera){const en=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),en!==i.object.zoom&&(i.object.updateProjectionMatrix(),Ye=!0)}return c=1,D=!1,Ye||_t.distanceToSquared(i.object.position)>o||8*(1-bt.dot(i.object.quaternion))>o||Zt.distanceToSquared(i.target)>o?(i.dispatchEvent(nh),_t.copy(i.object.position),bt.copy(i.object.quaternion),Zt.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",yt),i.domElement.removeEventListener("pointerdown",U),i.domElement.removeEventListener("pointercancel",N),i.domElement.removeEventListener("wheel",J),i.domElement.removeEventListener("pointermove",F),i.domElement.removeEventListener("pointerup",N),i.domElement.getRootNode().removeEventListener("keydown",gt,{capture:!0}),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",pt),i._domElementKeyEvents=null)};const i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const o=1e-6,a=new eh,l=new eh;let c=1;const u=new B,h=new Ct,f=new Ct,p=new Ct,x=new Ct,v=new Ct,m=new Ct,d=new Ct,A=new Ct,M=new Ct,C=new B,z=new Ct;let D=!1;const P=[],X={};let T=!1;function y(g){return g!==null?2*Math.PI/60*i.autoRotateSpeed*g:2*Math.PI/60/60*i.autoRotateSpeed}function G(g){const K=Math.abs(g*.01);return Math.pow(.95,i.zoomSpeed*K)}function Z(g){l.theta-=g}function O(g){l.phi-=g}const nt=function(){const g=new B;return function(ot,_t){g.setFromMatrixColumn(_t,0),g.multiplyScalar(-ot),u.add(g)}}(),k=function(){const g=new B;return function(ot,_t){i.screenSpacePanning===!0?g.setFromMatrixColumn(_t,1):(g.setFromMatrixColumn(_t,0),g.crossVectors(i.object.up,g)),g.multiplyScalar(ot),u.add(g)}}(),R=function(){const g=new B;return function(ot,_t){const bt=i.domElement;if(i.object.isPerspectiveCamera){const Zt=i.object.position;g.copy(Zt).sub(i.target);let qt=g.length();qt*=Math.tan(i.object.fov/2*Math.PI/180),nt(2*ot*qt/bt.clientHeight,i.object.matrix),k(2*_t*qt/bt.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(nt(ot*(i.object.right-i.object.left)/i.object.zoom/bt.clientWidth,i.object.matrix),k(_t*(i.object.top-i.object.bottom)/i.object.zoom/bt.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function I(g){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=g:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function H(g){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=g:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ct(g,K){if(!i.zoomToCursor)return;D=!0;const ot=i.domElement.getBoundingClientRect(),_t=g-ot.left,bt=K-ot.top,Zt=ot.width,qt=ot.height;z.x=_t/Zt*2-1,z.y=-(bt/qt)*2+1,C.set(z.x,z.y,1).unproject(i.object).sub(i.object.position).normalize()}function ht(g){return Math.max(i.minDistance,Math.min(i.maxDistance,g))}function xt(g){h.set(g.clientX,g.clientY)}function Pt(g){ct(g.clientX,g.clientX),d.set(g.clientX,g.clientY)}function Yt(g){x.set(g.clientX,g.clientY)}function st(g){f.set(g.clientX,g.clientY),p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const K=i.domElement;Z(2*Math.PI*p.x/K.clientHeight),O(2*Math.PI*p.y/K.clientHeight),h.copy(f),i.update()}function dt(g){A.set(g.clientX,g.clientY),M.subVectors(A,d),M.y>0?I(G(M.y)):M.y<0&&H(G(M.y)),d.copy(A),i.update()}function at(g){v.set(g.clientX,g.clientY),m.subVectors(v,x).multiplyScalar(i.panSpeed),R(m.x,m.y),x.copy(v),i.update()}function V(g){ct(g.clientX,g.clientY),g.deltaY<0?H(G(g.deltaY)):g.deltaY>0&&I(G(g.deltaY)),i.update()}function lt(g){let K=!1;switch(g.code){case i.keys.UP:g.ctrlKey||g.metaKey||g.shiftKey?O(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(0,i.keyPanSpeed),K=!0;break;case i.keys.BOTTOM:g.ctrlKey||g.metaKey||g.shiftKey?O(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(0,-i.keyPanSpeed),K=!0;break;case i.keys.LEFT:g.ctrlKey||g.metaKey||g.shiftKey?Z(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(i.keyPanSpeed,0),K=!0;break;case i.keys.RIGHT:g.ctrlKey||g.metaKey||g.shiftKey?Z(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):R(-i.keyPanSpeed,0),K=!0;break}K&&(g.preventDefault(),i.update())}function Tt(g){if(P.length===1)h.set(g.pageX,g.pageY);else{const K=Bt(g),ot=.5*(g.pageX+K.x),_t=.5*(g.pageY+K.y);h.set(ot,_t)}}function At(g){if(P.length===1)x.set(g.pageX,g.pageY);else{const K=Bt(g),ot=.5*(g.pageX+K.x),_t=.5*(g.pageY+K.y);x.set(ot,_t)}}function $(g){const K=Bt(g),ot=g.pageX-K.x,_t=g.pageY-K.y,bt=Math.sqrt(ot*ot+_t*_t);d.set(0,bt)}function w(g){i.enableZoom&&$(g),i.enablePan&&At(g)}function L(g){i.enableZoom&&$(g),i.enableRotate&&Tt(g)}function j(g){if(P.length==1)f.set(g.pageX,g.pageY);else{const ot=Bt(g),_t=.5*(g.pageX+ot.x),bt=.5*(g.pageY+ot.y);f.set(_t,bt)}p.subVectors(f,h).multiplyScalar(i.rotateSpeed);const K=i.domElement;Z(2*Math.PI*p.x/K.clientHeight),O(2*Math.PI*p.y/K.clientHeight),h.copy(f)}function Y(g){if(P.length===1)v.set(g.pageX,g.pageY);else{const K=Bt(g),ot=.5*(g.pageX+K.x),_t=.5*(g.pageY+K.y);v.set(ot,_t)}m.subVectors(v,x).multiplyScalar(i.panSpeed),R(m.x,m.y),x.copy(v)}function it(g){const K=Bt(g),ot=g.pageX-K.x,_t=g.pageY-K.y,bt=Math.sqrt(ot*ot+_t*_t);A.set(0,bt),M.set(0,Math.pow(A.y/d.y,i.zoomSpeed)),I(M.y),d.copy(A);const Zt=(g.pageX+K.x)*.5,qt=(g.pageY+K.y)*.5;ct(Zt,qt)}function S(g){i.enableZoom&&it(g),i.enablePan&&Y(g)}function _(g){i.enableZoom&&it(g),i.enableRotate&&j(g)}function U(g){i.enabled!==!1&&(P.length===0&&(i.domElement.setPointerCapture(g.pointerId),i.domElement.addEventListener("pointermove",F),i.domElement.addEventListener("pointerup",N)),!Jt(g)&&(Dt(g),g.pointerType==="touch"?Et(g):q(g)))}function F(g){i.enabled!==!1&&(g.pointerType==="touch"?vt(g):rt(g))}function N(g){switch(kt(g),P.length){case 0:i.domElement.releasePointerCapture(g.pointerId),i.domElement.removeEventListener("pointermove",F),i.domElement.removeEventListener("pointerup",N),i.dispatchEvent(ih),r=s.NONE;break;case 1:const K=P[0],ot=X[K];Et({pointerId:K,pageX:ot.x,pageY:ot.y});break}}function q(g){let K;switch(g.button){case 0:K=i.mouseButtons.LEFT;break;case 1:K=i.mouseButtons.MIDDLE;break;case 2:K=i.mouseButtons.RIGHT;break;default:K=-1}switch(K){case Zi.DOLLY:if(i.enableZoom===!1)return;Pt(g),r=s.DOLLY;break;case Zi.ROTATE:if(g.ctrlKey||g.metaKey||g.shiftKey){if(i.enablePan===!1)return;Yt(g),r=s.PAN}else{if(i.enableRotate===!1)return;xt(g),r=s.ROTATE}break;case Zi.PAN:if(g.ctrlKey||g.metaKey||g.shiftKey){if(i.enableRotate===!1)return;xt(g),r=s.ROTATE}else{if(i.enablePan===!1)return;Yt(g),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(ka)}function rt(g){switch(r){case s.ROTATE:if(i.enableRotate===!1)return;st(g);break;case s.DOLLY:if(i.enableZoom===!1)return;dt(g);break;case s.PAN:if(i.enablePan===!1)return;at(g);break}}function J(g){i.enabled===!1||i.enableZoom===!1||r!==s.NONE||(g.preventDefault(),i.dispatchEvent(ka),V(ft(g)),i.dispatchEvent(ih))}function ft(g){const K=g.deltaMode,ot={clientX:g.clientX,clientY:g.clientY,deltaY:g.deltaY};switch(K){case 1:ot.deltaY*=16;break;case 2:ot.deltaY*=100;break}return g.ctrlKey&&!T&&(ot.deltaY*=10),ot}function gt(g){g.key==="Control"&&(T=!0,i.domElement.getRootNode().addEventListener("keyup",ut,{passive:!0,capture:!0}))}function ut(g){g.key==="Control"&&(T=!1,i.domElement.getRootNode().removeEventListener("keyup",ut,{passive:!0,capture:!0}))}function pt(g){i.enabled===!1||i.enablePan===!1||lt(g)}function Et(g){switch(It(g),P.length){case 1:switch(i.touches.ONE){case Ji.ROTATE:if(i.enableRotate===!1)return;Tt(g),r=s.TOUCH_ROTATE;break;case Ji.PAN:if(i.enablePan===!1)return;At(g),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(i.touches.TWO){case Ji.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;w(g),r=s.TOUCH_DOLLY_PAN;break;case Ji.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;L(g),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(ka)}function vt(g){switch(It(g),r){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;j(g),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;Y(g),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;S(g),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;_(g),i.update();break;default:r=s.NONE}}function yt(g){i.enabled!==!1&&g.preventDefault()}function Dt(g){P.push(g.pointerId)}function kt(g){delete X[g.pointerId];for(let K=0;K<P.length;K++)if(P[K]==g.pointerId){P.splice(K,1);return}}function Jt(g){for(let K=0;K<P.length;K++)if(P[K]==g.pointerId)return!0;return!1}function It(g){let K=X[g.pointerId];K===void 0&&(K=new Ct,X[g.pointerId]=K),K.set(g.pageX,g.pageY)}function Bt(g){const K=g.pointerId===P[0]?P[1]:P[0];return X[K]}i.domElement.addEventListener("contextmenu",yt),i.domElement.addEventListener("pointerdown",U),i.domElement.addEventListener("pointercancel",N),i.domElement.addEventListener("wheel",J,{passive:!1}),i.domElement.getRootNode().addEventListener("keydown",gt,{passive:!0,capture:!0}),this.update()}}var Ds=Object.freeze({Linear:Object.freeze({None:function(n){return n},In:function(n){return n},Out:function(n){return n},InOut:function(n){return n}}),Quadratic:Object.freeze({In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}}),Cubic:Object.freeze({In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}}),Quartic:Object.freeze({In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}}),Quintic:Object.freeze({In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}}),Sinusoidal:Object.freeze({In:function(n){return 1-Math.sin((1-n)*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return .5*(1-Math.sin(Math.PI*(.5-n)))}}),Exponential:Object.freeze({In:function(n){return n===0?0:Math.pow(1024,n-1)},Out:function(n){return n===1?1:1-Math.pow(2,-10*n)},InOut:function(n){return n===0?0:n===1?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}}),Circular:Object.freeze({In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}}),Elastic:Object.freeze({In:function(n){return n===0?0:n===1?1:-Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI)},Out:function(n){return n===0?0:n===1?1:Math.pow(2,-10*n)*Math.sin((n-.1)*5*Math.PI)+1},InOut:function(n){return n===0?0:n===1?1:(n*=2,n<1?-.5*Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin((n-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(n){var t=1.70158;return n===1?1:n*n*((t+1)*n-t)},Out:function(n){var t=1.70158;return n===0?0:--n*n*((t+1)*n+t)+1},InOut:function(n){var t=2.5949095;return(n*=2)<1?.5*(n*n*((t+1)*n-t)):.5*((n-=2)*n*((t+1)*n+t)+2)}}),Bounce:Object.freeze({In:function(n){return 1-Ds.Bounce.Out(1-n)},Out:function(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return n<.5?Ds.Bounce.In(n*2)*.5:Ds.Bounce.Out(n*2-1)*.5+.5}}),generatePow:function(n){return n===void 0&&(n=4),n=n<Number.EPSILON?Number.EPSILON:n,n=n>1e4?1e4:n,{In:function(t){return Math.pow(t,n)},Out:function(t){return 1-Math.pow(1-t,n)},InOut:function(t){return t<.5?Math.pow(t*2,n)/2:(1-Math.pow(2-t*2,n))/2+.5}}}}),ys=function(){return performance.now()},Kf=function(){function n(){this._tweens={},this._tweensAddedDuringUpdate={}}return n.prototype.getAll=function(){var t=this;return Object.keys(this._tweens).map(function(e){return t._tweens[e]})},n.prototype.removeAll=function(){this._tweens={}},n.prototype.add=function(t){this._tweens[t.getId()]=t,this._tweensAddedDuringUpdate[t.getId()]=t},n.prototype.remove=function(t){delete this._tweens[t.getId()],delete this._tweensAddedDuringUpdate[t.getId()]},n.prototype.update=function(t,e){t===void 0&&(t=ys()),e===void 0&&(e=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var s=0;s<i.length;s++){var r=this._tweens[i[s]],o=!e;r&&r.update(t,o)===!1&&!e&&delete this._tweens[i[s]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},n}(),ki={Linear:function(n,t){var e=n.length-1,i=e*t,s=Math.floor(i),r=ki.Utils.Linear;return t<0?r(n[0],n[1],i):t>1?r(n[e],n[e-1],e-i):r(n[s],n[s+1>e?e:s+1],i-s)},Bezier:function(n,t){for(var e=0,i=n.length-1,s=Math.pow,r=ki.Utils.Bernstein,o=0;o<=i;o++)e+=s(1-t,i-o)*s(t,o)*n[o]*r(i,o);return e},CatmullRom:function(n,t){var e=n.length-1,i=e*t,s=Math.floor(i),r=ki.Utils.CatmullRom;return n[0]===n[e]?(t<0&&(s=Math.floor(i=e*(1+t))),r(n[(s-1+e)%e],n[s],n[(s+1)%e],n[(s+2)%e],i-s)):t<0?n[0]-(r(n[0],n[0],n[1],n[1],-i)-n[0]):t>1?n[e]-(r(n[e],n[e],n[e-1],n[e-1],i-e)-n[e]):r(n[s?s-1:0],n[s],n[e<s+1?e:s+1],n[e<s+2?e:s+2],i-s)},Utils:{Linear:function(n,t,e){return(t-n)*e+n},Bernstein:function(n,t){var e=ki.Utils.Factorial;return e(n)/e(t)/e(n-t)},Factorial:function(){var n=[1];return function(t){var e=1;if(n[t])return n[t];for(var i=t;i>1;i--)e*=i;return n[t]=e,e}}(),CatmullRom:function(n,t,e,i,s){var r=(e-n)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*e+r+o)*l+(-3*t+3*e-2*r-o)*a+r*s+t}}},Bl=function(){function n(){}return n.nextId=function(){return n._nextId++},n._nextId=0,n}(),hl=new Kf,eS=function(){function n(t,e){e===void 0&&(e=hl),this._object=t,this._group=e,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Ds.Linear.None,this._interpolationFunction=ki.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=Bl.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return n.prototype.getId=function(){return this._id},n.prototype.isPlaying=function(){return this._isPlaying},n.prototype.isPaused=function(){return this._isPaused},n.prototype.getDuration=function(){return this._duration},n.prototype.to=function(t,e){if(e===void 0&&(e=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=t,this._propertiesAreSetUp=!1,this._duration=e<0?0:e,this},n.prototype.duration=function(t){return t===void 0&&(t=1e3),this._duration=t<0?0:t,this},n.prototype.dynamic=function(t){return t===void 0&&(t=!1),this._isDynamic=t,this},n.prototype.start=function(t,e){if(t===void 0&&(t=ys()),e===void 0&&(e=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=t,this._startTime+=this._delayTime,!this._propertiesAreSetUp||e){if(this._propertiesAreSetUp=!0,!this._isDynamic){var s={};for(var r in this._valuesEnd)s[r]=this._valuesEnd[r];this._valuesEnd=s}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,e)}return this},n.prototype.startFromCurrentValues=function(t){return this.start(t,!0)},n.prototype._setupProperties=function(t,e,i,s,r){for(var o in i){var a=t[o],l=Array.isArray(a),c=l?"array":typeof a,u=!l&&Array.isArray(i[o]);if(!(c==="undefined"||c==="function")){if(u){var h=i[o];if(h.length===0)continue;for(var f=[a],p=0,x=h.length;p<x;p+=1){var v=this._handleRelativeValue(a,h[p]);if(isNaN(v)){u=!1,console.warn("Found invalid interpolation list. Skipping.");break}f.push(v)}u&&(i[o]=f)}if((c==="object"||l)&&a&&!u){e[o]=l?[]:{};var m=a;for(var d in m)e[o][d]=m[d];s[o]=l?[]:{};var h=i[o];if(!this._isDynamic){var A={};for(var d in h)A[d]=h[d];i[o]=h=A}this._setupProperties(m,e[o],h,s[o],r)}else(typeof e[o]>"u"||r)&&(e[o]=a),l||(e[o]*=1),u?s[o]=i[o].slice().reverse():s[o]=e[o]||0}}},n.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},n.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},n.prototype.pause=function(t){return t===void 0&&(t=ys()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=t,this._group&&this._group.remove(this),this)},n.prototype.resume=function(t){return t===void 0&&(t=ys()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=t-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},n.prototype.stopChainedTweens=function(){for(var t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].stop();return this},n.prototype.group=function(t){return t===void 0&&(t=hl),this._group=t,this},n.prototype.delay=function(t){return t===void 0&&(t=0),this._delayTime=t,this},n.prototype.repeat=function(t){return t===void 0&&(t=0),this._initialRepeat=t,this._repeat=t,this},n.prototype.repeatDelay=function(t){return this._repeatDelayTime=t,this},n.prototype.yoyo=function(t){return t===void 0&&(t=!1),this._yoyo=t,this},n.prototype.easing=function(t){return t===void 0&&(t=Ds.Linear.None),this._easingFunction=t,this},n.prototype.interpolation=function(t){return t===void 0&&(t=ki.Linear),this._interpolationFunction=t,this},n.prototype.chain=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this._chainedTweens=t,this},n.prototype.onStart=function(t){return this._onStartCallback=t,this},n.prototype.onEveryStart=function(t){return this._onEveryStartCallback=t,this},n.prototype.onUpdate=function(t){return this._onUpdateCallback=t,this},n.prototype.onRepeat=function(t){return this._onRepeatCallback=t,this},n.prototype.onComplete=function(t){return this._onCompleteCallback=t,this},n.prototype.onStop=function(t){return this._onStopCallback=t,this},n.prototype.update=function(t,e){var i=this,s;if(t===void 0&&(t=ys()),e===void 0&&(e=!0),this._isPaused)return!0;var r,o=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(t>o)return!1;e&&this.start(t,!0)}if(this._goToEnd=!1,t<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=t-this._startTime,l=this._duration+((s=this._repeatDelayTime)!==null&&s!==void 0?s:this._delayTime),c=this._duration+this._repeat*l,u=function(){if(i._duration===0||a>c)return 1;var m=Math.trunc(a/l),d=a-m*l,A=Math.min(d/i._duration,1);return A===0&&a===i._duration?1:A},h=u(),f=this._easingFunction(h);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,f),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),this._duration===0||a>=this._duration)if(this._repeat>0){var p=Math.min(Math.trunc((a-this._duration)/l)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=p);for(r in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[r]=="string"&&(this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(this._valuesEnd[r])),this._yoyo&&this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=l*p,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var x=0,v=this._chainedTweens.length;x<v;x++)this._chainedTweens[x].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},n.prototype._updateProperties=function(t,e,i,s){for(var r in i)if(e[r]!==void 0){var o=e[r]||0,a=i[r],l=Array.isArray(t[r]),c=Array.isArray(a),u=!l&&c;u?t[r]=this._interpolationFunction(a,s):typeof a=="object"&&a?this._updateProperties(t[r],o,a,s):(a=this._handleRelativeValue(o,a),typeof a=="number"&&(t[r]=o+(a-o)*s))}},n.prototype._handleRelativeValue=function(t,e){return typeof e!="string"?e:e.charAt(0)==="+"||e.charAt(0)==="-"?t+parseFloat(e):parseFloat(e)},n.prototype._swapEndStartRepeatValues=function(t){var e=this._valuesStartRepeat[t],i=this._valuesEnd[t];typeof i=="string"?this._valuesStartRepeat[t]=this._valuesStartRepeat[t]+parseFloat(i):this._valuesStartRepeat[t]=this._valuesEnd[t],this._valuesEnd[t]=e},n}(),nS="23.1.3",iS=Bl.nextId,Bn=hl,sS=Bn.getAll.bind(Bn),rS=Bn.removeAll.bind(Bn),oS=Bn.add.bind(Bn),aS=Bn.remove.bind(Bn),lS=Bn.update.bind(Bn),ge={Easing:Ds,Group:Kf,Interpolation:ki,now:ys,Sequence:Bl,nextId:iS,Tween:eS,VERSION:nS,getAll:sS,removeAll:rS,add:oS,remove:aS,update:lS};class cS{constructor(t){te(this,"renderer");te(this,"scene");te(this,"camera");te(this,"controls");te(this,"container");te(this,"animationId",0);te(this,"clock",new KM);te(this,"buildings",new mn);te(this,"roads",new mn);te(this,"greenAreas",new mn);te(this,"cameraMarkers",new Map);te(this,"alertMarkers",new Map);te(this,"alertAnimations",new Map);te(this,"buildingMeta",new Map);te(this,"onCameraClick");te(this,"onAlertClick");te(this,"onBuildingClick");te(this,"ws",null);te(this,"activeAlerts",[]);te(this,"isNight",!1);te(this,"isPatrolling",!1);te(this,"patrolTimer",null);te(this,"dataLabels",new Map);te(this,"dataLabelsInterval",null);te(this,"sunLight",null);te(this,"ambientLight",null);te(this,"raycaster",new ZM);te(this,"mouse",new Ct);te(this,"animate",()=>{this.animationId=requestAnimationFrame(this.animate),ge.update(),this.controls.update(),this.renderer.render(this.scene,this.camera)});te(this,"patrolPath",[[60,50,60],[-40,20,-30],[40,18,-30],[0,25,35],[-40,15,20],[55,15,-50],[0,10,60],[60,50,60]]);this.container=t.container,this.onCameraClick=t.onCameraClick,this.onAlertClick=t.onAlertClick,this.onBuildingClick=t.onBuildingClick,this.init(t.cameras||[]),t.wsUrl&&this.connectWS(t.wsUrl),this.animate()}init(t){this.initRenderer(),this.initScene(),this.initCamera(),this.initLights(),this.initControls(),this.buildDemoScene(),this.buildCameraMarkers(t),this.initRaycaster(),this.handleResize()}initRenderer(){this.renderer=new HM({antialias:!0,alpha:!0,preserveDrawingBuffer:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=pf,this.renderer.toneMapping=gf,this.renderer.toneMappingExposure=1.2,this.container.appendChild(this.renderer.domElement),this.renderer.domElement.addEventListener("webglcontextlost",t=>{console.warn("[数字孪生] WebGL context lost, 尝试恢复..."),t.preventDefault()},!1),this.renderer.domElement.addEventListener("webglcontextrestored",()=>{console.log("[数字孪生] WebGL context restored")},!1)}initScene(){this.scene=new kM,this.scene.background=new jt(991817),this.scene.fog=new Ul(991817,100,500)}initCamera(){const t=this.container.clientWidth/this.container.clientHeight;this.camera=new Qe(60,t,.1,1e3),this.camera.position.set(80,60,80),this.camera.lookAt(0,0,0)}initLights(){const t=new YM(4210784,.6);this.ambientLight=t,this.scene.add(t);const e=new Zu(16772829,1.2);this.sunLight=e,e.position.set(50,80,30),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.near=1,e.shadow.camera.far=300,e.shadow.camera.left=-100,e.shadow.camera.right=100,e.shadow.camera.top=100,e.shadow.camera.bottom=-100,this.scene.add(e);const i=new Zu(4491519,.3);i.position.set(-30,20,-30),this.scene.add(i)}initControls(){this.controls=new tS(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.maxPolarAngle=Math.PI/2.1,this.controls.minDistance=20,this.controls.maxDistance=200,this.controls.target.set(0,0,0)}buildDemoScene(){this.buildGround(),this.buildRoads(),this.buildBuildings(),this.buildGreenAreas(),this.buildPerimeterWall(),this.buildEntrance()}buildGround(){const t=new Zn(200,200),e=new dn({color:1714714,roughness:.9,metalness:.1}),i=new Qt(t,e);i.rotation.x=-Math.PI/2,i.receiveShadow=!0,this.scene.add(i);const s=new JM(200,20,2771498,1718810);s.material.opacity=.3,s.material.transparent=!0,this.scene.add(s)}buildRoads(){const t=new dn({color:2763306,roughness:.8}),e=new Qt(new Zn(8,200),t);e.rotation.x=-Math.PI/2,e.position.y=.02,e.receiveShadow=!0;const i=new Qt(new Zn(200,8),t);i.rotation.x=-Math.PI/2,i.position.y=.02,i.receiveShadow=!0,this.roads.add(e,i),this.scene.add(this.roads),this.addRoadMarkings()}addRoadMarkings(){const t=new pn({color:16777215}),e=25;for(let i=0;i<e;i++){const s=new Qt(new Zn(.3,3),t);s.rotation.x=-Math.PI/2,s.position.set(0,.03,-95+i*8),this.scene.add(s)}}buildBuildings(){this.addBuilding(-40,0,-30,30,12,20,3824266,"1号厂房",2,24,123),this.addBuilding(40,0,-30,25,10,18,4876954,"2号厂房",2,22,98),this.addBuilding(-40,0,20,20,8,15,5917242,"3号仓库",1,18,45),this.addBuilding(0,0,35,18,18,12,6982314,"综合办公楼",0,26,210),this.addBuilding(0,0,55,5,3,4,9075306,"门卫室",1,23,15),this.addBuilding(55,0,-50,8,5,6,8022618,"配电房",0,30,80),this.scene.add(this.buildings)}addBuilding(t,e,i,s,r,o,a,l,c=0,u=22,h=0){this.buildingMeta.set(l,{name:l,position:{x:t,y:e,z:i},cameras:c,floors:Math.ceil(r/4),temp:u,power:h});const f=new mn;f.position.set(t,e,i),f.userData={name:l};const p=new Dn(s,r,o),x=new dn({color:a,roughness:.7,metalness:.2}),v=new Qt(p,x);v.position.y=r/2,v.castShadow=!0,v.receiveShadow=!0,f.add(v);const m=new pn({color:8965375,transparent:!0,opacity:.6}),d=Math.floor(r/3),A=Math.floor(s/4);for(let C=0;C<d;C++)for(let z=0;z<A;z++){const D=new Qt(new Zn(1.5,2),m);D.position.set(-s/2+2+z*4,2+C*3,o/2+.01),f.add(D)}const M=this.makeTextSprite(l,{fontSize:16});M.position.set(0,r+2,o/2),M.scale.set(8,4,1),f.add(M),this.buildings.add(f)}makeTextSprite(t,e={}){const i=e.fontSize||16,s=e.color||"#ffffff",r=document.createElement("canvas"),o=r.getContext("2d");r.width=256,r.height=64,o.font=`${i}px sans-serif`,o.fillStyle=s,o.textAlign="center",o.fillText(t,128,40);const a=new $M(r),l=new $f({map:a,transparent:!0});return new GM(l)}buildGreenAreas(){const t=new dn({color:2775594,roughness:1});[[-60,0,40],[60,0,40],[-60,0,-60],[60,0,-60],[20,0,0],[-20,0,0]].forEach(([r,o,a])=>{const l=new Nl(8,16),c=new Qt(l,t);c.rotation.x=-Math.PI/2,c.position.set(r,o+.01,a),c.receiveShadow=!0,this.greenAreas.add(c)});const i=new dn({color:3828282}),s=new dn({color:6965802});for(let r=-8;r<=8;r+=4)[-6,6].forEach(o=>{const a=new Qt(new Ls(.2,.3,3,8),s);a.position.set(r,1.5,o),a.castShadow=!0,this.greenAreas.add(a);const l=new Qt(new di(2,8,6),i);l.position.set(r,4,o),l.castShadow=!0,this.greenAreas.add(l)});this.scene.add(this.greenAreas)}buildPerimeterWall(){const t=new dn({color:5921370}),e=3,i=95;[[0,-i,190,0],[0,i,190,0],[-i,0,190,Math.PI/2],[i,0,190,Math.PI/2]].forEach(([r,o,a,l])=>{const c=new Qt(new Dn(a,e,.3),t);c.position.set(r,e/2,o),c.rotation.y=l,c.castShadow=!0,this.scene.add(c);for(let u=-a/2+10;u<a/2;u+=20){const h=new Ha(16755268,.5,15),f=r+Math.cos(l+Math.PI/2)*u,p=o+Math.sin(l+Math.PI/2)*u;h.position.set(f,e+1,p),this.scene.add(h);const x=new Qt(new di(.3,8,8),new pn({color:16755268}));x.position.copy(h.position),this.scene.add(x)}})}buildEntrance(){const t=new dn({color:9079434}),e=new Qt(new Dn(1,5,1),t);e.position.set(-5,2.5,60),e.castShadow=!0,this.scene.add(e);const i=new Qt(new Dn(1,5,1),t);i.position.set(5,2.5,60),i.castShadow=!0,this.scene.add(i);const s=new Qt(new Dn(12,.5,1),t);s.position.set(0,5,60),s.castShadow=!0,this.scene.add(s);const r=new Qt(new di(.3,8,8),new pn({color:65280}));r.position.set(-5,3,.6),this.scene.add(r);const o=new Qt(new di(.3,8,8),new pn({color:16711680}));o.position.set(5,3,.6),this.scene.add(o)}buildCameraMarkers(t){t.forEach(e=>{const i=new mn;i.position.set(e.position.x,e.position.y,e.position.z),i.userData={camera:e};const s=new Ls(.5,.5,1.5,8),r=new di(.4,8,8),o={online:65416,offline:8947848,alert:16724736},a=o[e.status]||o.online,l=new dn({color:3359829,metalness:.6,roughness:.4}),c=new dn({color:a,emissive:a,emissiveIntensity:.8}),u=new Qt(s,l);u.position.y=.75,u.castShadow=!0,i.add(u);const h=new Qt(r,c);h.position.set(0,.75,.6),i.add(h);const f=new lr(1,1.5,16),p=new pn({color:a,side:on,transparent:!0,opacity:.5}),x=new Qt(f,p);if(x.rotation.x=-Math.PI/2,x.position.y=.05,i.add(x),e.direction!==void 0){new B(Math.sin(e.direction)*2,0,Math.cos(e.direction)*2);const m=new Ol(2,4,8,1,!0),d=new pn({color:a,transparent:!0,opacity:.15,side:on}),A=new Qt(m,d);A.rotation.x=Math.PI/2,A.position.set(Math.sin(e.direction)*2,0,Math.cos(e.direction)*2),i.add(A)}const v=this.makeTextSprite(e.name,{fontSize:14});v.position.set(0,3,0),v.scale.set(10,5,1),i.add(v),this.cameraMarkers.set(e.id,i),this.scene.add(i)})}addAlertMarker(t){this.alertMarkers.has(t.id)&&this.removeAlertMarker(t.id);const e=new mn;e.position.set(t.position.x,t.position.y+2,t.position.z),e.userData={alert:t};const i={info:43775,warn:16755200,danger:16720384},s=i[t.level]||i.info,r=new Ls(.8,.8,4,8),o=new dn({color:s,emissive:s,emissiveIntensity:.8,transparent:!0,opacity:.8}),a=new Qt(r,o);a.position.y=2,a.castShadow=!0,e.add(a);const l=new di(1,16,16),c=new pn({color:s,transparent:!0,opacity:.9}),u=new Qt(l,c);u.position.y=4.5,e.add(u);const h=new lr(1,2,16),f=new pn({color:s,transparent:!0,opacity:.6,side:on}),p=new Qt(h,f);p.rotation.x=-Math.PI/2,p.position.y=.1,e.add(p);const x=this.makeTextSprite(`⚠ ${t.type}`,{fontSize:18,color:`#${s.toString(16).padStart(6,"0")}`});x.position.set(0,7,0),x.scale.set(12,6,1),e.add(x),this.alertMarkers.set(t.id,e),this.scene.add(e),this.animateAlert(t.id,a,u,p),setTimeout(()=>{this.removeAlertMarker(t.id)},8e3)}animateAlert(t,e,i,s){const o=e.material,a=[];a.push(new ge.Tween(i.position).to({y:[5.5,4.5]},600).repeat(1/0).yoyo(!0).easing(ge.Easing.Sinusoidal.InOut).start()),a.push(new ge.Tween(o).to({emissiveIntensity:[1.5,.4]},300).repeat(1/0).yoyo(!0).easing(ge.Easing.Sinusoidal.InOut).start()),a.push(new ge.Tween(s.scale).to({x:2,y:2,z:2},1500).repeat(1/0).onRepeat(()=>{s.scale.set(1,1,1),s.material.opacity=.6}).start());const l=s.material;a.push(new ge.Tween(l).to({opacity:0},1500).repeat(1/0).start()),this.alertAnimations.set(t,a)}removeAlertMarker(t){const e=this.alertAnimations.get(t);if(e){for(const s of e)s.stop();this.alertAnimations.delete(t)}const i=this.alertMarkers.get(t);i&&(this.scene.remove(i),this.alertMarkers.delete(t))}initRaycaster(){this.container.addEventListener("click",t=>{var l,c,u,h,f;const e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const i=Array.from(this.cameraMarkers.values()),s=this.raycaster.intersectObjects(i,!0);if(s.length>0){let p=s[0].object;for(;p.parent&&!p.userData.camera;)p=p.parent;if(p.userData.camera){(l=this.onCameraClick)==null||l.call(this,p.userData.camera);return}}const r=Array.from(this.alertMarkers.values()),o=this.raycaster.intersectObjects(r,!0);if(o.length>0){let p=o[0].object;for(;p.parent&&!p.userData.alert;)p=p.parent;if(p.userData.alert){(c=this.onAlertClick)==null||c.call(this,p.userData.alert);return}}const a=this.raycaster.intersectObjects(this.buildings.children,!0);if(a.length>0){let p=a[0].object;for(;p&&!p.userData.name;)p=p.parent;const x=((u=p==null?void 0:p.userData)==null?void 0:u.name)||((h=a[0].object.userData)==null?void 0:h.name);if(x&&this.buildingMeta.has(x)){const v=this.buildingMeta.get(x);(f=this.onBuildingClick)==null||f.call(this,v);return}}}),this.container.addEventListener("mousemove",t=>{const e=this.container.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const i=Array.from(this.cameraMarkers.values()),s=this.raycaster.intersectObjects(i,!0);this.container.style.cursor=s.length>0?"pointer":"grab"})}connectWS(t){try{this.ws=new WebSocket(t),this.ws.onopen=()=>{console.log("[数字孪生] WebSocket 已连接")},this.ws.onmessage=e=>{try{const i=JSON.parse(e.data);this.activeAlerts.push(i),this.addAlertMarker(i)}catch{console.warn("[数字孪生] WebSocket 消息解析失败:",e.data)}},this.ws.onerror=e=>{console.error("[数字孪生] WebSocket 错误:",e)},this.ws.onclose=()=>{console.log("[数字孪生] WebSocket 断开，3秒后重连...");const e=this.ws;setTimeout(()=>{e&&e.readyState===WebSocket.CLOSED&&(e.close(),this.connectWS(t))},3e3)}}catch(e){console.error("[数字孪生] WebSocket 连接失败:",e)}}fireDemoAlert(){const t=["入侵","未戴安全帽","徘徊","人脸识别","烟雾"],e=["info","warn","danger"],i=[{x:-40,y:12,z:-30},{x:40,y:10,z:-30},{x:0,y:18,z:35},{x:0,y:0,z:55},{x:55,y:5,z:-50}],s=i[Math.floor(Math.random()*i.length)],r=t[Math.floor(Math.random()*t.length)],o=e[Math.floor(Math.random()*e.length)],a={id:`alert_${Date.now()}`,cameraId:"cam_001",type:r,level:o,position:s,time:new Date().toLocaleString(),description:`检测到 ${r} 事件，请及时处理`,status:"active"};this.activeAlerts.push(a),this.addAlertMarker(a)}handleResize(){window.addEventListener("resize",()=>{const t=this.container.clientWidth,e=this.container.clientHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)})}updateCameraStatus(t,e){const i=this.cameraMarkers.get(t);if(!i)return;const r={online:65416,offline:8947848,alert:16724736}[e];i.children.forEach(o=>{if(o instanceof Sr){const a=o.material;a.color.setHex(r),a.emissive.setHex(r)}o instanceof Qt&&o.geometry instanceof lr&&o.material.color.setHex(r)})}focusOnPosition(t,e,i){new ge.Tween(this.controls.target).to({x:t,y:e,z:i},800).easing(ge.Easing.Quadratic.Out).start()}flyToBuilding(t){const i={"1号厂房":[-40,15,-30],"2号厂房":[40,12,-30],"3号仓库":[-40,10,20],综合办公楼:[0,20,35],门卫室:[0,8,55],配电房:[55,8,-50]}[t];i&&(new ge.Tween(this.camera.position).to({x:i[0]+20,y:i[1]+15,z:i[2]+20},1e3).easing(ge.Easing.Quadratic.Out).start(),new ge.Tween(this.controls.target).to({x:i[0],y:i[1],z:i[2]},800).easing(ge.Easing.Quadratic.Out).start())}startPatrol(){this.isPatrolling=!0,this.patrolStep(0)}patrolStep(t){if(!this.isPatrolling)return;const e=this.patrolPath[t%this.patrolPath.length];new ge.Tween(this.camera.position).to({x:e[0],y:e[1],z:e[2]},2e3).easing(ge.Easing.Quadratic.InOut).start(),new ge.Tween(this.controls.target).to({x:0,y:0,z:0},2e3).easing(ge.Easing.Quadratic.InOut).start(),this.patrolTimer=setTimeout(()=>{this.patrolStep(t+1)},3e3)}stopPatrol(){this.isPatrolling=!1,this.patrolTimer&&clearTimeout(this.patrolTimer)}toggleDayNight(){this.isNight=!this.isNight,!(!this.sunLight||!this.ambientLight)&&(this.isNight?(this.scene.background=new jt(660008),new ge.Tween(this.sunLight).to({intensity:.1},800).start(),new ge.Tween(this.ambientLight).to({intensity:.1},800).start(),this.scene.children.forEach(t=>{t instanceof Ha&&new ge.Tween(t).to({intensity:.8},800).start()})):(this.scene.background=new jt(991817),new ge.Tween(this.sunLight).to({intensity:1.2},800).start(),new ge.Tween(this.ambientLight).to({intensity:.6},800).start(),this.scene.children.forEach(t=>{t instanceof Ha&&new ge.Tween(t).to({intensity:.5},800).start()})))}rebuildCameraMarkers(t){this.cameraMarkers.forEach(e=>this.scene.remove(e)),this.cameraMarkers.clear(),this.dataLabels.forEach(e=>this.scene.remove(e)),this.dataLabels.clear(),this.buildCameraMarkers(t),this.buildDataLabels()}buildDataLabels(){this.cameraMarkers.forEach((t,e)=>{t.userData.camera;const i=new mn;i.position.copy(t.position),i.position.y+=4.5;const s=Math.floor(Math.random()*30),r=(22+Math.random()*8).toFixed(1),o=`${s}人 ${r}°C`,a=this.makeTextSprite(o,{fontSize:12,color:"#88ffaa"});a.scale.set(8,4,1),i.add(a),this.dataLabels.set(e,i),this.scene.add(i)}),this.dataLabelsInterval&&clearInterval(this.dataLabelsInterval),this.dataLabelsInterval=setInterval(()=>this.updateDataLabels(),3e3)}updateDataLabels(){this.dataLabels.forEach((t,e)=>{var l,c;if(!((c=(l=this.cameraMarkers.get(e))==null?void 0:l.userData)==null?void 0:c.camera))return;const s=Math.floor(Math.random()*30),r=(22+Math.random()*8).toFixed(1),o=`${s}人 ${r}°C`,a=t.children[0];if(a){t.remove(a);const u=this.makeTextSprite(o,{fontSize:12,color:"#88ffaa"});u.scale.set(8,4,1),t.add(u)}})}getActiveAlerts(){return this.activeAlerts}destroy(){var t;cancelAnimationFrame(this.animationId),this.dataLabelsInterval&&clearInterval(this.dataLabelsInterval),this.patrolTimer&&clearTimeout(this.patrolTimer),(t=this.ws)==null||t.close(),this.renderer.domElement.parentElement&&this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)}}const uS={key:0,class:"dt-header"},hS={class:"header-left"},fS={class:"date-time"},dS={class:"header-center"},pS={class:"platform-title"},mS={key:1,class:"dt-embed-header"},gS={class:"eh-title"},_S={key:2,class:"stats-bar"},vS={class:"stat-item"},xS={class:"stat-num"},MS={class:"stat-item"},SS={class:"stat-num"},yS={class:"stat-item"},ES={class:"stat-num"},bS={class:"stat-item"},TS={class:"dt-body"},AS={key:0,class:"dt-sidebar"},wS={class:"sidebar-panel"},CS={class:"menu-section"},RS=["onClick"],PS={class:"menu-label"},LS={class:"menu-count"},DS={class:"sidebar-panel"},IS={class:"alarm-list"},US=["onClick"],NS={class:"alarm-info"},OS={class:"alarm-type"},FS={class:"alarm-meta"},BS={key:0,class:"no-data"},zS={class:"dt-main"},HS={class:"video-grid"},kS=["onClick"],VS={class:"video-placeholder"},GS={class:"cam-name"},WS={key:0,class:"cam-alert-overlay"},XS={class:"scene-actions"},$S={class:"alarm-popup"},jS={class:"alarm-popup-header"},qS={class:"ap-type"},YS={class:"alarm-popup-body"},KS={class:"ap-video"},ZS=["src"],JS={key:1,class:"ap-no-video"},QS={class:"ap-info"},ty={class:"ap-row"},ey={class:"ap-row"},ny={class:"ap-row"},iy={class:"ap-row"},sy={class:"popup-header"},ry={class:"popup-body"},oy={class:"popup-row"},ay={class:"popup-row"},ly={class:"popup-row"},cy={class:"popup-row"},uy={key:5,class:"embed-left-panel"},hy={class:"embed-overview"},fy={class:"embed-ov-item danger"},dy={class:"embed-ov-num"},py={class:"embed-ov-item"},my={class:"embed-ov-num"},gy={class:"embed-ov-item"},_y={class:"embed-ov-num"},vy={key:6,class:"embed-right-panel"},xy={class:"panel-toggle"},My={class:"embed-alarm-list"},Sy=["onClick"],yy={class:"embed-alarm-body"},Ey={class:"embed-alarm-type"},by={class:"embed-alarm-meta"},Ty={key:0,class:"embed-no-alarm"},Ay={class:"panel-toggle"},wy={class:"embed-cam-list"},Cy=["onClick"],Ry={class:"embed-cam-name"},Py={class:"embed-cam-status"},Ly={key:0,class:"embed-no-alarm"},Dy=Fh({__name:"index",setup(n){const t=Kt(window.location.search.includes("embed=1")),e=Kt(localStorage.getItem("ACCESS_TOKEN__")||""),i=Kt(localStorage.getItem("TENANT_ID__")||"1"),s=Kt(!1),r=Kt(!1),o=Kt(null),a=Kt({}),l=Kt(null),c=Kt(""),u=Kt(!0),h=Kt(!0),f=Kt("瑞科智能 · 云边端一体化智能算法应用平台"),p=Kt(null),x=Kt(!1),v=Kt([]),m=Kt([]),d=Kt([]),A=Kt({edge_nodes:0,cameras_online:0,alarms:0});let M=null;const C=Kt(""),z=Kt(""),D=Kt("");let P;const X=fo(()=>m.value),T=fo(()=>d.value.filter(at=>at.status==="active").slice(0,8));function y(at){return{online:"在线",offline:"离线",alert:"告警中"}[at]||at}function G(at){return{danger:"危险",warn:"警告",info:"提示"}[at]||at}function Z(at){if(!at)return"";const V=new Date(at);return`${V.getMonth()+1}/${V.getDate()} ${V.getHours()}:${String(V.getMinutes()).padStart(2,"0")}`}function O(){const at=new Date;C.value=at.toLocaleTimeString("zh-CN");const V=at.getFullYear(),lt=String(at.getMonth()+1).padStart(2,"0"),Tt=String(at.getDate()).padStart(2,"0");z.value=`${V}年${lt}月${Tt}日`;const At=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];D.value=At[at.getDay()]}function nt(at){var V,lt,Tt;M==null||M.focusOnPosition(((V=at.position_3d)==null?void 0:V.x)||0,(((lt=at.position_3d)==null?void 0:lt.y)||0)+20,((Tt=at.position_3d)==null?void 0:Tt.z)||0)}function k(at){var V,lt,Tt;M==null||M.focusOnPosition(((V=at.position_3d)==null?void 0:V.x)||0,(((lt=at.position_3d)==null?void 0:lt.y)||0)+5,((Tt=at.position_3d)==null?void 0:Tt.z)||0)}function R(at){var lt,Tt,At;l.value=at;const V=m.value.find($=>$.id===at.camera_id||$.id===at.cameraId);V&&(c.value=V.rtsp_url||""),M==null||M.focusOnPosition(((lt=at.position_3d)==null?void 0:lt.x)||0,(((Tt=at.position_3d)==null?void 0:Tt.y)||0)+5,((At=at.position_3d)==null?void 0:At.z)||0)}function I(){l.value=null,c.value=""}async function H(){l.value&&(await fetch("/api/alarms/"+l.value.id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"resolved"})}),I())}function ct(){var V;const at=document.querySelector(".dt-page")||p.value;at&&((V=at.requestFullscreen)==null||V.call(at))}function ht(){M==null||M.fireDemoAlert()}function xt(){s.value?(M==null||M.stopPatrol(),s.value=!1):(M==null||M.startPatrol(),s.value=!0)}function Pt(){M==null||M.toggleDayNight(),r.value=!r.value}function Yt(at){o.value=at,setTimeout(()=>o.value=null,5e3)}let st;async function dt(){try{const V=await(await fetch(`/api/sync/cameras?token=${encodeURIComponent(e.value)}&tenant_id=${encodeURIComponent(i.value)}`)).json();if(V.code===0&&V.data.length>0){const lt=V.data.map(At=>({id:At.id,name:At.name,status:At.status,position_3d:At.position,direction:At.direction,device_id:At.id,edge_node_id:"easyaiot",source:At.source,algorithm_enabled:[]}));m.value=lt;const Tt=lt.map(At=>({id:At.id,name:At.name,position:At.position_3d,status:At.status,direction:At.direction}));M==null||M.rebuildCameraMarkers(Tt),console.log(`[同步] ${lt.length} 个摄像头 from EasyAIoT`)}}catch(at){console.warn("[同步] EasyAIoT 暂不可用:",at)}}return Tl(async()=>{var at;try{const lt=await(await fetch("/api/cameras")).json();m.value=lt.data||[]}catch{}try{const lt=await(await fetch("/api/config")).json();(at=lt.data)!=null&&at.platform_title&&(f.value=lt.data.platform_title)}catch{}if(p.value)try{M=new cS({container:p.value,cameras:[],onAlertClick:V=>R(V),onBuildingClick:Yt})}catch(V){console.error("[3D] 初始化失败:",V)}await dt(),st=setInterval(dt,3e4);try{const[V,lt,Tt,At]=await Promise.all([fetch("/api/edge-nodes"),fetch("/api/alarms"),fetch("/api/stats"),fetch("/api/health")]),$=await V.json(),w=await lt.json(),L=await Tt.json(),j=await At.json();v.value=$.data||[],d.value=w.data||[];const Y=L.data||{};A.value={edge_nodes:Y.edge_nodes||0,cameras_online:Y.cameras_online||0,alarms:Y.alarms||0},x.value=j.mqtt_connected}catch(V){console.error("获取数据失败:",V)}O(),P=setInterval(O,1e3)}),No(()=>{M==null||M.destroy(),P&&clearInterval(P),st&&clearInterval(st)}),(at,V)=>(Ut(),Ft("div",{class:ue(["dt-page",{embedded:t.value}])},[t.value?be("",!0):(Ut(),Ft("div",uS,[E("div",hS,[V[3]||(V[3]=E("img",{src:tl,class:"header-logo",alt:"瑞科智能"},null,-1)),V[4]||(V[4]=E("span",{class:"header-brand"},"瑞科智能",-1)),E("div",fS,mt(z.value)+" "+mt(D.value)+" "+mt(C.value),1)]),E("div",dS,[E("h1",pS,mt(f.value),1)]),V[5]||(V[5]=E("div",{class:"header-right"},[E("button",{class:"header-btn",onclick:"location.href='/admin'"},"管理")],-1))])),t.value?(Ut(),Ft("div",mS,[V[6]||(V[6]=E("img",{src:tl,class:"eh-logo",alt:"瑞科智能"},null,-1)),E("h1",gS,mt(f.value),1)])):be("",!0),t.value?be("",!0):(Ut(),Ft("div",_S,[E("div",vS,[E("div",xS,mt(A.value.edge_nodes),1),V[7]||(V[7]=E("div",{class:"stat-text"},"边缘节点",-1))]),E("div",MS,[E("div",SS,mt(A.value.cameras_online),1),V[8]||(V[8]=E("div",{class:"stat-text"},"在线设备",-1))]),E("div",yS,[E("div",ES,mt(A.value.alarms),1),V[9]||(V[9]=E("div",{class:"stat-text"},"今日告警",-1))]),E("div",bS,[E("div",{class:ue(["stat-num",x.value?"online":"offline"])},mt(x.value?"在线":"离线"),3),V[10]||(V[10]=E("div",{class:"stat-text"},"MQTT",-1))])])),E("div",TS,[t.value?be("",!0):(Ut(),Ft("div",AS,[E("div",wS,[V[12]||(V[12]=E("div",{class:"panel-title"},"📡 设备目录",-1)),E("div",CS,[V[11]||(V[11]=E("div",{class:"menu-title"},"设备接入",-1)),(Ut(!0),Ft(Ee,null,gn(v.value,lt=>(Ut(),Ft("div",{key:lt.id,class:ue(["menu-item",lt.status]),onClick:Tt=>nt(lt)},[E("span",{class:ue(["menu-dot",lt.status])},null,2),E("span",PS,mt(lt.name),1),E("span",LS,mt(lt.camera_count),1)],10,RS))),128))])]),E("div",DS,[V[13]||(V[13]=E("div",{class:"panel-title"},"🚨 告警记录",-1)),E("div",IS,[(Ut(!0),Ft(Ee,null,gn(T.value,lt=>(Ut(),Ft("div",{key:lt.id,class:ue(["alarm-item",lt.level]),onClick:Tt=>R(lt)},[E("div",{class:ue(["alarm-lv",lt.level])},mt(G(lt.level)),3),E("div",NS,[E("div",OS,mt(lt.alarm_type),1),E("div",FS,mt(lt.edge_node_id)+" · "+mt(Z(lt.time)),1)])],10,US))),128)),T.value.length===0?(Ut(),Ft("div",BS,"暂无告警")):be("",!0)])])])),E("div",zS,[E("div",HS,[(Ut(!0),Ft(Ee,null,gn(X.value,(lt,Tt)=>(Ut(),Ft("div",{key:lt.id,class:"video-cell",onClick:At=>k(lt)},[E("div",VS,[V[14]||(V[14]=E("span",{class:"cam-icon"},"📹",-1)),E("div",GS,mt(lt.name),1),E("div",{class:ue(["cam-status",lt.status])},mt(y(lt.status)),3)]),lt.status==="alert"?(Ut(),Ft("div",WS,[E("span",null,"🚨 "+mt(lt.alarm_type),1)])):be("",!0)],8,kS))),128)),(Ut(!0),Ft(Ee,null,gn(4-X.value.length,lt=>(Ut(),Ft("div",{key:"ph"+lt,class:"video-cell"},[...V[15]||(V[15]=[E("div",{class:"video-placeholder empty"},[E("span",{class:"cam-icon"},"📷"),E("div",{class:"cam-name"},"暂无视频")],-1)])]))),128))]),E("div",{class:"scene-wrap",ref_key:"sceneContainer",ref:p},null,512)])]),E("div",XS,[E("button",{class:"btn-demo",onClick:ht},"🔥 演示告警"),E("button",{class:"btn-fullscreen",onClick:ct},"🖼️ 全屏"),E("button",{class:"btn-fullscreen",onClick:xt},mt(s.value?"⏹ 停止":"🗺️ 巡逻"),1),E("button",{class:"btn-fullscreen",onClick:Pt},mt(r.value?"☀️ 白天":"🌙 黑夜"),1)]),l.value?(Ut(),Ft("div",{key:3,class:"alarm-popup-overlay",onClick:Qa(I,["self"])},[E("div",$S,[E("div",jS,[E("span",{class:ue(["ap-level",l.value.level])},mt(l.value.level==="danger"?"🔴 危险":l.value.level==="warn"?"🟡 警告":"🔵 信息"),3),E("span",qS,mt(l.value.alarm_type||l.value.type),1),E("button",{class:"ap-close",onClick:I},"✕")]),E("div",YS,[E("div",KS,[c.value?(Ut(),Ft("video",{key:0,src:c.value,autoplay:"",muted:"",playsinline:"",loop:"",style:{width:"100%",height:"100%","object-fit":"cover",background:"#000"}},null,8,ZS)):(Ut(),Ft("div",JS,[...V[16]||(V[16]=[lf("📹 无实时画面",-1),E("br",null,null,-1),E("small",null,"请配置摄像头 RTSP 地址",-1)])]))]),E("div",QS,[E("div",ty,[V[17]||(V[17]=E("span",null,"摄像头",-1)),E("span",null,mt(l.value.camera_id||"-"),1)]),E("div",ey,[V[18]||(V[18]=E("span",null,"节点",-1)),E("span",null,mt(l.value.edge_node_id||"-"),1)]),E("div",ny,[V[19]||(V[19]=E("span",null,"时间",-1)),E("span",null,mt(Z(l.value.time)),1)]),E("div",iy,[V[20]||(V[20]=E("span",null,"描述",-1)),E("span",null,mt(l.value.description||"-"),1)])])]),E("div",{class:"alarm-popup-actions"},[E("button",{onClick:I},"确认"),E("button",{class:"danger",onClick:H},"解除告警")])])])):be("",!0),o.value?(Ut(),Ft("div",{key:4,class:"building-popup",style:Lo(a.value)},[E("div",sy,mt(o.value.name),1),E("div",ry,[E("div",oy,[V[21]||(V[21]=E("span",null,"楼层",-1)),E("span",null,mt(o.value.floors)+" 层",1)]),E("div",ay,[V[22]||(V[22]=E("span",null,"摄像头",-1)),E("span",null,mt(o.value.cameras)+" 个",1)]),E("div",ly,[V[23]||(V[23]=E("span",null,"温度",-1)),E("span",null,mt(o.value.temp)+"°C",1)]),E("div",cy,[V[24]||(V[24]=E("span",null,"能耗",-1)),E("span",null,mt(o.value.power)+"kW",1)])]),E("button",{class:"popup-close",onClick:V[0]||(V[0]=lt=>o.value=null)},"✕")],4)):be("",!0),t.value?(Ut(),Ft("div",uy,[V[28]||(V[28]=E("div",{class:"embed-panel-title"},"📊 全局概览",-1)),E("div",hy,[E("div",fy,[E("span",dy,mt(A.value.alarms),1),V[25]||(V[25]=E("span",{class:"embed-ov-label"},"告警数",-1))]),E("div",py,[E("span",my,mt(m.value.length),1),V[26]||(V[26]=E("span",{class:"embed-ov-label"},"摄像头",-1))]),E("div",gy,[E("span",_y,mt(A.value.edge_nodes),1),V[27]||(V[27]=E("span",{class:"embed-ov-label"},"节点",-1))])])])):be("",!0),t.value?(Ut(),Ft("div",vy,[E("div",{class:"embed-panel-title",onClick:V[1]||(V[1]=lt=>u.value=!u.value),style:{cursor:"pointer"}},[V[29]||(V[29]=E("span",null,"🚨 告警事件",-1)),E("span",xy,mt(u.value?"▾":"▸"),1)]),Pe(E("div",My,[(Ut(!0),Ft(Ee,null,gn(T.value,lt=>(Ut(),Ft("div",{key:lt.id,class:ue(["embed-alarm-item",lt.level]),onClick:Tt=>R(lt)},[E("span",{class:ue(["embed-alarm-level",lt.level])},mt(G(lt.level)),3),E("div",yy,[E("span",Ey,mt(lt.alarm_type),1),E("span",by,mt(lt.edge_node_id)+" · "+mt(Z(lt.time)),1)])],10,Sy))),128)),T.value.length===0?(Ut(),Ft("div",Ty,"暂无告警事件")):be("",!0)],512),[[uc,u.value]]),E("div",{class:"embed-panel-title",onClick:V[2]||(V[2]=lt=>h.value=!h.value),style:{cursor:"pointer","border-top":"1px solid rgba(52,134,218,0.2)"}},[V[30]||(V[30]=E("span",null,"📹 摄像头列表",-1)),E("span",Ay,mt(h.value?"▾":"▸"),1)]),Pe(E("div",wy,[(Ut(!0),Ft(Ee,null,gn(X.value,lt=>(Ut(),Ft("div",{key:lt.id,class:ue(["embed-cam-item",lt.status]),onClick:Tt=>k(lt)},[E("span",{class:ue(["embed-cam-dot",lt.status])},null,2),E("span",Ry,mt(lt.name),1),E("span",Py,mt(y(lt.status)),1)],10,Cy))),128)),X.value.length===0?(Ut(),Ft("div",Ly,"暂无摄像头")):be("",!0)],512),[[uc,h.value]])])):be("",!0)],2))}}),Zf=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},Iy=Zf(Dy,[["__scopeId","data-v-2b1275a5"]]),Uy={class:"admin-page"},Ny={class:"admin-body"},Oy={class:"stats-grid"},Fy={class:"stat-card"},By={class:"stat-info"},zy={class:"stat-value"},Hy={class:"stat-sub"},ky={class:"stat-card"},Vy={class:"stat-info"},Gy={class:"stat-value"},Wy={class:"stat-sub"},Xy={class:"stat-card danger"},$y={class:"stat-info"},jy={class:"stat-value danger"},qy={class:"stat-sub"},Yy={class:"stat-info"},Ky={class:"section"},Zy={class:"node-grid"},Jy={class:"node-header"},Qy={class:"node-name"},tE={class:"node-body"},eE={class:"node-row"},nE={class:"node-row"},iE={class:"node-row"},sE={class:"node-row"},rE={class:"node-row"},oE={class:"node-actions"},aE=["onClick"],lE={class:"section"},cE={class:"toolbar"},uE={style:{color:"#6a8ab8","font-size":"12px","margin-left":"8px"}},hE={class:"table-wrap"},fE=["onClick"],dE=["onClick"],pE={key:0,class:"no-data"},mE={class:"section"},gE={class:"toolbar"},_E={class:"table-wrap"},vE=["onClick"],xE=["onClick"],ME={key:0,class:"no-data"},SE={class:"section"},yE={class:"log-viewer"},EE={class:"log-time"},bE={class:"log-tag"},TE={class:"log-msg"},AE={class:"section"},wE={class:"settings-form"},CE={class:"form-group"},RE={class:"form-group"},PE={class:"form-group"},LE={class:"form-group"},DE=["disabled"],IE={key:0,class:"save-msg"},UE={class:"modal"},NE={class:"modal-body"},OE={class:"form-group"},FE=["value"],BE={class:"form-group"},zE={class:"form-group"},HE={class:"form-group"},kE={class:"modal-footer"},VE={class:"modal"},GE={class:"modal-header"},WE={class:"modal-body"},XE={class:"form-group"},$E={class:"form-group"},jE={class:"form-group"},qE={class:"form-row"},YE={class:"form-group"},KE={class:"form-group"},ZE={class:"form-group"},JE={class:"form-group"},QE={class:"modal-footer"},tb=Fh({__name:"admin",setup(n){const t=Kt(!1),e=Kt([]),i=Kt([]),s=Kt("active"),r=Kt(!1),o=Kt(!1),a=Kt(null),l=Kt([]),c=Kt([]),u=Kt(!1),h=Kt(""),f=Kt({platform_title:"",twin_title:"",easyaiot_host:"http://36.111.47.113:48080",sync_interval_seconds:30}),p=Kt({edge_nodes:0,edge_online:0,cameras:0,cameras_online:0,cameras_alert:0,alarms:0,alarms_danger:0,alarms_warn:0}),x=Kt({edge_node_id:"edge_001",alarm_type:"入侵",level:"danger",description:"后台手动添加"}),v=Kt({name:"",ip:"",rtsp_url:"",x:0,y:2,z:0,model:""});let m;function d(k){return{online:"在线",offline:"离线",warning:"异常"}[k]||k}function A(k){if(!k)return"-";const R=new Date(k);return`${R.getMonth()+1}/${R.getDate()} ${R.getHours()}:${String(R.getMinutes()).padStart(2,"0")}`}const M=fo(()=>s.value==="all"?i.value:i.value.filter(k=>k.status===s.value));async function C(){try{const R=await(await fetch("/api/config")).json();R.data&&(f.value={...f.value,...R.data})}catch{}}async function z(){u.value=!0,h.value="";try{(await fetch("/api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f.value)})).ok?h.value="✅ 配置已保存":h.value="❌ 保存失败",setTimeout(()=>h.value="",3e3)}catch{h.value="❌ 网络错误"}u.value=!1}async function D(){try{const[k,R,I,H,ct]=await Promise.all([fetch("/api/edge-nodes"),fetch("/api/alarms"),fetch("/api/stats"),fetch("/api/health"),fetch("/api/cameras")]),ht=await k.json(),xt=await R.json(),Pt=await I.json(),Yt=await H.json(),st=await ct.json();e.value=ht.data||[],i.value=xt.data||[],c.value=st.data||[];const dt=Pt.data||{};p.value={edge_nodes:dt.edge_nodes||0,edge_online:dt.edge_online||0,cameras:dt.cameras||0,cameras_online:dt.cameras_online||0,cameras_alert:dt.cameras_alert||0,alarms:dt.alarms||0,alarms_danger:dt.alarms_danger||0,alarms_warn:dt.alarms_warn||0},t.value=Yt.mqtt_connected,nt("info","SYSTEM",`刷新: ${e.value.length}节点 / ${i.value.length}告警`)}catch{nt("error","SYSTEM","刷新失败")}}async function P(k){await fetch(`/api/alerts/${k}/acknowledge`,{method:"POST"}),D()}async function X(k){await fetch(`/api/alerts/${k}/resolve`,{method:"POST"}),D()}async function T(k){await fetch("/api/alarms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({edge_node_id:k.id,camera_id:`${k.id}_cam_001`,alarm_type:"入侵",level:"danger",position_3d:k.position_3d,description:`测试告警 from ${k.name}`})}),nt("info","TEST",`向 ${k.name} 发送测试告警`),D()}function y(k){var R,I,H;a.value=k,v.value={name:k.name,ip:k.ip||"",rtsp_url:k.rtsp_url||"",x:((R=k.position_3d)==null?void 0:R.x)||0,y:((I=k.position_3d)==null?void 0:I.y)||2,z:((H=k.position_3d)==null?void 0:H.z)||0,model:k.model||""},o.value=!0}async function G(){const k=v.value,R={name:k.name,ip:k.ip,rtsp_url:k.rtsp_url,position_3d:{x:k.x,y:k.y,z:k.z},model:k.model,source:"manual"};a.value?await fetch("/api/cameras/"+a.value.id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)}):await fetch("/api/cameras",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)}),o.value=!1,a.value=null,v.value={name:"",ip:"",rtsp_url:"",x:0,y:2,z:0,model:""},await D(),nt("info","CAM","摄像头已保存")}async function Z(k){confirm("确认删除?")&&(await fetch("/api/cameras/"+k,{method:"DELETE"}),await D(),nt("info","CAM","摄像头已删除"))}async function O(){const k=e.value.find(R=>R.id===x.value.edge_node_id);await fetch("/api/alarms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...x.value,camera_id:`${x.value.edge_node_id}_cam_001`,position_3d:(k==null?void 0:k.position_3d)||{x:0,y:0,z:0}})}),r.value=!1,nt("info","ADMIN",`添加告警: ${x.value.alarm_type}`),D()}function nt(k,R,I){const H=new Date;l.value.unshift({type:k,tag:R,msg:I,time:`${String(H.getHours()).padStart(2,"0")}:${String(H.getMinutes()).padStart(2,"0")}:${String(H.getSeconds()).padStart(2,"0")}`}),l.value.length>50&&l.value.pop()}return Tl(async()=>{await C(),await D(),nt("info","SYSTEM","管理后台启动"),nt(t.value?"info":"warn","MQTT",t.value?"MQTT已连接":"MQTT未连接"),m=setInterval(D,5e3)}),No(()=>clearInterval(m)),(k,R)=>(Ut(),Ft("div",Uy,[E("div",{class:"admin-header"},[R[22]||(R[22]=E("div",{class:"header-left"},[E("span",{class:"back-btn",onclick:"location.href='/'"},"← 返回大屏"),E("img",{src:tl,class:"admin-logo",alt:"瑞科智能"}),E("span",{class:"admin-brand"},"瑞科智能")],-1)),R[23]||(R[23]=E("div",{class:"header-center"},[E("h1",{class:"platform-title"},"瑞科智能 · 云边端一体算法预警监控平台")],-1)),E("div",{class:"header-right"},[E("button",{class:"header-btn",onClick:D},"🔄 刷新数据")])]),E("div",Ny,[E("div",Oy,[E("div",Fy,[R[25]||(R[25]=E("div",{class:"stat-icon"},"🖥️",-1)),E("div",By,[E("div",zy,mt(p.value.edge_nodes),1),R[24]||(R[24]=E("div",{class:"stat-label"},"边缘节点",-1)),E("div",Hy,mt(p.value.edge_online)+" 在线",1)])]),E("div",ky,[R[27]||(R[27]=E("div",{class:"stat-icon"},"📹",-1)),E("div",Vy,[E("div",Gy,mt(p.value.cameras),1),R[26]||(R[26]=E("div",{class:"stat-label"},"摄像头",-1)),E("div",Wy,mt(p.value.cameras_online)+" 在线 · "+mt(p.value.cameras_alert)+" 告警",1)])]),E("div",Xy,[R[29]||(R[29]=E("div",{class:"stat-icon"},"🚨",-1)),E("div",$y,[E("div",jy,mt(p.value.alarms),1),R[28]||(R[28]=E("div",{class:"stat-label"},"活跃告警",-1)),E("div",qy,mt(p.value.alarms_danger)+" 危险 · "+mt(p.value.alarms_warn)+" 警告",1)])]),E("div",{class:ue(["stat-card",{online:t.value}])},[R[32]||(R[32]=E("div",{class:"stat-icon"},"📡",-1)),E("div",Yy,[E("div",{class:ue(["stat-value",t.value?"online":"offline"])},mt(t.value?"已连接":"未连接"),3),R[30]||(R[30]=E("div",{class:"stat-label"},"MQTT Broker",-1)),R[31]||(R[31]=E("div",{class:"stat-sub"},"1883",-1))])],2)]),E("div",Ky,[R[38]||(R[38]=E("div",{class:"section-title"},"🖥️ 边缘节点管理",-1)),E("div",Zy,[(Ut(!0),Ft(Ee,null,gn(e.value,I=>{var H,ct,ht,xt;return Ut(),Ft("div",{key:I.id,class:ue(["node-card",I.status])},[E("div",Jy,[E("span",{class:ue(["node-dot",I.status])},null,2),E("span",Qy,mt(I.name),1),E("span",{class:ue(["node-status",I.status])},mt(d(I.status)),3)]),E("div",tE,[E("div",eE,[R[33]||(R[33]=E("span",null,"节点ID",-1)),E("span",null,mt(I.id),1)]),E("div",nE,[R[34]||(R[34]=E("span",null,"摄像头",-1)),E("span",null,mt(I.camera_count),1)]),E("div",iE,[R[35]||(R[35]=E("span",null,"能力",-1)),E("span",null,mt((H=I.capabilities)==null?void 0:H.join(" / ")),1)]),E("div",sE,[R[36]||(R[36]=E("span",null,"位置",-1)),E("span",null,"("+mt((ct=I.position_3d)==null?void 0:ct.x)+", "+mt((ht=I.position_3d)==null?void 0:ht.y)+", "+mt((xt=I.position_3d)==null?void 0:xt.z)+")",1)]),E("div",rE,[R[37]||(R[37]=E("span",null,"心跳",-1)),E("span",null,mt(A(I.last_heartbeat)),1)])]),E("div",oE,[E("button",{class:"btn-action",onClick:Pt=>T(I)},"🧪 测试告警",8,aE)])],2)}),128))])]),E("div",lE,[R[40]||(R[40]=E("div",{class:"section-title"},"📹 摄像头管理",-1)),E("div",cE,[E("button",{class:"btn-add",onClick:R[0]||(R[0]=I=>o.value=!0)},"➕ 添加摄像头"),E("span",uE,mt(c.value.length)+" 个设备",1)]),E("div",hE,[R[39]||(R[39]=E("div",{class:"table-header"},[E("span",null,"名称"),E("span",null,"状态"),E("span",null,"IP"),E("span",null,"RTSP"),E("span",null,"位置"),E("span",null,"操作")],-1)),(Ut(!0),Ft(Ee,null,gn(c.value,I=>{var H,ct,ht;return Ut(),Ft("div",{key:I.id,class:"table-row"},[E("span",null,mt(I.name),1),E("span",null,[E("span",{class:ue(["badge",I.status])},mt(d(I.status)),3)]),E("span",null,mt(I.ip||"-"),1),E("span",null,mt(I.rtsp_url?"已配置":"-"),1),E("span",null,"("+mt((H=I.position_3d)==null?void 0:H.x)+", "+mt((ct=I.position_3d)==null?void 0:ct.y)+", "+mt((ht=I.position_3d)==null?void 0:ht.z)+")",1),E("span",null,[E("button",{class:"btn-sm",onClick:xt=>y(I)},"编辑",8,fE),E("button",{class:"btn-sm danger",onClick:xt=>Z(I.id)},"删除",8,dE)])])}),128)),c.value.length===0?(Ut(),Ft("div",pE,"暂无摄像头")):be("",!0)])]),E("div",mE,[R[43]||(R[43]=E("div",{class:"section-title"},"🚨 告警管理",-1)),E("div",gE,[Pe(E("select",{"onUpdate:modelValue":R[1]||(R[1]=I=>s.value=I),class:"filter-select"},[...R[41]||(R[41]=[E("option",{value:"active"},"仅活跃",-1),E("option",{value:"all"},"全部",-1),E("option",{value:"acknowledged"},"已确认",-1),E("option",{value:"resolved"},"已解除",-1)])],512),[[Ar,s.value]]),E("button",{class:"btn-add",onClick:R[2]||(R[2]=I=>r.value=!0)},"➕ 添加告警")]),E("div",_E,[R[42]||(R[42]=E("div",{class:"table-header"},[E("span",null,"级别"),E("span",null,"类型"),E("span",null,"节点"),E("span",null,"摄像头"),E("span",null,"3D位置"),E("span",null,"时间"),E("span",null,"状态"),E("span",null,"操作")],-1)),(Ut(!0),Ft(Ee,null,gn(M.value,I=>{var H,ct,ht;return Ut(),Ft("div",{key:I.id,class:ue(["table-row",I.level])},[E("span",null,[E("span",{class:ue(["badge",I.level])},mt(I.level),3)]),E("span",null,mt(I.alarm_type),1),E("span",null,mt(I.edge_node_id),1),E("span",null,mt(I.camera_id),1),E("span",null,"("+mt((H=I.position_3d)==null?void 0:H.x)+", "+mt((ct=I.position_3d)==null?void 0:ct.y)+", "+mt((ht=I.position_3d)==null?void 0:ht.z)+")",1),E("span",null,mt(A(I.time)),1),E("span",null,[E("span",{class:ue(["badge status",I.status])},mt(I.status),3)]),E("span",null,[I.status==="active"?(Ut(),Ft("button",{key:0,class:"btn-sm",onClick:xt=>P(I.id)},"确认",8,vE)):be("",!0),I.status!=="resolved"?(Ut(),Ft("button",{key:1,class:"btn-sm danger",onClick:xt=>X(I.id)},"解除",8,xE)):be("",!0)])],2)}),128)),M.value.length===0?(Ut(),Ft("div",ME,"暂无数据")):be("",!0)])]),E("div",SE,[R[44]||(R[44]=E("div",{class:"section-title"},"📋 MQTT 日志",-1)),E("div",yE,[(Ut(!0),Ft(Ee,null,gn(l.value,(I,H)=>(Ut(),Ft("div",{key:H,class:ue(["log-line",I.type])},[E("span",EE,mt(I.time),1),E("span",bE,"["+mt(I.tag)+"]",1),E("span",TE,mt(I.msg),1)],2))),128))])]),E("div",AE,[R[49]||(R[49]=E("div",{class:"section-title"},"⚙️ 系统设置",-1)),E("div",wE,[E("div",CE,[R[45]||(R[45]=E("label",null,"平台名称",-1)),Pe(E("input",{"onUpdate:modelValue":R[3]||(R[3]=I=>f.value.platform_title=I),placeholder:"瑞科智能 · 云边端一体化智能算法应用平台"},null,512),[[sn,f.value.platform_title]])]),E("div",RE,[R[46]||(R[46]=E("label",null,"数字孪生标题",-1)),Pe(E("input",{"onUpdate:modelValue":R[4]||(R[4]=I=>f.value.twin_title=I),placeholder:"园区数字孪生"},null,512),[[sn,f.value.twin_title]])]),E("div",PE,[R[47]||(R[47]=E("label",null,"EasyAIoT 地址",-1)),Pe(E("input",{"onUpdate:modelValue":R[5]||(R[5]=I=>f.value.easyaiot_host=I),placeholder:"http://36.111.47.113:48080"},null,512),[[sn,f.value.easyaiot_host]])]),E("div",LE,[R[48]||(R[48]=E("label",null,"同步间隔(秒)",-1)),Pe(E("input",{"onUpdate:modelValue":R[6]||(R[6]=I=>f.value.sync_interval_seconds=I),type:"number",min:"5",max:"300"},null,512),[[sn,f.value.sync_interval_seconds,void 0,{number:!0}]])]),E("button",{class:"btn-action",onClick:z,disabled:u.value},mt(u.value?"保存中...":"💾 保存配置"),9,DE),h.value?(Ut(),Ft("span",IE,mt(h.value),1)):be("",!0)])])]),r.value?(Ut(),Ft("div",{key:0,class:"modal-overlay",onClick:R[12]||(R[12]=Qa(I=>r.value=!1,["self"]))},[E("div",UE,[R[56]||(R[56]=E("div",{class:"modal-header"},"➕ 添加演示告警",-1)),E("div",NE,[E("div",OE,[R[50]||(R[50]=E("label",null,"节点",-1)),Pe(E("select",{"onUpdate:modelValue":R[7]||(R[7]=I=>x.value.edge_node_id=I)},[(Ut(!0),Ft(Ee,null,gn(e.value,I=>(Ut(),Ft("option",{key:I.id,value:I.id},mt(I.name),9,FE))),128))],512),[[Ar,x.value.edge_node_id]])]),E("div",BE,[R[52]||(R[52]=E("label",null,"告警类型",-1)),Pe(E("select",{"onUpdate:modelValue":R[8]||(R[8]=I=>x.value.alarm_type=I)},[...R[51]||(R[51]=[Gp('<option value="入侵" data-v-7559e457>入侵</option><option value="未戴安全帽" data-v-7559e457>未戴安全帽</option><option value="徘徊" data-v-7559e457>徘徊</option><option value="烟雾" data-v-7559e457>烟雾</option><option value="人脸识别" data-v-7559e457>人脸识别</option>',5)])],512),[[Ar,x.value.alarm_type]])]),E("div",zE,[R[54]||(R[54]=E("label",null,"级别",-1)),Pe(E("select",{"onUpdate:modelValue":R[9]||(R[9]=I=>x.value.level=I)},[...R[53]||(R[53]=[E("option",{value:"danger"},"危险",-1),E("option",{value:"warn"},"警告",-1),E("option",{value:"info"},"提示",-1)])],512),[[Ar,x.value.level]])]),E("div",HE,[R[55]||(R[55]=E("label",null,"描述",-1)),Pe(E("input",{"onUpdate:modelValue":R[10]||(R[10]=I=>x.value.description=I),placeholder:"告警描述"},null,512),[[sn,x.value.description]])])]),E("div",kE,[E("button",{class:"btn-cancel",onClick:R[11]||(R[11]=I=>r.value=!1)},"取消"),E("button",{class:"btn-submit",onClick:O},"提交")])])])):be("",!0),o.value?(Ut(),Ft("div",{key:1,class:"modal-overlay",onClick:R[21]||(R[21]=Qa(I=>o.value=!1,["self"]))},[E("div",VE,[E("div",GE,"📹 "+mt(a.value?"编辑":"添加")+"摄像头",1),E("div",WE,[E("div",XE,[R[57]||(R[57]=E("label",null,"名称",-1)),Pe(E("input",{"onUpdate:modelValue":R[13]||(R[13]=I=>v.value.name=I)},null,512),[[sn,v.value.name]])]),E("div",$E,[R[58]||(R[58]=E("label",null,"IP 地址",-1)),Pe(E("input",{"onUpdate:modelValue":R[14]||(R[14]=I=>v.value.ip=I)},null,512),[[sn,v.value.ip]])]),E("div",jE,[R[59]||(R[59]=E("label",null,"RTSP 流地址",-1)),Pe(E("input",{"onUpdate:modelValue":R[15]||(R[15]=I=>v.value.rtsp_url=I),placeholder:"rtsp://192.168.x.x/live/01"},null,512),[[sn,v.value.rtsp_url]])]),E("div",qE,[E("div",YE,[R[60]||(R[60]=E("label",null,"3D位置 X",-1)),Pe(E("input",{"onUpdate:modelValue":R[16]||(R[16]=I=>v.value.x=I),type:"number"},null,512),[[sn,v.value.x,void 0,{number:!0}]])]),E("div",KE,[R[61]||(R[61]=E("label",null,"Y",-1)),Pe(E("input",{"onUpdate:modelValue":R[17]||(R[17]=I=>v.value.y=I),type:"number"},null,512),[[sn,v.value.y,void 0,{number:!0}]])]),E("div",ZE,[R[62]||(R[62]=E("label",null,"Z",-1)),Pe(E("input",{"onUpdate:modelValue":R[18]||(R[18]=I=>v.value.z=I),type:"number"},null,512),[[sn,v.value.z,void 0,{number:!0}]])])]),E("div",JE,[R[63]||(R[63]=E("label",null,"品牌型号",-1)),Pe(E("input",{"onUpdate:modelValue":R[19]||(R[19]=I=>v.value.model=I),placeholder:"Hikvision / Dahua / ..."},null,512),[[sn,v.value.model]])])]),E("div",QE,[E("button",{class:"btn-cancel",onClick:R[20]||(R[20]=I=>o.value=!1)},"取消"),E("button",{class:"btn-submit",onClick:G},mt(a.value?"更新":"添加"),1)])])])):be("",!0)]))}}),eb=Zf(tb,[["__scopeId","data-v-7559e457"]]),nb=window.location.pathname,ib=nb==="/admin"?eb:Iy;Tm(ib).mount("#app");
