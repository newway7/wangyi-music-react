import React, { Component } from 'react'

import './style.scss';
import { timeConversion } from '../../../utils/utils';

export default class DiscoverProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        }
    }
    
    handleProgressMove() {
        let controlMusicProgress = this.props.controlMusicProgress;
        
        let progress = this.progress;
        let dot = this.dot;
        let playingPro = this.playingPro;

        let progressLeft = progress.offsetLeft;
        let progressW = progress.offsetWidth - dot.offsetWidth;
        let playingProW;
        progress.ontouchstart = function(e) {
            let clickX = e.changedTouches[0].pageX - progressLeft;
            controlMusicProgress(progressW, clickX);
            playingPro.style.width = clickX + 'px';
        }
        dot.ontouchstart = function(e) {
            e.stopPropagation();
            window.ontouchmove = function(e) {
                let mouseX = e.changedTouches[0].pageX;
                playingProW = mouseX - progressLeft;
                if (playingProW >= progressW) {
                    playingProW = progressW;
                }
                if (playingProW <= 0) {
                    playingProW = 0;
                }
                playingPro.style.width = playingProW + 'px';
            }
            window.ontouchend = function() {
                controlMusicProgress(progressW, playingProW);
                window.ontouchmove = null;
                window.ontouchend = null;
            }
        }
    }

    setProgressWidth() {
        this.playingPro.style.width = this.props.proportion * (this.progress.offsetWidth - this.dot.offsetWidth) + 'px';
    }
    
    componentDidMount() {
        this.handleProgressMove();
    }

    componentDidUpdate() {
        this.setProgressWidth();
    }
    
    render() {
        return (
            <div className='discover-progress'>
                <span className='start-time'>{this.props.time}</span>
                <div className="progress-bar" ref={e => this.progress = e}>
                    <p ref={e => this.playingPro = e}></p>
                    <span ref={e => this.dot = e}></span>
                </div>
                <span className='end-time'>{timeConversion(this.props.currentMusic.duration)}</span>
            </div>
        )
    }
}
