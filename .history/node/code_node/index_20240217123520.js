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

app.get('/', (req,res) => {

    var render = "";
    render += '<h1>Full Cycle Rocks!!!!</h1>';

    //
    //Escolher nome, printar e inserir no banco de dados
    const nameChosen = randomName();
    render += `<h2>Nome selecionado ${nameChosen} </h2>`;

    const registryBd =  insertDb(nameChosen);
    render += '<h3>' + registryBd + '</h3>';
    //
    // Listando resultados

    render += '<h1> Nomes registrados: </h1>'

    const names = () => {
         const selectDb = renderSelectDb();

         if(selectDb.length === 0) {
            return "<h4>Nenhum resultado encontrado.</h4>";
         }

         var namesAcum;

         selectDb.forEach(row => {
            namesAcum += `<h4>${row.name}</h4>`
        });

        return namesAcum;
    }


    render += names;

    res.send(render);
})

app.get('/health', (req,res) => {
    res.send('<h1>health check ok!!!</h1>')
})



const randomName = () => {
    const numRandom = Math.floor(Math.random() * listNames.length);
    return listNames[numRandom];
}

const renderSelectDb = () => {
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

const insertDb = (nome) => {
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