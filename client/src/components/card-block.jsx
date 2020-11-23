import React from "react";
import Product from "../components/product";

const CardBlock = ({ list, title }) => {
   const renderCard = () =>
      list ? list.map((i) => <Product key={i._id} {...i} />) : null;

   return (
      <div className='card-block'>
         {title ? (
            <div className='card-block__title'>
               <h1>{title}</h1>
            </div>
         ) : null}

         <div className='card-block__product-list'>{renderCard()}</div>
      </div>
   );
};

export default CardBlock;
