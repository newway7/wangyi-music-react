import React from 'react';
import { withRouter } from 'react-router-dom';

// import './style.scss';
import toBack from '../../../assets/back.png';

class RankListHeader extends React.Component {
    handleClickToBack() {
        this.props.history.go(-1);
    }
    
    render() {
        return (
            <div className='song-lists-header'>
                <img className='toback' src={toBack} alt="" onClick={() => {this.handleClickToBack()}}/>
                <p>排行榜</p>
            </div>
        );
    }
}

export default withRouter(RankListHeader);