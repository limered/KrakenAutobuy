var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(80);

const KrakenClient = require('kraken-api');
const kraken = new KrakenClient('', '');

app.get('/', (req, res) => {
    console.log("Homepage");
    res.sendFile(__dirname + '/html/index.html');
});

app.use('/lib', express.static('lib'));
app.use('/js', express.static('js'));


io.on('connection', socket => {
    console.log("Connected succesfully to the socket ...");

    (async () => {
        var data = await kraken.api('Ticker', { pair: 'XXBTZUSD' });
        socket.emit('test', data);
    })();
});