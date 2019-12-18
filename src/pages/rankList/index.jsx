import React from 'react';
import axios from 'axios';

import RankListHeader from '../../components/rankList/rankListHeader/index'
import RankListOfficial from '../../components/rankList/rankListOfficial/index'
import RankListGlobal from '../../components/rankList/rankListGlobal/index'

import './style.scss';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rankList: []
        };
    }

    receiveRankListData() {
        axios.get('http://api.mtnhao.com/toplist/detail')
             .then(res => {
                this.setState({
                    rankList: res.data.list
                })
             })
             .catch(err => console.log(err));
    }

    UNSAFE_componentWillMount() {
        this.receiveRankListData();
    }

    render() {
        return (
            <div className='rank-wrap'>
                <RankListHeader/>
                <h3>官方榜单</h3>
                <RankListOfficial rankList={this.state.rankList.slice(0, 4)}/>
                <h3>全球榜</h3>
                <RankListGlobal rankList={this.state.rankList.slice(4)}/>
            </div>
        );
    }
}