import React from 'react'
import Slider from 'react-slick'
import MyButton from './button'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeSlider = () => {
    const slides = [
            {
                img:'/images/image2.jpg',
                lineOne:'Subcon Jobs',
                lineTwo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ad vitae non, deserunt molestiae repudiandae recusandae asperiores eveniet accusamus fugiat.',
                linkTitle:'Contact us',
                linkTo:'/contact'
            },
            {
                img:'/images/image1.jpg',
                lineOne:'Shop',
                lineTwo:'We sell brand new, secondhand and sewing parts',
                linkTitle:'Shop now',
                linkTo:'/shop'
            }
        ]
    
    const setting = {
        lazyLoad: true,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slideToScroll: 1,
    }

    const generateSlide = () => (
        slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                        
                        style={{
                                backgroundImage:`url(${item.img})`,
                                height: '80vh',
                        }}
                    >
                        <div className="featured_action">
                            <div className="featured_tag">
                                <h1>{item.lineOne}</h1>
                                <h2>{item.lineTwo}</h2>
                                <MyButton type="default" title={item.linkTitle} linkTo={item.linkTo} />
                            </div>
                        
                        </div>
                    </div>

                    

                </div>
            ))
        :null
    )
    return (
        <div className="featured_collection">
            <Slider {...setting} >
                {generateSlide()}
            </Slider>
        </div>
    )
}

export default HomeSlider