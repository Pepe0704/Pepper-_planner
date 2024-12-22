

document.querySelector('login').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    try {
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
            const data = await response.json();
            alert('Login bem-sucedido');
            console.log(data);
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        console.error('Erro ao fazer o login:', error);
        alert('Erro ao fazer o login');
    }
});
