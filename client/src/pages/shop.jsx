import React, { useEffect } from 'react';
import CardBlockCollection from '../components/card-block-collection'
import { getCollections } from "../redux/collection/collection-action"; 
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/alert'
import Loading from '../components/loading';


const Shop = () => {
    const dispatch = useDispatch()
    const collectionState = useSelector(state => state.collection)
    const {loading,collections,error} = collectionState;

    useEffect(() => {
        dispatch(getCollections())
    }, [dispatch]);

        return (
            <div className="shop_wrapper">
                {
                    loading ? <Loading/> : error ? <Alert message={error} variant='danger'/>:
                    <CardBlockCollection
                        list={collections} 
                        title="Shop"
                    />
                }
            </div>
        )
}



export default Shop;
