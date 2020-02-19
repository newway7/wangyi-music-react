import React, { Component } from 'react'

import './style.scss';
import back from '../../../assets/back.png';

export default class DiscoverHeader extends Component {
    render() {
        const { currentMusic } = this.props;
        
        return (
            <div className='discover-header'>
                <img src={back} alt="" onClick={(e) => this.props.handleClickToShowDetail(e)}/>
                <div className="discover-header-songs">
                    <h3>{currentMusic.name}</h3>
                    <p>{currentMusic.singer}</p>
                </div>
            </div>
        )
    }
}
