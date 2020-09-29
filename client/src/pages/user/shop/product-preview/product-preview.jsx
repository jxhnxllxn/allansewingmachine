import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTop from '../../../../components/utils/page-top/page-top'
import { getProductDetail, clearProductDetail} from '../../../../redux/product/product-action'
import Loading from '../../../../components/loading/loading'
import DetailsThumb from "./detail-thumb";
import './product-preview.scss'
import { useState } from 'react'
import { addItem } from '../../../../redux/cart/cart-action'

const ProductPreview = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({index:0})
    const myRef = useRef();
    useEffect(() => {
        const id = props.match.params.product;
        dispatch(getProductDetail(id));
        return () => {
            dispatch(clearProductDetail())
        }
    }, [])

    const handleTab = index =>{
        setState({index:index});
        const images = myRef.current.children;
        for(let i=0; i<images.length; i++){
          images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };
    
    const productDetail = useSelector(state => state.product.productDetail)

    const renderImage = (images) => {
        if(images.length > 0){
            return images[state.index].url
        }else{
            return '/images/slide2.jpg'
        }
    }

    return (
        <div className="product_preview_wrapper">
            {/* <PageTop
                className="page_top"
                title="Product detail"
            /> */}
            {
                productDetail ? 
                <div className="details">
                    <div className="big_img">
                        <img src={renderImage(productDetail.images)} alt="product images"/>
                    </div>
                    <div className="box">
                        <div className="row">
                            <h2>{productDetail.name}</h2>
                            <span>Php {productDetail.price}.00</span>
                        </div>
                        <p>{productDetail.description}</p>
                        <DetailsThumb images={productDetail.images} tab={handleTab} myRef={myRef} />

                        <button className="cart" onClick={()=> {dispatch(addItem(productDetail))}}>Add to cart</button>
                    </div>
                </div>  
                :<Loading />
            }
        </div>
        
    )
}

export default ProductPreview
