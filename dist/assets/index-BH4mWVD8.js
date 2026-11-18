(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();class d{constructor(){this.db=null,this.STORAGE_KEY="jardin_recuerdos_sqlite_db"}async init(){if(typeof window.initSqlJs>"u")throw new Error("sql.js no se ha cargado correctamente.");const e=await window.initSqlJs({locateFile:n=>`https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${n}`}),s=localStorage.getItem(this.STORAGE_KEY);if(s){const n=new Uint8Array(JSON.parse(s));this.db=new e.Database(n)}else this.db=new e.Database,this.createTable(),this.seedData()}createTable(){this.db&&(this.db.run(`
            CREATE TABLE IF NOT EXISTS recuerdos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                contenido TEXT NOT NULL,
                fecha TEXT NOT NULL,
                categoria TEXT NOT NULL,
                emocion TEXT NOT NULL
            );
        `),this.persist())}seedData(){if(!this.db)return;const e=this.db.prepare("INSERT INTO recuerdos (contenido, fecha, categoria, emocion) VALUES (?, ?, ?, ?);");e.run(["Primer día de clases en UNIVO","2026-02-10","Estudio","Alegría"]),e.run(["Creando mi portafolio web con TypeScript","2026-11-16","Tecnología","Entusiasmo"]),e.free(),this.persist()}persist(){if(!this.db)return;const e=this.db.export();localStorage.setItem(this.STORAGE_KEY,JSON.stringify(Array.from(e)))}getAll(){if(!this.db)return[];const e=this.db.exec("SELECT * FROM recuerdos ORDER BY fecha DESC;");if(e.length===0)return[];const s=e[0].columns;return e[0].values.map(n=>{let t={};return s.forEach((i,r)=>{t[i]=n[r]}),t})}create(e,s,n,t){if(!this.db)return;const i=this.db.prepare("INSERT INTO recuerdos (contenido, fecha, categoria, emocion) VALUES (?, ?, ?, ?);");i.run([e,s,n,t]),i.free(),this.persist()}delete(e){this.db&&(this.db.run("DELETE FROM recuerdos WHERE id = ?;",[e]),this.persist())}filterByEmocion(e){if(!this.db)return[];const s=this.db.prepare("SELECT * FROM recuerdos WHERE emocion = ? ORDER BY fecha DESC;");s.bind([e]);let n=[];for(;s.step();)n.push(s.getAsObject());return s.free(),n}}class l{constructor(e){this.container=document.getElementById(e)}render(e){if(this.container.innerHTML="",!e||e.length===0){this.container.innerHTML=`
                <div class="empty-msg">
                    <span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">🌱</span>
                    Tu jardín está esperando. ¡Siembra tu primer recuerdo arriba!
                </div>
            `;return}e.forEach(s=>{const n=document.createElement("div");n.className="flor-card";let t="🌸";const i=s.emocion?s.emocion.toLowerCase():"";i.includes("entusiasmo")?t="🌻":i.includes("nostalgia")?t="🌷":i.includes("paz")?t="🌼":(i.includes("alegría")||i.includes("alegria"))&&(t="🌸"),n.innerHTML=`
                <div class="flor-header">
                    <span class="flor-icono">${t}</span>
                    <span class="badge-emocion">${s.emocion}</span>
                </div>
                <div class="flor-body">
                    <p class="texto">"${s.contenido}"</p>
                </div>
                <div class="flor-footer">
                    <div class="tags">
                        <span class="tag">📂 ${s.categoria}</span>
                        <span class="tag">📅 ${s.fecha}</span>
                    </div>
                    <button class="btn-delete" data-id="${s.id}" title="Eliminar recuerdo">🗑️ Arrancar</button>
                </div>
            `,this.container.appendChild(n)})}}class u{constructor(e,s){this.db=e,this.view=s}init(){this.loadRecuerdos(),this.initEventListeners()}loadRecuerdos(e){const s=e&&e!=="todos"?this.db.filterByEmocion(e):this.db.getAll();this.view.render(s)}initEventListeners(){const e=document.getElementById("recuerdo-form"),s=document.getElementById("jardin-grid"),n=document.getElementById("filtro-emocion");e.addEventListener("submit",t=>{t.preventDefault();const i=document.getElementById("contenido").value,r=document.getElementById("fecha").value,a=document.getElementById("categoria").value,c=document.getElementById("emocion").value;i&&r&&(this.db.create(i,r,a,c),this.loadRecuerdos(n.value),e.reset())}),s.addEventListener("click",t=>{const i=t.target;if(i.classList.contains("btn-delete")){const r=Number(i.getAttribute("data-id"));this.db.delete(r),this.loadRecuerdos(n.value)}}),n.addEventListener("change",()=>{this.loadRecuerdos(n.value)})}}async function f(){const o=new d;await o.init();const e=new l("jardin-grid");new u(o,e).init()}f();
