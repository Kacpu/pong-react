import '../App.css';

function ManagePanel(props){
    return(
        <div className={'ManagePanel'}>
            <button onClick={props.onPause}>
                {props.isStart === true ? 'Pause':'Start'}
            </button>
            <label>{props.p1Score} : {props.p2Score}</label>
            <button onClick={props.onReset}>
                Restart
            </button>
        </div>
    );
}

export default ManagePanel;