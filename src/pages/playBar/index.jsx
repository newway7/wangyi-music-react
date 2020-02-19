import React, { Component } from 'react'
import { connect } from 'react-redux';

import PlayBarBtn from '../../components/playBar/playBarBtn/index';
import PlayBarMusic from '../../components/playBar/playBarMusic/index';
import PlayBarList from '../../components/playBar/playBarList/index';
import Cover from '../discover/index';

import './style.scss';
import { timeConversion } from '../../utils/utils';
import { SET_CURRENT_MUSIC, SET_INDEX } from '../../store/actionCreate';
import { setCurrentMusic } from '../../components/search/searchSongs/store/action';

class playBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListen: false,
            isShowSongList: false,
            isShowDetail: false,
            time: '00:00',
            endTime: '00:00',
            proportion: 0
        };
    }

    handleClickToShowDetail() {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }

    handleClickToPause(e) {
        e.stopPropagation();
        this.setState({
            isListen: !this.state.isListen
        }, () => {
            this.state.isListen ? this.musicNode.play() : this.musicNode.pause();
        });
        
    }

    handleClickToList(e) {
        e.stopPropagation();
        this.setState({
            isShowSongList: !this.state.isShowSongList
        })
    }

    getAudioRef(e) {
        this.musicNode = e;
    }

    judgeMusicIsEnding() {
        this.props.autoChangeCurrentMusic(this.props.playList, this.props.index);
    }

    controlMusicProgress(progressW, playingProW) {
        let timeProportion = playingProW / progressW;
        this.musicNode.currentTime = this.props.currentMusic.duration * timeProportion;
    }
    
    calculateCurrentTime(time, proportion) {
        this.setState({
            time: time,
            proportion
        })
    }
    
    componentWillReceiveProps() {
        this.setState({
            isListen: true
        });
    }

    componentDidUpdate() {
        this.musicNode.onended = () => {
            this.props.autoChangeCurrentMusic(this.props.playList, this.props.index);
        }
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => {
            let proportion = this.musicNode.currentTime / this.props.currentMusic.duration;
            this.calculateCurrentTime(timeConversion(this.musicNode.currentTime), proportion);
        }, 1000)
    }
    
    render() {
        let { currentMusic, showPlayer } = this.props;
        if (!showPlayer) {
            return '';
        }
        return (
            <div className='play-bar'>
                <PlayBarBtn 
                currentMusic={currentMusic} 
                songStatus={this.state}
                handleClickToShowDetail={this.handleClickToShowDetail.bind(this)}
                handleClickToPause={this.handleClickToPause.bind(this)}
                handleClickToList={this.handleClickToList.bind(this)}
                />
                <PlayBarMusic id={currentMusic.id} musicNode={this.getAudioRef.bind(this)}/>
                <PlayBarList isShowSongList={this.state.isShowSongList} handleClickToList={this.handleClickToList.bind(this)}/>
                <Cover 
                isShowDetail={this.state.isShowDetail}
                isListen={this.state.isListen}
                currentMusic={currentMusic}
                time={this.state.time}
                proportion={this.state.proportion}
                handleClickToShowDetail={this.handleClickToShowDetail.bind(this)}
                handleClickToPause={this.handleClickToPause.bind(this)}
                controlMusicProgress={this.controlMusicProgress.bind(this)}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        playList: state.songs.playList,
        currentMusic: state.songs.currentMusic,
        showPlayer: state.songs.showPlayer,
        index: state.songs.index
    };
}

function mapDispatchToProps(dispatch) {
    return {
        autoChangeCurrentMusic(playList, index) {
            let setIndex;
            index === playList.length -1 ? setIndex = 0 : setIndex = (index + 1);
            dispatch(setCurrentMusic(SET_CURRENT_MUSIC, playList[setIndex]));
            dispatch(setIndex(SET_INDEX, setIndex));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(playBar);
