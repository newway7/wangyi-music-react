import React, { Component } from 'react'

import './style.scss';

export default class DiscoverContent extends Component {
    render() {
        const { isListen, currentMusic, handleClickToPause } = this.props;
        
        return (
            <div className='discover-content'>
                <div className={isListen ? "listen-bar listen" : "listen-bar"}></div>
                <div className={isListen ? "spin-disc rotate" : "spin-disc"} onClick={(e) => handleClickToPause(e)}>
                    <img src={currentMusic.image + '?param=200y200'} alt=""/>
                </div>
            </div>
        )
    }
}
