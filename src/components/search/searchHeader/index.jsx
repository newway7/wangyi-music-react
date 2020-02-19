import React from 'react';
import { withRouter } from 'react-router-dom';

import './style.scss';
import back from '../../../assets/back.png';

class SearchHeader extends React.Component{
    toBack() {
        this.props.history.go(-1);
    }  

    searchMiddleWare(e) {
        if (e.keyCode === 13) {
            this.props.toSearchResult(e);
        }
    }
    
    render() {
        return (
            <div className='search-header'>
                <img className='search-goback' src={back} alt="" onClick={() => {this.toBack()}}/>
                <input type="text" placeholder='搜索你喜欢的' onKeyDown={(e) => {this.searchMiddleWare(e)}}/>
            </div>
        );
    }
}

export default withRouter(SearchHeader);