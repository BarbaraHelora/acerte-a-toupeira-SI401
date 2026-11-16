<?php
    require 'conexao.php';

    if (!isset($_SESSION['id_usu'])) {
        echo "<script> 
            alert('Você precisa estar logado para acessar esta página.');
            window.location.href = 'login.php';
        </script>";
        exit;
    }
?>