document.addEventListener('DOMContentLoaded', () => {

    // == Modulo de Declarações ==
    const canvas = document.getElementById('meuCanvas');
    const ctx = canvas.getContext('2d');

    // elementos do placar
    const score = document.getElementById('score');
    const time = document.getElementById('time');
    const qtd = document.getElementById('qtd');
    const nivel = document.getElementById('nivel');

    // referências dos modais de ganhar e perder
    const modalGanhar = document.getElementById('modal-ganhar');
    const modalPerder = document.getElementById('modal-perder');

    // referência do botão de próximo nível dentro do modal de vitória
    const btnProxNivel = document.getElementById('btn-prox-nivel');

    //referencia do botão no placar de desistir, aciona o modal de perder
     const btnDesistir = document.getElementById('btn-desistir');

    // variáveis de nivel
    let nivelAtual = 1;
    let pontuacaoNivel = 0;      // pontuação obtida no nível atual (acertos * 10)
    let acertosNivel = 0;        // qtd de gatos acertados no nível atual
    let gatosAparecidosNivel = 0;// total de gatos que surgiram no nível atual

    // variaveis de partida
    let pontuacaoAcumulada = 0;  // soma da pontuação de todos os níveis
    let totalGatosAcertadosAcumulado = 0; // soma de todos os acertos da partida

    // configurações de tempo e dificuldade
    let tempoNivel = 30; // 30 segundos por nível
    let tempoVisibilidadeGato = 1000; // começa em 1s, meio em duvida se deixar assim ou não @all
    let temporizadorJogo = null; // responsavel pela parada ao fim de cada 30s
    let geradorGatos = null; // responsavel por gerar e parar a geração de gatos ao fim do tempo do nivel
    let jogoRodando = false; // parada do jogo como um todo

    // == Modulo de Carregamento de Sprites ==

    const imgCaixa = new Image();
    imgCaixa.src = 'img/Jogo/Caixa_RS.png';

    const imgCaixaComGato = new Image();
    imgCaixaComGato.src = 'img/Jogo/Cato_Siames.png';

    // == modulo configs do tabuleiro ==

    // configuração da matriz, terão que ser atualizadas com as infos do modal config @raissa
    const linhas = 8;
    const colunas = 8;

    // dimensões dos sprite
    const spriteWidth = 128;
    const spriteHeight = 128;

    //movendo as caixinhas pra fazer elas ficarem no grid que escolhemos
    const passoX = 84; //distancia horizontal entre as caixas
    const passoY = 44; //distancia vertical entre as caixas
    const deslocamentoImparX = 42; // as fileiras impares tem um deslocamento horizontal

    let tabuleiro = [];

    function inicializarTabuleiro() {
        let larguraTotalGrid = ((colunas - 1) * passoX) + deslocamentoImparX + spriteWidth;
        let alturaTotalGrid = ((linhas - 1) * passoY) + spriteHeight;

        // centralizando o grid com base no tamanho dele
        let inicioX = (canvas.width - larguraTotalGrid) / 2;
        let inicioY = (canvas.height - alturaTotalGrid) / 2;

        for (let l = 0; l < linhas; l++) { // esse for é responsavel por montar o tabuleiro, deslocando as caixinhas e afins
            tabuleiro[l] = [];
            for (let c = 0; c < colunas; c++) {

                let offsetX = 0;
                if (l % 2 === 1) {
                    offsetX = deslocamentoImparX;
                }

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
        ctx.clearRect(0, 0, canvas.width, canvas.height); //limpando o canvas anterior 

        for (let l = 0; l < linhas; l++) {
            for (let c = 0; c < colunas; c++) {
                let caixa = tabuleiro[l][c];

                if (caixa.temGato) {
                    if (imgCaixaComGato.complete) {
                        ctx.drawImage(imgCaixaComGato, caixa.x, caixa.y, spriteWidth, spriteHeight);
                    }
                } else {
                    if (imgCaixa.complete) {
                        ctx.drawImage(imgCaixa, caixa.x, caixa.y, spriteWidth, spriteHeight);
                    }
                }
            }
        }
    }

    function iniciarNivel() {  // inicia um novo nível
        // reseta pontuação e contadores do nivel atual
        pontuacaoNivel = 0;
        acertosNivel = 0;
        gatosAparecidosNivel = 0;
        tempoNivel = 30;

        // atualiza os elementos do placar
        if (score) score.innerText = pontuacaoNivel;
        if (qtd) qtd.innerText = gatosAparecidosNivel;
        if (nivel) nivel.innerText = nivelAtual;

        atualizarFormatacaoTempo();
        jogoRodando = true;

        if (modalGanhar && modalGanhar.open) modalGanhar.close();
        if (modalPerder && modalPerder.open) modalPerder.close();

        // Inicia os temporizadores do jogo
        temporizadorJogo = setInterval(() => {
            tempoNivel--;
            atualizarFormatacaoTempo();

            if (tempoNivel <= 0) {
                encerrarNivel();
            }
        }, 1000);

        iniciarGeradorGatos();
    }

    function atualizarFormatacaoTempo() { // função responsavel por ficar atualizando o cronometro do placar
        if (!time) {
            return;
        }
        let minutos = Math.floor(tempoNivel / 60);
        let segundos = tempoNivel % 60;

        if (segundos < 10) {
            time.innerText = minutos + ':0' + segundos;
        } else {
            time.innerText = minutos + ':' + segundos;
        }
    }

    function iniciarGeradorGatos() {
        geradorGatos = setInterval(() => {
            if (!jogoRodando) {
                return;
            }

            let lSorteada = Math.floor(Math.random() * linhas);
            let cSorteada = Math.floor(Math.random() * colunas);
            let caixaAlvo = tabuleiro[lSorteada][cSorteada];

            if (!caixaAlvo.temGato) {
                caixaAlvo.temGato = true;
                gatosAparecidosNivel++;

                if (qtd) {
                    qtd.innerText = gatosAparecidosNivel;
                }

                // gato se esconde sozinho após o tempo estipulado do nível
                setTimeout(() => {
                    if (jogoRodando) {
                        caixaAlvo.temGato = false;
                    }
                }, tempoVisibilidadeGato);
            }
        }, 800); // intervalo entre as tentativas de exibição de novos gatos
    }

    if(btnDesistir){
        btnDesistir.addEventListener('click', (evento) => {
            evento.preventDefault();
            encerrarNivel();
            if (modalPerder) {
                modalPerder.showModal();
            }
        });
    }

    function encerrarNivel() {
        jogoRodando = false;
        clearInterval(temporizadorJogo);
        clearInterval(geradorGatos);

        // Limpa todos os gatos que ficaram visíveis
        for (let l = 0; l < linhas; l++) {
            for (let c = 0; c < colunas; c++) {
                tabuleiro[l][c].temGato = false;
            }
        }

        // Meta mínima de 70% de acertos
        let metaMinimaAcertos = 0;
        if (gatosAparecidosNivel > 0) {
            metaMinimaAcertos = Math.ceil(gatosAparecidosNivel * 0.70);
        }

        if (gatosAparecidosNivel > 0 && acertosNivel >= metaMinimaAcertos) {
            // ganhou :)
            pontuacaoAcumulada += pontuacaoNivel;
            totalGatosAcertadosAcumulado += acertosNivel;

            preencherModalGanhar();
            if (modalGanhar) {
                modalGanhar.showModal();
            }
        } else {
            // perdeu :(
            preencherModalPerder();
            if (modalPerder) {
                modalPerder.showModal();
            }
        }
    }

    function preencherModalGanhar() {
        let elPontuacao = document.getElementById('ganhar-pontuacao');
        let elAcertos = document.getElementById('ganhar-acertos');
        let elPontAcul = document.getElementById('ganhar-pontuacao-acul');
        let elPontProx = document.getElementById('pontuacao-prox');

        if (elPontuacao) { elPontuacao.innerText = pontuacaoNivel; }
        if (elAcertos) { elAcertos.innerText = acertosNivel; }
        if (elPontAcul) { elPontAcul.innerText = pontuacaoAcumulada; }

        let metaEstimada = Math.ceil((gatosAparecidosNivel > 0 ? gatosAparecidosNivel : 5) * 0.70) * 10;
        if (elPontProx) { elPontProx.innerText = metaEstimada; }
    }

    function preencherModalPerder() {
        let elPontuacao = document.getElementById('perder-pontuacao');
        let elAcertos = document.getElementById('perder-acertos');
        let elGatosAcertados = document.getElementById('perder-gatos-acertados');
        let elPontAcul = document.getElementById('perder-pontuacao-acul');

        if (elPontuacao) { elPontuacao.innerText = pontuacaoNivel; }
        if (elAcertos) { elAcertos.innerText = acertosNivel; }
        if (elGatosAcertados) { elGatosAcertados.innerText = totalGatosAcertadosAcumulado + acertosNivel; }
        if (elPontAcul) { elPontAcul.innerText = pontuacaoAcumulada + pontuacaoNivel; }
    }

    if (btnProxNivel) {
        btnProxNivel.addEventListener('click', (evento) => {
            evento.preventDefault();

            if (modalGanhar && modalGanhar.open) {
                modalGanhar.close();
            }

            nivelAtual++;
            // aumenta a dif do jogo, o gato passa a ser 10% mais rapido a cada nível, mas nunca menos que 300ms de visibilidade
            tempoVisibilidadeGato = Math.max(300, tempoVisibilidadeGato * 0.90);

            iniciarNivel();
        });
    }

    // interatividade de clique
    canvas.addEventListener('click', (evento) => {
        if (!jogoRodando) return;

        const rect = canvas.getBoundingClientRect();
        const cliqueX = evento.clientX - rect.left;
        const cliqueY = evento.clientY - rect.top;

        //hitbox do gatinho, feito assim pq o sprite é o gato e a caixa junto 
        const margemX = 30;
        const margemTopo = 30;
        const margemBaixo = 20;

        for (let l = linhas - 1; l >= 0; l--) {
            for (let c = 0; c < colunas; c++) {
                let caixa = tabuleiro[l][c];

                if (caixa.temGato) {

                    const gatoMinX = caixa.x + margemX;
                    const gatoMaxX = caixa.x + spriteWidth - margemX;
                    const gatoMinY = caixa.y + margemTopo;
                    const gatoMaxY = caixa.y + spriteHeight - margemBaixo;

                    // verifica se o clique foi na hitbox do gatinho
                    if (
                        cliqueX >= gatoMinX &&
                        cliqueX <= gatoMaxX &&
                        cliqueY >= gatoMinY &&
                        cliqueY <= gatoMaxY
                    ) {
                        // Acertou o gato!
                        acertosNivel++;
                        pontuacaoNivel += 10;
                        if (score) score.innerText = pontuacaoNivel;

                        // Esconde o gato imediatamente
                        caixa.temGato = false;
                        return; // Encerra para não acertar mais de um elemento no mesmo clique
                    }
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
        iniciarNivel(); // Começa o jogo automaticamente ao carregar
    };

    if (imgCaixa.complete) {
        inicializarTabuleiro();
        loop();
        iniciarNivel();
    }

});