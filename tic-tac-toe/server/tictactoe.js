// const canvas = document.getElementById(canvas);

class TicTacToeGame {
	constructor(p1, p2, id) {
		this._id = id;
		this._field = [0,0,0,0,0,0,0,0,0];
		this._players = [p1, p2];
		this._current = 0;
		this._playerSymbols = ['x', 'o'];
		this._turn = null;
		
		this._startGame();

	}
	

	_sendField() {
		this._sendToPlayers('field', this._field);
		console.log('field sent');
	}

	_changePlayer() {
		this._current = this._current ^ 1;
		return (this._current);
	}

	_startGame() {
		this._field = [0,0,0,0,0,0,0,0,0];
		console.log(`PLAYERS: ${this._players}, ID: ${this._id}`);
		this._sendField();
		this._players.forEach((player, index) => {
			this._sendToPlayer('index', index, index);
			this._sendToPlayer('message', index, `You are player ${index + 1}, (${this._playerSymbols[index]})`);
		});
		this._sendToPlayers('message', 'Let the carnage begin!');
		this._playerMove(this._current);
	}
	
	//need to stop executing code if no package came from player
	// _playerMove(index, callback) {
	// 	this._sendToPlayer('message', index, 'Your turn');
	// 	this._sendToPlayer('message', index ^ 1, 'Please wait');

	// 	let promise = new Promise ((resolve, reject) => {
	// 		console.log(`current player: ${this._current + 1}`);
	// 		this._players[index].on('square', (sq) => {
	// 			console.log(`got answer: ${sq}`);
	// 			if (sq !== null && this._field[sq] === 0) {
	// 				resolve(sq);
	// 			}
	// 			else
	// 				reject(new Error('misclick or cell is busy'));
	// 		});
	// 	})
	// 	promise.then(
	// 		result => {
	// 			callback (result);
	// 		},
	// 		error => {
	// 			this._sendToPlayer('message', index, 'This cell is already occupied, try again');
	// 		}
	// 	)
	// }

	// _responseToPlayer(sq) {
	// 	this._field[sq] = this._playerSymbols[index];
	// 	this._sendToPlayer('resp', index, sq);
	// 	console.log(`now player ${index + 1} moves`);
	// 	this._sendField();
	// 	console.log(`Current player: ${this._current + 1}`);
	// }

	// _waitForTurn() {
	// 	let winner = this._checkWinner(); //returns -1 if theres no winner or 0 or 1 respectively
	// 	while(winner === -1) {
	// 		if (this._current === 0) {
	// 			this._playerMove(0, this._responseToPlayer(sq) {
	// 				winner = this._checkWinner();
	// 				this._changePlayer();
	// 			});
	// 		} else {
	// 			this._playerMove(1);
	// 			this._changePlayer();
	// 		}
	// 	}
	// }

	// //need to stop executing code if no package came from player
	_playerMove(index) {
		this._sendToPlayer('message', index, 'Your turn');
		this._sendToPlayer('message', (index + 1) % 2, 'Please wait');
		let winner = this._checkWinner();
		let promise = new Promise ((resolve, reject) => {
			console.log(`current player: ${this._current + 1}`);

			this._players[index].once('square', (sq) => {
				console.log(`got answer: ${sq}`);
				if (sq !== null && this._field[sq] === 0) {
					resolve(sq);
				}
				else
					reject(new Error('misclick or cell is busy'));
			});
		})
		promise.then(
			result => {
				this._field[result] = this._playerSymbols[index];
				this._sendToPlayer('resp', index, result);
				console.log(`now player ${index + 1} moves`);
				this._sendField();
				console.log(`NOW Current player: ${index + 1}`);
				winner = this._checkWinner();
				this._changePlayer()
				this._playerMove(this._current);
				return ;
			},
			error => {
				this._sendToPlayer('message', index, 'This cell is already occupied, try again');
				this._playerMove(this._current);
			}
		)
	}

	_checkWinner() {
		console.log(`checking winner`);
		let field = this._field;
		if ((field[0] === 'x' && field[1] === 'x' && field[2] === 'x') ||
			(field[3] === 'x' && field[4] === 'x' && field[5] === 'x') ||
			(field[6] === 'x' && field[7] === 'x' && field[8] === 'x') ||
			(field[0] === 'x' && field[3] === 'x' && field[6] === 'x') ||
			(field[1] === 'x' && field[4] === 'x' && field[7] === 'x') ||
			(field[2] === 'x' && field[5] === 'x' && field[8] === 'x') ||
			(field[0] === 'x' && field[4] === 'x' && field[8] === 'x') ||
			(field[2] === 'x' && field[4] === 'x' && field[6] === 'x')) {
				this._sendToPlayer('message', this._current, 'You win!');
				this._sendToPlayer('message', (this._current + 1) % 2, 'You lose');
				this._sendToPlayer('endgame', this._current, 'See you next time');
				setTimeout(() => {
					this._sendToPlayer('redirect', this._current ^ 1, '/');
				}, 1000);
				// this._sendToPlayer('endgame', this._current, 'Start a new game?');
				// let promise = new Promise((resove, reject) => {
				// 	this._players[this._current].once('endgame', (c) => {
				// 		if (c === true) {
				// 			resove(c);
				// 			return ;
				// 		}
				// 		else{
				// 			this._sendToPlayer('message', this._current ^ 1, 'See you next time');
				// 			this._sendToPlayer('redirect', this._current ^ 1, '/');
				// 			return ;
				// 		}
				// 	});
				// });
				// promise.then(
				// 	c => {
				// 		this._startGame();
				// 		return ;
				// 	}
				// )
				return 0;
			}
		else if ((field[0] === 'o' && field[1] === 'o' && field[2] === 'o') ||
				(field[3] === 'o' && field[4] === 'o' && field[5] === 'o') ||
				(field[6] === 'o' && field[7] === 'o' && field[8] === 'o') ||
				(field[0] === 'o' && field[3] === 'o' && field[6] === 'o') ||
				(field[1] === 'o' && field[4] === 'o' && field[7] === 'o') ||
				(field[2] === 'o' && field[5] === 'o' && field[8] === 'o') ||
				(field[0] === 'o' && field[4] === 'o' && field[8] === 'o') ||
				(field[2] === 'o' && field[4] === 'o' && field[6] === 'o')) {
				this._sendToPlayer('message', this._current, 'You win!');
				this._sendToPlayer('message', this._current ^ 1, 'You lose');
				this._sendToPlayer('endgame', this._current, 'See you next time');
				setTimeout(() => {
					this._sendToPlayer('redirect', this._current ^ 1, '/');
				}, 1000);
				// this._sendToPlayer('endgame', this._current, 'Start a new game?');
				// let promise = new Promise((resove, reject) => {
				// 	this._players[this._current].once('endgame', (c) => {
				// 		if (c === true) {
				// 			resove(c);
				// 			return ;
				// 		}
				// 		else {
				// 			this._sendToPlayer('message', this._current, 'See you next time');
				// 			this._sendToPlayer('redirect', this._current, '/');
				// 			return ;
				// 		}
				// 	});
				// });
				// promise.then(
				// 	c => {
				// 		this._startGame();
				// 		return ;
				// 	}
				// )
				return 1;
			}
		else
			return -1;
	}

	_sendToPlayer(type, playerIndex, msg) {
		this._players[playerIndex].emit(type, msg);
	}

	_sendToPlayers(type, msg) {
		this._players.forEach((player) => {
			player.emit(type, msg);
		});
	}


}

module.exports = TicTacToeGame;