import React from 'react'
import Slider from 'react-slick'
import MyButton from './custom/button'
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
        lazyLoad: ondemand,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slideToScroll: 1,
        onLazyLoad:true,
        autoplaySpeed:5000,
        autoplay:true,
    }

    const generateSlide = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                        style={{
                            background:`url(${item.img})`,
                            minHeight:'73vh',
                            position:'relative',
                            backgroundSize: 'cover',
                        }}
                    >

                        <div className="featured_action" style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '4rem',
                        }}>
                            <div className="tag">
                                <h1 className="title">{item.lineOne}</h1>
                                <h3 className="low_title">{item.lineTwo}</h3>
                            </div>
                            <MyButton type="default" title={item.linkTitle} linkTo={item.linkTo} />
                        </div>

                    </div>
                </div>
            ))
        :null
    )
    return (
        <div className="featured_collection">
            <Slider {...setting}>
                {generateSlide()}
            </Slider>
        </div>
    )
}

export default HomeSlider
