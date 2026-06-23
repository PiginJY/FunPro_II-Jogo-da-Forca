const palavras = ["misantropia", "rispidez", "idiocracia", "urubu", "paralelepipedo", "euforia", "significado","perseveranca","imprescindivel","empatia","dicionario","inerente","respeito","amor","perspicaz","perspectiva"];

let palavra = "";
let letrasCorretas = [];
let letrasErradas = [];
let jogoAtivo = true;

const elementoForca = document.getElementById("forca");
const desenhos = [
`
 +---+
 |   |
     |
     |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
     |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
 |   |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|   |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|\\  |
     |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|\\  |
/    |
     |
=========
`,
`
 +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=========
`
];

const elementoPalavra = document.getElementById("palavra");
const elementoErros = document.getElementById("erros");
const elementoTentativas = document.getElementById("tentativas");
const elementoMensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function atualizarForca() {
    elementoForca.innerText = desenhos[letrasErradas.length];
}

function mostrarTentativas() {
    elementoTentativas.innerText = `Tentativas restantes: ${6 - letrasErradas.length}`;
}

function iniciarJogo() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    letrasCorretas.length = 0;
    letrasErradas.length = 0;
    jogoAtivo = true;

    elementoErros.innerText = "";
    elementoMensagem.innerText = "";
    elementoMensagem.className = "";
    
    botaoReiniciar.style.display = "none"; // Garante que o botão some ao reiniciar
    
    mostrarPalavra();
    mostrarTentativas();
    atualizarForca();
}

function mostrarPalavra() {
    let texto = "";
    for (const letra of palavra) {
        if (letrasCorretas.includes(letra)) {
            texto += letra + " "
        } else {
            texto += "_ "
        }
    }
    elementoPalavra.innerText = texto.trim();
}

document.addEventListener("keydown", (evento) => {
    if (!jogoAtivo) return;

    const letra = evento.key.toLowerCase();

    if (letra.length !== 1 || letra < "a" || letra > "z") return;

    if (palavra.includes(letra)) {
        if (!letrasCorretas.includes(letra)) {
            letrasCorretas.push(letra);
        }
    } else {
        if (!letrasErradas.includes(letra)) {
            letrasErradas.push(letra);
        }
    }

    mostrarPalavra();
    mostrarLetrasErradas();
    mostrarTentativas();
    verificarFimDeJogo();
});

function mostrarLetrasErradas() {
    if (letrasErradas.length > 0) {
        elementoErros.innerText = "Letras erradas: " + letrasErradas.join(", ");
    }
    atualizarForca();
}

function verificarFimDeJogo() {
    if (letrasErradas.length >= 6) {
        elementoMensagem.innerText = "❌ Você perdeu! A palavra era: " + palavra;
        elementoMensagem.className = "perdeu";
        jogoAtivo = false;
        botaoReiniciar.style.display = "inline-block"; // Mostra o botão na derrota
    } else if (palavra.split("").every(letra => letrasCorretas.includes(letra))) {
        elementoMensagem.innerText = "🎉 Parabéns! Você ganhou!";
        elementoMensagem.className = "ganhou";
        jogoAtivo = false;
        botaoReiniciar.style.display = "inline-block"; // Mostra o botão na vitória
    }
}

botaoReiniciar.addEventListener("click", iniciarJogo);

iniciarJogo();
