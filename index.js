const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

// const users = new Set();

io.on('connection', (socket) => {
    console.log('a user connected test');

    socket.on('set-username', userData => {
        // socket.userId = userData.userId;
        socket.userName = userData.userName;
        // users.add(userData);
    });

    socket.on('user-message', msgData => {
        io.emit('user-message', msgData);
    });

    socket.on('typing', userData => {
        socket.broadcast.emit('typing', socket.userName);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // users.delete(socket.userId);
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

module.exports = app;