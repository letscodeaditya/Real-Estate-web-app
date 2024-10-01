import React, { useState } from "react";

const PrimeFlat = () => {
  const [error, setError] = useState();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState();
  const [pic, setPic] = useState();
  const userData = localStorage.getItem("admin");
  const admin = JSON.parse(userData);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    // For normal input fields
    if (type !== "checkbox") {
      setFormData({
        ...formData,
        [id]: value,
      });
    } else {
      // For checkboxes
      setFormData({
        ...formData,
        [id]: checked ? value : "",
      });
    }
  };

  const handleFileInputChange = (event, index) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newPreview = [...previews];
      newPreview[index] = reader.result;
      setPreviews(newPreview);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (pic, index) => {
    setLoading(true);
    if (!pic) {
      console.error("No image selected");
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dq5bhyeii");

      fetch("https://api.cloudinary.com/v1_1/dq5bhyeii/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [`photo${index + 1}`]: data.url.toString(),
          }));
          setPreviews((prevPreviews) =>
            prevPreviews.map((preview, i) =>
              i === index ? data.url.toString() : preview
            )
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid image format");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Check if the password field is empty
      if (
        !formData.price ||
        !formData.type ||
        !formData.flatSize ||
        !formData.address ||
        !formData.flatNumber
      ) {
        setLoading(false);

        setError("Please fill all fields");
        return;
      }

      const updatedFormData = {
        ...formData,
        postedBy: admin.id,
        prime: "true",
      };
  
      const res = await fetch(`http://localhost:8080/api/flats/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!res.ok) {
        const data = await res.json();
        setLoading(false);
        setError(data.message || "Failed to upload");
        return;
      }

      const data = await res.json();

      setLoading(false);
      setUpdateSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="container mx-auto mt-8 ">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Add Details for your Flat
        </h1>
        <div className="flex justify-between flex-nowrap ">
          <form className="w-full bg-white box-border h-100 w-50 shadow-md rounded px-8 py-6 mr-8">
            {/* Flat Number */}
            <div className="mb-4">
              <label
                htmlFor="flat_number"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Flat Number:
              </label>
              <input
                type="number"
                id="flatNumber"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter flat number"
              />
            </div>
            {/* Floor Number */}
            <div className="mb-4">
              <label
                htmlFor="floor_number"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Floor Number:
              </label>
              <input
                type="number"
                id="floorNumber"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter floor number"
              />
            </div>

            <div class="mb-4">
              <label
                for="flatSize"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Flat Size:
              </label>
              <select
                id="flatSize"
                name="flatSize"
                onChange={handleChange}
                value={formData.flatSize}
                class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Size</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="4BHK">4BHK</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="flat_area_square"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Flat Area Square:
              </label>
              <input
                type="text"
                id="flatAreaSquare"
                name="flatAreaSquare"
                onChange={handleChange}
                class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter flat area square"
              />
            </div>

            <div class="mb-4">
              <label
                for="location"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                City:
              </label>
              <select
                id="city"
                name="city"
                onChange={handleChange}
                value={formData.city}
                class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              >
                <option value="">Select location</option>
                <option value="kolkata">Kolkata</option>
                <option value="patna">Patna</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="type"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Type:
              </label>
              <select
                id="type"
                name="type"
                class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.type}
              >
                <option value="">Select type</option>
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="furnishing"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Furnishing:
              </label>
              <select
                id="furnishing"
                name="furnishing"
                class="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.furnishing}
              >
                <option value="">Select furnishing</option>
                <option value="full">Full</option>
                <option value="semi">Semi</option>
                <option value="none">None</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="age_of_construction"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Age of Construction:
              </label>
              <input
                type="text"
                id="ageOfConstruction"
                name="age_of_construction"
                onChange={handleChange}
                class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter age of construction"
              />
            </div>
          </form>

          <form className=" bg-white box-border h-100 w-100 shadow-md rounded px-5 py-2 mt-8">
            {/* Apartment Name */}
            <div className="mb-4 mt-8">
              <label
                htmlFor="apartment_name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Apartment Name:
              </label>
              <input
                type="text"
                id="apartmentName"
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter apartment name"
              />
            </div>
            <div class="mb-4">
              <label
                for="address"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Address:
              </label>
              <textarea
                id="address"
                name="address"
                onChange={handleChange}
                class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter address"
              ></textarea>
            </div>

            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                class="border border-gray-300 rounded-md px-4 py-2 w-full h-24 focus:outline-none focus:border-blue-500"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div class="mb-4">
              <label
                for="price"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Price:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                onChange={handleChange}
                class="border border-gray-300 rounded-md px-4 py-2  focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
          </form>
        </div>
        <div className="box-border h-50 w-100 shadow-md rounded bg-light  mt-5 ">
          <h3 className=" text-center">upload flat photo</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-4  ">
            {[1, 2, 3].map((index) => (
              <div key={index}>
                <label
                  htmlFor={`photo${index}`}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Photo {index}:
                </label>
                <input
                  type="file"
                  id={`photo${index}`}
                  accept="image/*"
                  onChange={(e) => {
                    handleFileInputChange(e, index - 1);
                    handleFileUpload(e.target.files[0], index - 1);
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                />
                <div className="preview ">
                  {previews[index - 1] && (
                    <img
                      src={previews[index - 1]}
                      alt={`Preview ${index}`}
                      className="preview-image"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-red-700 mt-5 ">{error ? error : ""}</p>
        <p className="text-green-700 mt-5 text-center">
          {updateSuccess ? "your flat detail is uploaded successfully!" : ""}
        </p>
        <div className="text-center mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md focus:outline-none"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "UPLOAD"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PrimeFlat;
