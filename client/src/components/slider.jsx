import React from 'react'
const HomeSlider = () => {
    const slides = [
            {
                _id:'1',
                img:'/images/image2.jpg',
                lineOne:'Subcon Jobs',
                lineTwo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ad vitae non, deserunt molestiae repudiandae recusandae asperiores eveniet accusamus fugiat.',
                linkTitle:'Contact us',
                linkTo:'/contact'
            },
            {
                _id:'2',
                img:'/images/image1.jpg',
                lineOne:'Shop',
                lineTwo:'We sell brand new, secondhand and sewing parts',
                linkTitle:'Shop now',
                linkTo:'/shop'
            },
            {
                _id:'3',
                img:'/images/image1.jpg',
                lineOne:'Shop',
                lineTwo:'We sell brand new, secondhand and sewing parts',
                linkTitle:'Shop now',
                linkTo:'/shop'
            }
        ]
    
    const generateSlides = () => (
        slides.map(x => (
            <div key={x._id} className="mySlide" style={{backgroundImage:`url(${x.img})`}}>
                <div className="numbertext">1 /3 </div>
                <div className="text">{x.lineOne}</div>
            </div>
        ))
    )
    
    const generateDots = () => (
        slides.map((x) => (
            <span key={x._id} className="dot">x</span>
        ))
    )

    const plusSlides = n =>{

    }
    

    return (
        <div className="slider_wrapper">
                {generateSlides()}
                

                <div className="prev" onClick={plusSlides(-1)}>&#10094;</div>
                <div className="next" onClick={plusSlides(1)}>&#10095;</div>

                {generateDots()}
        </div>
    )
}

export default HomeSlider
