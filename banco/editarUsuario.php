<?php 
    require 'verificaSessao.php';

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $id_usu = $_SESSION['id_usu'];
        $nome = htmlspecialchars($_POST['nome']);
        $senha = $_POST['senha'];
        $telefone = htmlspecialchars($_POST['telefone']);
        $email = htmlspecialchars($_POST['email']);

        try {
            // Verificação se o telefone já é cadastrado por outro usuário
            $sqlTelefone = "SELECT id_usu FROM Usuario WHERE telefone = '$telefone' AND id_usu != '$id_usu'";
            $stmt = $conn->query($sqlTelefone);
            if ($stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<script>
                        alert('Número de telefone já em uso!');
                        window.location.href = '../edicao.php';
                      </script>";
                exit;
            }    

            // Verificação se o email já é cadastrado por outro usuário
            $sqlEmail = "SELECT id_usu FROM Usuario WHERE email = '$email' AND id_usu != '$id_usu'";
            $stmt = $conn->query($sqlEmail);
            if ($stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<script>
                        alert('E-mail já em uso!');
                        window.location.href = '../edicao.php';
                      </script>";
                exit;
            }

            // Atualização dos dados do usuário no banco de dados
            if(!empty($senha)) { 
                // Atualiza a senha se o campo não estiver vazio
                $sqlUpdate = "UPDATE Usuario SET 
                                nome = '$nome', 
                                telefone = '$telefone', 
                                email = '$email', 
                                senha = '$senha' 
                            WHERE id_usu = '$id_usu'";
            } else {
                // Não atualiza a senha se o campo estiver vazio
                $sqlUpdate = "UPDATE Usuario SET 
                                nome = '$nome', 
                                telefone = '$telefone', 
                                email = '$email' 
                            WHERE id_usu = '$id_usu'";
            }
                
            $conn->exec($sqlUpdate);
            $conn = null;

            echo "<script>
                    alert('Perfil atualizado com sucesso!');
                    window.location.href = '../telaprincipal.php';
                  </script>";
            exit;

        } catch (PDOException $e) {
            echo "Ocorreu um erro: " . $e->getMessage();
        }
    }
?>