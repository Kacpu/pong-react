import React, {Component} from "react";
import '../App.css';

class Field extends Component{
    constructor(props) {
        super(props);
        this.canvas = {
            width: 800,
            height: 500
        }
    }

    componentDidMount() {
        const canvas = this.props.canvasRef.current
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        this.props.start(this.setField, this.draw);
    }

    setField = () => {
        this.player = {
            width: 10,
            height: 70
        }
        this.player1 = {
            x: 20,
            y: this.canvas.height/2 - this.player.height/2,
            up: false,
            down: false
        };
        this.player2 = {
            x: this.canvas.width - 20 - this.player.width,
            y: this.canvas.height/2 - this.player.height/2,
            up: false,
            down: false
        }
        this.ball = {
            speedX: 4,
            speedY: 0,
            radius: 5,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }
        this.ball.x = this.ball.x - this.ball.radius/2;
        this.ball.y = this.ball.y - this.ball.radius/2;
    }

    draw = (ctx) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.movePlayers();
        this.drawPlayer(ctx, this.player1.x, this.player1.y);
        this.drawPlayer(ctx, this.player2.x, this.player2.y);
        this.drawBall(ctx);
    }

    drawPlayer = (ctx, x, y) => {
        ctx.fillRect(x, y, this.player.width, this.player.height);
    }

    drawBall = (ctx) => {
        this.checkCollision();

        this.ball.x = this.ball.x - this.ball.speedX;
        this.ball.y = this.ball.y - this.ball.speedY;

        ctx.beginPath();
        ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    checkCollision = () => {
        const ballLeft = this.ball.x - this.ball.radius;
        const ballRight = this.ball.x + this.ball.radius;
        const ballTop = this.ball.y - this.ball.radius;
        const ballDown = this.ball.y + this.ball.radius;

        if(ballLeft < 0){
            this.props.updateScore('2');
            this.setField();
            this.ball.speedX = - this.ball.speedX;
        }
        if(ballRight > this.canvas.width){
            this.props.updateScore('1');
            this.setField();
        }

        if(ballTop < 0 || ballDown > this.canvas.height){
            this.ball.speedY = - this.ball.speedY;
        }

        if(ballLeft <= this.player1.x + this.player.width && ballLeft >= this.player1.x &&
            ballTop >= this.player1.y && ballDown <= this.player1.y + this.player.height){
            this.ball.speedY = this.ball.speedY === 0 ? this.ball.speedX : this.ball.speedY;
            this.ball.speedX = - this.ball.speedX;
        }

        if(ballRight >= this.player2.x && ballRight <= this.player2.x + this.player.width &&
            ballTop >= this.player2.y && ballDown <= this.player2.y + this.player.height){
            this.ball.speedY = this.ball.speedY === 0 ? this.ball.speedX : this.ball.speedY;
            this.ball.speedX = - this.ball.speedX;
        }
    }

    movePlayers = () => {
        const speed = 4;
        if(this.player1.up && this.player1.y > 0) {
            this.player1.y = this.player1.y - speed;
        }
        if(this.player1.down && this.player1.y < this.canvas.height - this.player.height) {
            this.player1.y = this.player1.y + speed;
        }
        if(this.player2.up && this.player2.y > 0) {
            this.player2.y = this.player2.y - speed;
        }
        if(this.player2.down && this.player2.y < this.canvas.height - this.player.height) {
            this.player2.y = this.player2.y + speed;
        }
    }

    handleKey = (e) => {
        const keys = {'w': false, 's': false, 'ArrowUp': false, 'ArrowDown': false};
        keys[e.key] = e.type === 'keydown';

        if(e.key === 'w' ) {
            this.player1.up = keys['w'];
        }
        if(e.key === 's'){
            this.player1.down = keys['s'];
        }
        if(e.key === 'ArrowUp') {
            this.player2.up = keys['ArrowUp'];
        }
        if(e.key === 'ArrowDown'){
            this.player2.down = keys['ArrowDown'];
        }
    }

    render() {
        return(
            <canvas className={'Field'}
                tabIndex={0}
                ref={this.props.canvasRef}
                onKeyDown={this.handleKey}
                onKeyUp={this.handleKey}
            />
        );
    }
}

export default Field;