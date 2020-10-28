import React, { useEffect, useState } from 'react';
import CardBlockCollection from '../components/custom/card-block-collection'
import { getCollections } from "../redux/collection/collection-action"; 
// import Collection from "../../../components/collection/collection";
import { useSelector } from 'react-redux';

import {store} from "../redux/store";
import Loading from '../components/loading';


const Shop = () => {
    const [state, setState] = useState({
        isLoading:true,
    })

    useEffect(() => {
        store.dispatch(getCollections()).then(() => {
            setState({isLoading:false})
        });
    }, []);

    const collections = useSelector(state => state.collection.collections)
        return (
            <div className="shop_wrapper">
                {
                    state.isLoading ? <Loading/>:
                    <CardBlockCollection
                        list={collections} 
                        title="Shop"
                    />
                }
                
            </div>
        )
}



export default Shop;
