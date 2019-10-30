// const canvas = document.getElementById(canvas);

class TicTacToeGame {
	constructor(p1, p2) {
		this.cW = 600;
		this.cH = 600;
		this._field = [0,0,0,0,0,0,0,0,0];
		this._players = [p1, p2];
		this._current = 0;
		this._playerSymbols = ['x', 'o'];
		// this._turns = [null,null];
		
		// this._checkWinner();
		this._startGame();
		this._waitForTurn();
		// this._playerMove(0);
		// this._changePlayer();
		// this._playerMove(1);
		// this._changePlayer();

		// this._players.forEach((player, index) => {
		// 	console.log(`Player ${this._current + 1} moves!`);
		// 	player.on('square', (sq) => {
		// 		this._onTurn(index, sq);
		// 	});
		// });

	}

	_sendField() {
		this._sendToPlayers('field', this._field);
		console.log('field sent');
	}

	_changePlayer() {
		this._current = (this._current + 1) % 2;
	}

	_startGame() {
		this._field = [0,0,0,0,0,0,0,0,0];
		this._players.forEach((player, index) => {
			this._sendToPlayer('index', index, index);
			this._sendToPlayer('message', index, `You are player ${index + 1}, (${this._playerSymbols[index]})`);
		});
		this._sendToPlayers('message', 'Let the carnage begin!');
	}
	
	//need to stop executing code if no package came from player
	_playerMove(index) {
		this._sendToPlayer('message', index, 'Your turn');
		this._sendToPlayer('message', (index + 1) % 2, 'Please wait');
		// let turn = null;
		this._players[index].on('square', (sq) => {
			// if (turn === null) {

			// }
			if (sq !== null && this._field[sq] === 0) {
				this._field[sq] = this._playerSymbols[index];
				this._sendToPlayer('resp', index, sq);
				this._changePlayer();
				console.log(`now player ${index + 1} moves`);
			}
		});
		this._sendField();
	}

	_waitForTurn() {
		let winner = this._checkWinner();
		// console.log(winner);
		// while (winner === -1)
		for (let i = 0; i < 9;)
		{
			if (this._current === 0) {
				this._playerMove(0);
				i++;
			} else {
				this._playerMove(1);
				i++;
			}
		}
		// this._sendToPlayer('message', winner, 'You win!');
		// this._sendToPlayer('message', (winner + 1) % 2, 'You lose');

	}

	// _checkOrder() {
	// 	let current = this._current;
	// 	this._sendToPlayer('message', current, `Your turn, player ${this._current + 1}`);
	// 	this._players[current].on('square', (sq) => {
	// 		this._checkGameState(sq, current);
	// 	});
	// 	this._current = (current + 1) % 2;
	// }

	_checkWinner() {
		let field = this._field;
		if ((field[0] === 'x' && field[1] === 'x' && field[2] === 'x') ||
			(field[3] === 'x' && field[4] === 'x' && field[5] === 'x') ||
			(field[6] === 'x' && field[7] === 'x' && field[8] === 'x') ||
			(field[0] === 'x' && field[3] === 'x' && field[6] === 'x') ||
			(field[1] === 'x' && field[4] === 'x' && field[7] === 'x') ||
			(field[2] === 'x' && field[5] === 'x' && field[8] === 'x') ||
			(field[0] === 'x' && field[5] === 'x' && field[8] === 'x') ||
			(field[2] === 'x' && field[5] === 'x' && field[6] === 'x')) {
				// this._sendToPlayer('message', 0, 'You WIN!');
				return 0;
			}
		else if ((field[0] === 'o' && field[1] === 'o' && field[2] === 'o') ||
			(field[3] === 'o' && field[4] === 'o' && field[5] === 'o') ||
			(field[6] === 'o' && field[7] === 'o' && field[8] === 'o') ||
			(field[0] === 'o' && field[3] === 'o' && field[6] === 'o') ||
			(field[1] === 'o' && field[4] === 'o' && field[7] === 'o') ||
			(field[2] === 'o' && field[5] === 'o' && field[8] === 'o') ||
			(field[0] === 'o' && field[5] === 'o' && field[8] === 'o') ||
			(field[2] === 'o' && field[5] === 'o' && field[6] === 'o')) {
				// this._sendToPlayer('message', 1, 'You WIN!');
				return 1;
			}
		else
			return -1;
	}

	// _onTurn(playerIndex, sq) {
	// 	// this._turns[playerIndex] = turn;

	// 	// console.log(this._field);
	// 	this._checkGameState(sq, playerIndex);
	// }

	_sendToPlayer(type, playerIndex, msg) {
		this._players[playerIndex].emit(type, msg);
	}

	_sendToPlayers(type, msg) {
		this._players.forEach((player) => {
			player.emit(type, msg);
		});
	}

	
	// _checkGameState = (sq, index) => {
	// console.log(`You'e selected ${sq} cell`);
	// if (sq !== null) {
	// 	if (this._field[sq] === 0) {
	// 		console.log(this._playerSymbols[index])
	// 		this._field[sq] = this._playerSymbols[index];
	// 		console.log(this._field);
	// 		this._sendToPlayer('resp', index, sq);
	// 	}
	// 	else {
	// 		this._sendToPlayer('message', index, 'Choose another cell');
	// 	}
	// }
	// if (this._checkWinner() == -1)
	// 	this._checkOrder();
	// };

}

module.exports = TicTacToeGame;