var socket = io('http://localhost:80');
socket.on('news', data => {
    var div = document.getElementById("news-list");
    console.log("Rendering news : ", data);
    for (let i = 0; i < data.length; i++) {
        const newsItem = data[i];
        div.innerHTML += "<h3>" + newsItem.title + ' <small>' + newsItem.date + "</small></h3><br>";
    }
    socket.emit('my other event', { my: 'data' });
});
//# sourceMappingURL=starter.js.map