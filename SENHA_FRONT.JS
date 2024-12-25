// Selecionar o formulário
const formulario = document.getElementById('senha');

// Adicionar evento de envio ao formulário
formulario.addEventListener('submit', async function (event) {
  event.preventDefault(); // Impedir o comportamento padrão (envio do formulário)

  // Obter valores do formulário
  const email = document.getElementById('email').value;
  const senha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  // Verifica se as senhas coincidem
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return; // Impede o envio caso as senhas não coincidam
  }

  // Dados a serem enviados ao servidor
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

    // Verifique se a resposta do servidor foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro no servidor: ' + response.statusText);
    }

    // Mensagem de sucesso
    const resultado = await response.json();
    alert(resultado.message || 'Senha alterada com sucesso!');

    // Redirecionar para a página de login (LOGIN maiúsculo)
    window.location.href = 'LOGIN.html';  // Alterado para o caminho correto com "LOGIN" maiúsculo

  } catch (error) {
    // Trata erros e exibe mensagens
    console.error('Erro:', error);
    alert('Erro ao conectar com o servidor.');
  }
});
