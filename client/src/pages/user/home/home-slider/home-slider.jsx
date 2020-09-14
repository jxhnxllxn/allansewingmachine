import React from 'react'
import Slider from 'react-slick';
import MyButton from '../../../../components/utils/button/button';
import './home-slider.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
    const slides = [
            {
                img:'/images/slide.jpg',
                lineOne:'Animal Care',
                lineTwo:'Veterenarian visitation',
                linkTitle:'Set Appointment',
                linkTo:'/shop'
            },
            {
                img:'/images/slide2.jpg',
                lineOne:'Animal Care',
                lineTwo:'Veterenarian visitation',
                linkTitle:'Set Appointment',
                linkTo:'/shop'
            },
            {
                img:'/images/slide.jpg',
                lineOne:'Animal Care',
                lineTwo:' visitation',
                linkTitle:'Set Appointment',
                linkTo:'/shop'
            }
        ]
    
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slideToScroll: 1,
        onLazyLoad:true,
        autoplaySpeed:3000,
        autoplay:true,
    }

    const generateSlide = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="feature_image"
                        style={{
                            background:`url(${item.img})`,
                            height:'65vh',
                            position:'relative'
                        }}
                    >

                        <div className="featured_action" style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '5%',
                        }}>
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
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
