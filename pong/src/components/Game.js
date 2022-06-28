import React, {Component} from "react";
import Field from "./Field";
import ManagePanel from "./ManagePanel";
import '../App.css';

class Game extends Component{
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.saveTime = 0;
        this.state = {
            isStart: true,
            p1Score: 0,
            p2Score: 0,
            time: {
                s: 0,
                min: 0
            }
        };
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.timerInterval);
    }

    startGame = (setField, draw) => {
        this.canvas = this.canvasRef.current
        this.ctx = this.canvasRef.current.getContext('2d');
        this.setField = setField;
        this.draw = draw;
        this.setField();
        this.canvas.focus();
        this.startTime = Date.now();
        this.timerInterval = setInterval(this.getTime, 1000);
        this.interval = setInterval(() => {this.draw(this.ctx)}, 1000/60);
    }

    handleUpdateScore = (p) => {
        if(p==='1'){
            this.setState((prev) => ({p1Score: prev.p1Score + 1}))
        }
        if(p==='2'){
            this.setState((prev) => ({p2Score: prev.p2Score + 1}))
        }
    }

    handlePause = () => {
        this.setState((prev) => ({isStart: !prev.isStart}))
        if(this.state.isStart){
            this.saveTime = this.saveTime + Date.now() - this.startTime;
            clearInterval(this.interval);
            clearInterval(this.timerInterval);
        } else{
            this.startTime = Date.now();
            this.interval = setInterval(() => {this.draw(this.ctx)}, 1000/60);
            this.timerInterval = setInterval(this.getTime, 1000);
        }
        this.canvas.focus();
    }

    handleReset = () => {
        clearInterval(this.timerInterval);
        this.setState({p1Score: 0, p2Score: 0})
        this.setState({time: {min: 0, s: 0}});
        this.saveTime = 0;
        this.setField();
        this.timerInterval = setInterval(this.getTime, 1000);
        this.startTime = Date.now();
        this.canvas.focus();
    }

    getTime = () => {
        this.time = Date.now() - this.startTime + this.saveTime;
        const min = Math.floor(this.time / 60000);
        const s = Math.floor((this.time % 60000) / 1000);
        this.setState({time: {min: min, s: s}});
    };

    render() {
        return(
            <div className={'Game'}>
                <div className={'Timer'}>
                    Time: {this.state.time.min} min {this.state.time.s} s
                </div>
                <Field
                    canvasRef={this.canvasRef}
                    start={this.startGame}
                    updateScore={this.handleUpdateScore}
                />
                <ManagePanel
                    p1Score={this.state.p1Score}
                    p2Score={this.state.p2Score}
                    onPause={this.handlePause}
                    onReset={this.handleReset}
                    isStart={this.state.isStart}
                />
            </div>
        );
    }
}

export default Game;