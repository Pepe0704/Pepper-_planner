// Selecionar o formulário
const formulario = document.getElementById('senha');

// Adicionar evento de envio ao formulário
formulario.addEventListener('submit', async function (event) {
    event.preventDefault(); // Impedir o comportamento padrão

    // Obter valores do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    // Criar o objeto para enviar ao servidor
    const dados = {
        email: email,
        senha: senha
    };

    try {
        // Enviar dados ao servidor
        const response = await fetch('http://localhost:3000/senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        // Verificar se a resposta do servidor foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro no servidor');
        }

        // Exibir mensagem de sucesso
        const resultado = await response.json();
        alert(resultado.message || 'Senha alterada com sucesso!');
    } catch (error) {
        // Tratar erros e exibir mensagens
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});
