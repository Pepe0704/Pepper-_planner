// CAD_FRONT.JS

// Ao submeter o formulário de cadastro
document.getElementById("cadastro").addEventListener("submit", async function (event) {
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

    // Exibe erros ou envia os dados
    if (erros.length > 0) {
        exibirErros(erros);
    } else {
        try {
            // Envia os dados para o backend via POST
            const resposta = await fetch("http://localhost:3000/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    telefone,
                    email,
                    data_nascimento: dataNascimento,
                    genero,
                    senha,
                }),
            });

            const data = await resposta.json();

            // Se a resposta não for OK, lança um erro
            if (!resposta.ok) {
                throw new Error(data.message || "Erro desconhecido");
            }

            // Exibe a mensagem de sucesso
            alert(data.message);  // Exibe a mensagem de sucesso vinda do backend

            // Limpar mensagens de erro, caso existam
            const mensagensErro = document.getElementById("mensagens-erro");
            if (mensagensErro) {
                mensagensErro.remove(); // Remove as mensagens de erro do DOM
            }

            // Redireciona para a página de login após o sucesso
            window.location.href = "/LOGIN.html";  // Redireciona para a página de login

        } catch (erro) {
            console.error("Erro na requisição:", erro.message);
            alert("Erro ao realizar o cadastro. Tente novamente.");
        }
    }
});

// Função para validar a data de nascimento (não pode ser futura)
function isDataNascimentoValida(data) {
    const hoje = new Date();
    const dataNascimento = new Date(data);
    return dataNascimento <= hoje; // Data deve ser igual ou anterior a hoje
}

// Função para exibir erros na interface
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

    // Verifica se já existe uma div para mensagens de erro
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
