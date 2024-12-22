function validarFormulario(event) {
    // Impedir o envio do formulário padrão
    event.preventDefault();

    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const email = document.getElementById('email').value;

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Tente novamente!');
        return false;
    }

    // Validar senha com regex (para garantir que atende aos requisitos mínimos)
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(senha)) {
        alert('A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.');
        return false;
    }

    // Enviar os dados para o servidor via AJAX
    const dados = {
        email: email,
        senha: senha
    };

    fetch('http://localhost:3000/senha', {  // Corrigido o caminho para incluir o domínio completo
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Senha alterada com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao alterar a senha.');
    });

    return true;
}
