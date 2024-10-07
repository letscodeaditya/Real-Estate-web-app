import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import react-toastify CSS
import { updateUser, deleteUser, resetUpdateSuccess } from "./userSlice"; // Assuming deleteUser action is available

const Profile = () => {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [pic, setPic] = useState();
  const [newPassword, setNewPassword] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const api = import.meta.env.VITE_API_BASE_URL;
  const { loading, error, updateSuccess } = useSelector((state) => state.user);

  useEffect(() => {

    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      city: user?.city || "kolkata", 
    });

    if (updateSuccess) {
      toast.success("Profile updated successfully!");
      dispatch(resetUpdateSuccess());
    }

    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [updateSuccess, error, dispatch]);



  const handleFileUpload = (pic) => {
    if (!pic) {
      toast.error("Please select an image!");
      return;
    }
  
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
  
      // Make a request to your backend that handles the S3 upload
      fetch(`${api}/api/v1/images/upload`, { // Change to your backend API
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            setPic(data.url);  // Set the S3 URL returned by the backend
          } else {
            toast.error("Error uploading image! Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image! Please try again.");
        });
    } else {
      toast.error("Invalid image! Please try again.");
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.password) {
      toast.error("Please enter a password to make changes.");
      return;
    }

    const updatedFormData = {
      ...formData,
      email: user.email,
      pic: pic || user.pic,
      password: newPassword || formData.password,
    };

    dispatch(updateUser(updatedFormData));
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUser(user.email)); 
      localStorage.removeItem("user");
      navigate("/signup");
      toast.info("Account deleted successfully!");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    toast.info("Signed out successfully!");
  };



  return (
    <div className="p-3  mx-auto bg-white mt-5 rounded-5 shadow" style={{width:'50vw'}}>
      <h1 className=" font-semibold text-center my-7">Profile</h1>
      <ToastContainer />
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => handleFileUpload(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={user?.pic}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={user?.email}
          className="border p-3 rounded-lg"
          disabled
        />
        <input
          type="text"
          placeholder="name"
          value={formData.name} 
          id="name"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="phone"
          value={formData.phone}
          onChange={handleChange}
          id="phone"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        
        {/* Change password field */}
        <input
          type="password"
          placeholder="Change Password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          id="newPassword"
          className="border p-3 rounded-lg"
        />

        <select
          id="city"
          className="form-select"
          onChange={handleChange}
          value={formData.city} 
        >
          <option value="kolkata">Kolkata</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="patna">Patna</option>
        </select>

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Click Here to Save"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleSignOut}
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 cursor-pointer"
        >
          Sign out
        </span>
        <span
          onClick={handleDeleteAccount}
          className="bg-red-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 cursor-pointer"
        >
          Delete Account
        </span>
      </div>
    </div>
  );
};

export default Profile;
