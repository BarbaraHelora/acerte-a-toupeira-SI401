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

    //2. Buscar o histórico do usuário
    if ($acao == "historico") {

        $stmt = $conn->prepare(
            "SELECT p.id_partida, p.dim_tabuleiro, p.modalidade, p.pontuacao,
                    p.nivel, p.data, u.username
            FROM partida p
            JOIN usuario u ON u.id_usu = p.id_usu
            WHERE p.id_usu = :id
            ORDER BY p.data DESC"
        );
        $stmt->execute([':id' => $id_usu]);

        $partidas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($partidas);
        exit;
    }
} catch (PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
?>