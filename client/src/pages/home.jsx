import React from 'react'
import { useSelector } from 'react-redux'
import HomeSlider from '../components/slider'
import CardBlock from '../components/card-block'
import Loading from '../components/loading'
import HomeCollection from '../components/home-collection'

const Home = () => {
  const productState = useSelector(({ product }) => product)
  const { loading, productToHome, error } = productState

  return (
    <div className='home'>
      <HomeSlider />
      <div className='home__collections'>
        <HomeCollection />
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className='home__products'>
          <CardBlock list={productToHome} title={'Best sellers'} />
        </div>
      )}
    </div>
  )
}

export default Home
