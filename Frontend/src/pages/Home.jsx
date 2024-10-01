import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import TrendingProperty from "../features/property/TrendingProperty";
import PrimeProperty from "../features/property/PrimeProperty";

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    city: "",
    flatSize: "",
    type: "",
    propertyType: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSearchParams({ ...searchParams, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { city, flatSize, type, propertyType } = searchParams;

    if (!city || !flatSize || !type || !propertyType) {
      toast.error("Please fill all fields");
      return;
    }

    navigate(`/searchresult/${propertyType}s/${type}/${city}/${flatSize}/0/8`);
  };

  return (
    <div>
      <div className="hero-image mb-5">
        <div className="welcome-text">
          <span> Welcome To </span>
          <span className="text-red-500" style={{fontSize:'50px'}}>Suguru</span>
          <span className="text-slate-700" style={{fontSize:'50px'}}>Estates</span>
        </div>
      </div>

      <div className="b-example-divider" style={{ height: "50px" }}></div>

      <div className="container mx-auto mt-8 w-70 max-w-lg flex-nowrap justify-center search-card mb-8 rounded shadow">
        <div className="bg-white p-4 w-full rounded-5 card">
          <h2 className="text-xl mb-4 fontvariable" style={{}}>Search Filter</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-nowrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 text-m font-bold mb-2 fontvariable"
                >
                  Location:
                </label>
                <select
                  id="city"
                  name="city"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:border-blue-500 fontvariable"
                  value={searchParams.city}
                  onChange={handleChange}
                >
                  <option value="">Select location</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="patna">Patna</option>
                  <option value="mumbai">mumbai</option>
                  <option value="pune">Pune</option>
                </select>
              </div>

              <div className="w-full md:w-1/2 px-2 mb-4">
                <label
                  htmlFor="flatSize"
                  className="block text-gray-700 text-sm font-bold mb-2 fontvariable"
                >
                  BHK:
                </label>
                <select
                  id="flatSize"
                  name="flatSize"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 fontvariable text-sm"
                  value={searchParams.flatSize}
                  onChange={handleChange}
                >
                  <option value="">Select size</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="4BHK">4 BHK</option>
                </select>
              </div>

              <div className="w-full md:w-1/2 px-2 mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-bold mb-2 fontvariable"
                >
                  Looking For?
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 fontvariable text-sm"
                  value={searchParams.type}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  <option value="sell">buy</option>
                  <option value="rent">rent</option>
                </select>
              </div>

              <div className="w-full md:w-1/2 px-2 mb-4">
                <label
                  htmlFor="propertyType"
                  className="block text-gray-700 text-sm font-bold mb-2 fontvariable"
                >
                  Property Type:
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 fontvariable text-sm"
                  value={searchParams.propertyType}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="flat">Flat</option>
                  <option value="bungalow">Bungalow</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 hover:bg-light-800 text-white w-1/4 px-4 py-2 rounded-md fontvariable"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <TrendingProperty propertyType="flat" />
      <TrendingProperty propertyType="bungalow"/>
      <PrimeProperty />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Home;
