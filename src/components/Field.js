import React, {Component} from "react";

class Field extends Component{
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvas = {
            width: 800,
            height: 500
        }
        this.player = {
            x: 20,
            width: 10,
            height: 70
        }
        this.player1 = {
            y: this.canvas.height/2 - this.player.height/2,
            up: false,
            down: false
        };
        this.player2 = {
            y: this.canvas.height/2 - this.player.height/2,
            up: false,
            down: false
        }
        this.ball = {
            speed: 5,
            radius: 10,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        canvas.focus();
        const ctx = canvas.getContext('2d')
        const p1x = this.player.x;
        const p2x = canvas.width - this.player.x - this.player.width;
        this.ball.x = this.ball.x - this.ball.radius/2;
        this.ball.y = this.ball.y - this.ball.radius/2;
        this.interval = setInterval(() => {this.draw(ctx, p1x,p2x)}, 1000/60);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    draw = (ctx, p1x, p2x) => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.movePlayers();
        this.drawPlayer(ctx, p1x, this.player1.y);
        this.drawPlayer(ctx, p2x, this.player2.y);
        this.drawBall(ctx);
    }

    drawPlayer = (ctx, x, y) => {
        ctx.fillRect(x, y, this.player.width, this.player.height);
    }

    drawBall = (ctx) => {
        if(this.ball.x - this.ball.radius < 0 || this.ball.x + this.ball.radius > this.canvas.width){
            this.ball.speed = - this.ball.speed;
        }

        if(this.ball.y - this.ball.radius < 0 || this.ball.y + this.ball.radius > this.canvas.height){
            this.ball.speed = - this.ball.speed;
        }

        this.ball.x = this.ball.x - this.ball.speed;
        this.ball.y = this.ball.y - this.ball.speed;

        ctx.beginPath();
        ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI);
        ctx.fill();
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
            <canvas tabIndex={0}
                    ref={this.canvasRef}
                    onKeyDown={this.handleKey}
                    onKeyUp={this.handleKey}
            />
        );
    }
}

export default Field;