import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PropertyWishlist.css';
import Card from './Card';

const PropertyWishlist = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const api = import.meta.env.VITE_API_BASE_URL;
  const nav = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, [currentPage, userId]); // Re-fetch properties when page changes

  const fetchProperties = () => {
    axios.get(`${api}/api/user-interests/${userId}?page=${currentPage}&size=4`) // Assuming 4 properties per page
      .then(response => {
        setProperties(response.data.content); // content holds the list of properties
        setTotalPages(response.data.totalPages); // totalPages indicates how many pages exist
      })
      .catch(error => console.error(error));
  };

  const handleOpen = (property) => {
    if (property.type === 'sell') {
      if (property.flatId) {
        nav(`/flat/sell/${property.flatId}`);
      } else {
        nav(`/bungalow/sell/${property.bungalowId}`);
      }
    } else {
      if (property.flatId) {
        nav(`/flat/rent/${property.flatId}`);
      } else {
        nav(`/bungalow/rent/${property.bungalowId}`);
      }
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="con">
      <h2 className="ti">User Wishlist</h2>
      {/* <div className="card-container">
        {properties.map(property => (
          <div className="car hover:pointer" key={property.id} onClick={() => handleOpen(property)}>
            <img src={property.photo1 || 'default-image.jpg'} alt={property.name || 'Property'} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{property.apartmentName || 'Property'}</h5>
              <p className="card-text">{property.price || 'Not disclosed.'}</p>
            </div>
          </div>
        ))}
      </div> */}

      <div className="properties-grid">
        {properties.map(property => (
          <Card
            key={property.flatId || property.bungalowId}
            property={property}
            onClick={() => handleOpen(property)}
          />
        ))}
      </div>

      <div className="pagination-controls">
          <button onClick={goToPreviousPage} disabled={currentPage === 0}>Previous</button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default PropertyWishlist;
