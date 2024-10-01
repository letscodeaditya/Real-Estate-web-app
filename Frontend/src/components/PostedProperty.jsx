"use client";
import { useEffect, useState } from "react";
import {
    ArrowCircleDown,
    Database,
    DotsThreeOutlineVertical,
    Plus,
    X,
  } from "phosphor-react";
  import {
    Avatar,
    AvatarImage,
    Badge,
    Button,
    Dropdown,
    DropdownAction,
    DropdownContent,
    DropdownItem,
    DropdownList,
    Input,
  } from "keep-react";
  import { EmptyComponent2 } from "./EmptyComponent2";
  import { useNavigate } from "react-router-dom";

export const PostedProperty = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [filters, setFilters] = useState({
    city: "",
    flatSize: "",
  });
  const [propertyType, setPropertyType] = useState("flats");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPage = 4;
  const postedBy = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;
  const api = import.meta.env.VITE_API_BASE_URL;
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);




  const fetchData = async (pageNo, appliedFilters = {}, propertyType) => {
    if (!postedBy) return;

    try {
      
      const queryParams = new URLSearchParams({
        city: appliedFilters.city || "",
        flatSize: appliedFilters.flatSize || "",
      }).toString();

     
      const endpoint =
        propertyType === "bungalows"
          ? `${api}/api/bungalows/yourpostsbungalows/${postedBy}/${pageNo}/${itemsPerPage}?${queryParams}`
          : `${api}/api/flats/yourpostsflats/${postedBy}/${pageNo}/${itemsPerPage}?${queryParams}`;

      const response = await fetch(endpoint);
      const result = await response.json();
    //   console.log(result.content);
      setData(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, filters, propertyType);
  }, [currentPage, filters, propertyType]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setCurrentPage(1); 
    fetchData(1, filters, propertyType);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type); 
    setCurrentPage(1); 
    fetchData(1, filters, type); 
    setIsDropdownOpen(false);
  };

  const handleSell = (item)=>{
    if(item.flatSize){
        nav(`/flat/sell/${item.flatId}`);
    }else{
        nav(`/bungalow/sell/${item.bungalowId}`);       
    } 
  }

  const handleRent = (item)=>{
    if(item.bungalowId){
        nav(`/bungalow/rent/${item.bungalowId}`); 
    }else{
        nav(`/flat/rent/${item.flatId}`); 
    }
  }

  const handleNewPropertyClick = () => {
    setIsModalOpen(true); 
  };

  const handleConfirmNewProperty = (type) => {
    setIsModalOpen(false); 
    nav(`/home/activity/${type}AD`); 
  };

  return (
    <>
    <div className="p-5">
      <div className="bg-dark p-5 rounded-5 shadow">
        {/* Property Type Dropdown */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-5">
            <div className="relative" style={{zIndex:'1'}}>
              <button
                className="text-xl flex font-semibold text-gray-800 bg-light p-2 rounded"
                onClick={toggleDropdown}
              >
                {propertyType === "flats"
                  ? "Flats Selected"
                  : "Bungalows Selected"}{" "}
                <ArrowCircleDown size={32} />
              </button>

              {isDropdownOpen && (
                <div className="absolute bg-white border rounded shadow-md mt-2 ">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handlePropertyTypeChange("flats")}
                    >
                      Flats
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handlePropertyTypeChange("bungalows")}
                    >
                      Bungalows
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 mr-3">
            <Button
              variant="outline"
              className="flex items-center gap-1.5 bg-light p-2"
            >
              <Database size={32} />
              Total Property: {data.length}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-1.5 bg-light p-2"
              onClick={handleNewPropertyClick}
            >
              <Plus className="size-4 fill-gray-800 dark:fill-white" />
              New Property
            </Button>
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="flex flex-col gap-4 mt-3" style={{ width: "70%" }}>
            {data.length === 0 ? (
              <EmptyComponent2 />
            ) : (
              data.map((item) => (
                <div
                  key={item.id}
                  style={{ cursor: 'pointer' }}
                  className="flex items-center justify-between border mt-2 border-dark-200 bg-white p-3 rounded-5 shadow-sm hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2" onClick={()=>{item.type === 'sell'? handleSell(item) : handleRent(item)}}>
                    <Avatar
                      style={{
                        height: "100px",
                        width: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <AvatarImage
                        src={item.photo1}
                        alt={item.apartmentName || item.bungalowName}
                        style={{
                          borderRadius: "10px",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Avatar>

                    <div className="ms-3">
                      <p className="text-gray-800">
                        Name: {item.apartmentName || item.bungalowName}
                      </p>
                      <p className="text-gray-600">City: {item.city}</p>
                    </div>
                  </div>
                  <div className="text-gray-500" onClick={()=>{item.type === 'sell'? handleSell(item) : handleRent(item)}}>
                    Size: {item.flatSize || item.bungalowSize}
                  </div>
                  <Badge showIcon className="text-lg p-3 bg-danger" onClick={()=>{item.type === 'sell'? handleSell(item) : handleRent(item)}}>
                    {item.price}
                  </Badge>
                  <Dropdown>
                    <DropdownAction asChild>
                      <button>
                        <DotsThreeOutlineVertical className="size-10 fill-gray-800 dark:fill-white" />
                      </button>
                    </DropdownAction>
                    <DropdownContent className="max-w-[200px] border border-gray-200 p-3">
                      <DropdownList>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownList>
                    </DropdownContent>
                  </Dropdown>
                </div>
              ))
            )}
          </div>

          <div
            className="h-full bg-light p-4 rounded-5 shadow-md mt-4"
            style={{ width: "30%" }}
          >
            <h3 className="text-lg font-semibold mb-4">Filter Properties</h3>
            <div className="flex flex-col gap-3">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Enter city"
                value={filters.city}
                onChange={handleFilterChange}
              />
              <label className="text-sm font-medium">Flat/Bungalow Size</label>
              <Input
                name="flatSize"
                placeholder="Size"
                value={filters.flatSize}
                onChange={handleFilterChange}
              />
              <Button
                variant="dark"
                className="mt-3 bg-danger w-50"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages && (
          <div className="flex justify-between mt-5">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              variant="dark"
              className="bg-light p-2 rounded"
              style={{ cursor: 'pointer' }}
            >
              Previous
            </Button>
            <span className="text-gray-700 bg-light p-2 rounded">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              variant="dark"
              className="bg-light p-2 rounded"
              style={{ cursor: 'pointer' }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>

    {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
            <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
            >
                <X size={32} />
            </button>
            <h2 className="text-lg font-semibold mb-4">New Property</h2>
            <p className="text-gray-600">What type of property would you like to add?</p>
            <div className="flex justify-end mt-4">
                <Button
                    variant="dark"
                    className="bg-danger mr-2"
                    onClick={() => handleConfirmNewProperty("flat")}
                >
                    Add Flat
                </Button>
                <Button
                    variant="dark"
                    className="bg-danger"
                    onClick={() => handleConfirmNewProperty("bungalow")}
                >
                    Add Bungalow
                </Button>
            </div>
        </div>
    </div>
)}


      </>
  );
};
