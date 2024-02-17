const express = require('express')
const app = express()
const port = 3000


const listNames = [
    'João',
    'Maria',
    'José',
    'Ana',
    'Pedro',
    'Mariana',
    'Lucas',
    'Carla',
    'Paulo',
    'Camila'
  ];

app.get('/', (req,res) => {
    res.send('<h1>Full Cycle Rocks!!!!</h1>')
    this.registry();
    this.
})

app.get('/health', (req,res) => {
    res.send('<h1>Start!!!</h1>')
})



const randomName = () => {
    const numRandom = Math.floor(Math.random() * listNames.length);
    return listNames[numRandom];
}

const registry = async(name) {

}

const selectNames = async() {

}


app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})