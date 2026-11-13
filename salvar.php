<?php
session_start();

$id_usu = 1; // substituir pelo ID do usuário logado $_SESSION['id_usu'] depois @yuu
$acao = $_GET['acao'];

$host = 'localhost';
$user = 'root';
$senha = '';
$dbname = 'whackacato';

try {

    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $senha);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //1. Salvar a Partida
    if ($acao == "salvar") {
        $dim_tabuleiro = $_POST['dim_tabuleiro'];
        $modalidade = $_POST['modalidade'];
        $nivel = $_POST['nivel'];
        $pontuacao = $_POST['pontuacao'];
        $destino = $_POST['destino'];

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
            header("Location: jogo.html");
        } else {
            header("Location: telaprincipal.html");
        }
    }

} catch (PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
?>