const canvas = document.getElementById('preview');
const ctx = canvas.getContext('2d');
const selectTabuleiro = document.getElementById('tabuleiro');

const imgCaixa = new Image();
imgCaixa.src = 'img/jogo/Caixa_RS.png';

let linhas = parseInt(selectTabuleiro.value);
let colunas = parseInt(selectTabuleiro.value);

let tabuleiro = [];

function inicializarTabuleiro() {
    let spriteWidth, spriteHeight, passoX, passoY, deslocamentoX;

    if (colunas >= 7) {
        // 7x7 e 8x8 
        spriteWidth = 35;
        spriteHeight = 35;
        passoX = 20;
        passoY = 15;
        deslocamentoX = 10;

    } else if (colunas >= 5) {
        // 5x5, 6x6
        spriteWidth = 50;
        spriteHeight = 50;
        passoX = 30;
        passoY = 20;
        deslocamentoX = 10;

    } else if (colunas >= 3) {
        // 3x3 e 4x4
        spriteWidth = 70;
        spriteHeight = 70;
        passoX = 45;
        passoY = 25;
        deslocamentoX = 20;

    } else { //2x2
        spriteWidth = 90;
        spriteHeight = 90;
        passoX = 60;
        passoY = 30;
        deslocamentoX = 30;
    }


    let larguraTotalGrid = ((colunas - 1) * passoX) + deslocamentoX + spriteWidth;
    let alturaTotalGrid = ((linhas - 1) * passoY) + spriteHeight;

    let inicioX = (canvas.width - larguraTotalGrid) / 2;
    let inicioY = (canvas.height - alturaTotalGrid) / 2;

    tabuleiro = []; // Limpa o tabuleiro anterior
    for (let l = 0; l < linhas; l++) {
        tabuleiro[l] = [];
        for (let c = 0; c < colunas; c++) {
            let offsetX = (l % 2 === 1) ? deslocamentoX : 0;
            let x = inicioX + (c * passoX) + offsetX;
            let y = inicioY + (l * passoY);

            tabuleiro[l][c] = { x: x, y: y, w: spriteWidth, h: spriteHeight };
        }
    }
}

function desenharTabuleiro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas; c++) {
            let caixa = tabuleiro[l][c];

            if (imgCaixa.complete) {
                ctx.drawImage(imgCaixa, caixa.x, caixa.y, caixa.w, caixa.h);
            }
        }
    }
}

selectTabuleiro.addEventListener('change', (event) => {
    let valor = parseInt(event.target.value);

    linhas = valor;
    colunas = valor;

    // Recalcula o tabuleiro e desenha novamente
    inicializarTabuleiro();
    desenharTabuleiro();
});

imgCaixa.onload = () => {
    inicializarTabuleiro();
    desenharTabuleiro();
};

if (imgCaixa.complete) {
    inicializarTabuleiro();
    desenharTabuleiro();
}