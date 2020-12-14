import React from 'react'
import { useSelector } from 'react-redux'
import HomeSlider from '../components/slider'
import CardBlock from '../components/card-block'
import Loading from '../components/loading'
import Alert from '../components/alert'
import HomeCollection from '../components/home-collection'

const Home = () => {
  const productState = useSelector(({ product }) => product)
  const { loading, productToHome, error } = productState

  return (
    <div className='home_wrapper'>
      <HomeSlider />
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <HomeCollection />
          <CardBlock list={productToHome} title={'Best sellers'} />
        </>
      )}
    </div>
  )
}

export default Home
