cW = 600;
cH = 600;
field = [0,0,0,0,0,0,0,0,0];

// field = [[0,0,0],[0,0,0],[0,0,0]]; 

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const updateCanvas = () => {
	setInterval(function () {
	clearCanvas();
	grid();
	// drawCross(100, 100);
	}, 30);
};




// canvas.addEventListener('click', () => {
// 	console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
// 	let x = event.clientX;
// 	let y = event.clientY;
// 	let cell = checkField(x, y);
// 	console.log(field[cell]);
// 	if (cell !== null)
// 	{
// 		field[cell] = 'x';
// 		console.log(field[cell]);
// 		drawCell(cell, 'x');
// 	}
// }, false);

canvas.addEventListener('dblclick', () => {
	console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
	let x = event.clientX;
	let y = event.clientY;
	let cell = checkField(x, y);
	console.log(field[cell]);
	if (cell !== null)
	{
		field[cell] = 'o';
		console.log(field[cell]);
		drawCell(cell, 'o');
	}
}, false);



grid();
// updateCanvas();



// const Ball = () => {
// 	this.x = 100;
// 	this.y = 100;
// 	this.xSpeed = -2;
// 	this.ySpeed = 3;
	
// };
// Ball.draw = () => {
// 	circle(this.x, this.y, 3, true);
// };
// // Ball.prototype.draw = function () {
// // 	circle(this.x, this.y, 3, true);
// // };
// let ball = new Ball();

// ball.draw();


// setInterval (() => {
// 	c.clearRect(0, 0, cW, cH);
// 	ball.draw();
// }, 30);