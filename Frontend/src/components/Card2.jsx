import React from "react";
import "./CardN.css"; // Create this CSS file for styling

const Card2 = ({ property, onClick }) => {
  return (
    <div className="card max-w-sm bg-white shadow-lg rounded-lg overflow-hidden" onClick={onClick}>
    <div className="h-48 w-full">
      <img
        src={property.photo1}
        alt={property.flatId ? property.apartmentName : property.bungalowName}
        className="object-cover h-full w-full"
      />
    </div>
    <div className="card-body p-4">
      <h3 className="text-lg font-semibold">
        {property.flatId ? property.apartmentName : property.bungalowName}
      </h3>
      <p className="text-sm text-gray-600">Furnishing: {property.furnishing}</p>
      <p className="text-sm text-gray-600">Price: {property.price}</p>
    </div>
  </div>
  
  );
};

export default Card2;
