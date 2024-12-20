document.getElementById("cadastro").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio automático do formulário

    const form = event.target;

    // Capturando os dados do formulário
    const dados = {
        nome: form.nome.value.trim(),
        telefone: form.telefone.value.trim(),
        email: form.email.value.trim(),
        data_nascimento: form.data_nascimento.value.trim(),
        genero: form.genero.value,
        senha: form.senha.value,
    };

    // Validação (chamada da função do exemplo anterior)
    const erros = validarFormulario(dados);
    if (erros.length > 0) {
        exibirErros(erros);
        return;
    }

    // Enviando os dados ao servidor (requisição POST)
    try {
        const resposta = await fetch("http://localhost:3000/cadastrar", {
            method: "POST", // Método HTTP
            headers: {
                "Content-Type": "application/json", // Tipo de dado enviado
            },
            body: JSON.stringify(dados), // Converte os dados para JSON
        });

        if (!resposta.ok) {
            throw new Error("Erro ao enviar os dados: " + resposta.statusText);
        }

        const resultado = await resposta.json(); // Converte a resposta do servidor para JSON

        // Exibe mensagem de sucesso ou faz algo com o resultado
        alert("Cadastro realizado com sucesso!");
        console.log("Resposta do servidor:", resultado);

        // Reseta o formulário após o sucesso
        form.reset();
    } catch (erro) {
        // Trata erros de requisição
        console.error("Erro na requisição:", erro.message);
        alert("Houve um problema ao cadastrar. Tente novamente.");
    }
});

// Função de validação (mantida do exemplo anterior)
function validarFormulario(dados) {
    const erros = [];

    if (dados.nome.length < 3) {
        erros.push("O nome deve ter pelo menos 3 caracteres.");
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(dados.telefone)) {
        erros.push("O telefone deve estar no formato (XX) XXXXX-XXXX.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email)) {
        erros.push("Por favor, insira um e-mail válido.");
    }

    const hoje = new Date();
    const dataNascimento = new Date(dados.data_nascimento);
    if (dataNascimento > hoje) {
        erros.push("A data de nascimento não pode ser futura.");
    }

    if (dados.genero === "Selecionar") {
        erros.push("Por favor, selecione um gênero.");
    }

    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(dados.senha)) {
        erros.push(
            "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial (@$!%*?&)."
        );
    }

    return erros;
}

// Função de exibição de erros (mantida do exemplo anterior)
function exibirErros(erros) {
    const listaErros = document.createElement("ul");
    listaErros.style.color = "red";

    erros.forEach((erro) => {
        const item = document.createElement("li");
        item.textContent = erro;
        listaErros.appendChild(item);
    });

    const form = document.getElementById("cadastro");
    const mensagensErro = document.getElementById("mensagens-erro");

    if (mensagensErro) {
        mensagensErro.innerHTML = ""; // Limpa mensagens anteriores
        mensagensErro.appendChild(listaErros);
    } else {
        const divErros = document.createElement("div");
        divErros.id = "mensagens-erro";
        divErros.appendChild(listaErros);
        form.prepend(divErros); // Adiciona as mensagens no topo do formulário
    }
}
