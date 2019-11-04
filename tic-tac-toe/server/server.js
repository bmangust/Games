const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const TicTacToeGame = require('./tictactoe.js');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));
app.use(express.static(__dirname));

const server = http.createServer(app);

const io = socketio(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index/index.html');
});

app.get('/game', (req, res) => {
	res.sendFile(__dirname + '/game/game.html');
});

let waitingPlayer = null;
let players = [];
let id = 0;
let games = [];

io.on('connection', (socket) => {
	console.log('Someone connected');
	console.log(players);
	socket.emit('games', games);
	players.push[socket];

	if (waitingPlayer) {
		//start a game here
		new TicTacToeGame (waitingPlayer, socket, id);
		games.push(id);
		id++;
		waitingPlayer = null;
	}
	else {
		waitingPlayer = socket;
		waitingPlayer.emit('message', 'Waiting for the second player');
	}
	socket.on('square', (sq) => {
		console.log(`sq: ${sq}`);
		
	});
	socket.on('disconnect', (data) => {
		console.log('Someone disconnected', data);
	});
});


server.on('error', (err) => {
	console.log('Server error', err);
});

server.listen(8080, () => {
	console.log('RPS started on 8080');
});