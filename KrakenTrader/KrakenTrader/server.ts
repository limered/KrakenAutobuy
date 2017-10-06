var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(80);
const fs = require('fs');
const KrakenClient = require('kraken-api');
var kraken;

app.get('/', (req, res) => {
    console.log("Homepage");
    res.sendFile(__dirname + '/html/index.html');
});

app.use('/lib', express.static('lib'));
app.use('/js', express.static('js'));


io.on('connection', async socket => {
    console.log("Connected succesfully to the socket ...");
   
    let apiStr = await readApiConfig(__dirname + '/data/apiData.json');
    apiStr = apiStr.substr(1, apiStr.length - 1);
    const apiData = JSON.parse(apiStr);
    
    kraken = new KrakenClient(apiData['key'], apiData['privatekey']);

    (async () => {
        var data = await kraken.api('Balance');
        socket.emit('test', data);
    })();
});

var readApiConfig = (async (path: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path,
            (error, data) => {
                if (error) reject(error.toString());
                resolve(data.toString());
            });
    });
});