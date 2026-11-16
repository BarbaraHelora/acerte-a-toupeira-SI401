<?php
    require 'conexao.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $usuario = $_POST['usuario'];
        $senha = $_POST['senha'];

        try {
            $sql = "SELECT * FROM Usuario WHERE usuario = '$usuario'";
            $stmt = $conn->query($sql);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row && $row['senha'] === $senha) {
                $_SESSION['id_usu'] = $row['id_usu'];
                $_SESSION['usuario'] = $row['usuario'];

                header("Location: ../telaprincipal.php");
                exit;
            } else {
                echo "<script>
                        alert('Usuário ou senha incorretos!');
                        window.location.href = '../login.php';
                      </script>";
                exit;
            }
        } catch (PDOException $e) {
            echo "Ocorreu um erro: " . $e->getMessage();
        }
    }
?>
