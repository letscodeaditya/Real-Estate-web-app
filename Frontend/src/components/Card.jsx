import React from 'react';
import './Card.css';

const Card = ({ property, onClick }) => {
  const cardStyle = property.type === "sell" 
    ? { backgroundColor: '#FFF5E1' } 
    : { backgroundColor: '#FFF5E1' };

  return (
    <div className="card rounded-3" style={cardStyle} onClick={() => onClick(property.flatId || property.bungalowId)}>
      <div className="im" style={{ backgroundImage: `url(${property.photo1})` }}></div>
      <div id="w">
        <div className="s">{property.type} {property.flatId ? 'Flat' : 'Bungalow'}</div>
        <div id="e">{property.price} | {property.flatAreaSquare}</div>
        <div className="s">{property.city}</div>
        <div className="s">Old: {property.ageOfConstruction} yrs</div>
      </div>
    </div>
  );
};

export default Card;
