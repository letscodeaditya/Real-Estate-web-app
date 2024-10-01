// src/components/ShowMoreFlats.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './FlatList.css';
import Card from '../../components/Card';

const FlatList = () => {
  const { type } = useParams();
  const [flats, setFlats] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const nav = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const cityData = localStorage.getItem("city");
  const city = cityData || 'kolkata'; // Use the city from localStorage or default to 'kolkata'

  useEffect(() => {
    fetchFlats(page);
  }, [page, city, type]);

  const fetchFlats = (pageNumber) => {
    axios.get(`/api/flats/${type}/${city}/${pageNumber}/8`)
      .then(response => {
        setFlats(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error("API error:", error);
      });
  };

  const handleCardClick = (id) => {
    nav(`/flat/${type}/${id}`);
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
    <div className="show-more-flats-container">
      <h2>{`Flats for ${type.charAt(0).toUpperCase() + type.slice(1)} in ${city}`}</h2>
      <div className="flats-grid">
        {flats.map(flat => (
          <Card key={flat.flatId} flat={flat} onClick={() => handleCardClick(flat.flatId)} />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default FlatList;
