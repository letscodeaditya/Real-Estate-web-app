import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const api = import.meta.env.VITE_API_BASE_URL;
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.name || !formData.email || !formData.phone || !formData.password || !formData.gender || !formData.type || !formData.city){
      toast.error("please fill all fields");
      return;
    }

    
    try {
      setLoading(true);
      const res = await fetch(`${api}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.status !== 200) {
        // Check for success status
        setLoading(false);
        setError(data.message); // Assuming the error message is provided in the response data
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (<>
  { !userData  ?
    (<>
    <div className="p-3 max-w-lg mx-auto bg-white mt-5 rounded-5 shadow">
      <ToastContainer/>
      <h1 className="text-3xl text-center font-semibold my-7" style={{ fontFamily: '"Josefin Sans", system-ui', fontWeight: '1000', fontSize: '50px' }}>Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="name"
          className="border p-3 rounded-lg"
          id="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <div class="input-group mb-3">
          <div class="col-md-4">
            <select
              id="inputState"
              class="form-select outline-dark dropdown-toggle"
              aria-expanded="false"
            >
              <option selected>+91</option>
              <option>+977</option>
              <option>+975</option>
              <option>+94</option>
            </select>
          </div>
          <input
            type="number"
            class="form-control"
            id="phone"
            placeholder="phone number"
            onChange={handleChange}
            aria-label="Text input with dropdown button"
          />
        </div>

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <div className="d-flex justify-content-around">
          <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0 p-3">Gender</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  value="male"
                  onClick={handleChange}
                  checked={formData.gender === "male"}
                />
                <label class="form-check-label" for="gridRadios1">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  value="female"
                  onClick={handleChange}
                  checked={formData.gender === "female"}
                />

                <label class="form-check-label" for="gridRadios2">
                  Female
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0 p-3">Type</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="type"
                  id="type"
                  value="buyer"
                  onClick={handleChange}
                  checked={formData.type === "buyer"}
                />
                <label class="form-check-label" for="gridRadios1">
                  Buyer
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="type"
                  id="type"
                  value="seller"
                  onClick={handleChange}
                  checked={formData.type === "seller"}
                />

                <label class="form-check-label" for="gridRadios2">
                  Seller
                </label>
              </div>
            </div>
          </fieldset>

          <div class="col-md-4">
            <label for="inputState " class="form-label">
              your city
            </label>
            <select
              id="city"
              class="form-select"
              onChange={handleChange}
              value={formData.city}
              defaultValue="select"
            >
              <option disabled>select</option>
              <option value="kolkata">kolkata</option>
              <option value="mumbai">mumbai</option>
              <option value="delhi">delhi</option>
              <option value="patna">patna</option>
            </select>
          </div>
        </div>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div> 
      <div className='mt-2  h-5'></div> </>) : <Navigate to="/home/profile" />}
    </>
  );
};

export default SignUp;
