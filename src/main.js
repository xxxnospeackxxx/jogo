import "./style.css";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zvygqjwqeougvqvdsloq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_E78syLF-N2LWCvaz8shXRg_wr8vWFyi";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ✅ Se não quiseres mostrar números no cofre, mete false
const SHOW_NUMBERS_IN_VAULT = false;

// -------- Audio (casino suave) --------
let audioCtx = null;
function audioOn() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function beep(freq = 220, dur = 0.08, type = "sine", gain = 0.03) {
  if (!audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + dur);
}
const SFX = {
  click(){ beep(520, 0.03, "square", 0.02); },
  hum(){ beep(55, 0.22, "sine", 0.01); },
  ok(){ beep(330,0.06,"sine",0.05); setTimeout(()=>beep(660,0.06,"sine",0.04),70); },
  bad(){ beep(140,0.11,"sawtooth",0.03); },
  tick(i){ beep(200 + (i%8)*18, 0.02, "square", 0.012); }
};

// -------- i18n --------
const I18N = {
  pt: {
    brand: "CLANDESTINO",
    sub: "O sistema já está a girar.",
    registerNow: "REGISTAR AGORA",
    login: "LOGIN",
    back: "Voltar",
    telegram: "Utilizador Telegram",
    contact: "Email ou telefone",
    password: "Password",
    code: "Código de acesso",
    confirm: "Confirmar",
    enter: "Entrar",
    vault: "A tua pasta",
    yourEntries: "As tuas entradas",
    addCode: "Inserir outro código (mais 1 entrada)",
    add: "Adicionar",
    logout: "Sair",
    play: "JOGAR",
    playLocked: "JOGAR (bloqueado)",
    registerHint: "Só podes registar com um código válido e ainda não usado.",
    loginHint: "O sistema reconhece-te pela tua password.",
    okRegistered: "✅ Registo confirmado. Uma entrada foi selada.",
    okAdded: "✅ Nova entrada adicionada à tua pasta.",
    battery: {
      a: "⟡ O sistema está a acordar…",
      b: "⟡ A bateria está a encher…",
      c: "⟡ O sistema está quase pronto.",
      d: "⚠️ Falta muito pouco para o jogo começar.",
      e: "✅ O jogo está pronto."
    },
    playIntro: "15 segundos. Não pestanejes.",
    start: "COMEÇAR",
    gridTitle: "O TABULEIRO",
    loseTitle: "🫠 NÃO FOI HOJE.",
    loseMsgs: [
      "😐 Estiveste perto. O sistema não vai admitir.",
      "🧊 Hoje não. O sistema prefere padrões.",
      "🫥 Sentiste isso? Era a armadilha.",
      "🧿 O sistema viu a tua confiança. Não aprovou.",
      "🕳️ A roda olhou para ti… e seguiu."
    ],
    winTitle: "🎉 PARABÉNS! 🛴✨",
    winMsg: "Ganhaste a trotinete! Vamos contactar-te em breve. Obrigado 🙏",
    errs: {
      missing_fields: "Faltam campos. O sistema odeia vazios.",
      invalid_code: "Código rejeitado. Talvez nunca tenha existido.",
      code_already_used: "Esse código já foi consumido.",
      raffle_closed: "O sistema fechou. Hoje não.",
      sold_out: "Chegou ao limite. O resto vira silêncio.",
      try_again: "O sistema hesitou. Tenta outra vez.",
      already_registered: "Já existe registo. Usa LOGIN.",
      bad_password: "Password errada.",
      not_found: "Não encontrado. Usa REGISTAR AGORA.",
      not_registered: "Não registado. Usa REGISTAR AGORA.",
      not_ready: "Ainda não está pronto."
    }
  },
  en: {
    brand: "CLANDESTINE",
    sub: "The system is already spinning.",
    registerNow: "REGISTER NOW",
    login: "LOGIN",
    back: "Back",
    telegram: "Telegram username",
    contact: "Email or phone",
    password: "Password",
    code: "Access code",
    confirm: "Confirm",
    enter: "Enter",
    vault: "Your folder",
    yourEntries: "Your entries",
    addCode: "Enter another code (adds 1 entry)",
    add: "Add",
    logout: "Logout",
    play: "PLAY",
    playLocked: "PLAY (locked)",
    registerHint: "Register only works with a valid unused code.",
    loginHint: "The system recognizes your password.",
    okRegistered: "✅ Registered. One entry has been sealed.",
    okAdded: "✅ A new entry was added to your folder.",
    battery: {
      a: "⟡ The system is waking up…",
      b: "⟡ The battery is filling…",
      c: "⟡ The system is almost ready.",
      d: "⚠️ Very soon. The game will begin.",
      e: "✅ The game is ready."
    },
    playIntro: "15 seconds. Don’t blink.",
    start: "START",
    gridTitle: "THE GRID",
    loseTitle: "🫠 NOT TODAY.",
    loseMsgs: [
      "😐 You were close. The system won’t admit it.",
      "🧊 Not today. The system prefers patterns.",
      "🫥 You felt it, right? That was the trap.",
      "🧿 The system saw your confidence. It disapproved.",
      "🕳️ The wheel looked at you… and moved on."
    ],
    winTitle: "🎉 CONGRATULATIONS! 🛴✨",
    winMsg: "You win the trotinette! We will contact you soon. Thank you 🙏",
    errs: {
      missing_fields: "Missing fields. The system hates emptiness.",
      invalid_code: "Code rejected. Maybe it never existed.",
      code_already_used: "This code has already been consumed.",
      raffle_closed: "Closed. Not today.",
      sold_out: "Capacity reached. The rest becomes silence.",
      try_again: "The system hesitated. Try again.",
      already_registered: "Already registered. Use LOGIN.",
      bad_password: "Wrong password.",
      not_found: "Not found. Use REGISTER NOW.",
      not_registered: "Not registered. Use REGISTER NOW.",
      not_ready: "Not ready yet."
    }
  },
  fr: {
    brand: "CLANDESTIN",
    sub: "Le système tourne déjà.",
    registerNow: "S’INSCRIRE",
    login: "CONNEXION",
    back: "Retour",
    telegram: "Pseudo Telegram",
    contact: "Email ou téléphone",
    password: "Mot de passe",
    code: "Code d’accès",
    confirm: "Confirmer",
    enter: "Entrer",
    vault: "Ton dossier",
    yourEntries: "Tes entrées",
    addCode: "Entrer un autre code (+1 entrée)",
    add: "Ajouter",
    logout: "Quitter",
    play: "JOUER",
    playLocked: "JOUER (bloqué)",
    registerHint: "Inscription seulement avec un code valide non utilisé.",
    loginHint: "Le système reconnaît ton mot de passe.",
    okRegistered: "✅ Inscrit. Une entrée a été scellée.",
    okAdded: "✅ Nouvelle entrée ajoutée.",
    battery: {
      a: "⟡ Le système se réveille…",
      b: "⟡ La batterie se remplit…",
      c: "⟡ Presque prêt.",
      d: "⚠️ Très bientôt.",
      e: "✅ Le jeu est prêt."
    },
    playIntro: "15 secondes. Ne cligne pas des yeux.",
    start: "DÉMARRER",
    gridTitle: "LA GRILLE",
    loseTitle: "🫠 PAS AUJOURD’HUI.",
    loseMsgs: [
      "😐 Tu étais proche. Le système ne l’avouera pas.",
      "🧊 Pas aujourd’hui. Le système préfère les schémas.",
      "🫥 Tu l’as senti ? C’était le piège.",
      "🧿 Le système a vu ta confiance. Il n’a pas aimé.",
      "🕳️ La roue t’a regardé… puis a continué."
    ],
    winTitle: "🎉 BRAVO ! 🛴✨",
    winMsg: "Tu as gagné la trottinette ! On te contactera bientôt. Merci 🙏",
    errs: {
      missing_fields: "Champs manquants.",
      invalid_code: "Code rejeté.",
      code_already_used: "Code déjà consommé.",
      raffle_closed: "Fermé.",
      sold_out: "Limite atteinte.",
      try_again: "Réessaie.",
      already_registered: "Déjà inscrit. Utilise CONNEXION.",
      bad_password: "Mauvais mot de passe.",
      not_found: "Introuvable. Utilise S’INSCRIRE.",
      not_registered: "Non inscrit.",
      not_ready: "Pas encore prêt."
    }
  },
  de: {
    brand: "UNTERGRUND",
    sub: "Das System dreht sich bereits.",
    registerNow: "REGISTRIEREN",
    login: "LOGIN",
    back: "Zurück",
    telegram: "Telegram-Name",
    contact: "E-Mail oder Telefon",
    password: "Passwort",
    code: "Zugangscode",
    confirm: "Bestätigen",
    enter: "Eintreten",
    vault: "Dein Ordner",
    yourEntries: "Deine Einträge",
    addCode: "Neuen Code eingeben (+1 Eintrag)",
    add: "Hinzufügen",
    logout: "Logout",
    play: "SPIELEN",
    playLocked: "SPIELEN (gesperrt)",
    registerHint: "Registrierung nur mit gültigem, unbenutztem Code.",
    loginHint: "Das System erkennt dein Passwort.",
    okRegistered: "✅ Registriert. Ein Eintrag wurde versiegelt.",
    okAdded: "✅ Neuer Eintrag hinzugefügt.",
    battery: {
      a: "⟡ Das System wacht auf…",
      b: "⟡ Die Batterie füllt sich…",
      c: "⟡ Fast bereit.",
      d: "⚠️ Gleich geht’s los.",
      e: "✅ Spiel bereit."
    },
    playIntro: "15 Sekunden. Nicht blinzeln.",
    start: "START",
    gridTitle: "DAS FELD",
    loseTitle: "🫠 NICHT HEUTE.",
    loseMsgs: [
      "😐 Du warst nah dran. Das System sagt es nicht.",
      "🧊 Nicht heute. Das System liebt Muster.",
      "🫥 Du hast es gespürt. Das war die Falle.",
      "🧿 Das System sah dein Selbstvertrauen. Keine Zustimmung.",
      "🕳️ Das Rad sah dich… und ging weiter."
    ],
    winTitle: "🎉 GLÜCKWUNSCH! 🛴✨",
    winMsg: "Du hast den Scooter gewonnen! Wir kontaktieren dich bald. Danke 🙏",
    errs: {
      missing_fields: "Felder fehlen.",
      invalid_code: "Code abgelehnt.",
      code_already_used: "Code schon benutzt.",
      raffle_closed: "Geschlossen.",
      sold_out: "Limit erreicht.",
      try_again: "Nochmal.",
      already_registered: "Schon registriert.",
      bad_password: "Falsches Passwort.",
      not_found: "Nicht gefunden.",
      not_registered: "Nicht registriert.",
      not_ready: "Noch nicht bereit."
    }
  }
};

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

