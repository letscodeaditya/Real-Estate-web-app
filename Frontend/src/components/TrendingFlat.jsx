import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleRight } from "react-icons/fa";
import './TrendingFlat.css';

const TrendingFlat = () => {
  const [sellFlats, setSellFlats] = useState([]);
  const [rentFlats, setRentFlats] = useState([]);
  const nav = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const selectedCity = localStorage.getItem("city") || 'kolkata';
  const city = user ? user.city : selectedCity;

  useEffect(() => {
    axios.get(`/api/flats/sell/${city}/0/4`)
      .then(response => {
        console.log("Sell flats API response:", response.data);
        setSellFlats(response.data.content);
      })
      .catch(error => {
        console.error("Sell flats API error:", error);
      });

    axios.get(`/api/flats/rent/${city}/0/4`)
      .then(response => {
        console.log("Rent flats API response:", response.data);
        setRentFlats(response.data.content);
      })
      .catch(error => {
        console.error("Rent flats API error:", error);
      });
  }, [city]);

  const handleCardClickSell = (id) => {
    nav(`/flat/sell/${id}`);
  };

  const handleCardClickRent = (id) => {
    nav(`/flat/rent/${id}`);
  };

  const handleShowMore = (type) => {
    nav(`/flats/${type}`);
  };

  return (
    <div className="trending-flats-container">
      <div className="flat-section">
        <h2>Flats for Sale in {city}</h2>
        <div className="flats-row">
          {sellFlats.length === 0 ? (
            <p>No flats available for sale</p>
          ) : (
            sellFlats.map((flat, index) => (
              <div className="flat-card-container" key={flat.flatId}>
                <Card flat={flat} onClick={() => handleCardClickSell(flat.flatId)} />
                {index === sellFlats.length - 1 && (
                  <button className="show-more-btn" onClick={() => handleShowMore('sell')}>
                    <FaArrowAltCircleRight />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flat-section">
        <h2>Flats for Rent in {city}</h2>
        <div className="flats-row">
          {rentFlats.length === 0 ? (
            <p>No flats available for rent</p>
          ) : (
            rentFlats.map((flat, index) => (
              <div className="flat-card-container" key={flat.flatId}>
                <Card flat={flat} onClick={() => handleCardClickRent(flat.flatId)} />
                {index === rentFlats.length - 1 && (
                  <button className="show-more-btn" onClick={() => handleShowMore('rent')}>
                    <FaArrowAltCircleRight />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingFlat;
