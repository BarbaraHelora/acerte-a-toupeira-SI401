<?php 
    $sname = "localhost";
    $uname = "root";
    $pwd = "";
    $dbname = "whackacato";

    try {
        $conn = new PDO("mysql:host=$sname;dbname=$dbname", $uname, $pwd);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Ocorreu um erro na conexão com o banco de dados: " . $e->getMessage();
    }

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
?>