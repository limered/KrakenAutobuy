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
const fs = require('fs');
const KrakenClient = require('kraken-api');
var kraken;
app.get('/', (req, res) => {
    console.log("Homepage");
    res.sendFile(__dirname + '/html/index.html');
});
app.use('/lib', express.static('lib'));
app.use('/js', express.static('js'));
io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
    console.log("Connected succesfully to the socket ...");
    let apiStr = yield readApiConfig(__dirname + '/data/apiData.json');
    apiStr = apiStr.substr(1, apiStr.length - 1);
    const apiData = JSON.parse(apiStr);
    kraken = new KrakenClient(apiData['key'], apiData['privatekey']);
    (() => __awaiter(this, void 0, void 0, function* () {
        var data = yield kraken.api('Balance');
        socket.emit('test', data);
    }))();
}));
var readApiConfig = ((path) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error)
                reject(error.toString());
            resolve(data.toString());
        });
    });
}));
//# sourceMappingURL=server.js.map