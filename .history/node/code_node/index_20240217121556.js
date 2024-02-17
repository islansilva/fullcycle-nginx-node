const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 3000


const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node'
};

const connection = mysql.createConnection(config);

const listNames = ['João','Maria', 'José', 'Ana', 'Pedro', 'Mariana', 'Lucas', 'Carla', 'Paulo', 'Camila'];

app.get('/', async(req,res) => {

    var render = "";
    render += '<h1>Full Cycle Rocks!!!!</h1>';

    //
    //Escolher nome, printar e inserir no banco de dados
    const nameChosen = randomName();
    render += `<h2>Nome selecionado ${nameChosen} </h2>`;

    const registryBd = await insertDb(nameChosen);
    render += '<h3>' + registryBd + '</h3>';
    //
    // Listando resultados

    render += '<h1> Nomes registrados: </h1>'

    render += await renderSelectDb();

    res.send(render);
})

app.get('/health', (req,res) => {
    res.send('<h1>health check ok!!!</h1>')
})



const randomName = () => {
    const numRandom = Math.floor(Math.random() * listNames.length);
    return listNames[numRandom];
}

const renderSelectDb = async() => {
    const sql = 'SELECT name FROM people';

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return '<h4>Erro ao executar a consulta:</h4>', error;
        }

        if (results.length === 0) {
            connection.end();
            return '<h4>Nenhum resultado encontrado.</h4>';
        }

        connection.end();
        return results.map(row => `<h4>${row.name}</h4>`);

    });
}

const insertDb = async (nome) => {
    try {
        const sql = `INSERT INTO people(name) values ('${nome}')`;
        connection.query(sql);
        connection.end();
        return "Inserido na tabela com sucesso!"
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error.message);
    }
}

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})