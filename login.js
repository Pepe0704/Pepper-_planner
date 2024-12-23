document.getElementById('login').addEventListener('submit', async function (event) {
  event.preventDefault(); // Impede o envio do formulário
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Validação do e-mail
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return; 
  }

  // Validação da senha
  const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!senhaRegex.test(senha)) {
    alert(
      "A senha deve ter pelo menos:\n" +
      "- 8 caracteres\n" +
      "- 1 letra maiúscula\n" +
      "- 1 letra minúscula\n" +
      "- 1 número\n" +
      "- 1 caractere especial (@$!%*?&) "
    );
    return; 
  }

  try {
    // Envio da requisição de login
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json(); 
    
    if (response.ok) {
      // Armazena o token de autenticação
      localStorage.setItem('authToken', data.token); 
      alert('Login realizado com sucesso!');
      window.location.href = '/home'; // Altere para o destino correto
    } else {
      // Verifica a mensagem de erro retornada pelo servidor
      if (data.message === "Cadastro não encontrado") {
        alert("Cadastro não encontrado. Verifique seu e-mail e senha.");
      } else {
        alert(data.message || 'Erro desconhecido. Tente novamente mais tarde.');
      }
      
      // Exibe o erro com mais detalhes na tela
      document.getElementById('error-message').style.display = 'block';
      document.getElementById('error-message').innerText = `Erro: ${data.message || 'Erro desconhecido. Tente novamente mais tarde.'}`;
    }
  } catch (error) {
    // Exibe um erro genérico no caso de problemas com a requisição
    alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
  }
});
