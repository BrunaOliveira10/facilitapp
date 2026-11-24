const categories = [
  { name: "Educação", icon: "✎", hint: "Aprender sempre" },
  { name: "Receitas", icon: "♨", hint: "Ideias à mesa" },
  { name: "Jogos", icon: "♧", hint: "Diversão em papel" },
  { name: "História", icon: "⌂", hint: "Memória e cultura" },
  { name: "Artigos", icon: "▤", hint: "Pesquisa e ciência" },
  { name: "Projetos", icon: "✳", hint: "Crie e compartilhe" }
];
const documents = [
  { id:"estudo-guia", title:"Guia de estudos: foco e organização", category:"Educação", size:"1,2 MB", description:"Um guia prático para organizar sua rotina, estudar com mais foco e transformar pequenas metas em grandes conquistas.", lead:"Um caminho leve para aprender melhor, organizar o tempo e chegar mais longe.", sections:["Comece pelo que importa","Rotina que cabe na vida","Aprender também é pausar"] },
  { id:"bolo-abacaxi", title:"Receitas caseiras: bolo de abacaxi", category:"Receitas", size:"840 KB", description:"Uma receita simples e deliciosa de bolo de abacaxi, com ingredientes fáceis de encontrar e preparo descomplicado.", lead:"Uma receita fofinha, perfumada e feita para compartilhar bons momentos.", sections:["Ingredientes","Modo de preparo","Dica para servir"] },
  { id:"jogo-cartas", title:"Jogo de cartas para imprimir", category:"Jogos", size:"2,4 MB", description:"Um jogo fácil de preparar para brincar com a família e os amigos. Inclui instruções, cartas e variações.", lead:"Diversão para imprimir, recortar e levar para a mesa com a família.", sections:["Como preparar","Regras do jogo","Uma variação para experimentar"] },
  { id:"historia-brasil", title:"História do Brasil: guia de leitura", category:"História", size:"3,1 MB", description:"Uma introdução a períodos e personagens da história brasileira, com temas para leitura e pesquisa.", lead:"Um panorama para conhecer processos, personagens e ideias que formaram o Brasil.", sections:["Como ler a história","O Brasil em transformação","Perguntas para continuar"] },
  { id:"artigo-ciencia", title:"Como nasce uma pesquisa científica", category:"Artigos", size:"1,8 MB", description:"Conheça as etapas de uma pesquisa científica, da pergunta inicial à apresentação dos resultados.", lead:"Uma explicação acessível sobre como perguntas se transformam em conhecimento.", sections:["Da curiosidade à pergunta","Método e evidências","Compartilhar descobertas"] },
  { id:"projeto-horta", title:"Projeto de horta em pequenos espaços", category:"Projetos", size:"2,0 MB", description:"Planeje uma horta em casa, na escola ou na comunidade usando materiais simples e pouco espaço.", lead:"Um projeto para cultivar temperos e ideias mesmo em espaços pequenos.", sections:["Escolha o espaço","Materiais para começar","Cuidar e colher"] },
  { id:"manual-leitura", title:"Manual simples de leitura e pesquisa", category:"Educação", size:"980 KB", description:"Dicas práticas para encontrar fontes, fazer anotações e aproveitar melhor cada leitura.", lead:"Uma caixa de ferramentas para pesquisar com mais confiança e aproveitar cada texto.", sections:["Encontre boas fontes","Leia com intenção","Anote suas descobertas"] },
  { id:"receitas-biscoito", title:"Biscoitos fáceis para o café da tarde", category:"Receitas", size:"760 KB", description:"Receitas de biscoitos simples para preparar em casa e dividir com quem você gosta.", lead:"Receitas simples, cheirosas e feitas para deixar a pausa do café mais gostosa.", sections:["Separe os ingredientes","Prepare a massa","Asse e compartilhe"] },
  { id:"jk-memoria", title:"Memórias e documentos do governo JK", category:"História", size:"2,7 MB", description:"Um roteiro introdutório para explorar documentos e perspectivas sobre o governo de Juscelino Kubitschek.", lead:"Um ponto de partida para pesquisar um período marcante da história brasileira.", sections:["Contexto histórico","Fontes para explorar","Questões para pesquisa"] }
];
const icons = { Educação:"✎", Receitas:"♨", Jogos:"♧", História:"⌂", Artigos:"▤", Projetos:"✳" };
const state = { query:"", category:"Todas", page:"inicio", favorites:new Set(loadFavorites()), sort:"relevance", activeDoc:null, uploaded:[] };
const el = (id) => document.getElementById(id);
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function loadFavorites(){ try { return JSON.parse(localStorage.getItem("facilitapdfs-favorites") || "[]"); } catch { return []; } }
function saveFavorites(){ try { localStorage.setItem("facilitapdfs-favorites", JSON.stringify([...state.favorites])); } catch {} }
function allDocuments(){ return [...state.uploaded, ...documents]; }
function escapeHtml(text){ return String(text).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char])); }
function renderCategories(){
  const grid = el("category-grid");
  grid.innerHTML = categories.map((category) => {
    const count = allDocuments().filter((doc) => doc.category === category.name).length;
    const active = state.category === category.name;
    return `<button class="category-card ${active ? "selected" : ""}" type="button" data-category="${category.name}" aria-pressed="${active}"><span class="category-icon" aria-hidden="true">${category.icon}</span><span><span class="category-name">${category.name}</span><span class="category-total">${count} ${count === 1 ? "documento" : "documentos"}</span></span></button>`;
  }).join("");
  const options = ["Todas", ...categories.map((category) => category.name)];
  el("category-filter").innerHTML = options.map((category) => `<option value="${category}" ${category === state.category ? "selected" : ""}>${category === "Todas" ? "Todas as categorias" : category}</option>`).join("");
  el("upload-category").innerHTML = categories.map((category) => `<option value="${category.name}">${category.name}</option>`).join("");
}
function filteredDocuments(){
  let result = allDocuments().filter((doc) => {
    const matchesQuery = !state.query || normalize(`${doc.title} ${doc.description} ${doc.category}`).includes(normalize(state.query));
    const matchesCategory = state.category === "Todas" || doc.category === state.category;
    const matchesFavorites = state.page !== "favoritos" || state.favorites.has(doc.id);
    return matchesQuery && matchesCategory && matchesFavorites;
  });
  if(state.sort === "az") result.sort((a,b) => a.title.localeCompare(b.title,"pt-BR"));
  else if(state.sort === "category") result.sort((a,b) => a.category.localeCompare(b.category,"pt-BR"));
  return result;
}
function cardMarkup(doc){
  const favorite = state.favorites.has(doc.id);
  return `<article class="document-card"><div class="card-topline"><span class="doc-type"><span>PDF</span> DOCUMENTO</span><button class="favorite-button ${favorite ? "saved" : ""}" type="button" data-favorite="${escapeHtml(doc.id)}" aria-label="${favorite ? "Remover dos" : "Adicionar aos"} favoritos: ${escapeHtml(doc.title)}" aria-pressed="${favorite}">${favorite ? "♥" : "♡"}</button></div><div class="card-content"><p class="card-category">${escapeHtml(doc.category)}</p><h3>${escapeHtml(doc.title)}</h3><p>${escapeHtml(doc.description)}</p></div><div class="card-bottom"><span class="file-size">PDF · ${escapeHtml(doc.size)}</span><button class="view-button" type="button" data-view="${escapeHtml(doc.id)}">Visualizar&nbsp; →</button></div></article>`;
}
function render(){
  renderCategories();
  const results = filteredDocuments();
  const grid = el("document-grid");
  grid.innerHTML = results.map(cardMarkup).join("");
  grid.hidden = results.length === 0;
  el("empty-state").hidden = results.length !== 0;
  el("favorite-count").textContent = state.favorites.size;
  el("favorite-count").hidden = state.favorites.size === 0;
  el("library-heading").textContent = state.page === "favoritos" ? "Seus documentos favoritos" : state.page === "categorias" ? "Explore todos os documentos" : state.query || state.category !== "Todas" ? "Resultados para sua busca" : "PDFs para inspirar sua próxima ideia";
  el("library-eyebrow").textContent = state.page === "favoritos" ? "GUARDADOS POR VOCÊ" : state.page === "categorias" ? "CONTEÚDO POR ASSUNTO" : state.query || state.category !== "Todas" ? "ENCONTRE O QUE PROCURA" : "SELECIONADOS PARA VOCÊ";
  el("category-section").hidden = state.page === "favoritos";
  el("results-summary").hidden = !(state.query || state.category !== "Todas" || state.page === "favoritos");
  el("results-summary").textContent = state.page === "favoritos" ? `${results.length} ${results.length === 1 ? "documento salvo" : "documentos salvos"}` : `${results.length} ${results.length === 1 ? "documento encontrado" : "documentos encontrados"}`;
  el("empty-title").textContent = state.page === "favoritos" ? "Seus favoritos aparecem aqui" : "Ainda não encontramos esse PDF";
  el("empty-copy").textContent = state.page === "favoritos" ? "Toque no coração de um documento para guardá-lo nesta lista." : "Tente outras palavras ou explore uma categoria.";
  el("clear-search").hidden = state.page === "favoritos";
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    const active = link.dataset.page === state.page;
    link.classList.toggle("active",active);
    if(active) link.setAttribute("aria-current","page"); else link.removeAttribute("aria-current");
  });
}
function setPage(page){ state.page=page; if(page !== "categorias") state.category=page === "favoritos" ? state.category : "Todas"; render(); if(page !== "inicio") el("library-section").scrollIntoView({behavior:"smooth",block:"start"}); else window.scrollTo({top:0,behavior:"smooth"}); }
function toggleFavorite(id){
  const doc = allDocuments().find((item) => item.id === id); if(!doc) return;
  if(state.favorites.has(id)){state.favorites.delete(id); showToast("Documento removido dos favoritos.");}
  else {state.favorites.add(id); showToast("Documento salvo nos favoritos.");}
  saveFavorites(); render();
}
function showToast(message){const toast=el("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2800);}
function openViewer(id){
  const doc=allDocuments().find((item)=>item.id===id);if(!doc)return;
  state.activeDoc=doc;el("viewer-title").textContent=doc.title;el("viewer-description").textContent=doc.description;el("viewer-category").textContent=`Categoria: ${doc.category}`;el("viewer-size").textContent=`Arquivo: PDF · ${doc.size}`;
  el("viewer-favorite").textContent=state.favorites.has(id)?"♥  Salvo nos favoritos":"♡  Salvar nos favoritos";
  el("paper-content").innerHTML=`<span class="paper-kicker">FACILITAPDFS · ${escapeHtml(doc.category.toUpperCase())}</span><h3>${escapeHtml(doc.title)}</h3><p class="paper-lead">${escapeHtml(doc.lead || doc.description)}</p><div class="paper-rule"></div>${(doc.sections || ["Sobre este documento","Informações principais","Continue explorando"]).map((section,index)=>`<h4>${index+1}. ${escapeHtml(section)}</h4><p>${escapeHtml(index===0?doc.description:`Este material faz parte da biblioteca de demonstração do FacilitaPDFS. Explore o tema, compartilhe o que aprendeu e descubra outros documentos relacionados a ${doc.category.toLowerCase()}.`)}</p>`).join("")}<div class="paper-footer">FacilitaPDFS · Documento de demonstração</div>`;
  el("viewer-dialog").showModal();
}
function downloadPdf(doc){
  // MVP preview downloads a simple, valid one-page PDF generated in the browser.
  const ascii=(text)=>String(text).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\x20-\x7E]/g," ").replace(/[\\()]/g,"\\$&");
  const wrap=(text,max=76)=>{const words=ascii(text).split(/\s+/);const lines=[];let line="";for(const word of words){if((line+" "+word).trim().length>max){if(line)lines.push(line);line=word;}else line=(line+" "+word).trim();}if(line)lines.push(line);return lines;};
  const lines=["FACILITAPDFS",doc.category.toUpperCase(),"",...wrap(doc.title,54),"",...wrap(doc.description),"","Documento de demonstracao do projeto FacilitaPDFS.","Acesse a biblioteca para encontrar outros materiais."];
  let stream="BT\n/F1 11 Tf\n54 750 Td\n16 TL\n";lines.forEach((line,i)=>{if(i===0)stream+="/F1 9 Tf\n";if(i===1)stream+="/F1 9 Tf\n";if(i===3)stream+="/F1 18 Tf\n";if(i===5)stream+="/F1 11 Tf\n";stream+=`(${ascii(line)}) Tj\nT*\n`;});stream+="ET";
  const objects=["<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>","<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
  let pdf="%PDF-1.4\n",offsets=[0];objects.forEach((obj,index)=>{offsets.push(pdf.length);pdf+=`${index+1} 0 obj\n${obj}\nendobj\n`;});const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;offsets.slice(1).forEach((offset)=>pdf+=`${String(offset).padStart(10,"0")} 00000 n \n`);pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const blob=new Blob([pdf],{type:"application/pdf"}),url=URL.createObjectURL(blob),anchor=document.createElement("a");anchor.href=url;anchor.download=`${ascii(doc.title).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}.pdf`;document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast("Seu PDF está pronto para baixar.");
}
function updateSuggestions(){
  const input=el("search-input"),list=el("search-suggestions"),value=input.value.trim();
  if(!value){list.hidden=true;list.innerHTML="";return;}
  const candidates=allDocuments().filter((doc)=>normalize(`${doc.title} ${doc.category} ${doc.description}`).includes(normalize(value))).slice(0,5);
  if(!candidates.length){list.hidden=true;list.innerHTML="";return;}
  list.innerHTML=candidates.map((doc)=>`<li role="option"><button type="button" data-suggestion="${escapeHtml(doc.title)}"><span aria-hidden="true">⌕</span>&nbsp; ${escapeHtml(doc.title)} <small>· ${escapeHtml(doc.category)}</small></button></li>`).join("");list.hidden=false;
}
function runSearch(value){state.query=value.trim();state.page="inicio";el("search-input").value=state.query;el("search-suggestions").hidden=true;render();el("library-section").scrollIntoView({behavior:"smooth",block:"start"});}
function openUpload(){el("upload-error").hidden=true;el("upload-dialog").showModal();}
function addUpload(file,title,category){
  const doc={id:`upload-${Date.now()}`,title,category,size:file.size>1048576?`${(file.size/1048576).toFixed(1)} MB`:`${Math.max(1,Math.round(file.size/1024))} KB`,description:"PDF enviado por você e disponível neste dispositivo.",lead:"Documento adicionado à sua biblioteca local.",sections:["Documento compartilhado","Na sua biblioteca","Acesso neste dispositivo"],fileUrl:URL.createObjectURL(file)};
  state.uploaded.unshift(doc);state.page="inicio";state.category="Todas";state.query="";render();el("upload-dialog").close();el("upload-form").reset();el("selected-file").textContent="Nenhum arquivo selecionado";showToast("PDF adicionado à biblioteca deste dispositivo.");
}
el("search-form").addEventListener("submit",(event)=>{event.preventDefault();runSearch(el("search-input").value);});
el("search-input").addEventListener("input",updateSuggestions);
document.addEventListener("click",(event)=>{
  const suggestion=event.target.closest("[data-suggestion]");if(suggestion){runSearch(suggestion.dataset.suggestion);return;}
  const category=event.target.closest("[data-category]");if(category){state.category=state.category===category.dataset.category?"Todas":category.dataset.category;state.page="categorias";render();el("library-section").scrollIntoView({behavior:"smooth",block:"start"});return;}
  const favorite=event.target.closest("[data-favorite]");if(favorite){toggleFavorite(favorite.dataset.favorite);return;}
  const view=event.target.closest("[data-view]");if(view){openViewer(view.dataset.view);return;}
  const search=event.target.closest("[data-search]");if(search){runSearch(search.dataset.search);}
});
document.querySelectorAll("[data-page]").forEach((link)=>link.addEventListener("click",(event)=>{event.preventDefault();setPage(link.dataset.page);}));
document.querySelectorAll("[data-page-link]").forEach((link)=>link.addEventListener("click",(event)=>{event.preventDefault();setPage(link.dataset.pageLink);}));
el("category-filter").addEventListener("change",(event)=>{state.category=event.target.value;state.page="categorias";render();});
el("sort-button").addEventListener("click",()=>{state.sort=state.sort==="az"?"category":state.sort==="category"?"relevance":"az";el("sort-button").innerHTML=state.sort==="az"?"↕ <span>Ordem alfabética</span>":state.sort==="category"?"↕ <span>Categoria</span>":"↕ <span>Mais relevantes</span>";render();});
el("clear-search").addEventListener("click",()=>{state.query="";state.category="Todas";state.page="inicio";el("search-input").value="";render();el("search-input").focus();});
el("close-viewer").addEventListener("click",()=>el("viewer-dialog").close());
el("viewer-dialog").addEventListener("click",(event)=>{if(event.target===el("viewer-dialog"))el("viewer-dialog").close();});
el("viewer-favorite").addEventListener("click",()=>{if(state.activeDoc)toggleFavorite(state.activeDoc.id);if(state.activeDoc)el("viewer-favorite").textContent=state.favorites.has(state.activeDoc.id)?"♥  Salvo nos favoritos":"♡  Salvar nos favoritos";});
el("viewer-download").addEventListener("click",()=>{if(!state.activeDoc)return;if(state.activeDoc.fileUrl){const anchor=document.createElement("a");anchor.href=state.activeDoc.fileUrl;anchor.download=state.activeDoc.title;anchor.click();showToast("Seu PDF está pronto para baixar.");}else downloadPdf(state.activeDoc);});
el("open-upload").addEventListener("click",openUpload);el("open-upload-mobile").addEventListener("click",openUpload);el("upload-inline").addEventListener("click",openUpload);el("close-upload").addEventListener("click",()=>el("upload-dialog").close());
el("upload-dialog").addEventListener("click",(event)=>{if(event.target===el("upload-dialog"))el("upload-dialog").close();});
el("upload-file").addEventListener("change",(event)=>{const file=event.target.files[0];el("selected-file").textContent=file?file.name:"Nenhum arquivo selecionado";if(file&&!el("upload-title-input").value)el("upload-title-input").value=file.name.replace(/\.pdf$/i,"");});
el("upload-form").addEventListener("submit",(event)=>{event.preventDefault();const file=el("upload-file").files[0],error=el("upload-error");if(!file||file.type!=="application/pdf"&&!file.name.toLowerCase().endsWith(".pdf")){error.textContent="Selecione um arquivo PDF válido.";error.hidden=false;return;}if(file.size>10*1024*1024){error.textContent="O arquivo excede o limite de 10 MB.";error.hidden=false;return;}addUpload(file,el("upload-title-input").value.trim()||file.name,el("upload-category").value);});
document.addEventListener("keydown",(event)=>{if(event.key==="Escape")el("search-suggestions").hidden=true;});
render();
