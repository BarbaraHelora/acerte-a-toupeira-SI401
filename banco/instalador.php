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
                            dataNascimento DATE,
                            cpf CHAR(15),
                            telefone CHAR(15),
                            email CHAR(50),
                            senha CHAR(50),
                            usuario CHAR(20),
                            UNIQUE (cpf, email, usuario)
                        );

                        CREATE TABLE IF NOT EXISTS Partida (
                            id_partida INTEGER AUTO_INCREMENT PRIMARY KEY,
                            dim_tabuleiro CHAR(5),
                            modalidade CHAR(15),
                            pontuacao INTEGER,
                            nivel INTEGER,
                            data DATE,
                            id_usu INTEGER
                        );
                        
                        ALTER TABLE Partida ADD CONSTRAINT FK_Partida_2
                            FOREIGN KEY (id_usu)
                            REFERENCES Usuario (id_usu)
                            ON DELETE CASCADE;";

    $conn->exec($sql);
    echo "Tabelas criadas com sucesso!! <br>";

    // Verifica se já existem usuários para não duplicar caso o instalador seja rodado novamente
    $stmt = $conn->query("SELECT COUNT(*) FROM Usuario");
    if ($stmt->fetchColumn() == 0) {
        $sqlSeedUsuarios = "INSERT INTO Usuario (nome, dataNascimento, cpf, telefone, email, senha, usuario) VALUES
            ('Maria Silva', '2004-05-12', '529.982.247-25', '(19) 99123-4567', 'maria@email.com', 'Gato@123', 'Maria123'),
            ('Ana Clara Souza', '2005-08-20', '111.444.777-35', '(19) 99234-5678', 'ana@email.com', 'Gato@123', 'AnaClara2'),
            ('João Vitor Lima', '2003-11-03', '123.456.789-09', '(19) 99345-6789', 'joao@email.com', 'Gato@123', 'Joao_Vitor2'),
            ('Melissa Costa', '2006-02-15', '390.533.447-05', '(19) 99456-7890', 'mel@email.com', 'Gato@123', 'Mel1515'),
            ('Sarah Oliveira', '2004-09-28', '705.484.450-52', '(19) 99567-8901', 'sarah@email.com', 'Gato@123', 'S4r4h_')";
        $conn->exec($sqlSeedUsuarios);

        $sqlSeedPartidas = "INSERT INTO Partida (dim_tabuleiro, modalidade, pontuacao, nivel, data, id_usu) VALUES
            ('4x4', 'Explosivo', 65, 2, '2026-11-10', 1),
            ('3x3', 'Clássico', 650, 10, '2026-11-12', 1),
            ('4x4', 'Clássico', 350, 5, '2026-11-13', 2),
            ('3x3', 'Clássico', 140, 2, '2026-11-14', 3),
            ('4x4', 'Explosivo', 225, 6, '2026-11-15', 4),
            ('2x2', 'Clássico', 580, 8, '2026-11-16', 5)";
        $conn->exec($sqlSeedPartidas);

        echo "Dados iniciais inseridos com sucesso!!";
    }

} catch (PDOException $e) {
    echo "Erro ao criar tabelas: " . $e->getMessage();
}
?>