import React from "react";
import Collection from "./collection";

const CardBlock = (props) => {
   const renderCard = () =>
      props.list
         ? props.list.map((card, i) => <Collection key={i} {...card} />)
         : null;

   return (
      <div className='card_block'>
         {props.title ? <div className='title'>{props.title}</div> : null}
         <div
            style={{
               display: "grid",
               zIndex: "-1",
               gridTemplateColumns: "repeat(14rem, 1fr)",
               gridGap: "1rem",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            {renderCard(props.list)}
         </div>
      </div>
   );
};

export default CardBlock;
