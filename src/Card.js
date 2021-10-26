import React from "react"

function Card({card, image}) {

    return (
        <img className="Card"
        alt={card}
        src={image}>
        </img>
      );

    }

    export default Card;
