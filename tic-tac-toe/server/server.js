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

app.get('/game', (req, res) => {
	res.sendFile(__dirname + '/game.html');
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
		// document.getElementById('#game_list');
		waitingPlayer = null;
	}
	else {
		waitingPlayer = socket;
		// players.push[socket];
		waitingPlayer.emit('message', 'Waiting for the second player');
	}
	// socket.emit('message', 'Hi, you are connected!');
	socket.on('square', (sq) => {
		console.log(`sq: ${sq}`);
		
	});
	socket.on('disconnect', (data) => {
		console.log('Someone disconnected');
		// let index = players.indexOf(socket);
		// let opponent;
		// if (index % 2 == 0)
		// 	opponent = players[index + 1];
		// else
		// 	opponent = players[index - 1];
		// players.splice(index, 1);
		// players.splice(players.indexOf(opponent), 1);
		// opponent.disconnect();
		// console.log(players);
	});
});


server.on('error', (err) => {
	console.log('Server error', err);
});

server.listen(8080, () => {
	console.log('RPS started on 8080');
});