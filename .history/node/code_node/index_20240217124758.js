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

app.get('/', async (req,res) => {
    var render = "";
    render += '<h1>Full Cycle Rocks!!!!</h1>';
    //
    //Escolher nome, printar e inserir no banco de dados
    const nameChosen = randomName();
    render += `<h2>Nome selecionado ${nameChosen} </h2>`;
    const registryBd =  await insertDb(nameChosen);
    render += '<h3>' + registryBd + '</h3>';
    //
    // Listando resultados
    render += '<h1> Nomes registrados: </h1>'
    render += await renderSelectNames();
    //
    // Renderizando variavel render
    res.send(render);
})

//
// Checar servico no health docker compose
app.get('/health', (req,res) => {
    res.send('<h1>health check ok!!!</h1>')
})

const randomName = () => {
    const numRandom = Math.floor(Math.random() * listNames.length);
    return listNames[numRandom];
}

const selectNameDb = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT name FROM people';

        connection.query(sql, (error, results, fields) => {
            if (error) {
                return reject(error);
            }

            return resolve(results);
            
        });
    });
}

const renderSelectNames = async () => {
    return selectNameDb()
        .then(results => {
            if (results.length === 0) {
                return "<h4>Nenhum resultado encontrado.</h4>";
            }

            let namesAcum = '';

            results.forEach(row => {
                namesAcum += `<h4>${row.name}</h4>`;
            });

            return namesAcum;
        })
        .catch(error => {
            return `<h4>Erro ao buscar os nomes no banco de dados: ${error}</h4>`;
        });
}


const insertDb = async (nome) => {
    try {
        const sql = `INSERT INTO people(name) values ('${nome}')`;
        connection.query(sql);
        return "Inserido na tabela com sucesso!"
    } catch (error) {
        console.error('Erro ao inserir no banco de dados:', error.message);
    }
}

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})