// No servidor (servidor.js)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pepper_planner',
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

// Rota para cadastro
app.post('/cadastro', (req, res) => {
    const { nome, telefone, email, data_nascimento, genero, senha } = req.body;
    const senhaFormatada = senha.trim();

    // Verificar se o e-mail ou telefone já existe no banco
    const verificaDuplicidade = `
        SELECT * FROM cadastro WHERE email = ? OR telefone = ?
    `;
    connection.query(verificaDuplicidade, [email, telefone], (err, results) => {
        if (err) {
            console.error('Erro ao verificar duplicidade:', err);
            return res.status(500).json({ message: 'Erro ao processar a requisição.' });
        }

        // Se encontrar um usuário com o mesmo e-mail ou telefone, retorna erro
        if (results.length > 0) {
            return res.status(400).json({
                message: 'E-mail ou telefone já está cadastrado.'
            });
        }

        // Se não houver duplicidade, realiza a inserção
        const query = `
            INSERT INTO cadastro (nome, telefone, email, data_nascimento, genero, senha)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        connection.query(query, [nome, telefone, email, data_nascimento, genero, senhaFormatada], (err, result) => {
            if (err) {
                console.error('Erro ao inserir dados:', err);
                return res.status(500).json({ message: 'Erro ao salvar os dados.' });
            }
            res.json({ message: 'Cadastro realizado com sucesso!' });
        });
    });
});



// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const query = 'SELECT senha FROM cadastro WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Cadastro não encontrado' });
        }

        const senhaBanco = results[0].senha;

        // Comparação das senhas
        if (senha.trim() === senhaBanco.trim()) {
            return res.status(200).json({ message: 'Autenticação bem-sucedida' });
        } else {
            return res.status(400).json({ message: 'Senha incorreta' });
        }
    });
});

// Rota para alterar a senha
app.post('/senha', (req, res) => {
    const { email, senha } = req.body;


    // Verificar se o e-mail está registrado no banco
    connection.query('SELECT * FROM cadastro WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao processar a requisição' });
        }


        if (results.length === 0) {
            return res.status(404).json({ message: 'E-mail não encontrado.' });
        }


        // Atualizar a senha no banco de dados (senha simples)
        connection.query('UPDATE cadastro SET senha = ? WHERE email = ?', [senha, email], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao atualizar a senha' });
            }


            res.status(200).json({ message: 'Senha alterada com sucesso!' });
        });
    });
});

// Serve a página de login diretamente
app.get('/LOGIN', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'LOGIN.html')); // Acesse o arquivo dentro da pasta 'public'
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});