<?php 
    require 'conexao.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $nome = htmlspecialchars($_POST['nome']);
        $dataNascimento = htmlspecialchars($_POST['dataNascimento']);
        $cpf = htmlspecialchars($_POST['cpf']);
        $telefone = htmlspecialchars($_POST['telefone']);
        $email = htmlspecialchars($_POST['email']);        
        $senha = $_POST['senha'];
        $usuario = htmlspecialchars($_POST['usuario']);

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

            /* Geralmente é comum verificar se o telefone e o email já estão cadastrados, mas não foi solicitado.. 
            Deixei comentado aqui para vermos como vamos fazer 

            // Verificação se o telefone já é cadastrado por outro usuário
            $sqlTelefone = "SELECT id_usu FROM Usuario WHERE telefone = '$telefone'";
            $stmtTelefone = $conn->query($sqlTelefone);
            if ($stmtTelefone->fetch(PDO::FETCH_ASSOC)) {
                echo "<script>
                        alert('Número de telefone já cadastrado!');
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

            **** Final do comentário */

            // Verificação se o Nome de Usuário já é cadastrado
            $sqlUsuario = "SELECT id_usu FROM Usuario WHERE usuario = '$usuario'";
            $stmtUsuario = $conn->query($sqlUsuario);
            if ($stmtUsuario->fetch(PDO::FETCH_ASSOC)) {
                echo "<script>
                        alert('Nome de usuário já cadastrado! Selecione outro.');
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