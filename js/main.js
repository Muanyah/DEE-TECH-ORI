(function(){
"use strict";
var S=window.SITE,D=document;
function el(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function get(o,p){return p.split(".").reduce(function(a,k){return a==null?a:a[k]},o)}
function safeUrl(u){try{var x=new URL(u);return(x.protocol==="https:"||x.protocol==="http:")?x.href:null}catch(e){return null}}
function safeImg(p){try{var x=new URL(p,location.href);return["http:","https:","file:"].indexOf(x.protocol)>-1?p:""}catch(e){return""}}
function img(src,alt,cls){var i=el("img",cls);i.src=safeImg(src);i.alt=alt||"";i.loading="lazy";i.addEventListener("error",function(){i.classList.add("missing")});return i}
function byId(id){return S.projects.filter(function(p){return p.id===id})[0]||null}

var here=location.pathname.split("/").pop()||"home.html";
var hd=D.getElementById("hd");
if(hd){
  var logo=el("a","logo",S.brand);logo.href="home.html";logo.setAttribute("aria-label",S.brand+" home");
  var btn=el("button","menu-btn","\u2630");btn.type="button";btn.setAttribute("aria-expanded","false");btn.setAttribute("aria-controls","nav");btn.setAttribute("aria-label","Menu");
  var nav=el("nav","nav");nav.id="nav";nav.setAttribute("aria-label","Main");
  S.nav.forEach(function(n){var a=el("a",null,n[0]);a.href=n[1];if(here===n[1])a.setAttribute("aria-current","page");nav.appendChild(a)});
  btn.addEventListener("click",function(){var o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(o))});
  D.addEventListener("keydown",function(e){if(e.key==="Escape"&&nav.classList.contains("open")){nav.classList.remove("open");btn.setAttribute("aria-expanded","false");btn.focus()}});
  hd.append(logo,nav,btn);
}
var ft=D.getElementById("ft");
if(ft)ft.textContent="\u00A9 "+new Date().getFullYear()+" "+S.brand+". Demo content; replace before launch.";

D.querySelectorAll("[data-t]").forEach(function(e){var v=get(S,e.dataset.t);if(v!=null)e.textContent=v});
D.querySelectorAll("[data-img]").forEach(function(e){var o=get(S,e.dataset.img);e.src=safeImg(o.image);e.alt=o.alt||o.name||"";e.addEventListener("error",function(){e.classList.add("missing")})});

function card(p){
  var a=el("a","card");a.href="project.html?id="+encodeURIComponent(p.id);
  a.append(img(p.image,p.title+" preview"),el("h3",null,p.title),el("p","meta",p.category+", "+p.year));
  return a}
function pair(r,s){var li=el("li");li.append(el("strong",null,s[0]+": "),D.createTextNode(s[1]));r.appendChild(li)}

   D.querySelectorAll("[data-render]").forEach(function(r){var k=r.dataset.render;
 if(k==="featured")S.projects.slice(0,3).forEach(function(p){r.appendChild(card(p))});
 if(k==="work"){
  var cats=["All"].concat(S.categories),grid=r.querySelector(".grid"),bar=r.querySelector(".filters"),empty=r.querySelector(".empty");
    var show=function(c){grid.textContent="";var n=0;S.projects.forEach(function(p){if(c==="All"||p.category===c){grid.appendChild(card(p));n++}});empty.hidden=n>0;
   bar.querySelectorAll("button").forEach(function(b){b.setAttribute("aria-pressed",String(b.textContent===c))})};
  cats.forEach(function(c){var b=el("button","chip",c);b.type="button";b.addEventListener("click",function(){show(c)});bar.appendChild(b)});
  show("All");}
 if(k==="project"){
  var id=new URLSearchParams(location.search).get("id"),p=id&&byId(id);
  if(!p){r.append(el("h1",null,"Project not found"),el("p",null,"That project does not exist. Browse all work instead."));var b=el("a","pill dark","Back to work");b.href="work.html";r.appendChild(b)}
  else{D.title=p.title+" | "+S.brand;r.append(el("h1",null,p.title),el("p","meta",p.category+", "+p.year),img(p.image,p.title+" preview","wide"),el("p",null,p.summary));
    if(Array.isArray(p.images)){var g=el("div","gallery");p.images.forEach(function(s,n){g.appendChild(img(s,p.title+" work "+(n+1)))});r.appendChild(g)}
    if(Array.isArray(p.videos)||Array.isArray(p.youtube)){var vg=el("div","gallery vids");
(p.videos||[]).forEach(function(s,n){var v=el("video");v.controls=true;v.preload="metadata";v.src=safeImg(s);v.setAttribute("aria-label",p.title+" video "+(n+1));vg.appendChild(v)});
(p.youtube||[]).forEach(function(id){if(/^[\w-]{11}$/.test(id)){var fr=el("iframe");fr.src="https://www.youtube-nocookie.com/embed/"+id;fr.title=p.title+" video";fr.loading="lazy";fr.allowFullscreen=true;fr.referrerPolicy="strict-origin-when-cross-origin";vg.appendChild(fr)}});
r.appendChild(vg)}
   var u=p.url&&safeUrl(p.url);if(u){var l=el("a","pill dark","Visit live project");l.href=u;l.target="_blank";l.rel="noopener noreferrer";r.appendChild(l)}
   var back=el("a","pill ghost","All work");back.href="work.html";r.appendChild(back)}}
 if(k==="services")S.services.forEach(function(s){var d=el("div","box");d.append(el("h3",null,s[0]),el("p",null,s[1]));r.appendChild(d)});
 if(k==="process")S.process.forEach(function(s){pair(r,s)});
 if(k==="faqs")S.faqs.forEach(function(f){var d=el("details","box");d.append(el("summary",null,f[0]),el("p",null,f[1]));r.appendChild(d)});
 if(k==="skills")S.about.skills.forEach(function(s){r.appendChild(el("li","chip",s))});
 if(k==="experience")S.about.experience.forEach(function(s){pair(r,s)});
});
var rl=D.getElementById("resume");if(rl){rl.href=S.about.resume;rl.textContent=S.about.resumeLabel}

var f=D.getElementById("cf");
if(f){f.noValidate=true;var st=D.getElementById("status"),sel=f.elements.type;
 S.categories.concat(["Other"]).forEach(function(c){var o=el("option",null,c);o.value=c;sel.appendChild(o)});
 f.addEventListener("submit",function(e){e.preventDefault();var ok=true,first=null,v={};
  ["name","whatsapp","type","message"].forEach(function(n){var i=f.elements[n],er=D.getElementById(n+"-err"),val=i.value.trim(),m="";v[n]=val;
   if(!val)m="This field is required.";
   else if(n==="whatsapp"){var d=val.replace(/[\s+\-().]/g,"");
    if(!/^\d+$/.test(d))m="Use digits only, e.g. +234 801 234 5678.";
    else if(d.charAt(0)==="0")m="Start with your country code (e.g. 234), not 0.";
    else if(d.length<8||d.length>15)m="Enter a valid number with country code.";
    else v.wa=d}
   else if(n==="message"&&val.length<10)m="Write at least 10 characters.";
   else if(val.length>2000)m="Maximum 2000 characters.";
   er.textContent=m;i.setAttribute("aria-invalid",String(!!m));if(m){ok=false;if(!first)first=i}});
  st.textContent="";
  if(!ok){first.focus();return}
  if(!/^\d{8,15}$/.test(S.whatsapp)){st.appendChild(el("p","err","This site's WhatsApp number has not been set yet. The owner must edit js/content.js."));return}
  var text="Hello "+S.brand+", my name is "+v.name+".\nProject type: "+v.type+"\nMy WhatsApp: +"+v.wa+"\n\n"+v.message;
  var url="https://wa.me/"+S.whatsapp+"?text="+encodeURIComponent(text);
  var a=el("a","pill dark","Open WhatsApp");a.href=url;a.target="_blank";a.rel="noopener noreferrer";
  st.append(el("p",null,"Opening WhatsApp. Your message is not sent until you press Send there."),a);
  window.open(url,"_blank","noopener,noreferrer");a.focus();});
}

var lb=el("div","lightbox");lb.hidden=true;lb.setAttribute("role","dialog");lb.setAttribute("aria-modal","true");lb.setAttribute("aria-label","Image viewer");
var lbImg=el("img"),lbX=el("button","lb-btn lb-x","\u00D7"),lbP=el("button","lb-btn lb-p","\u2039"),lbN=el("button","lb-btn lb-n","\u203A");
lbX.type=lbP.type=lbN.type="button";lbX.setAttribute("aria-label","Close");lbP.setAttribute("aria-label","Previous image");lbN.setAttribute("aria-label","Next image");
lb.append(lbImg,lbX,lbP,lbN);D.body.appendChild(lb);
var lbList=[],lbI=0;
function lbShow(i){lbI=(i+lbList.length)%lbList.length;lbImg.src=lbList[lbI].src;lbImg.alt=lbList[lbI].alt}
function lbClose(){lb.hidden=true;D.body.style.overflow=""}
D.addEventListener("click",function(e){var t=e.target,gl=t.closest&&t.closest(".gallery");
 if(t.tagName==="IMG"&&gl){lbList=Array.prototype.slice.call(gl.querySelectorAll("img"));lb.hidden=false;D.body.style.overflow="hidden";lbShow(lbList.indexOf(t));lbX.focus();return}
 if(t===lb||t===lbX)lbClose()});
lbP.addEventListener("click",function(){lbShow(lbI-1)});
lbN.addEventListener("click",function(){lbShow(lbI+1)});
D.addEventListener("keydown",function(e){if(lb.hidden)return;if(e.key==="Escape")lbClose();if(e.key==="ArrowLeft")lbShow(lbI-1);if(e.key==="ArrowRight")lbShow(lbI+1)});
})();
