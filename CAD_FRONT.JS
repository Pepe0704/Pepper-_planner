document.getElementById("cadastro").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio automático do formulário

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]'); // Obtém o botão de submit
    submitButton.disabled = true;  // Desabilita o botão de submit enquanto o formulário é enviado

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();
    const dataNascimento = form.data_nascimento.value.trim();
    const genero = form.genero.value;
    const senha = form.senha.value;

    const erros = [];

    // Validação de campos aqui ...

    if (erros.length > 0) {
        exibirErros(erros);
        submitButton.disabled = false;  // Reabilita o botão se houver erros
    } else {
        try {
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

            if (!resposta.ok) {
                throw new Error(data.message || "Erro desconhecido");
            }

            // Exibe a mensagem de sucesso
            alert(data.message);
            window.location.href = 'LOGIN.html';  // Redireciona para a página de login

        } catch (erro) {
            console.error("Erro na requisição:", erro.message);
            alert("Erro ao realizar o cadastro. Tente novamente.");
        } finally {
            submitButton.disabled = false;  // Reabilita o botão de submit após a requisição
        }
    }
});
