// src/components/PropertyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PropertyList.css';
import Card from '../../components/Card';
import { useSelector } from 'react-redux';
import NotFound from '../../components/NotFound';



const PropertyList = () => {
  const { type, propertyType } = useParams(); 
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const nav = useNavigate();
  const city = useSelector((state)=>state.user.city);


  useEffect(() => {
    fetchProperties(page);
  }, [page, city, type, propertyType]);

  const fetchProperties = (pageNumber) => {
    axios.get(`/api/${propertyType}s/${type}/${city}/${pageNumber}/8`)
      .then(response => {
        setProperties(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error("API error:", error);
      });
  };

  const handleCardClick = (id) => {
    nav(`/${propertyType}/${type}/${id}`);
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="show-more-properties-container">
      <h2>{`${propertyType ? propertyType.charAt(0).toUpperCase() + propertyType.slice(1) : ''} for ${type.charAt(0).toUpperCase() + type.slice(1)} in ${city}`}</h2>
      {properties.length === 0 ? (
          <NotFound/>
        ) : (<>
      <div className="properties-grid">
        {properties.map(property => (
          <Card
            key={property.flatId || property.bungalowId}
            property={property}
            onClick={() => handleCardClick(property.flatId || property.bungalowId)}
          />
        ))}
      </div>
          <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
          <span>Page {page + 1} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
        </div></>)}

    </div>
  );
};

export default PropertyList;
