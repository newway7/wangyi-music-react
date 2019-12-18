import axios from 'axios';
import { SET_CURRENT_MUSIC } from '../../../../store/actionCreate';

export const setIndex = (type, value) => ({
    type,
    value
});

export const setPlayList = (type, value) => ({
    type,
    value
});

export const setCurrentMusic = (type, value) => ({
    type,
    value
});

export const setPlayStatus = (type, value) => ({
    type,
    value
});

export const delCurrentMusic = (type, value) => ({
    type,
    value
});

export const setSongsDetail = (id) => {
    return dispatch => {
        axios.get('http://api.mtnhao.com/song/detail?ids=' + id)
             .then(res => {
                 const music = { 
                    id: res.data.songs[0].id, 
                    name: res.data.songs[0].name,
                    singer: res.data.songs[0].ar[0].name,
                    image: res.data.songs[0].al.picUrl,
                    duration: res.data.songs[0].dt / 1000
                };
                dispatch(setCurrentMusic(SET_CURRENT_MUSIC ,music));
             })
             .catch(err => console.log(err));
    }
}