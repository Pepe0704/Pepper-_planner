document.getElementById("/cadastro").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const form = event.target;
    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();
    const dataNascimento = form.data_nascimento.value.trim();
    const genero = form.genero.value;
    const senha = form.senha.value;

    const erros = [];

    
    if (nome.length < 3) {
        erros.push("O nome deve ter pelo menos 3 caracteres.");
    }

    
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        erros.push("O telefone deve estar no formato (XX) XXXXX-XXXX.");
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erros.push("Por favor, insira um e-mail válido.");
    }

    
    if (!isDataNascimentoValida(dataNascimento)) {
        erros.push("A data de nascimento não pode ser futura ou inválida.");
    }

  
    if (genero === "Selecionar") {
        erros.push("Por favor, selecione um gênero.");
    }

    
    const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
        erros.push(
            "A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial (@$!%*?&)."
        );
    }

    
    if (erros.length > 0) {
        exibirErros(erros);
    } else {
        alert("Formulário enviado com sucesso!");
        form.submit(); // Envia o formulário
    }
});


function isDataNascimentoValida(data) {
    const hoje = new Date();
    const dataNascimento = new Date(data);

    return dataNascimento <= hoje; 
}

//Função para exibir erros na interface// 

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
        mensagensErro.innerHTML = ""; 
        mensagensErro.appendChild(listaErros);
    } else {
        const divErros = document.createElement("div");
        divErros.id = "mensagens-erro";
        divErros.appendChild(listaErros);
        form.prepend(divErros); 
}
}