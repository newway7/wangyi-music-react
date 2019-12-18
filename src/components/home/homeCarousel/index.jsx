import React from 'react';
import Swiper from 'swiper';
import axios from 'axios';

import './style.scss';
import 'swiper/css/swiper.min.css';

export default class HomeCarousel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bannerData: []
        };
    }
    
    getBannerData() {
        axios.get('/banner')
             .then(res => {
                 console.log(res);
                 this.setState({
                     bannerData: res.data.banners
                 });
                 this.initSwiper();
             })
    }
    
    initSwiper() {
        new Swiper('.home-carousel', {
            direction: 'horizontal', // 水平切换选项
            loop: true, // 循环模式选项
            autoplay: {
                delay: 2500,//自动切换的时间间隔
                disableOnInteraction: false,//触碰后自动切换也不会停止
            },
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable :true,
            }
          })      
    }

    componentWillMount() {
        this.getBannerData();
    }
    
    render() {
        const { bannerData } = this.state;
        return (
            <div className="swiper-container home-carousel">
                <div className="swiper-wrapper slider-content">
                    { bannerData.map((item, index) => {
                        return (
                            <div className="swiper-slide" key={index}>
                                <img src={item.imageUrl} alt=""/>
                            </div>
                        )
                    })}
                    
                </div>

                <div className="swiper-pagination"></div>
            </div>
        )
    }
}