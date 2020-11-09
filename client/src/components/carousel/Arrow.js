/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import leftArrow from '../img/left-arrow.svg'
import rightArrow from '../img/right-arrow.svg'

const Arrow = ({ direction, handleClick }) => (
  <div className='arrow_wrapper' onClick={handleClick} 
    style={{
      direction : '25px'
    }}  
  >
      </div>
)

export default Arrow
