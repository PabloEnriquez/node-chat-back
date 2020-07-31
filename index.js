const app = require('express')();
app.set('view engine', 'pug');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected test');

    socket.on('user-message', msgData => {
        io.emit('user-message', msgData);
    });

    socket.on('typing', typingData => {
        socket.broadcast.emit('typing', typingData);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

module.exports = app;