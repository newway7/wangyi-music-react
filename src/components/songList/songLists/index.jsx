import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './style.scss';
import { playCountConversion } from '../../../utils/utils';

class SongLists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            songList: []
        };
    }

    
    receiveSongListData() {
        axios.get('http://api.mtnhao.com/top/playlist?offset=0&order=hot&limit=20')
             .then(res => {
                this.setState({
                    songList: res.data.playlists
                })
             })
             .catch(err => console.log(err));
    }

    UNSAFE_componentWillMount() {
        this.receiveSongListData();
    }
    
    render() {
        return (
            <div className='song-lists clearfix'>
                {this.state.songList.map((item, index) => {
                    return (
                        <div className="song-item" key={index} onClick={() => {this.props.history.push('/playList/' + item.id)}}>
                            <img src={item.coverImgUrl + '?param=200y200'} alt=""/>
                            <p>{item.name}</p>
                            <div className="headset-icon">{playCountConversion(item.playCount)}</div>
                        </div>
                    );
                })}
                
            </div>
        );
    }
}

export default withRouter(SongLists);