const state = {
  lang: "pt",
  view: "home", // home | register | login | vault | play
  telegram: "",
  password: "",
  numbers: [],
  stats: { occupied: 0, capacity: 100, is_open: true }
};

const app = document.querySelector("#app");

function T(){ return I18N[state.lang]; }

function setView(v){ state.view = v; render(); }
function setLang(l){ state.lang = l; render(); refreshStats(); }

function batteryText(r){
  const b = T().battery;
  if (r >= 1) return b.e;
  if (r >= 0.85) return b.d;
  if (r >= 0.55) return b.c;
  if (r >= 0.25) return b.b;
  return b.a;
}
function batteryColor(r){
  if (r >= 1) return "#3bff8a";
  if (r >= 0.8) return "#b9ff4a";
  if (r >= 0.5) return "#ffd84a";
  return "#ff4a5a";
}

async function refreshStats(){
  const { data, error } = await supabase.from("public_stats").select("*").single();
  if (!error && data) state.stats = data;

  const cap = state.stats.capacity || 100;
  const occ = state.stats.occupied || 0;
  const r = Math.max(0, Math.min(1, occ / cap));

  const fill = document.querySelector("#batteryFill");
  const txt = document.querySelector("#batteryText");
  if (fill){
    fill.style.width = `${Math.round(r*100)}%`;
    fill.style.background = batteryColor(r);
  }
  if (txt) txt.textContent = batteryText(r);

  const playBtn = document.querySelector("#btnPlay");
  if (playBtn){
    const ready = (state.stats.is_open === false) || (occ >= cap);
    playBtn.disabled = !ready;
    playBtn.textContent = ready ? T().play : T().playLocked;
  }
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[s]));
}

function render(){
  const t = T();
  app.innerHTML = `
  <div class="wrap">
    <div class="veil"></div>

    <header class="top">
      <div class="brand">
        <div class="sigil">⟡</div>
        <div>
          <div class="title">${t.brand}</div>
          <div class="subtitle">${t.sub}</div>
        </div>
      </div>

      <div class="lang">
        <button class="chip ${state.lang==="pt"?"active":""}" data-lang="pt">PT</button>
        <button class="chip ${state.lang==="en"?"active":""}" data-lang="en">EN</button>
        <button class="chip ${state.lang==="fr"?"active":""}" data-lang="fr">FR</button>
        <button class="chip ${state.lang==="de"?"active":""}" data-lang="de">DE</button>
      </div>
    </header>

    <main class="main">
      <section class="panel">
        <div class="batteryBox">
          <div class="batteryTop">
            <div class="batteryText" id="batteryText">…</div>
          </div>
          <div class="battery">
            <div class="batteryFill" id="batteryFill"></div>
          </div>
        </div>

        <div class="divider"></div>
        ${viewHtml()}
      </section>

      <section class="panel">
        ${sideHtml()}
      </section>
    </main>

    <footer class="foot">
      <span class="muted">⟡</span>
      <span>Some return. Others learn.</span>
    </footer>
  </div>`;

  app.querySelectorAll("button[data-lang]").forEach(b=>{
    b.addEventListener("click", ()=>{ audioOn(); SFX.click(); setLang(b.dataset.lang); });
  });

  bind();
  refreshStats();
}

