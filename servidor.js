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

// Rota para cadastrar dados
app.post('/cadastro', (req, res) => {
    const { nome, telefone, email, data_nascimento, genero, senha } = req.body;

    // Verifique se todos os dados estão sendo recebidos
    console.log(nome, telefone, email, data_nascimento, genero, senha);

    // Query SQL para inserir os dados
    const query = `
        INSERT INTO cadastro (nome, telefone, email, data_nascimento, genero, senha)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        query,
        [nome, telefone, email, data_nascimento, genero, senha],
        (err, result) => {
            if (err) {
                console.error('Erro ao inserir dados:', err);
                res.status(500).send('Erro ao salvar os dados.');
                return;
            }
            res.status(200).send('Dados cadastrados com sucesso!');
        }
    );
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
