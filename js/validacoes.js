function validarCadastro() {
    let nome = document.getElementById("nome").value.trim();
    if (nome.length < 3) {
        alert("Por favor, digite um nome completo válido.");
        return false;
    }

    // == Verifica se o CPF tem 11 dígitos, sem espaços, pontos e hifen
    let cpf = document.getElementById("cpf").value.replace(/\D/g, ""); // remove caracteres não numéricos
    if (cpf.length !== 11) {
        alert("Por favor, digite um CPF válido com 11 dígitos.");
        return false;
    }

    if (!validarCPF(cpf)) { // validação do CPF de acordo com digitos verificadores 
        alert("Por favor, digite um CPF válido.");
        return false;
    }
    
    // == Verifica se o nome de usuário tem pelo menos 3 caracteres, sem espaços no início ou no final
    let usuario = document.getElementById("usuario").value.trim();
    if (usuario.length < 3) {
        alert("Por favor, o nome de usuario deve ter no mínimo 3 caracteres.");
        return false;
    }

    // == Verifica se a senha tem pelo menos 6 caracteres, com um número e caractere especial
    let senha = document.getElementById("senha").value;
    if (senha.length < 6) { 
        alert("Por segurança, a senha deve ter no mínimo 6 caracteres.");   
        return false;
    }

    let temNumero = /[0-9]/.test(senha);
    let temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (!temNumero || !temEspecial) {
        alert("A senha deve conter pelo menos um número e um caractere especial.");
        return false;
    }

    // == Verifica se o telefone tem 9 dígitos (celular)
    let telefone = document.getElementById("telefone").value.replace(/\D/g,""); // remove caracteres não numéricos
    if(telefone.length != 11) {
        alert("Por favor, digite um celular válido com o DDD.");
        return false;
    }

    // == Verifica se o email segue formato correto
    let email = document.getElementById("email").value;
    if(!email.includes("@")) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return false;
    }

    alert("Cadastro realizado com sucesso!");
    return true;
}

function validarEdicao() {
    // Ainda não há o back-end para recuperar o banco de dados, mas a ideia é que não possa ficar vazio 
    let nome = document.getElementById("nome").value.trim();
    if (nome.length < 3) {
        alert("Por favor, digite um nome completo válido.");
        return false;
    }

    // A senha não vem preenchida da recupração do baco de dados. Caso o usuário não digite nada, a senha não é alterada.
    let senha = document.getElementById("senha").value;

    if (senha != "") { // caso o usuário quiser mudar de senha, digita na label 
        if (senha.length < 6) { 
            alert("Por segurança, a nova senha deve ter no mínimo 6 caracteres.");   
            return false;
        }

        let temNumero = /[0-9]/.test(senha);
        let temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        if (!temNumero || !temEspecial) {
            alert("Por segurança, a nova senha deve conter pelo menos um número e um caractere especial.");
            return false;
        }
    }

    // Ainda não há o back-end para recuperar o banco de dados, mas a ideia é que não possa ficar vazio 
    let telefone = document.getElementById("telefone").value.replace(/\D/g,""); // remove caracteres não numéricos
    if(telefone.length != 11) {
        alert("Por favor, digite um celular válido com o DDD.");
        return false;
    }

    // Ainda não há o back-end para recuperar o banco de dados, mas a ideia é que não possa ficar vazio 
    let email = document.getElementById("email").value;
    if(!email.includes("@")) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return false;
    }

    alert("Perfil atualizado com sucesso!");
    return true;
}

// == Função de validação do CPF de acordo com dígitos verificadores
function validarCPF(cpf) {
    if (/^(.)\1+$/.test(cpf)) { // inválido se for 11111111111, 22222222222, etc.
        return false; 
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.charAt(10))) return false;

    return true; // Se passar por tudo, o CPF existe matematicamente
}