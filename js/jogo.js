document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('meuCanvas');
    const ctx = canvas.getContext('2d');
    const spanScore = document.getElementById('score');

    let pontuacao = 0;

    // Carrega o sprite da caixa
    const imgCaixa = new Image();
    imgCaixa.src = 'img/Jogo/Caixa_RS.png';

    const imgCaixaComGato = new Image();
    imgCaixaComGato.src = 'img/Jogo/Cato_Siames.png';

    // Configuração da Matriz, aqui vai ter que ser alimentado com os valores de config @raissa
    const linhas = 2;
    const colunas = 2;

    // Dimensões do sprite
    const spriteWidth = 128;
    const spriteHeight = 128;

    // Passos para o encaixe perfeito em estilo "tijolinho"
    const passoX = 84;
    const passoY = 44;
    const deslocamentoImparX = 42;

    let tabuleiro = [];

    // Inicializa a matriz e centraliza dinamicamente no Canvas
    function inicializarTabuleiro() {
        // 1. Calcula a largura e altura total que o tabuleiro vai ocupar em pixels
        // Pegamos a última coluna e a última linha para ver onde o tabuleiro termina
        let larguraTotalGrid = ((colunas - 1) * passoX) + deslocamentoImparX + spriteWidth;
        let alturaTotalGrid = ((linhas - 1) * passoY) + spriteHeight;

        // 2. Calcula a posição inicial (inicioX e inicioY) para centralizar no Canvas
        let inicioX = (canvas.width - larguraTotalGrid) / 2;
        let inicioY = (canvas.height - alturaTotalGrid) / 2;

        for (let l = 0; l < linhas; l++) {
            tabuleiro[l] = [];
            for (let c = 0; c < colunas; c++) {

                let offsetX = (l % 2 === 1) ? deslocamentoImparX : 0;

                let x = inicioX + (c * passoX) + offsetX;
                let y = inicioY + (l * passoY);

                tabuleiro[l][c] = {
                    linha: l,
                    coluna: c,
                    x: x,
                    y: y,
                    temGato: false
                };
            }
        }
    }

    function desenharJogo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let l = 0; l < linhas; l++) {
            for (let c = 0; c < colunas; c++) {
                let caixa = tabuleiro[l][c];

                // SE TIVER GATO: Desenha o sprite da caixa com o gato
                if (caixa.temGato) {
                    if (imgCaixaComGato.complete) {
                        ctx.drawImage(imgCaixaComGato, caixa.x, caixa.y, spriteWidth, spriteHeight);
                    }
                }
                // SE NÃO TIVER GATO: Desenha apenas o sprite da caixa vazia
                else {
                    if (imgCaixa.complete) {
                        ctx.drawImage(imgCaixa, caixa.x, caixa.y, spriteWidth, spriteHeight);
                    }
                }
            }
        }
    }

    // Sorteio periódico dos gatos na matriz
    setInterval(() => {
        let lSorteada = Math.floor(Math.random() * linhas);
        let cSorteada = Math.floor(Math.random() * colunas);
        let caixaAlvo = tabuleiro[lSorteada][cSorteada];

        if (!caixaAlvo.temGato) {
            caixaAlvo.temGato = true;

            // O gato esconde sozinho após 1.2 segundos se não for clicado, aqui precisamos ir aumentando de acordo com a dificuldade do nivel @eu
            setTimeout(() => {
                caixaAlvo.temGato = false;
            }, 1200);
        }
    }, 1000);

    // Interatividade de Clique (Varre de trás para frente para priorizar a linha de baixo/frente)
    canvas.addEventListener('click', (evento) => {
        const rect = canvas.getBoundingClientRect();
        const cliqueX = evento.clientX - rect.left;
        const cliqueY = evento.clientY - rect.top;

        // Varre da última linha para a primeira (linhas - 1 até 0)
        for (let l = linhas - 1; l >= 0; l--) {
            for (let c = 0; c < colunas; c++) {
                let caixa = tabuleiro[l][c];

                // Área de colisão retangular em cima da caixa
                if (
                    cliqueX >= caixa.x + 5 &&
                    cliqueX <= caixa.x + spriteWidth - 5 &&
                    cliqueY >= caixa.y + 10 &&
                    cliqueY <= caixa.y + spriteHeight - 5
                ) {
                    if (caixa.temGato) {
                        pontuacao++;
                        spanScore.innerText = pontuacao;
                        caixa.temGato = false; // Gato esconde 
                    }
                    return; // Encerra o loop assim que acha a caixa clicada
                }
            }
        }
    });

    function loop() {
        desenharJogo();
        requestAnimationFrame(loop);
    }

    imgCaixa.onload = () => {
        inicializarTabuleiro();
        loop();
    };

    if (imgCaixa.complete) {
        inicializarTabuleiro();
        loop();
    }

});