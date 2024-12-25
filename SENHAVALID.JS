function validarFormulario(event) {
    // Impedir o envio padrão do formulário
    event.preventDefault();

    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const email = document.getElementById('email').value;

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Tente novamente!');
        return false;
    }

    // Validar senha com regex (garantir requisitos mínimos)
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(senha)) {
        alert('A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.');
        return false;
    }

    // Dados para envio via AJAX
    const dados = { email: email, senha: senha };

    // Fazer requisição POST para o servidor
    fetch('http://localhost:3000/senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(data => {
            // Exibir mensagem de sucesso ou erro
            alert(data.message || 'Senha alterada com sucesso!');
            
            // Verificar se a alteração foi bem-sucedida e redirecionar para a página de login
            if (data.message === 'Senha alterada com sucesso!') {
                // Redireciona para a página de login (LOGIN maiúsculo)
                window.location.href = 'login.html';  // Redirecionamento relativo para o arquivo 'login.html'
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um erro ao alterar a senha.');
        });

    return true;
}
