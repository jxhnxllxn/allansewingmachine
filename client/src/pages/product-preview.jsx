import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProductDetail,
  clearProductDetail,
} from '../redux/product/product-action'
import Loading from '../components/loading'
import DetailsThumb from '../components/detail-thumb'
import { addItem } from '../redux/cart/cart-action'
import MyButton from '../components/button'
import { useHistory } from 'react-router-dom'

const ProductPreview = (props) => {
  const dispatch = useDispatch()

  const history = useHistory()
  const myRef = useRef()
  const [state, setState] = useState({ index: 0 })
  const productState = useSelector(({ product }) => product)
  const { loading, error, productDetail } = productState

  useEffect(() => {
    console.log(history)
    const id = props.match.params.product
    dispatch(getProductDetail(id))

    return () => {
      dispatch(clearProductDetail())
    }
    // eslint-disable-next-line
  }, [props.match.params.product])

  const handleTab = (index) => {
    setState({ index: index })
    const images = myRef.current.children
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace('active', '')
    }
    images[index].className = 'active'
  }

  const renderImage = (images) => {
    if (images && images.length > 0) {
      return images[state.index].url
    } else {
      return '/images/sewer.jpg'
    }
  }

  const handleAddItem = () => {
    dispatch(addItem(productDetail))
  }

  return (
    <div className='product_preview_wrapper'>
      {console.warn(productState.productDetail)}
      {loading ? (
        <Loading />
      ) : error ? (
        <div className='error_message'>
          <h1>{error}</h1>
        </div>
      ) : (
        <div className='details'>
          <div className='big_img'>
            <img src={renderImage(productDetail.images)} alt='product images' />
          </div>
          <div className='box'>
            <div>
              <h2>{productDetail.name}</h2>
              <h3>Php {productDetail.price}.00</h3>
            </div>
            <p>{productDetail.description}</p>

            <DetailsThumb
              images={productDetail.images}
              tab={handleTab}
              myRef={myRef}
            />

            <MyButton
              type={'primary'}
              title={'Add to Cart'}
              runAction={handleAddItem}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPreview
