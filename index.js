const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const { error } = require('node:console');

const app = express();

const PORT = process.env.PORT || 3000;

let indexFile = fs.readFileSync(path.join(__dirname, "src", "index.html"), 'utf-8');
let aboutFile = fs.readFileSync(path.join(__dirname, "src", "about.html"), 'utf-8');
let contactFile = fs.readFileSync(path.join(__dirname, "src", "contactMe.html"), 'utf-8');
let errorFile = fs.readFileSync(path.join(__dirname, "src", "404.html"), 'utf-8');


app.get('/', (req, res) => {
   res.setHeader('Content-Type', 'text/html');
   res.send(indexFile);
})

app.get('/about', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(aboutFile);
 })
 
 app.get('/contact', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(contactFile);
 })

 app.get('*', (req, res) => {
    res.status(404).send(errorFile);
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));