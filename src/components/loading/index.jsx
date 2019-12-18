import React from 'react';

import loading from '../../assets/loading.gif';

import './style.scss';


export default function Loading() {
    return (
        <div className="loading">
            <img src={loading} alt=""/>
            正在加载中，请稍后...
        </div>
    );
}
