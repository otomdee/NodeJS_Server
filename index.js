const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');

const server = http.createServer((req, res) => {

    let filePath = path.join(
        __dirname,
        'src',
        req.url === '/' ? 'index.html' : req.url + '.html'
    )

    console.log(filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'src', '404.html'), (inErr, content) => {
                    if (inErr) console.log(inErr.code);
                    res.writeHead(200, {'Content-Type' : 'text/html'});
                    res.end(content);
                })
            }
            else {
                res.writeHead(500, {'Content-Type' : 'text/html'});
                res.end(`<h1>Server error: ${err.code}</h1>`);
            }
        }
        else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(content);
        }
    })
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})