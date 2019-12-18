import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './style.scss';

class rankListOfficial extends Component {    
    render() {
        return (
            <div className='rank-list-official'>
                {
                    this.props.rankList.map((item, index) => {
                        return (
                            <div className="rank-official-item" key={index} onClick={() => {this.props.history.push('/playList/' + item.id)}}>
                                <img src={item.coverImgUrl + '?param=150y150'} alt=""/>
                                <div className="official-songs">
                                {
                                    item.tracks.map((innerItem, innerIndex) => {
                                        return (
                                            <p key={innerIndex}>{innerItem.first}-{innerItem.second}</p>
                                        );
                                    })
                                }
                                </div>
                                <span>{item.updateFrequency}</span>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default withRouter(rankListOfficial);