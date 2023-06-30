
const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});


connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados: ', err);
        return;
    }
    console.log('Conexão realizada com sucesso ao banco de dados.');

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

    connection.query(createTableQuery, (error, results, fields) => {
        if(error) {
            console.error('Erro ao tentar criar trabale people: ', error);
        } else {
            console.log('Tabela people criada com sucesso ou já existente.');
        }
    });

    const insertQuery = `INSERT INTO people (name) VALUES ('Jaderson Brandão')`;

    connection.query(insertQuery, (error, fields) => {
        if (error) {
            console.error('Erro ao tentar inserir dados: ', error);
        } else {
            console.log('Dados inseridos com sucesso na tabela people!')
        }
        // connection.end();
    });
});


app.get('/', (req, res) => {
    const selectQuery = `SELECT * FROM people`;

    connection.query(selectQuery, (err, results) => {
        if (err) {
            console.log('Erro ao tentar retornar dados da consulta na tabela people: ', err);
            return res.status(500).send('Erro ao tentar executar a consulta');
        }

        const names = results.map(row => row.name);
        const html = `<h1>Full Cycle</h1><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`;
        
        res.send(html);
    });
});

app.listen(3000, () => console.log('Server is up and running'));