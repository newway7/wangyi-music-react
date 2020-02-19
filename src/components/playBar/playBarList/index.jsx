import React, { Component } from 'react'
import { connect } from 'react-redux';

import './style.scss';
import { setCurrentMusic, delCurrentMusic, setIndex } from '../../search/searchSongs/store/action';
import { SET_CURRENT_MUSIC, DEL_CURRENT_MUSIC, SET_INDEX } from '../../../store/actionCreate';

class PlayBarList extends Component {
    render() {
        const { 
                isShowSongList, 
                handleClickToList, 
                playList, 
                currentMusic, 
                changeCurrentMusic, 
                changePlayList, 
                currentIndex 
              } = this.props;

        return (
            <div className={ isShowSongList ? "playing-song-list show" : "playing-song-list" }>
                <div className="mask" onClick={(e) => {handleClickToList(e)}}></div>
                <div className="playing-list-wrap">
                    <h3>当前歌曲数：{playList.length}</h3>
                    <div className="song-list-box">
                    {
                        playList.map((item, index) => {
                            return (
                                <div className="song-list-item" key={index} onClick={() => changeCurrentMusic(item, index)}>
                                    {
                                        item.id === currentMusic.id ? (<p className='active'>{item.singer} - <span className='active'>{item.name}</span></p>) : (<p>{item.singer} - <span>{item.name}</span></p>)
                                    }
                                    <div className="delete" onClick={(e) => changePlayList(playList, index, currentIndex, e)}></div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        playList: state.songs.playList,
        currentMusic: state.songs.currentMusic,
        currentIndex: state.songs.index
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurrentMusic(value, index) {
            dispatch(setCurrentMusic(SET_CURRENT_MUSIC, value));
            dispatch(setIndex(SET_INDEX, index));
        },
        changePlayList(songs, index, currentIndex, e) {
            e.stopPropagation();
            songs.splice(index, 1);
            let value = Object.assign([], songs);
            // let value = songs.slice(index, index + 1);
            let currentValue = value[index];
            dispatch(delCurrentMusic(DEL_CURRENT_MUSIC, value));
            // 判断删除歌曲列表是在当前播放歌曲的前面还是后面或是当前播放歌曲
            if (index < currentIndex) {
                dispatch(setIndex(SET_INDEX, index));
            }
            
            if (currentIndex === index) {
                if (index === songs.length) {
                    dispatch(setCurrentMusic(SET_CURRENT_MUSIC, value[0]));
                    dispatch(setIndex(SET_INDEX, 0));
                } else {
                    dispatch(setCurrentMusic(SET_CURRENT_MUSIC, currentValue));
                }
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBarList);