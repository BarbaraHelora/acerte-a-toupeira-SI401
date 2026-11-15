<?php
session_start();

$id_usu = 1; // substituir por $_SESSION['id_usu'] depois

$host = 'localhost';
$user = 'root';
$senha = '';
$dbname = 'whackacato';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $senha);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT p.id_partida, p.dim_tabuleiro, p.modalidade, p.pontuacao, 
                   p.nivel, p.data, u.usuario
            FROM partida p
            JOIN usuario u ON u.id_usu = p.id_usu
            WHERE p.id_usu = $id_usu
            ORDER BY p.data DESC";

    $resultado = $conn->query($sql);
    $partidas = $resultado->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($partidas);

} catch (PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
?>