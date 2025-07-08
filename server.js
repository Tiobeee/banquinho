
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


let items = [
    {id: 1, name: "Salgadinho de Presunto"},
    {id: 2, name: "Biscoito de Queijo"},
    {id: 3, name: "Batata Frita com Bacon"},
    {id: 4, name: "Pipoca de Manteiga"},
    {id: 5, name: "Torresmo Apimentado"},
    {id: 6, name: "Croquete de Frango"},
    {id: 7, name: "Coxinha de Requeijão"},
    {id: 8, name: "Mini Pizza de Calabresa"},
    {id: 9, name: "Amendoim com Sal"},
    {id: 10, name: "Bolinho de Aipim com Carne"},
];

function generationItemLink(item) {
    return {
        self: { href: `/items/${item.id}`},
        update: { href: `/items/${item.id}`, method: "PUT"}
    }
}

app.get('/item', (req, res) => {
    const response = items.map(item => ({
        ...item,
        link: generationItemLink(item),
    }));
    res.status(200).json(response);
})

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if(index !== -1) {
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({message: "Item não foi encontrado"});
    }
})

app.post('/item', (req, res) => {
    if(req.body.name === '' || req.body.name === null) {
        res.status(400).json({message: "Insira algo o nome do produto"});
    } else {
        const novoItem = { id: items.length + 1, ...req.body}
        items.push(novoItem);
        res.status(201).json(novoItem);
    }
});

app.delete('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if(index !== -1) {
        items.splice(index, 1);
        res.status(200).json({message: "Item removido!"});
    } else {
        res.status(404).json({message: "Item não foi encontrado"});
    }

});

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}/item`);
})