import React from 'react';

import DiscoverHeader from '../../components/discover/discoverHeader/index';
import DiscoverContent from '../../components/discover/discoverContent/index';
import DiscoverProgress from '../../components/discover/discoverProgress/index';
import DiscoverBtn from '../../components/discover/discoverBtn/index';
import PlayBarList from '../../components/playBar/playBarList/index';

import './style.scss';

export default class Cover extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isShowSongList: false
        };
    }

    handleClickToList() {
        this.setState({
            isShowSongList: !this.state.isShowSongList
        })
    }

    render() {
        const { 
            isShowDetail, 
            isListen, 
            time,
            proportion,
            currentMusic, 
            handleClickToShowDetail, 
            handleClickToPause, 
            controlMusicProgress
        } = this.props;
        
        return (
            <div className={isShowDetail ? 'cover-wrap show' : 'cover-wrap'}>
                <DiscoverHeader handleClickToShowDetail={handleClickToShowDetail} currentMusic={currentMusic}/>
                <DiscoverContent isListen={isListen} currentMusic={currentMusic} handleClickToPause={handleClickToPause}/>
                <DiscoverProgress controlMusicProgress={controlMusicProgress} time={time} proportion={proportion} currentMusic={currentMusic}/>
                <DiscoverBtn isListen={isListen} handleClickToList={this.handleClickToList.bind(this)} handleClickToPause={handleClickToPause}/>
                <PlayBarList isShowSongList={this.state.isShowSongList} handleClickToList={this.handleClickToList.bind(this)}/>
                <div className="cover-mask" style={{'backgroundImage': 'url(' + currentMusic.image + '?param=200y200)'}}></div>
            </div>
        );
    }
}