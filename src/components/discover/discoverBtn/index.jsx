import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';
import { setCurrentMusic, setIndex } from '../../search/searchSongs/store/action';
import { SET_CURRENT_MUSIC, SET_INDEX } from '../../../store/actionCreate';

class DiscoverBtn extends Component {
    render() {
        const { isListen, playList, currentIndex, handleClickToList, handleClickToPause, handleClickPre, handleClickNext } = this.props;
        
        return (
            <div className='discover-btn'>
                <div className="pre-btn" onClick={() => handleClickPre(currentIndex, playList)}></div>
                <div className={isListen ? "play-song-btn" : "play-song-btn listen"} onClick={(e) => handleClickToPause(e)}></div>
                <div className="next-btn" onClick={() => handleClickNext(currentIndex, playList)}></div>
                <div className="more-btn" onClick={() => handleClickToList()}></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentIndex: state.songs.index,
        playList: state.songs.playList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleClickPre(currentIndex, playList) {
            let index;
            currentIndex === 0 ? index = (playList.length - 1) : index = currentIndex - 1 
            dispatch(setIndex(SET_INDEX, index));
            dispatch(setCurrentMusic(SET_CURRENT_MUSIC, playList[index]));
        },
        handleClickNext(currentIndex, playList) {
            let index;
            currentIndex === (playList.length - 1) ? index = 0 : index = currentIndex + 1
            dispatch(setIndex(SET_INDEX, index));
            dispatch(setCurrentMusic(SET_CURRENT_MUSIC, playList[index]));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverBtn);