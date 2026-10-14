document.addEventListener('DOMContentLoaded', () => {

    function configurarModal(idBotaoAbrir, idModal, idBotaoFechar) {
        const botaoAbrir = document.getElementById(idBotaoAbrir);
        const modal = document.getElementById(idModal);
        const botaoFechar = document.getElementById(idBotaoFechar);

        // Só adiciona o evento de abrir se o botão e o modal existirem na página atual
        if (botaoAbrir && modal) {
            botaoAbrir.addEventListener('click', (event) => {
                event.preventDefault();
                modal.showModal();
            });
        }

        // Só adiciona o evento de fechar se o botão de fechar e o modal existirem
        if (botaoFechar && modal) {
            botaoFechar.addEventListener('click', () => {
                modal.close();
            });
        }
    }

    // Registra os modais do jogo, pq se a página não tiver algum deles o script vai ignorar 
    configurarModal('abrir-modal-config', 'modal-config', 'fechar-modal');
    configurarModal('abrir-modal-ganhar', 'modal-ganhar', 'fechar-ganhar');
    configurarModal('abrir-modal-perder', 'modal-perder', 'fechar-perder');

});