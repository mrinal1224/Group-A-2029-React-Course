import React from "react";
import "./card.css";

function Card({title , description ,price}) {
  return (
    <div className="card">
      <img className="card__image" src="" alt="product" />

      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>

        <div className="card__footer">
          <span className="card__price">{price}</span>
          <button className="card__button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
