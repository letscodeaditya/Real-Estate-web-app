import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./SearchResult.css"; // Create this CSS file for styling
import Card2 from "../components/Card2";
import NotFound from "../components/NotFound";

const SearchResult = () => {
  const { propertyType, type, city, flatSize, pageno, size } = useParams();
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("price_asc"); // Default sort order
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_BASE_URL;


  // Fetch data from the backend
  useEffect(() => {
    axios.get(`${api}/api/${propertyType}s/${type}/${city}/${flatSize}/${pageno}/${size}?sort=${sortOrder}`)
      .then(response => {
        console.log(response.data)
        setProperties(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error(`Error fetching properties:`, error);
      });
  }, [propertyType, type, city, flatSize, pageno, size, sortOrder]); // Added sortOrder to the dependency array

  const handlePageChange = (newPage) => {
    navigate(`/searchresult/${propertyType}/${type}/${city}/${flatSize}/${newPage}/${size}`);
  };

  const handleCardClick = (id) => {
    navigate(`/${propertyType}/${type}/${id}`);
  };

  // Handle sort order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="search-result-container">
      <h1 className="mt-2 mb-5" style={{ fontFamily: '"New Amsterdam", sans-serif', fontWeight: '100', fontStyle: 'normal', fontSize: '50px' }}>
        Search Results -
      </h1>

      {/* Sort dropdown */}
      <div className="sort-options">
        <label htmlFor="sortOrder" className="mr-3">Sort by:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className="border rounded-md" style={{paddingRight:'30px'}}>
          <option value="price_asc">Price: High to Low</option>
          <option value="price_desc">Price: Low to High</option>
        </select>
      </div>

      <div className="properties-row mt-5">
        {properties.length === 0 ? (
          <NotFound/>
        ) : (
          properties.map((property) => (
            <Card2
              key={property[`${propertyType}Id`]}
              property={property}
              onClick={() => handleCardClick(property[`${propertyType}Id`])}
            />
          ))
        )}
      </div>

      <div className="pagination mt-5">
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
