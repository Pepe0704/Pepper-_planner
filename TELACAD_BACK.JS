// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para tratar JSON no corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // seu usuário MySQL
    password: '', // sua senha MySQL
    database: 'pepper_planner', // nome do seu banco
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados.');
    }
});

// Rota para cadastrar os dados
app.post('/cadastrar', (req, res) => {
    const { nome, telefone, email, data_nascimento, genero, senha } = req.body;

    // Validação dos dados no back-end
    if (!nome || !telefone || !email || !data_nascimento || !genero || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Validação de telefone (pode ser ajustado conforme o formato necessário)
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
        return res.status(400).json({ message: 'Formato de telefone inválido.' });
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'E-mail inválido.' });
    }

    // Validação da data de nascimento (não pode ser futura)
    const hoje = new Date();
    const dataNascimento = new Date(data_nascimento);
    if (dataNascimento > hoje) {
        return res.status(400).json({ message: 'Data de nascimento não pode ser futura.' });
    }

    // Inserir dados no banco de dados
    const query = 'INSERT INTO cadastro (nome, telefone, email, data_nascimento, genero, senha) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, telefone, email, data_nascimento, genero, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
    });
});

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
