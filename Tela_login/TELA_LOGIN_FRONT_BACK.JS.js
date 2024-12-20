const form = document.getElementById('login');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }), // Envia o email e senha para o servidor
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login bem-sucedido!'); // Se o login for bem-sucedido
      // Redirecionar para outra página, se necessário
      // window.location.href = '/dashboard.html';
    } else {
      alert(data.message); // Exibe erro caso o login falhe
    }
  } catch (error) {
    console.error('Erro ao realizar o login:', error);
    alert('Erro ao realizar o login. Tente novamente mais tarde.');
  }
});
