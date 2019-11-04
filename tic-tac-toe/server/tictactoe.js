class TicTacToeGame {
	constructor(p1, p2, id) {
		this._id = id;
		this._field = [0,0,0,0,0,0,0,0,0];
		this._players = [p1, p2];
		this._current = 0;
		this._playerSymbols = ['x', 'o'];
		this._turn = null;
		this._score = [0,0];
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
	
	_playerMove(index) {
		let winner;
		this._sendToPlayer('message', index, 'Your turn');
		this._sendToPlayer('message', (index + 1) % 2, 'Please wait');
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
				if (winner !== -1) {
					if (winner === 0) {
						this._sendToPlayers('message', 'Draw!');
					}
					else {
						this._sendToPlayer('message', this._current, 'You win!');
						this._sendToPlayer('message', this._current ^ 1, 'You lose');
						this._updateScore();
					}
					setTimeout(() => {
						this._sendToPlayers('endgame', 'Start a new game?');
						let promise = new Promise((resove, reject) => {
							this._players[this._current].once('endgame', (c) => {
								if (c === true) {
									resove(c);
									return ;
								}
								else {
									this._sendToPlayers('message', 'See you next time');
									setTimeout(() => {
										this._sendToPlayers('redirect', '/');
									}, 1000);
									return ;
								}
							});
						});
						promise.then(
							c => {
								this._startGame();
								return ;
							}
						)
					}, 1000)
					return ;
				}
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
		const field = this._field;
		const sym = this._playerSymbols[this._current];
		let cnt = 0;
		if ((field[0] === sym && field[1] === sym && field[2] === sym) ||
			(field[3] === sym && field[4] === sym && field[5] === sym) ||
			(field[6] === sym && field[7] === sym && field[8] === sym) ||
			(field[0] === sym && field[3] === sym && field[6] === sym) ||
			(field[1] === sym && field[4] === sym && field[7] === sym) ||
			(field[2] === sym && field[5] === sym && field[8] === sym) ||
			(field[0] === sym && field[4] === sym && field[8] === sym) ||
			(field[2] === sym && field[4] === sym && field[6] === sym)) {
				if (sym === 'x')
					return 1;
				else
					return 2;
			}
		else {
			field.forEach((cell) => {
				if (cell === 0)
					cnt++;
			});
			if (cnt === 0)
				return 0;
			return -1;
		}
	}

	_updateScore()
	{
		this._score[this._current] += 1;
		this._sendToPlayers('score', this._score);
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