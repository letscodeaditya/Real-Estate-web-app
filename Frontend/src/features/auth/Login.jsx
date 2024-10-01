import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../user/userSlice";
import { toast,ToastContainer } from "react-toastify"; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password!");
      return;
    }

    dispatch(fetchUser(formData)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <ToastContainer />
      <h1
        className="text-3xl text-center font-semibold my-7"
        style={{ fontFamily: '"Josefin Sans", system-ui', fontWeight: '1000', fontSize: '50px' }}
      >
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      <div className="flex gap-2">
        <p>Admin Login</p>
        <Link to={"/admin-login"}>
          <span className="text-blue-700">Click here</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
