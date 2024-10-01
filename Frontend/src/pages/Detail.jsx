import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaPhoneAlt, FaHeart, FaCheck } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Detail = () => {
  const { id, propertyType } = useParams();
  const [flat, setFlat] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInWishlistId, setWishlistId] = useState(false);
  const api = import.meta.env.VITE_API_BASE_URL;
  
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; 

  useEffect(() => {
    axios.get(`${api}/api/${propertyType}s/${id}`)
      .then(response => {
        setFlat(response.data);
        setSelectedImage(response.data.photo1); // Set the initial selected image
      })
      .catch(error => console.error(error));


    if (userId) {
      axios.get(`${api}/api/user-interests/find/${userId.id}?${propertyType === 'flat' ? 'flatId=' + id : 'bungalowId=' + id}`)
        .then(response => {
          if (response.data) {
            setIsInWishlist(true);
            setWishlistId(response.data); 
          } else {
            setIsInWishlist(false);
          }
        })
        .catch(error => console.error(error));
    }
  }, [id, propertyType, ]);

  if (!flat) return <div>Loading...</div>;

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleContactAgentClick = () => {
    if (!userId) {
      // Show alert if user is not logged in
      toast.error("Please log in to contact the agent");
      return;
    }

    axios.get(`${api}/api/users/${flat.postedBy}`)
      .then(response => {
        setUserInfo(response.data);
        setShowModal(true);
      })
      .catch(error => console.error(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleWishlist = () => {
    if (!userId) {
      // Show alert if user is not logged in
      toast.error("Please log in to add to wishlist");
      return;
    }

    if (isInWishlist) {
      axios.delete(`${api}/api/user-interests/delete/${isInWishlistId}`)
        .then(() => setIsInWishlist(false))
        .catch(error => console.error(error));
    } else {
      axios.post(`${api}/api/user-interests/add?userId=${userId.id}&flatId=${propertyType === 'flat' ? id : ''}&bungalowId=${propertyType === 'bungalow' ? id : ''}`)
      .then(response => {
        const newInterestId = response.data; 
        setIsInWishlist(true);
        setWishlistId(newInterestId);
      })
      .catch(error => console.error(error));
    
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 mt-4">
          <img src={selectedImage} alt="House" className="w-full h-96 object-cover rounded-lg shadow-md" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Thumbnail Images</h2>
            <div className="grid gap-4">
              <div className="bg-gray-200 rounded-lg shadow-md cursor-pointer" onClick={() => handleThumbnailClick(flat.photo1)}>
                <img src={flat.photo1} alt="Thumbnail" className="w-full h-24 object-cover rounded-lg" />
              </div>
              {flat.photo2 && (
                <div className="bg-gray-200 rounded-lg shadow-md cursor-pointer" onClick={() => handleThumbnailClick(flat.photo2)}>
                  <img src={flat.photo2} alt="Thumbnail" className="w-full h-24 object-cover rounded-lg" />
                </div>
              )}
              {flat.photo3 && (
                <div className="bg-gray-200 rounded-lg shadow-md cursor-pointer" onClick={() => handleThumbnailClick(flat.photo3)}>
                  <img src={flat.photo3} alt="Thumbnail" className="w-full h-24 object-cover rounded-lg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-8 mb-5">
        <h1 className="text-4xl font-bold mb-5">{flat.apartmentName || flat.bungalowName}</h1>
        <p className="text-red-600 text-2xl font-bold mb-4">Price: {flat.price}</p>
        <p className="text-gray-800 text-lg mb-4">Location: {flat.address}</p>
        <p className="text-gray-800 text-lg mb-4">Type: {flat.type}</p>
        <p className="text-gray-800 text-lg mb-4">Size: {flat.flatSize || flat.bungalowSize}</p>
        <p className="text-gray-800 text-lg mb-4">Area: {flat.flatAreaSquare || flat.bungalowAreaSquare}</p>
        <p className="text-gray-800 text-lg mb-4">Description: {flat.description}</p>
        <div className="flex justify-between items-center">
          <button onClick={handleContactAgentClick} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-4 flex items-center">
            <FaPhoneAlt className="mr-2" /> Contact Agent
          </button>
          <button onClick={toggleWishlist} className={`px-4 py-2 rounded-md flex items-center ${isInWishlist ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
            {isInWishlist ? <FaCheck className="mr-2" /> : <FaHeart className="mr-2" />} Wishlist
          </button>
        </div>
      </div>


      <ToastContainer />

      {/* Bootstrap Modal */}
      {userInfo && (
        <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog" onClick={handleCloseModal}>
          <div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agent Information</h5>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {userInfo.name}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Phone:</strong> {userInfo.phone}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
