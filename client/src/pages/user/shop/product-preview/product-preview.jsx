import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail, clearProductDetail } from '../../../../redux/product/product-action'
import Loading from '../../../../components/loading/loading'
import DetailsThumb from "./detail-thumb";
import './product-preview.scss'
import { useState } from 'react'
import { addItem } from '../../../../redux/cart/cart-action'

const ProductPreview = (props) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({ index: 0 })
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [productDetail, setProductDetail] = useState(null)
    const myRef = useRef()

    useEffect(() => {
        setIsLoading(true);
        const id = props.match.params.product;
        dispatch(getProductDetail(id))
            .then(res => {
                setProductDetail(res.payload.data);
                setIsLoading(false);
            })
            .catch(err => {
                setErrorMsg(err.response.data.error)
                setIsLoading(false);
            });

        return () => {
            dispatch(clearProductDetail())
        }
    }, [dispatch, props.match.params.product])

    const handleTab = index => {
        setState({ index: index });
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };


    const renderImage = (images) => {
        if (images.length > 0) {
            return images[state.index].url
        } else {
            return '/images/slide2.jpg'
        }
    }

    const handleAddItem = () => {
        dispatch(addItem(productDetail))
    }

    const productDetails = () => (
        !productDetail ?
            errorMsg && <div className="error_message">
                <h1>{errorMsg}</h1>
            </div>
            :
            <div className="details">
                <div className="big_img">
                    <img src={renderImage(productDetail.images)} alt="product images" />
                </div>
                <div className="box">
                    <div className="row">
                        <h2>{productDetail.name}</h2>
                        <span>Php {productDetail.price}.00</span>
                    </div>
                    <p>{productDetail.description}</p>
                    <DetailsThumb images={productDetail.images} tab={handleTab} myRef={myRef} />

                    <button className="cart" onClick={handleAddItem}>Add to cart</button>
                </div>
            </div>
    )

    return (
        <div className="product_preview_wrapper">
            {
                isLoading ?
                    <Loading />
                    :
                    productDetails()
            }
        </div>

    )
}

export default ProductPreview
