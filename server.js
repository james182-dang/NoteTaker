const fs = require('fs');
const express = require('express');
const router = require('express').Router();
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );

    return note;
}

//Middleware functionality
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// Static route for styling from public
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});



// Wildcard Route!
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // add note to json file and notes array
    const note = createNewNote(req.body, notes);

    res.json(note);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

