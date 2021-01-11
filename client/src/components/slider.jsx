import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowNarrowLeftIcon } from '../assets/icons/arrow-narrow-left.svg'
import { ReactComponent as ArrowNarrowRightIcon } from '../assets/icons/arrow-narrow-right.svg'

const Slider = () => {
  return (
    <div className='slider'>
      <section className='slide'>
        <div className='slide__content'>
          <h1>Industrial</h1>
          <h2>Sewing Machines</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
            rerum itaque quas. Officiis ipsum quo inventore eum repudiandae
            voluptatibus consequuntur iure excepturi nisi, nulla libero dolorum!
            Eos, doloremque! Beatae, ullam!
          </p>
          <Link>Shop Now</Link>
        </div>
        <div className='slide__images'>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
          <div className='category'></div>
        </div>
      </section>
      <div className='slider__paginate'>
        <div className='slider__left'>
          <p>
            1 / 5 <div className='line'></div> Industrial
          </p>
        </div>
        <div className='slider__right'>
          <ArrowNarrowLeftIcon />
          <ArrowNarrowRightIcon />
        </div>
      </div>
    </div>
  )
}

export default Slider
