const express = require('express');
const bcrypt = require('bcrypt'); // Usando bcrypt para comparar senhas
const db = require('./servidor.js'); // Supondo que você tenha o arquivo de conexão com o DB

const app = express();
const port = 3000;

app.use(express.json());  // Usando express.json para ler JSON no corpo da requisição
app.use(express.urlencoded({ extended: true }));  // Para lidar com formulários

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Verifique se os campos foram preenchidos
    if (!email || !senha) {
        return res.json({ success: false, message: 'Email e senha são obrigatórios.' });
    }

    // Consultar o banco de dados para verificar se o usuário existe
    const query = 'SELECT * FROM cadastro WHERE email = ?';

    try {
        // Usando promessas para consulta no banco de dados
        const [results] = await db.promise().query(query, [email]);

        if (results.length === 0) {
            // Se o usuário não existe
            return res.json({ success: false, message: 'Email não encontrado.' });
        }

        // Comparar a senha fornecida com a senha hashada armazenada no banco
        const senhaCorreta = await bcrypt.compare(senha, results[0].senha);

        if (senhaCorreta) {
            // Senha correta
            return res.json({ success: true, message: 'Login bem-sucedido.' });
        } else {
            // Senha incorreta
            return res.json({ success: false, message: 'Senha incorreta.' });
        }
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: 'Erro no servidor.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
