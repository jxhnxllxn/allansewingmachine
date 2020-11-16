import React, { useEffect } from "react";
import { getCollections } from "../redux/collection/collection-action";
import { useDispatch, useSelector } from "react-redux";

const Shop = () => {
   const dispatch = useDispatch();
   const collectionState = useSelector(({ collection }) => collection);
   const { loading, collections, error } = collectionState;

   useEffect(() => {
      dispatch(getCollections());
   }, [dispatch]);

   return (
      <div className='shop'>
         <div className='shop__main'></div>
         <div className='shop__collections'></div>
      </div>
   );
};

export default Shop;
