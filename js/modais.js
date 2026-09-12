const botaoJogar = document.getElementById('abrir-modal');
const modal = document.getElementById('modal-config');
const botaoFechar = document.getElementById('fechar-modal');

botaoJogar.addEventListener('click', function(event) {
    event.preventDefault();
    modal.showModal();
});

botaoFechar.addEventListener('click', function() {
    modal.close();
});