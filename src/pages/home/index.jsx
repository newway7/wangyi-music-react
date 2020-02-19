import React from 'react';
import axios from 'axios';

import './style.scss';
import HomeHeader from '../../components/home/homeHeader/index';
import HomeCarousel from '../../components/home/homeCarousel/index';
import HomeOption from '../../components/home/homeOption/index';
import HomeSongList from '../../components/home/homeSongList/index';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            songList: []
        };
    }

    getSongListData() {
        axios.get('/personalized')
             .then(res => {
                 this.setState({
                     songList: res.data.result
                 });
             })
    }
    
    componentWillMount() {
        this.getSongListData();
    }
    
    render() {
        return (
            <div className='home-wrap'>
                <HomeHeader/>
                <div className="carousel-bg"></div>
                <HomeCarousel/>
                <HomeOption/>
                <h3>推荐歌单</h3>
                <HomeSongList songList={this.state.songList}/>
            </div>
        );
    }
}