<?php
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    session_unset();   // Limpa todas as variáveis da sessão (ex: $_SESSION['id_usu'])
    session_destroy(); // Destrói a sessão no servidor

    // Redireciona o usuário para a tela de login
    header("Location: ../login.php");
    exit;
?>