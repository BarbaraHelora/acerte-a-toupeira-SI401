<?php require 'banco/verificaSessao.php'; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="img/Gato_Usu_RS.png">
    <link rel="stylesheet" href="css/basico.css">
    <link rel="stylesheet" href="css/ranking.css">
    <title>Whack a Cato - Ranking</title>
</head>
<?php
require_once './banco/conexao.php';

$stmt = $conn->prepare(
    "SELECT p.dim_tabuleiro, p.modalidade, p.pontuacao,
                    p.nivel, u.usuario
            FROM partida p
            INNER JOIN usuario u ON u.id_usu = p.id_usu
            ORDER BY p.pontuacao DESC
            LIMIT 5"
);
$stmt->execute();
$lista_usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<body>
    <header>
        <hr>
    </header>

    <section class="tela-meio">
        <div class="tela-header">
            <div class="botao-voltar">
                <a href="telaprincipal.php">
                    <img src="img/Botão_Voltar_Verde_RS.png" alt="botao-voltar">
                </a>
            </div>

            <div class="title-ranking">
                <div class="estrela">
                    <img src="img/Estrela_RS.png" alt="estrela">
                </div>

                <div class="title">
                    <h1>Ranking</h1>
                </div>

                <div class="estrela">
                    <img src="img/Estrela_RS.png" alt="estrela">
                </div>
            </div>
        </div>

        <div class="titles">
            <h2>Tabuleiro</h2>
            <h2>Modalidade</h2>
            <h2>Pontuação</h2>
            <h2>Nível</h2>
        </div>
        <?php
        echo "<div class='cards-ranking'>";
        echo "<div class='cards'>";
        $cont = 1;
        foreach ($lista_usuarios as $usuario) {
            echo "<div class='card'>";
            echo "<h3 class='posicao'>" . $cont . "°</h3>";
            echo "<h3 class='usuario'>" . $usuario['usuario'] . "</h3>";
            echo "<div class='especificacoes'>";
            echo "<h3 class='tabuleiro'>" . $usuario['dim_tabuleiro'] . "</h3>";
            echo "<h3 class='modalidade'>" . $usuario['modalidade'] . "</h3>";
            echo "<h3 class='pontuacao'>" . $usuario['pontuacao'] . "</h3>";
            echo "<h3 class='nivel'>" . $usuario['nivel'] . "</h3>";
            $cont++;
            echo "</div>";
            echo "</div>";
        }

        echo "</div>";
        echo "</div>";
        ?>
        </div>
        </div>
    </section>

    <footer>
        <hr>
    </footer>
</body>

</html>