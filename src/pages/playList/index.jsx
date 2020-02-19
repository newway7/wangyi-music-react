import React from 'react';
import axios from 'axios';

import PlaylistHeader from '../../components/playList/playlistHeader/index';
import PlaylistDepict from '../../components/playList/playlistDepict/index';
import PlaylistItem from '../../components/playList/playlistItem/index';

import './style.scss';
export default class Playlist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            songlistDetail: {},
            playlist: [],
            songList: []
        };
    }

    handleClickToBack() {
        this.props.history.go(-1);
    }

    initPageData(callback) {
        axios.get('http://api.mtnhao.com/playlist/detail?id=' + this.props.match.params.id)
             .then(res => {
                this.setState({
                    songlistDetail: res.data.playlist,
                    playlist: res.data.playlist.tracks,
                    songList: callback(res.data.playlist.tracks)
                });
                
             })
             .catch(err => console.log(err));
    }

    getCurrentSongList(list) {
        let songList = [];
        for (let i = 0; i < list.length; i++) {
            songList.push({ 
                id: list[i].id, 
                name: list[i].name,
                singer: list[i].ar[0].name,
                image: list[i].al.picUrl,
                duration: list[i].dt / 1000
            });
        }
        return songList;
    }

    componentWillMount() {
        this.initPageData(this.getCurrentSongList);
    }
    
    render() {
        return (
            <div className='playlist-wrap'>
                <PlaylistHeader handleClickToBack={this.handleClickToBack.bind(this)} songlistDetail={this.state.songlistDetail}/>
                <PlaylistDepict songlistDetail={this.state.songlistDetail}/>
                <PlaylistItem playlist={this.state.playlist} songList={this.state.songList}/>
            </div>
        );
    }
}