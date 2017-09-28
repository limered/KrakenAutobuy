var socket = io('http://localhost:80');

socket.on('test', data => {
    var container = document.querySelector('#container');
    container.appendChild(new Text(JSON.stringify(data)));
});