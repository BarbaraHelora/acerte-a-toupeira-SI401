<?php
require 'verificaSessao.php';

$id_usu = $_SESSION['id_usu'];

try {
    $sql = "SELECT p.id_partida, p.dim_tabuleiro, p.modalidade, p.pontuacao, 
                   p.nivel, p.data, u.usuario
            FROM partida p
            JOIN usuario u ON u.id_usu = p.id_usu
            WHERE p.id_usu = $id_usu
            ORDER BY p.id_partida DESC";

    $resultado = $conn->query($sql);
    $partidas = $resultado->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($partidas);

} catch (PDOException $e) {
    echo "Ocorreu um erro: " . $e->getMessage();
}
?>