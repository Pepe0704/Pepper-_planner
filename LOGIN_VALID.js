document.querySelector('#login').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.querySelector('#email').value;  // Obtém o valor do email
    const senha = document.querySelector('#senha').value;  // Obtém o valor da senha

    try {
        // Envia a requisição para o backend
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
        });

        if (response.ok) {
            const data = await response.json(); // Recebe a resposta com o token
            alert('Login bem-sucedido');  // Exibe o alerta de sucesso
            console.log(data);  // Exibe os dados no console, você pode armazenar o token ou redirecionar o usuário
        } else {
            const error = await response.json();  // Captura a mensagem de erro
            if (error.message === "Cadastro não encontrado") {
                alert("Cadastro não encontrado. Verifique seu e-mail e senha."); // Alerta caso não encontre o
