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
    // const loading = useSelector(state => state.collection.loading)


    // const data = collections && !loading ? collections : [];

    // const colletionData =  data.map(({_id,collectionPhoto,...otherProps}) => (
    //     <Collection key={_id} {...otherProps}></Collection>
    // ))


        return (
            <div className="shop_wrapper">

                <CardBlock 
                    list={collections} 
                    title="Shop"
                />
            {/* {
                colletionData
            } */}
            </div>
            
        )
}



export default Shop;
