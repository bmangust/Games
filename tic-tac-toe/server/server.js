const http = require('http');
const express = require('express');
const socketio = require('socket.io');
// const RpsGame = require('./rps.js');
const TicTacToeGame = require('./tictactoe.js');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/about.html');
});

let waitingPlayer = null;

io.on('connection', (socket) => {
	console.log('Someone connected');

	if (waitingPlayer) {
		//start a game here
		new TicTacToeGame (waitingPlayer, socket);
		waitingPlayer = null;
	}
	else {
		waitingPlayer = socket;
		waitingPlayer.emit('message', 'Waiting for the second player');
	}
	// socket.emit('message', 'Hi, you are connected!');
	// socket.on('square', (sq) => {
	// 	console.log(`sq: ${sq}`);
		
	// });
	socket.on('disconnect', (data) => {
		//connections.splice(connections.indexOf(socket), 1);
		console.log('Someone disconnected');
	});



	/*

	socket.on('message', (text) => {
		io.emit('message', text);
	});
	*/
});


server.on('error', (err) => {
	console.log('Server error', err);
});

server.listen(8080, () => {
	console.log('RPS startet on 8080');
});