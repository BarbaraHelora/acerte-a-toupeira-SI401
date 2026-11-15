<?php 
    require 'conexao.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $nome = htmlspecialchars($_POST['nome']);
        $dataNascimento = htmlspecialchars($_POST['dataNascimento']);
        $cpf = htmlspecialchars($_POST['cpf']);
        $usuario = htmlspecialchars($_POST['usuario']);
        $senha = $_POST['senha'];
        $telefone = htmlspecialchars($_POST['telefone']);
        $email = htmlspecialchars($_POST['email']);

        try {
            // Verificação se o CPF já é cadastrado
            $sqlCpf = "SELECT id_usu FROM Usuario WHERE cpf = '$cpf'";
            $stmtCpf = $conn->query($sqlCpf);
            if ($stmtCpf->fetch(PDO::FETCH_ASSOC)) {
                echo "<script>
                        alert('CPF já cadastrado!');
                        window.location.href = '../cadastro.php';
                      </script>";
                exit;
            }

            // Verificação se o E-mail já é cadastrado
            $sqlEmail = "SELECT id_usu FROM Usuario WHERE email = '$email'";
            $stmtEmail = $conn->query($sqlEmail);
            if ($stmtEmail->fetch(PDO::FETCH_ASSOC)) {
                echo "<script>
                        alert('E-mail já cadastrado!');
                        window.location.href = '../cadastro.php';
                      </script>";
                exit;
            }

            // Verificação se o Nome de Usuário já é cadastrado
            $sqlUsuario = "SELECT id_usu FROM Usuario WHERE usuario = '$usuario'";
            $stmtUsuario = $conn->query($sqlUsuario);
            if ($stmtUsuario->fetch(PDO::FETCH_ASSOC)) {
                echo "<script>
                        alert('Nome de usuário já em uso! Selecione outro.');
                        window.location.href = '../cadastro.php';
                      </script>";
                exit;
            }

            // Após verificações, inserção do novo usuário no banco de dados
            $sqlInsert = "INSERT INTO Usuario (nome, dataNascimento, cpf, telefone, email, senha, usuario) 
                          VALUES ('$nome', '$dataNascimento', '$cpf', '$telefone', '$email', '$senha', '$usuario')";
            
            $conn->exec($sqlInsert);
            $conn = null;

            echo "<script>
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = '../login.php';
                  </script>";
            exit;

        } catch (PDOException $e) {
            echo "Ocorreu um erro: " . $e->getMessage();
        }
    }
?>