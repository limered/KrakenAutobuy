var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    (() => __awaiter(this, void 0, void 0, function* () {
        var data = yield kraken.api('Ticker', { pair: 'XXBTZUSD' });
        socket.emit('test', data);
    }))();
});
//# sourceMappingURL=server.js.map