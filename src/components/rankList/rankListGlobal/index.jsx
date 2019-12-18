import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './style.scss';

class RankListGlobal extends Component {
    render() {
        return (
            <div className='rank-list-global clearfix'>
            {
                this.props.rankList.map((item, index) => {
                    return (
                        <div className="rank-global-item" key={index} onClick={() => {this.props.history.push('/playList/' + item.id)}}>
                            <img src={item.coverImgUrl + '?param=150y150'} alt=""/>
                            <span>{item.updateFrequency}</span>
                            <p>{item.name}</p>
                        </div>
                    );
                })
            }
            </div>
        )
    }
}

export default withRouter(RankListGlobal);
