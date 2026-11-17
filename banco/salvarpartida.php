<?php
require 'verificaSessao.php';

$id_usu = $_SESSION['id_usu'];
$dim_tabuleiro = $_POST['dim_tabuleiro'];
$modalidade = $_POST['modalidade'];
$nivel = $_POST['nivel'];
$pontuacao = $_POST['pontuacao'];
$destino = $_POST['destino'];

try {
    $sql = "INSERT INTO partida (id_usu, dim_tabuleiro, modalidade, nivel, pontuacao, data) VALUES (
                $id_usu,
                '$dim_tabuleiro',
                '$modalidade',
                $nivel,
                $pontuacao,
                CURDATE()
            )";

    $conn->exec($sql);

    if ($destino == "denovo") {
        header("Location: ../jogo.php");
    } else {
        header("Location: ../telaprincipal.php");
    }
    exit;

} catch (PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
?>