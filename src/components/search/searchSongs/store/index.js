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
        case 'SET_PLAY_LIST': 
            let playList = state.playList;
            playList.push(value);
            return Object.assign({}, state, {
                playList
            });
        case 'SET_PLAYLIST_LIST': 
            return Object.assign({}, state, {
                playList: value
            });
        case 'SET_PLAY_STATUS': 
            return Object.assign({}, state, {
                showPlayer: value
            });
        case 'SET_CURRENT_MUSIC': 
            return Object.assign({}, state, {
                currentMusic: value
            });
        case 'DEL_CURRENT_MUSIC':
            return Object.assign({}, state, {
                playList: value
            })
        default: 
            return state;
    }
}