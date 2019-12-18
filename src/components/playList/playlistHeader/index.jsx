import React from 'react';

import './style.scss';
import toBack from '../../../assets/back.png';

export default class PlaylistHeader extends React.Component {
    render() {
        const { songlistDetail } = this.props; 
        
        if (!songlistDetail.coverImgUrl) {
            return '';
        }
        return (
            <div className='playlist-header'>
                <img className='toback' src={toBack} alt="" onClick={() => {this.props.handleClickToBack()}}/>
                <p>{songlistDetail.name}</p>
                <div className="blur-bg" style={{backgroundImage: 'url('+ songlistDetail.coverImgUrl+'?param=100y100)'}}></div>
            </div>
        );
    }
}