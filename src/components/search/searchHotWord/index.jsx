import React from 'react';

import './style.scss';

export default class SearchHotWord extends React.Component{

    
    render() {
        return (
            <div className='search-hot-word'>
                <h5>热门搜素</h5>
                {
                    this.props.songHot.map((item, index) => {
                        return (
                            <div className="search-hot-keyword" key={index} onClick={(e) => {this.props.handleToClickHot(e)}}>
                                <div className="search-keyword-item">{item.first}</div>
                            </div>
                        );
                    })
                }
                
            </div>
        );
    }
}