import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeSlider from '../components/slider'
import CardBlock from '../components/card-block'
import { getProductsToHome } from '../redux/product/product-action'
import Loading from '../components/loading'
import Alert from '../components/alert'
import HomeCollection from '../components/home-collection'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsToHome())
  }, [dispatch])
  const productState = useSelector(({ product }) => product)
  const { loading, productToHome, error } = productState

  return (
    <div className='home_wrapper'>
      <HomeSlider />
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert />
      ) : (
        <>
          <HomeCollection collections={productToHome.collections} />
          <CardBlock list={productToHome.bestSeller} title={'Best seller'} />
        </>
      )}
    </div>
  )
}

export default Home
