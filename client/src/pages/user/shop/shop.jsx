import React, { useEffect } from 'react';
import CardBlock from '../../../components/utils/card-block/card-block'
import { getCollections } from "../../../redux/collection/collection-action"; 
// import Collection from "../../../components/collection/collection";
import './shop.scss';
import { useSelector } from 'react-redux';

import {store} from "../../../redux/store";


const Shop = () => {

    useEffect(() => {
        store.dispatch(getCollections());
    }, []);

    const collections = useSelector(state => state.collection.collections)
        return (
            <div className="shop_wrapper">
                <CardBlock 
                    list={collections} 
                    title="Shop"
                />
            </div>
            
        )
}



export default Shop;
