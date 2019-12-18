const defaultState = {
    index: 0,
    playList: [],
    currentMusic: {},
    showPlayer: false
};

export default (state = defaultState, action) => {
    const { type, value } = action;
    switch(type) {
        case 'SET_INDEX': 
            return Object.assign({}, state, {
                index: value
            });
        case 'SET_PLAY_LIST': //添加到播放列表；
            let playList = state.playList;
            playList.push(value);
            return Object.assign({}, state, {
                playList
            });
        case 'SET_PLAYLIST_LIST': //设置播放列表
            return Object.assign({}, state, {
                playList: value
            });
        case 'SET_PLAY_STATUS': //播放或者暂停
            return Object.assign({}, state, {
                showPlayer: value
            });
        case 'SET_CURRENT_MUSIC': //设置当前播放音乐
            return Object.assign({}, state, {
                currentMusic: value
            });
        case 'DEL_CURRENT_MUSIC'://删除播放列表中的音乐
            return Object.assign({}, state, {
                playList: value
            })
        default: //默认
            return state;
    }
}