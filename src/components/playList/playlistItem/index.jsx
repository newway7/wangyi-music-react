import React, { Component } from 'react'
import { connect } from 'react-redux';

import './style.scss';
import { SET_INDEX, SET_CURRENT_MUSIC, SET_PLAYLIST_LIST, SET_PLAY_STATUS } from '../../../store/actionCreate';
import { setIndex, setPlayList, setCurrentMusic, setPlayStatus } from '../../search/searchSongs/store/action';

class PlaylistItem extends Component { 
    render() {
        const { playlist, currentMusic } = this.props;
        console.log(this.props.songList)
        
        return (
            <div className='playlist-item'>
                {
                    playlist.map((item, index) => {
                        return (
                            <div className="songlist-item" key={index} onClick={() => {
                                this.props.handleToClick({index, playStatus: true, songList: this.props.songList, music: { 
                                    id: item.id, 
                                    name: item.name,
                                    singer: item.ar[0].name,
                                    image: item.al.picUrl,
                                    duration: item.dt / 1000
                                }})
                                }}>
                                {
                                    currentMusic.id === item.id ? (
                                        <React.Fragment>
                                            <span className='songlist-index active'>{index + 1}</span>
                                            <div className="songlist-detail active">
                                                <h3>{item.name}</h3>
                                                <p className='active'>{item.ar[0].name} - {item.al.name}</p>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <span className='songlist-index'>{index + 1}</span>
                                            <div className="songlist-detail">
                                                <h3>{item.name}</h3>
                                                <p>{item.ar[0].name} - {item.al.name}</p>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                               
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentMusic: state.songs.currentMusic
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleToClick(arg) {
            const { index, playStatus, music, songList } = arg;
            dispatch(setIndex(SET_INDEX, index));
            dispatch(setPlayList(SET_PLAYLIST_LIST, songList));
            dispatch(setPlayStatus(SET_PLAY_STATUS, playStatus));
            dispatch(setCurrentMusic(SET_CURRENT_MUSIC, music));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);