function viewHtml(){
  const t = T();

  if (state.view === "home"){
    return `
      <div class="stack">
        <button class="enter" id="goRegister">${t.registerNow}</button>
        <button class="enter ghost" id="goLogin">${t.login}</button>
      </div>`;
  }

  if (state.view === "register"){
    return `
      <div class="stack">
        <div class="miniTitle">${t.registerNow}</div>
        <div class="fineprint">${t.registerHint}</div>
        <form id="registerForm" class="form">
          <label><span>${t.telegram}</span><input id="rTelegram" placeholder="@name" autocomplete="off"></label>
          <label><span>${t.contact}</span><input id="rContact" placeholder="email / phone" autocomplete="off"></label>
          <label><span>${t.password}</span><input id="rPassword" type="password" placeholder="••••••••" autocomplete="off"></label>
          <label><span>${t.code}</span><input id="rCode" placeholder="XXXX-XXXX-XXXX" autocomplete="off"></label>
          <button class="enter" type="submit">${t.confirm}</button>
          <button class="enter ghost" type="button" id="backHome">${t.back}</button>
        </form>
        <div class="result" id="rOut"></div>
      </div>`;
  }

  if (state.view === "login"){
    return `
      <div class="stack">
        <div class="miniTitle">${t.login}</div>
        <div class="fineprint">${t.loginHint}</div>
        <form id="loginForm" class="form">
          <label><span>${t.telegram}</span><input id="lTelegram" placeholder="@name" autocomplete="off"></label>
          <label><span>${t.password}</span><input id="lPassword" type="password" placeholder="••••••••" autocomplete="off"></label>
          <button class="enter" type="submit">${t.enter}</button>
          <button class="enter ghost" type="button" id="backHome">${t.back}</button>
        </form>
        <div class="result" id="lOut"></div>
      </div>`;
  }

  if (state.view === "vault"){
    const nums = state.numbers || [];
    const display = SHOW_NUMBERS_IN_VAULT
      ? (nums.length ? nums.map(n=>`<span class="numChip">#${n}</span>`).join("") : `<span class="muted">—</span>`)
      : (nums.length ? `<span class="muted">Entradas: </span><span class="numChip">${nums.length}</span>` : `<span class="muted">—</span>`);

    return `
      <div class="stack">
        <div class="miniTitle">${t.vault}</div>

        <div class="folder">
          <div class="folderTop">
            <div>${t.yourEntries}</div>
            <div class="muted">@${escapeHtml(state.telegram)}</div>
          </div>
          <div class="folderNums">${display}</div>
        </div>

        <form id="addForm" class="form">
          <label><span>${t.addCode}</span><input id="aCode" placeholder="XXXX-XXXX-XXXX" autocomplete="off"></label>
          <button class="enter" type="submit">${t.add}</button>
        </form>

        <button class="enter" id="btnPlay" disabled>${t.playLocked}</button>
        <button class="enter ghost" id="logout">${t.logout}</button>

        <div class="result" id="vOut"></div>
      </div>`;
  }

  if (state.view === "play"){
    return `
      <div class="stack">
        <div class="miniTitle">${t.play}</div>
        <div class="fineprint">${t.playIntro}</div>
        <button class="enter" id="startGame">${t.start}</button>
        <button class="enter ghost" id="backVault">${t.back}</button>
      </div>`;
  }

  return "";
}

