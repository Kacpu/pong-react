import {Component} from "react";
import Field from "./Field";
import ManagePanel from "./ManagePanel";
import '../App.css';

class Game extends Component{
    constructor(props) {
        super(props);
        this.state = {
            p1Score: 0,
            p2Score: 0

        };
    }

    handleReset = () => {

    }

    handlePause = () => {

    }

    render() {
        return(
            <div className={'Game'}>
                <Field />
                <ManagePanel
                    p1Score={this.state.p1Score}
                    p2Score={this.state.p2Score}
                    onPause={this.handlePause()}
                    onReset={this.handleReset()}
                />
            </div>
        );
    }
}

export default Game;