import React from "react";
import "./CardN.css"; // Create this CSS file for styling

const Card2 = ({ property, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={property.photo1} alt={property.title} />
      <div className="card-body">
        <h3>{property.title}</h3>
        <p>{property.description}</p>
        <p>Price: {property.price}</p>
      </div>
    </div>
  );
};

export default Card2;