function sideHtml(){
  const t = T();
  if (state.view !== "play"){
    return `
      <div class="slot">
        <div class="slotTitle">SIGNAL</div>
        <div class="slotBody">
          <div class="pulse"></div>
          <div class="whisper">${t.battery.b}</div>
        </div>
      </div>
      <div class="result" id="sideOut"></div>`;
  }

  return `
    <div class="slot">
      <div class="slotTitle">${t.gridTitle}</div>
      <div class="slotBody gridWrap">
        <div class="pulse"></div>
        <div class="grid" id="grid"></div>
      </div>
    </div>
    <div class="result" id="gameMsg"></div>
    <div id="confetti"></div>`;
}

function bind(){
  const goRegister = document.querySelector("#goRegister");
  if (goRegister) goRegister.addEventListener("click", ()=>{ audioOn(); SFX.click(); setView("register"); });

  const goLogin = document.querySelector("#goLogin");
  if (goLogin) goLogin.addEventListener("click", ()=>{ audioOn(); SFX.click(); setView("login"); });

  const backHome = document.querySelector("#backHome");
  if (backHome) backHome.addEventListener("click", ()=>{ audioOn(); SFX.click(); setView("home"); });

  const registerForm = document.querySelector("#registerForm");
  if (registerForm) registerForm.addEventListener("submit", onRegister);

  const loginForm = document.querySelector("#loginForm");
  if (loginForm) loginForm.addEventListener("submit", onLogin);

  const addForm = document.querySelector("#addForm");
  if (addForm) addForm.addEventListener("submit", onAdd);

  const logout = document.querySelector("#logout");
  if (logout) logout.addEventListener("click", ()=>{
    audioOn(); SFX.click();
    state.telegram = ""; state.password = ""; state.numbers = [];
    setView("home");
  });

  const btnPlay = document.querySelector("#btnPlay");
  if (btnPlay) btnPlay.addEventListener("click", ()=>{
    audioOn(); SFX.click();
    setView("play");
  });

  const backVault = document.querySelector("#backVault");
  if (backVault) backVault.addEventListener("click", ()=>{
    audioOn(); SFX.click();
    setView("vault");
  });

  const startGame = document.querySelector("#startGame");
  if (startGame) startGame.addEventListener("click", startPlay);
}

