const express = require('express');
const router = require('express').Router();
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


router.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

