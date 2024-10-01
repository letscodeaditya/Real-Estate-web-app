import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleRight } from "react-icons/fa";
import './TrendingProperty.css'; 
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { LuTrendingUp } from "react-icons/lu";
import { IoIosTime } from "react-icons/io";
import { EmptyComponent } from '../../components/EmptyComponent';




const TrendingProperty = ({ propertyType }) => {

  const [sellProperties,setSellProperties] = useState([]);
  const [rentProperties,setRentProperties] = useState([]);
  const nav = useNavigate();
  const userCity = useSelector((state)=>state.user.city);
  const api = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {


    axios.get(`${api}/api/${propertyType}s/sell/${userCity}/0/4`)
      .then(response => {
        setSellProperties(response.data.content);
      })
      .catch(error => {
        console.error(`Sell ${propertyType}s API error:`, error);
      });




    axios.get(`${api}/api/${propertyType}s/rent/${userCity}/0/4`)
      .then(response => {
        console.log(`Rent ${propertyType}s API response:`, response.data);
        setRentProperties(response.data.content);
      })
      .catch(error => {
        console.error(`Rent ${propertyType}s API error:`, error);
      });


  }, [userCity, propertyType]);

  const handleCardClickSell = (id) => {
    nav(`/${propertyType}/sell/${id}`);
  };
  
  const handleCardClickRent = (id) => {
    nav(`/${propertyType}/rent/${id}`);
  };

  const handleShowMore = (type) => {
    nav(`/${propertyType}/${type}`);
  };

  return (
    <div className="trending-flats-container ">
      {sellProperties.length == 0 && rentProperties.length == 0 &&(<EmptyComponent/>)}
  {sellProperties.length > 0 &&(
    <div className="flat-section bg-white  p-5 shadow" style={{borderRadius:'50px'}}>
      <h2 className='d-flex align-items-center mb-4'  style={{ fontFamily: '"New Amsterdam", sans-serif', fontWeight: '100', fontStyle: 'normal', fontSize: '50px' }}>
        <IoIosTime style={{ fontSize: "70px", color: 'black', marginRight: '10px' }}/>
        Recently added {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}s for Sale in {userCity} -
      </h2>
      <div className="flats-row">
        {sellProperties.map((property, index) => (
          <div className="flat-card-container" key={property[`${propertyType}Id`]}>
            <Card 
              property={property} 
              onClick={() => handleCardClickRent(property[`${propertyType}Id`])} 
            />
            {index === sellProperties.length - 1 && (
              <button className="show-more-btn" onClick={() => handleShowMore('sell')}>
                <FaArrowAltCircleRight />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )}

  {rentProperties.length > 0 && (
    <div className="flat-section bg-white p-5 shadow" style={{borderRadius:'50px',}}>
      <h2 className='d-flex align-items-center' style={{ fontFamily: '"New Amsterdam", sans-serif', fontWeight: '100', fontStyle: 'normal', fontSize: '50px' }}>
       <LuTrendingUp style={{ fontSize: "100px", color: 'red', marginRight: '20px' }} />
        Trending  {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}s for Rent in {userCity} -
      </h2>

      <div className="flats-row">
        {rentProperties.map((property, index) => (
          <div className="flat-card-container" key={property[`${propertyType}Id`]}>
            <Card 
              property={property} 
              onClick={() => handleCardClickRent(property[`${propertyType}Id`])} 
            />
            {index === rentProperties.length - 1 && (
              <button className="show-more-btn" onClick={() => handleShowMore('rent')}>
                <FaArrowAltCircleRight />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
};

export default TrendingProperty; 