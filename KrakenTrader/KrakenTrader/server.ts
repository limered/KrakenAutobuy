var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(80);
app.get('/', (req, res) => {
    console.log("Homepage");
    res.sendFile(__dirname + '/html/index.html');
});

app.use('/lib', express.static('lib'));
app.use('/js', express.static('js'));


io.on('connection', socket => {
    console.log("Connected succesfully to the socket ...");

    var news = [
        { title: 'The cure of the Sadness is to play Videogames', date: '04.10.2016' },
        { title: 'Batman saves Racoon City, the Joker is infected once again', date: '05.10.2016' },
        { title: "Deadpool doesn't want to do a third part of the franchise", date: '05.10.2016' },
        { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales', date: '04.10.2016' },
    ];

    // Send news on the socket
    socket.emit('news', news);

    socket.on('my other event', data => {
        console.log(data);
    });
});