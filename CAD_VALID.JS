// Função que será chamada quando o formulário for submetido
document.getElementById("cadastro").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio automático do formulário

    const form = event.target;
    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();
    const dataNascimento = form.data_nascimento.value.trim();
    const genero = form.genero.value;
    const senha = form.senha.value;

    const erros = [];

    // Validação do nome (mínimo 3 caracteres)
    if (nome.length < 3) {
        erros.push("O nome deve ter pelo menos 3 caracteres.");
    }

    // Validação do telefone
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        erros.push("O telefone deve estar no formato (XX) XXXXX-XXXX.");
    }

    // Validação do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erros.push("Por favor, insira um e-mail válido.");
    }

    // Validação da data de nascimento (não pode ser futura)
    if (!isDataNascimentoValida(dataNascimento)) {
        erros.push("A data de nascimento não pode ser futura ou inválida.");
    }

    // Validação do gênero
    if (genero === "Selecionar") {
        erros.push("Por favor, selecione um gênero.");
    }

    // Validação da senha
    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
        erros.push(
            "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial (@$!%*?&)."
        );
    }

    // Exibe erros ou avisa que está tudo certo
    if (erros.length > 0) {
        exibirErros(erros);
        
        // Aguardar um pouco antes de redirecionar para permitir que o usuário veja a mensagem
        setTimeout(() => {
            window.location.href = "LOGIN.html";  // Substitua "LOGIN.html" pelo caminho correto da sua página de login
        }, 2000);  // Aguarda 2 segundos antes de redirecionar
    }
});

// Função para validar a data de nascimento
function isDataNascimentoValida(data) {
    const hoje = new Date();
    const dataNascimento = new Date(data);
    return dataNascimento <= hoje; // Data deve ser igual ou anterior a hoje
}

// Função para exibir erros na interface
function exibirErros(erros) {
    // Cria um elemento <ul> para exibir os erros
    const listaErros = document.createElement("ul");
    listaErros.style.color = "red";

    // Adiciona cada erro na lista
    erros.forEach((erro) => {
        const item = document.createElement("li");
        item.textContent = erro;
        listaErros.appendChild(item);
    });

    // Encontra o formulário para colocar as mensagens de erro
    const form = document.getElementById("cadastro");
    const mensagensErro = document.getElementById("mensagens-erro");

    // Se já houver mensagens de erro, limpa antes de adicionar novas
    if (mensagensErro) {
        mensagensErro.innerHTML = ""; // Limpa mensagens anteriores
        mensagensErro.appendChild(listaErros);
    } else {
        // Cria a div que contém os erros e insere na parte superior do formulário
        const divErros = document.createElement("div");
        divErros.id = "mensagens-erro";
        divErros.appendChild(listaErros);
        form.prepend(divErros); // Adiciona as mensagens de erro no topo
    }
}
