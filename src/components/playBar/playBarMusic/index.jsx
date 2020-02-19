import React, { Component } from 'react'

import './style.scss';

export default class PlayBarMusic extends Component {
    render() {
        return (
            <div className='playing-music'>
                <audio src={'https://music.163.com/song/media/outer/url?id='+this.props.id+'.mp3'} autoPlay ref={this.props.musicNode}></audio>
            </div>
        );
    }
}
