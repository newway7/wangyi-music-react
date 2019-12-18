import React from 'react';
import { withRouter } from 'react-router-dom';

import './style.scss';
import { playCountConversion } from '../../../utils/utils';

class HomeSongList extends React.Component{
    render() {
        return (
            <div className='home-song-list clearfix'>
                {this.props.songList.map((item, index) => {
                    return (
                        <div className="home-song-item" key={index} onClick={() => {this.props.history.push('/playList/' + item.id)}}>
                            <img src={item.picUrl + '?param=200y200'} alt=""/>
                            <p>{item.name}</p>
                            <div className="headset-icon">{playCountConversion(item.playCount)}</div>
                        </div>
                    );
                })}
                
            </div>
        );
    }
}

export default withRouter(HomeSongList);