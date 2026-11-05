<?php
$host = 'localhost';
$user = 'root';
$senha = '';
$dbname = 'whackacato';

try {
    $conn = new PDO("mysql:host=$host;", $user, $senha);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlBD = "CREATE DATABASE IF NOT EXISTS $dbname";
    $conn->exec($sqlBD);
    echo "Banco de dados criado com sucesso!! <br>";

    $conn->exec("USE $dbname");

    $sql = "CREATE TABLE IF NOT EXISTS Usuario (
                            id_usu INTEGER AUTO_INCREMENT PRIMARY KEY,
                            nome CHAR(50),
                            data_nascimento DATE,
                            cpf CHAR(15),
                            telefone CHAR(15),
                            email CHAR(50),
                            senha CHAR(50),
                            username CHAR(20),
                            UNIQUE (cpf, email, username)
                        );

                        CREATE TABLE IF NOT EXISTS Partida (
                            id_partida INTEGER AUTO_INCREMENT PRIMARY KEY,
                            dim_tabuleiro CHAR(5),
                            modalidade CHAR(15),
                            pontuacao INTEGER,
                            nivel INTEGER,
                            fk_Usuario_id_usu INTEGER
                        );
                        
                        ALTER TABLE Partida ADD CONSTRAINT FK_Partida_2
                            FOREIGN KEY (fk_Usuario_id_usu)
                            REFERENCES Usuario (id_usu)
                            ON DELETE CASCADE;";

    $conn->exec($sql);
    echo "Tabelas criadas com sucesso!!";

} catch (PDOException $e) {
    echo "Erro ao criar tabelas: " . $e->getMessage();
}
?>