async function onRegister(ev){
  ev.preventDefault();
  const t = T();
  audioOn(); SFX.click(); SFX.hum();

  const out = document.querySelector("#rOut");
  out.className = "result";
  out.textContent = "…";

  const telegramRaw = document.querySelector("#rTelegram").value.trim();
  const telegram = telegramRaw.replace(/^@/,"");
  const contact = document.querySelector("#rContact").value.trim();
  const password = document.querySelector("#rPassword").value.trim();
  const code = document.querySelector("#rCode").value.trim();

  const { data, error } = await supabase.rpc("register_now", {
    p_code: code,
    p_telegram: telegram,
    p_contact: contact,
    p_password: password,
    p_language: state.lang
  });

  if (error || !data?.ok){
    SFX.bad();
    out.classList.add("bad");
    out.textContent = t.errs[data?.error] || ("Error: " + (error?.message || data?.error || "unknown"));
    return;
  }

  SFX.ok();
  out.classList.add("ok");
  out.textContent = t.okRegistered;

  state.telegram = telegram;
  state.password = password;

  await refreshStats();
  await loadMyEntries();
  setView("vault");
}

async function onLogin(ev){
  ev.preventDefault();
  const t = T();
  audioOn(); SFX.click(); SFX.hum();

  const out = document.querySelector("#lOut");
  out.className = "result";
  out.textContent = "…";

  const telegramRaw = document.querySelector("#lTelegram").value.trim();
  const telegram = telegramRaw.replace(/^@/,"");
  const password = document.querySelector("#lPassword").value.trim();

  const { data, error } = await supabase.rpc("login_player", {
    p_telegram: telegram,
    p_password: password
  });

  if (error || !data?.ok){
    SFX.bad();
    out.classList.add("bad");
    out.textContent = t.errs[data?.error] || ("Error: " + (error?.message || data?.error || "unknown"));
    return;
  }

  SFX.ok();
  out.classList.add("ok");
  out.textContent = "👁️ OK.";

  state.telegram = telegram;
  state.password = password;

  await refreshStats();
  await loadMyEntries();
  setView("vault");
}

async function onAdd(ev){
  ev.preventDefault();
  const t = T();
  audioOn(); SFX.click(); SFX.hum();

  const out = document.querySelector("#vOut");
  out.className = "result";
  out.textContent = "…";

  const code = document.querySelector("#aCode").value.trim();

  const { data, error } = await supabase.rpc("add_entry", {
    p_code: code,
    p_telegram: state.telegram,
    p_password: state.password
  });

  if (error || !data?.ok){
    SFX.bad();
    out.classList.add("bad");
    out.textContent = t.errs[data?.error] || ("Error: " + (error?.message || data?.error || "unknown"));
    return;
  }

  SFX.ok();
  out.classList.add("ok");
  out.textContent = t.okAdded;

  document.querySelector("#aCode").value = "";
  await refreshStats();
  await loadMyEntries();
  render();
}

async function loadMyEntries(){
  const { data, error } = await supabase.rpc("get_my_entries", {
    p_telegram: state.telegram,
    p_password: state.password
  });
  if (!error && data?.ok) state.numbers = data.numbers || [];
}

// -------- GAME --------
function buildGrid(){
  const grid = document.querySelector("#grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (let i=0;i<25;i++){
    const d = document.createElement("div");
    d.className = "cell";
    d.textContent = "◻";
    grid.appendChild(d);
  }
}
function setHot(idx){
  const grid = document.querySelector("#grid");
  if (!grid) return;
  [...grid.children].forEach((c,i)=> c.classList.toggle("hot", i===idx));
}
function confettiBoom(){
  const box = document.querySelector("#confetti");
  if (!box) return;
  box.innerHTML = "";
  for (let i=0;i<120;i++){
    const c = document.createElement("div");
    c.className = "conf";
    c.style.left = Math.random()*100 + "vw";
    c.style.animationDelay = (Math.random()*0.4) + "s";
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    box.appendChild(c);
  }
}

