document.addEventListener('DOMContentLoaded', () => {

    const lista = document.getElementById('lista-partidas');
    
    function formatarData(dataSql) {
    if (!dataSql) return '--/--/----';
    const [dia] = dataSql.split(' ');
    const [a, m, d] = dia.split('-');
    return `${d}/${m}/${a}`;
}
    
    function mostrarDetalhes(p) {
        document.getElementById('det-usuario').innerText = p.usuario;
        document.getElementById('det-tabuleiro').innerText = p.dim_tabuleiro;
        document.getElementById('det-modalidade').innerText = p.modalidade;
        document.getElementById('det-pontuacao').innerText = p.pontuacao;
        document.getElementById('det-nivel').innerText = p.nivel;
        document.getElementById('det-data').innerText = formatarData(p.data);
    }

    fetch('banco/historico.php')
        .then(resp => resp.json())
        .then(partidas => {
            if (partidas.length === 0) {
                lista.innerHTML = '<li>Nenhuma partida ainda.</li>';
                return;
            }

            partidas.forEach((p, i) => {
                const li = document.createElement('li');
                li.className = 'partida';
                li.innerText = `${p.dim_tabuleiro} - ${p.modalidade}`;

                li.addEventListener('click', () => {
                    document.querySelectorAll('.partida.ativa')
                        .forEach(el => el.classList.remove('ativa'));
                    li.classList.add('ativa');
                    mostrarDetalhes(p);
                });

                lista.appendChild(li);
                if (i === 0) li.click(); // já abre a mais recente
            });
        })
        .catch(erro => console.error('Erro ao carregar histórico:', erro));
});