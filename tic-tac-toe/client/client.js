
const socket = io();
const field = document.getElementsByClassName("canvas")[0];
const canvas = document.getElementById("game-layer");
const grid = document.getElementById("grid-layer").getContext('2d');
const ctx = canvas.getContext('2d');
let playerIndex = null;
const player_index = document.getElementById("player-number");
const message = document.querySelector('#game-message');
const my_score = document.querySelector("#player-score");
const opp_score = document.querySelector("#opponent-score");
const cW = 600;
const cH = 600;

const drawGrid = () => {
	grid.lineWidth = 4;
	grid.beginPath();
	grid.moveTo(200, 0);
	grid.lineTo(200, 600);
	grid.moveTo(400, 0);
	grid.lineTo(400, 600);
	grid.moveTo(0, 200);
	grid.lineTo(600, 200);
	grid.moveTo(0, 400);
	grid.lineTo(600, 400);
	grid.stroke();
};

const circle = function (x, y, radius, fillCircle) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fillCircle) {
	  ctx.fill();
	} else {
	  ctx.stroke();
	}
};

const drawCircle = (x, y) => {
	ctx.lineWidth = 5;
	circle(x, y, 70, false);
};

const drawCross = (x, y) => {
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(x-70, y-70);
	ctx.lineTo(x+70, y+70);
	ctx.moveTo(x+70, y-70);
	ctx.lineTo(x-70, y+70);
	ctx.stroke();
};

const drawSignAt = (cell, s) => {
	switch (cell) {
		case 0:
			if (s === 'x')
				drawCross(100, 100);
			else if (s === 'o')
				drawCircle(100, 100);
			break;
		case 1:
			if (s === 'x')
				drawCross(300, 100);
			else if (s === 'o')
				drawCircle(300, 100);	
			break;
		case 2:
			if (s === 'x')
				drawCross(500, 100);
			else if (s === 'o')
				drawCircle(500, 100);
			break;
		case 3:
			if (s === 'x')
				drawCross(100, 300);
			else if (s === 'o')
				drawCircle(100, 300);
			break;
		case 4:
			if (s === 'x')
				drawCross(300, 300);
			else if (s === 'o')
				drawCircle(300, 300);
			break;
		case 5:
			if (s === 'x')
				drawCross(500, 300);
			else if (s === 'o')
				drawCircle(500, 300);
			break;
		case 6:
			if (s === 'x')
				drawCross(100, 500);
			else if (s === 'o')
				drawCircle(100, 500);
			break;
		case 7:
			if (s === 'x')
				drawCross(300, 500);
			else if (s === 'o')
				drawCircle(300, 500);
			break;
		case 8:
			if (s === 'x')
				drawCross(500, 500);
			else if (s === 'o')
				drawCircle(500, 500);
			break;
	};
};

const getClickedSquare = (x, y) => {
	if (x > 10 && x < 189 && y > 10 && y < 189)
		return 0;
	else if (x > 210 && x < 389 && y > 10 && y < 189)
		return 1;
	else if (x > 410 && x < 600 && y > 10 && y < 189)
		return 2;
	else if (x > 10 && x < 189 && y > 210 && y < 389)
		return 3;
	else if (x > 210 && x < 389 && y > 210 && y < 389)
		return 4;
	else if (x > 410 && x < 600 && y > 210 && y < 389)
		return 5;
	else if (x > 10 && x < 189 && y > 410 && y < 600)
		return 6;
	else if (x > 210 && x < 389 && y > 410 && y < 600)
		return 7;
	else if (x > 410 && x < 600 && y > 410 && y < 600)
		return 8;
};


const drawCell = (cell) => {
	if (playerIndex === 0) {
		drawSignAt(cell, "x");
	}
	else if (playerIndex === 1) {
		drawSignAt(cell, "o");
	}
	
};


const clearCanvas = () => {
	ctx.clearRect(0, 0, cW, cH);
};

const updateField = (f) => {
	clearCanvas();
	f.forEach((cell, index) => {
		drawSignAt(index, cell);
		// if (cell === 'o') {
		// 	drawCircleAt(index);
		// }
		// else if (cell === 'x') {
		// 	drawCrossAt(index);
		// }
	});
};

const writeEvent = (text) => {
	message.innerHTML = text;
};

const addCanvasListener = () => {
	field.addEventListener('click', () => {
		let x = event.clientX - field.getBoundingClientRect().left;
		let y = event.clientY - field.getBoundingClientRect().top;
		let sq = getClickedSquare(x, y);
		socket.emit('square', sq);
	});
};
  
socket.on('message', writeEvent);
socket.on('resp', (sq) => {
	drawCell(sq);
});
socket.on('index', (index) => {
	playerIndex = index;
	player_index.innerHTML = index + 1;
});
socket.on('field', (f) => {
	updateField(f);
});
socket.on('score', (score) => {
	if (player_index.innerHTML == 1)
	{
		my_score.innerHTML = score[0];
		opp_score.innerHTML = score[1];
	}
	else if (player_index.innerHTML == 2)
	{
		my_score.innerHTML = score[1];
		opp_score.innerHTML = score[0];
	}
});
socket.on('endgame', (message) => {
	let c = confirm(message);
	if (c)
		socket.emit('endgame', true)
	else
		socket.emit('endgame', false)
});
socket.on('redirect', (url) => {
	window.location.href = url;
});

addCanvasListener();
drawGrid();