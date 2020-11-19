import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsToShop } from "../redux/product/product-action";
import { price } from "../components/fixed-categories";
import LoadMoreCards from "../components/load-more";

const ShopCollection = ({ match }) => {
   const dispatch = useDispatch();
   const products = useSelector(({ product }) => product);

   const [state, setState] = useState({
      limit: 20,
      skip: 0,
      filters: {
         // collections: [match.params.collection ? match : null],
         price: [],
      },
   });

   useEffect(() => {
      dispatch(getProductsToShop(state.skip, state.limit, state.filters));
      // eslint-disable-next-line
   }, [dispatch]);

   const handlePrice = (value) => {
      const data = price;
      let array = [];
      for (let key in data) {
         if (data[key]._id === parseInt(value, 10)) {
            array = data[key].array;
         }
      }
      return array;
   };

   const handleFilters = (filters, category) => {
      const newFilters = { ...state.filters };
      newFilters[category] = filters;

      if (category === "price") {
         let priceValues = handlePrice(filters);
         newFilters[category] = priceValues;
      }

      showFilteredResults(newFilters);

      setState({
         ...state,
         filters: newFilters,
      });
   };

   const showFilteredResults = (filters) => {
      dispatch(getProductsToShop(0, state.limit, filters)).then(() => {
         setState({
            ...state,
            skip: 0,
         });
      });
   };

   const loadMoreCards = () => {
      let skip = state.skip + state.limit;
      dispatch(
         getProductsToShop(skip, state.limit, state.filters, products.toShop)
      ).then(() => {
         setState({
            ...state,
            skip,
         });
      });
   };

   return (
      <div className='shop'>
         <div className='shop__toolbar'>Shop / Industrial / 4threads</div>
         <div className='shop__filter'>
            {/* collection then category */}
            <div className='shop__categories'>
               <div className='dropdown'>
                  <span>Household</span>
                  <ul class='dropdown-menu' id='dropdownList'>
                     <li>
                        <a href='#'>Action</a>
                     </li>
                     <li>
                        <a href='#'>Another action</a>
                     </li>
                     <li>
                        <a href='#'>Something else here</a>
                     </li>
                  </ul>
               </div>

               <div className='dropdown'>
                  <span>Industrial</span>
                  <ul class='dropdown-menu' id='dropdownList'>
                     <li>
                        <a href='#'>Action</a>
                     </li>
                     <li>
                        <a href='#'>Another action</a>
                     </li>
                     <li>
                        <a href='#'>Something else here</a>
                     </li>
                  </ul>
               </div>
            </div>
            <div className='shop__filters'>
               <div className='filter'>
                  <span className='title'>Machine Type</span>
                  <ul>
                     <li>
                        <input type='checkbox' name='' id='' /> Embrodery Only
                     </li>
                     <li>
                        <input type='checkbox' name='' id='' /> Commercial
                        Embrodery
                     </li>
                     <li>
                        <input type='checkbox' name='' id='' /> Industrial
                        Sewing
                     </li>
                     <li>
                        <input type='checkbox' name='' id='' /> Industrial
                        Overlock
                     </li>
                     <li>
                        <input type='checkbox' name='' id='' /> Industrial
                        Buttonhole Machines
                     </li>
                  </ul>
                  <span className='filter__showmore'>show more</span>
               </div>
               <div className='filter'>
                  <span className='title'>Brands</span>
                  <ul>
                     <li>BROTHER</li>
                     <li>CHOICE</li>
                     <li>JUKI</li>
                     <li>JACK</li>
                     <li>SIRUBA</li>
                  </ul>
                  <span className='filter__showmore'>show more</span>
               </div>
               <div className='filter'>
                  <span className='title'>Price Range</span>
                  <div></div>
                  <div></div>
               </div>
            </div>
         </div>
         <div className='shop__products'>
            <div className='shop__pagination'></div>
            <div>
               <LoadMoreCards
                  limit={state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => loadMoreCards()}
               />
            </div>
         </div>
      </div>
   );
};

export default ShopCollection;
