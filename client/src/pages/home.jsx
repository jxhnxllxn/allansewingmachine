import React from 'react'
import { useSelector } from 'react-redux'
import CardBlock from '../components/card-block'
import Loading from '../components/loading'
import HomeCollection from '../components/home-collection'
import Slider from '../components/slider'

const Home = () => {
  const productState = useSelector(({ product }) => product)
  const { loading, productToHome, error } = productState

  return (
    <div className='home'>
      <Slider />
    </div>
  )
}

export default Home
