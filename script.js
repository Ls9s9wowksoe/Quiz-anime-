const perguntas = [
  {
    texto: "Quantos vilões o Saitama derrotou na primeira temporada?",
    opcoes: ["60", "32", "100"],
    correta: 1,
    fundo: "img/saitama.jpg"
  },
  {
    texto: "Quantos anos tem Luffy?",
    opcoes: ["30", "20", "19"],
    correta: 2,
    fundo: "img/luffy.jpg"
  },
  {
    texto: "Qual a forma mais poderosa de Naruto?",
    opcoes: ["Barion", "Biju", "Modo Kurama"],
    correta: 0,
    fundo: "img/naruto.jpg"
  }
];

let indice = 0;
let pontos = 0;
const app = document.getElementById("app");
const bgDiv = document.createElement("div");
bgDiv.className = "bg";
document.body.appendChild(bgDiv);
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

function setFundo(img) {
  bgDiv.style.backgroundImage = `url(${img})`;
}

function telaInicial() {
  setFundo("img/naruto.jpg");
  app.innerHTML = `
    <div class="panel">
      <h1>Quiz de Anime</h1>
      <p>Acerte as 3 perguntas para ganhar 3 pontos!</p>
      <button onclick="iniciar()">Começar</button>
    </div>
  `;
  indice = 0;
  pontos = 0;
}

function iniciar() {
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[indice];
  setFundo(p.fundo);
  let html = `<div class="panel">
    <div class="question-text">${p.texto}</div>`;
  p.opcoes.forEach((op, i) => {
    html += `<button onclick="verificar(${i})">${op}</button>`;
  });
  html += `</div>`;
  app.innerHTML = html;
}

function verificar(i) {
  if (i === perguntas[indice].correta) {
    pontos++;
    indice++;
    if (indice >= perguntas.length) {
      mostrarResultado();
    } else {
      mostrarPergunta();
    }
  } else {
    telaInicial();
  }
}

function mostrarResultado() {
  setFundo("img/naruto.jpg");
  app.innerHTML = `
    <div class="panel">
      <div class="score">Você fez ${pontos} ponto${pontos>1?'s':''}!</div>
      <button class="whatsapp-btn" onclick="compartilhar()">Compartilhar no WhatsApp</button>
      <button onclick="telaInicial()">Jogar de novo</button>
    </div>
  `;
}

function compartilhar() {
  const msg = encodeURIComponent(\`Acertei \${pontos}/\${perguntas.length} no Quiz de Anime! Consegue bater?\`);
  const url = encodeURIComponent(window.location.href);
  window.open(\`https://api.whatsapp.com/send?text=\${msg}%20\${url}\`);
}

telaInicial();
