const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Usando o CORS
app.use(cors());

// Middleware para processar os dados do formulário
app.use(express.urlencoded({ extended: true }));  // Para processar dados de formulários
app.use(express.json());  // Para processar JSON, caso necessário

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

// Rota para cadastrar dados (com redirecionamento para login)
app.post('/cadastro', (req, res) => {
    const { nome, telefone, email, data_nascimento, genero, senha } = req.body;

    // Remover espaços extras na senha antes de salvar
    const senhaFormatada = senha.trim();

    const query = 
        INSERT INTO cadastro (nome, telefone, email, data_nascimento, genero, senha)
        VALUES (?, ?, ?, ?, ?, ?)
    ;

    connection.query(
        query,
        [nome, telefone, email, data_nascimento, genero, senhaFormatada],
        (err, result) => {
            if (err) {
                console.error('Erro ao inserir dados:', err);
                return res.status(500).send('Erro ao salvar os dados.');
            }
            // Redirecionar para a página de login após o cadastro bem-sucedido
            res.redirect('/login.html');
        }
    );
});

// Rota para fazer o login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const query = 'SELECT senha FROM cadastro WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro interno no servidor' });
        }

        if (results.length === 0) {
            // Se o e-mail não for encontrado, retorna mensagem de "Cadastro não encontrado"
            return res.status(404).json({ message: 'Cadastro não encontrado' });
        }

        const senhaBanco = results[0].senha; // Senha salva no banco de dados

        // Comparação das senhas
        if (senha.trim() === senhaBanco.trim()) {
            // Login bem-sucedido
            return res.status(200).json({ message: 'Autenticação bem-sucedida' });
        } else {
            // Se a senha estiver errada
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

// Rota de login simulada para teste de redirecionamento
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});