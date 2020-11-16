import React from "react";
import Product from "../components/product";
import ArrowTitle from "../assets/images/arrow-title-1.png";

const CardBlock = ({ list, title }) => {
   const renderCard = () =>
      list ? list.map((card, i) => <Product key={i} {...card} />) : null;

   return (
      <div className='card-block'>
         {title ? (
            <div className='card-block__title'>
               <span>{title}</span>
               <img src={ArrowTitle} alt='arrow-title' />
            </div>
         ) : null}

         <div className='card-block__product-list'>{renderCard(list)}</div>
      </div>
   );
};

export default CardBlock;
