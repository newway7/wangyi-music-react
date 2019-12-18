import React from 'react';

import SongListHeader from '../../components/songList/songListHeader';
import SongLists from '../../components/songList/songLists';

import './style.scss';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='song-list-wrap'>
                <SongListHeader/>
                <SongLists/>
            </div>
        );
    }
}