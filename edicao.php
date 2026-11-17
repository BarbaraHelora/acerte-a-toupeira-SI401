<?php 
    require 'banco/verificaSessao.php'; 

    $id_usu = $_SESSION['id_usu'];
    $stmt = $conn->query("SELECT * FROM Usuario WHERE id_usu = $id_usu");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
    <html lang="pt">
        <head>
            <title>Whack a Cato - Edição</title>
            <link rel="icon" href="img/Gato_Usu_RS.png">
            <link rel="stylesheet" href="css/basico.css">
            <link rel="stylesheet" href="css/edicao.css">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta charset="UTF-8">
        </head>

        <body>
            <header>
                <hr>
            </header>

            <div class="meio">
                <a class="botao-voltar" href="telaprincipal.html">
                    <img src="img/Botão_Voltar_Marrom_RS.png" alt="Voltar">
                </a>

                <form name="formEdicao" action="banco/editarUsuario.php" onsubmit="return validarEdicao()" method="POST">
                    <div class="topo-edicao">
                        <div class="imagem-gato">
                            <img src="img/Gato_Usu_RS.png" alt="Gato">
                        </div>

                        <div class="campos-superiores">
                            <h1>Editar Perfil</h1>

                            <label for="nome">Nome Completo</label>
                            <input type="text" id="nome" name="nome" value="<?php echo $row['nome']; ?>" required>

                            <label for="dataNascimento">Data de Nascimento</label>
                            <input type="date" id="dataNascimento" name="dataNascimento" value="<?php echo $row['dataNascimento']; ?>" readonly>

                            <label for="cpf">CPF</label>
                            <input type="text" id="cpf" name="cpf" maxlength="14" value="<?php echo $row['cpf']; ?>" readonly>
                        </div>
                    </div>

                    <div class="base-edicao">
                        <div class="coluna-esquerda">
                            <label for="usuario">Nome de Usuário</label>
                            <input type="text" id="usuario" name="usuario" value="<?php echo $row['usuario']; ?>" readonly>

                            <label for="senha">Senha</label>
                            <input type="password" id="senha" name="senha" placeholder="Nova senha (opcional)">
                        </div>

                        <div class="coluna-direita">
                            <label for="telefone">Telefone</label>
                            <input type="tel" id="telefone" name="telefone" maxlength="15" value="<?php echo $row['telefone']; ?>" required>

                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" value="<?php echo $row['email']; ?>" required>
                        </div>
                    </div>

                    <input type="submit" class="botao-editar" value="Salvar">
                </form>    
            </div>

            <footer>
                <hr>
            </footer>

            <script src="js/validacoes.js"></script>

        </body>

    </html>