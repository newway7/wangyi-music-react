import  { combineReducers } from 'redux'

import songs from '../components/search/searchSongs/store/index';

const reducer = combineReducers({
    songs
});

export default reducer;