async function startPlay(){
  const t = T();
  audioOn(); SFX.click(); SFX.hum();

  await refreshStats();

  // só joga quando cheio/fechado (sem mostrar número)
  const cap = state.stats.capacity || 100;
  const occ = state.stats.occupied || 0;
  const ready = (state.stats.is_open === false) || (occ >= cap);

  const msg = document.querySelector("#gameMsg");
  msg.className = "result";
  msg.textContent = "…";

  if (!ready){
    SFX.bad();
    msg.classList.add("bad");
    msg.textContent = t.errs.not_ready;
    return;
  }

  const { data, error } = await supabase.rpc("get_play_result", {
    p_telegram: state.telegram,
    p_password: state.password
  });

  if (error || !data?.ok){
    SFX.bad();
    msg.classList.add("bad");
    msg.textContent = t.errs[data?.error] || "Error.";
    return;
  }

  const win = !!data.win;

  buildGrid();

  // animação 15s (vai e vem)
  const totalMs = 15000;
  const stepMs = 85;
  const cells = 25;

  let idx = 0;
  let dir = 1;
  let elapsed = 0;

  const target = win ? 12 : Math.floor(Math.random()*cells);

  const timer = setInterval(()=>{
    elapsed += stepMs;

    setHot(idx);
    SFX.tick(idx);

    idx += dir;
    if (idx >= cells-1){ dir = -1; idx = cells-1; }
    if (idx <= 0){ dir = 1; idx = 0; }
    if (Math.random() < 0.06) dir *= -1;

    if (elapsed >= totalMs){
      clearInterval(timer);
      setHot(target);

      if (win){
        SFX.ok();
        confettiBoom();
        msg.className = "result ok glow";
        msg.textContent = `${t.winTitle}\n${t.winMsg}`;
      } else {
        SFX.bad();
        msg.className = "result bad glow";
        msg.textContent = `${t.loseTitle}\n${pick(t.loseMsgs)}`;
      }
    }
  }, stepMs);
}

render();
// --- GAME LOGIC ---
const btnPlay = document.querySelector("#btnPlay");
const gameScreen = document.querySelector("#gameScreen");
const cells = document.querySelectorAll(".cell");
const gameMessage = document.querySelector("#gameMessage");

let activeIndex = 0;
let gameInterval = null;

function startGame() {
  document.querySelector("main")?.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  gameMessage.textContent = "";

  let elapsed = 0;
  gameInterval = setInterval(() => {
    cells.forEach(c => c.classList.remove("active"));
    cells[activeIndex].classList.add("active");
    activeIndex = (activeIndex + 1) % cells.length;
    elapsed += 150;

    if (elapsed >= 15000) {
      clearInterval(gameInterval);
      finishGame();
    }
  }, 150);
}

async function finishGame() {
  // aqui simulamos win/lose (depois ligamos ao Supabase)
  const win = Math.random() < 0.01; // 1 vencedor simbólico

  if (win) {
    gameMessage.textContent = "🎉 CONGRATULATIONS 🎉 YOU WIN 🛴";
    confetti();
  } else {
    const msgs = [
      "😈 Quase… mas o sistema não te escolheu.",
      "🕳️ Sentiste que ia ser agora, não sentiste?",
      "🎰 O casino agradece a tua esperança.",
      "⌛ Continua atento. O erro foi acreditar."
    ];
    gameMessage.textContent = msgs[Math.floor(Math.random()*msgs.length)];
  }
}

// ligar botão
if (btnPlay) {
  btnPlay.addEventListener("click", startGame);
}
