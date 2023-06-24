import React from 'react'
import "./Slide.scss"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"

const Slide = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        centerMode:true,
        centerPadding:"0px",
    };
    return (
        <div className='Slide'>
            <Slider {...settings}>
                <div>
                    <img src={banner1} className="slider-item"></img>
                </div>
                <div>
                    <img src={banner2} className="slider-item"></img>
                </div>
            </Slider>
        </div>
    )
}

export default Slide