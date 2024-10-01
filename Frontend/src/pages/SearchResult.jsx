import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./SearchResult.css"; // Create this CSS file for styling
import Card2 from "../components/Card2";
import Card from "../components/Card";
import NotFound from "../components/NotFound";

const SearchResult = () => {
  const { propertyType, type, city, flatSize, pageno, size } = useParams();
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/${propertyType}/${type}/${city}/${flatSize}/${pageno}/${size}`)
      .then(response => {
        setProperties(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error(`Error fetching properties:`, error);
      });
  }, [propertyType, type, city, flatSize, pageno, size]);

  const handlePageChange = (newPage) => {
    navigate(`/searchresult/${propertyType}/${type}/${city}/${flatSize}/${newPage}/${size}`);
  };

  const handleCardClick = (id) => {
    nav(`/${propertyType}/${type}/${id}`);
  };

  return (
    <div className="search-result-container">
      <h1 className="mt-2 mb-5" style={{ fontFamily: '"New Amsterdam", sans-serif', fontWeight: '100', fontStyle: 'normal', fontSize: '50px' }}>Search Results -</h1>
      <div className="properties-row">
        {properties.length === 0 ? (
          <NotFound/>
        ) : (
          properties.map((property) => (

              <Card2 property={property} onClick={() => handleCardClick(property[`${propertyType}Id`])} />

          ))
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={index === parseInt(pageno) ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
