import React from 'react'
import Slider from 'react-slick'
import MyButton from './button'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeSlider = () => {
    const slides = [
            {
                img:'/images/sewer.jpg',
                lineOne:'Subcontracting',
                lineTwo:'Lorem ipsum dolor sit amet.',
                linkTitle:'Contact us',
                linkTo:'/contact'
            },
            {
                img:'/images/shop.jpg',
                lineOne:'Shop',
                lineTwo:'We sell brand new, secondhand and sewing parts',
                linkTitle:'Shop now',
                linkTo:'/shop'
            }
        ]
    
    const setting = {
        lazyLoad: true,
        dots: true,
        fade: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slideToScroll: 1,
        autoplaySpeed:5000,
        autoplay:true,
        centerPadding:'100px',
        arrows: false
    }

    const generateSlide = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                        style={{
                                backgroundImage:`linear-gradient(to right bottom,
                                    rgb(246, 214, 125, .8),
                                    rgb(235, 230, 211, .8)
                                ),url(${item.img})`,
                                height: '80vh',
                                width:'70vw',
                        }}
                    >

                        {/* <div className="featured_action">
                            <div className="tag">
                                <h1 className="title">{item.lineOne}</h1>
                                <h2 className="low_title">{item.lineTwo}</h2>
                            </div>
                            <MyButton type="default" title={item.linkTitle} linkTo={item.linkTo} />
                        </div> */}

                    </div>
                </div>
            ))
        :null
    )
    return (
        <div className="featured_collection container">
            <Slider {...setting} >
                {generateSlide()}
            </Slider>
        </div>
    )
}

export default HomeSlider
