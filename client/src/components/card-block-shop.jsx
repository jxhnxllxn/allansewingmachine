import React from "react";
import Product from "../components/product";

const CardBlockShop = (props) => {
   const renderCards = () =>
      props.list ? props.list.map((i) => <Product key={i._id} {...i} />) : null;
   return (
      <div className='card_block_shop'>
         <div>
            <div>
               {props.list ? (
                  props.list.length === 0 ? (
                     <div className='no_result'>sorry, no results</div>
                  ) : null
               ) : null}
               <div
                  style={{
                     display: "grid",
                     gridGap: "1rem",
                     gridTemplateColumns:
                        "repeat(auto-fit, minmax(12rem, 1fr))",
                  }}
               >
                  {renderCards(props.list)}
               </div>
            </div>
         </div>
      </div>
   );
};

export default CardBlockShop;
