import React from 'react'
import "./Slide.scss"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from "../../assets/optimize2.webp"
import logo2 from "../../assets/optimize3.webp"
import logo3 from "../../assets/optimize4.webp"

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
                    <img src={logo} className="slider-item"></img>
                </div>
                <div>
                    <img src={logo2} className="slider-item"></img>
                </div>
                <div>
                    <img src={logo3} className="slider-item"></img>
                </div>
            </Slider>
        </div>
    )
}

export default Slide