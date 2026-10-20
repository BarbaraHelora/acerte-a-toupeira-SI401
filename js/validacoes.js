function validarLogin() {
    let user = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    if (user === "" || senha === "") {
        alert("Por favor, preencha o Usuário e a Senha para entrar.");
        return false;
    }

    return true;
}

function validarCadastro() {
    let campos = ["nome", "data", "cpf", "usuario", "senha", "telefone", "email"];

    for (let i = 0; i < campos.length; i++) {
        let valor = document.getElementById(campos[i]).value;

        if (valor === "") {
            alert("Atenção: todos os campos do cadastro são obrigatórios."); // verificar se aqui seria ncessáio if por if d cada label 
            return false;
        }
    }

    // verificar necessidade de validação de CPF

    let senha = document.getElementById("senha").value;
    if (senha.length < 6) {
        alert("Por segurança, a senha deve ter no mínimo 6 caracteres."); // verificar se isso seria o mínimo de segurança necessário
        return false;
    }

    alert("Cadastro realizado com sucesso!");
    return true;
}


function validarEdicao() {
    let nome = document.getElementById("nome").value;
    let senha = document.getElementById("senha").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;

    if (senha.length < 6) {
        alert("Por segurança, a nova senha deve ter no mínimo 6 caracteres."); // verificar se isso seria o mínimo de segurança necessário
        return false;
    }

    if (email !== "" && !email.includes("@")) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return false;
    }

    // verificar necessidade de validação de telefone -- celular?

    alert("Perfil atualizado com sucesso!");
    return true;
}