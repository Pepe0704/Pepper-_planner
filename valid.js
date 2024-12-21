document.getElementById('login').addEventListener('submit', async function (event) {
  event.preventDefault(); 

  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;


  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return; 
  }

  const senhaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!senhaRegex.test(senha)) {
    alert(
      "A senha deve ter pelo menos:\n" +
      "- 8 caracteres\n" +
      "- 1 letra maiúscula\n" +
      "- 1 letra minúscula\n" +
      "- 1 número\n" +
      "- 1 caractere especial (@$!%*?&)"
    );
    return; 
  }

  try {
    
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json(); 
    
    if (response.ok) {
      localStorage.setItem('authToken', data.token); 
      alert('Login realizado com sucesso!');
      /*/window.location.href = '/home';  Alterar para o destino correto*/
    } else {
      alert(data.message || 'Erro desconhecido ao realizar login.');
    }
  } catch (error) {
    alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
  }
});
