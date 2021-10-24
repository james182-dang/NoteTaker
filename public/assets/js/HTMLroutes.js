const router = require('express').Router();
const path = require('path');

// Routes!
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
});