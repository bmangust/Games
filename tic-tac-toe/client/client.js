
const socket = io();
const canvas = document.getElementById("canvas");
const ctx = this.canvas.getContext('2d');
let playerIndex = null;
let field;
const cW = 600;
const cH = 600;

const drawGrid = () => {
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(200, 0);
	ctx.lineTo(200, 600);
	ctx.moveTo(400, 0);
	ctx.lineTo(400, 600);
	ctx.moveTo(0, 200);
	ctx.lineTo(600, 200);
	ctx.moveTo(0, 400);
	ctx.lineTo(600, 400);
	ctx.stroke();
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

const drawCrossAt = (cell) => {
	switch (cell) {
		case 0:
			drawCross(100, 100);
			break;
		case 1:
			drawCross(300, 100);
			break;
		case 2:
			drawCross(500, 100);
			break;
		case 3:
			drawCross(100, 300);
			break;
		case 4:
			drawCross(300, 300);
			break;
		case 5:
			drawCross(500, 300);
			break;
		case 6:
			drawCross(100, 500);
			break;
		case 7:
			drawCross(300, 500);
			break;
		case 8:
			drawCross(500, 500);
			break;
	};
};

const drawCircleAt = (cell) => {
	switch (cell) {
		case 0:
			drawCircle(100, 100);
			break;
		case 1:
			drawCircle(300, 100);
			break;
		case 2:
			drawCircle(500, 100);
			break;
		case 3:
			drawCircle(100, 300);
			break;
		case 4:
			drawCircle(300, 300);
			break;
		case 5:
			drawCircle(500, 300);
			break;
		case 6:
			drawCircle(100, 500);
			break;
		case 7:
			drawCircle(300, 500);
			break;
		case 8:
			drawCircle(500, 500);
			break;
	}
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
		drawCrossAt(cell);
	}
	else if (playerIndex === 1) {
		drawCircleAt(cell);
	}
	
};


const clearCanvas = () => {
	ctx.clearRect(0, 0, cW, cH);
};

const updateField = (f) => {
	console.log(`updating field`);

	clearCanvas();
	drawGrid();
	f.forEach((cell, index) => {
		if (cell === 'o') {
			console.log(`at cell ${index} sits ${cell}`);
			drawCircleAt(index);
		}
		else if (cell === 'x') {
			console.log(`at cell ${index} sits ${cell}`);
			drawCrossAt(index);
		}
	});
};

const writeEvent = (text) => {
	const message = document.querySelector('#message');
	message.innerHTML = text;
	console.log(text);
};

const addCanvasListener = () => {
	canvas.addEventListener('click', () => {
		let x = event.clientX;
		let y = event.clientY;
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
});
socket.on('field', (f) => {
	console.log(`got field: ${f}`);
	updateField(f);
});
socket.on('endgame', (message) => {
	console.log(`got endgame message: ${message}`);
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