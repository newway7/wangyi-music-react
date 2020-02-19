import React from 'react';
import axios from 'axios';
import { Route, Switch, NavLink } from 'react-router-dom';

import SearchHeader from '../../components/search/searchHeader/index';
import SearchHotWord from '../../components/search/searchHotWord/index';
import SearchSongs from '../../components/search/searchSongs/index';
import SearchSongList from '../../components/search/searchSongList/index';
import Loading from '../../components/loading/index';

import './style.scss';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            songsData: [],
            songListData: [],
            songHot: []
        };
    }

    toSearchResult(e) {
        let keywords;
        if (e.currentTarget.value) keywords = e.currentTarget.value; 
        else keywords = e.currentTarget.innerText 
        axios.get('http://api.mtnhao.com/search?offset=0&type=1&limit=20&keywords=' + keywords)
                .then(res => {
                    console.log(res.data.result.songs)
                    this.setState({
                        songsData: res.data.result.songs
                    }, () => {
                        this.props.history.push('/search/songs')
                    });
                }).catch(err => {
                    console.log(err);
                })
        axios.get('http://api.mtnhao.com/search?offset=0&type=1000&limit=20&keywords=' + keywords)
        .then(res => {
            console.log(res.data.result.playlists)
            this.setState({
                songListData: res.data.result.playlists
            });
        }).catch(err => {
            console.log(err);
        })
    }

    getHotWord() {
        axios.get('http://api.mtnhao.com/search/hot')
             .then(res => {
                 this.setState({
                    songHot: res.data.result.hots
                 });
             }).catch(err => {
                console.log(err);
            })
    }

    handleClickToPlayPage(id) {
        this.props.history.push('/playlist/' + id);
    }

    componentWillMount() {
        this.getHotWord();
    }
    
    render() {
        const { songsData, songListData, songHot } = this.state;
        let navTab = '';
        if (songsData.length !== 0) {
            navTab = (<div className="search-nav">
                        <NavLink to='/search/songs'>单曲</NavLink>
                        <NavLink to='/search/songList'>歌单</NavLink>
                    </div>);
        }
        
        return (
            <div className='search-wrap'>
                <SearchHeader toSearchResult={this.toSearchResult.bind(this)}/>
                {songHot.length === 0 ? <Loading/> : ''}
                {navTab}
                <Switch>
                    <Route path='/search' exact>
                        <SearchHotWord songHot={songHot} handleToClickHot={this.toSearchResult.bind(this)}/>
                    </Route>
                    <Route path='/search/songs'>
                        <SearchSongs songsData={songsData} Loading={Loading}/>
                    </Route>
                    <Route path='/search/songList'>
                        <SearchSongList songListData={songListData} handleClickToPlayPage={this.handleClickToPlayPage.bind(this)}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}