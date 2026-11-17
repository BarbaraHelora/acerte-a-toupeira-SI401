<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

require 'conexao.php';

if (!isset($_SESSION['id_usu'])) {
    echo "<script> 
            alert('Você precisa estar logado para acessar esta página.');
            window.location.href = 'login.php';
        </script>";
    exit;
}
?>