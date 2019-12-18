import React from 'react';

import './style.scss';

export default class SearchSongList extends React.Component{
    render() {
        return (
            <div className='search-song-list'>
                {
                    this.props.songListData.map((item, index) => {
                        return (
                            <div className="search-song-list-item" key={index} onClick={() => {this.props.handleClickToPlayPage(item.id)}}>
                                <img src={item.coverImgUrl + '?param=70y70'} alt=""/>
                                <div className="song-list-detail">
                                    <h3>{item.name}</h3>
                                    <p>{item.trackCount} by {item.creator.nickname}，播放{item.playCount}次</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}