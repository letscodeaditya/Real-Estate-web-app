import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_BASE_URL;


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${api}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Failed to sign in");
        return;
      }
      localStorage.setItem("admin", JSON.stringify(data));
      setLoading(false);
      setError(null);
      navigate("/admin/dashboard");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        
        <input
          type="text"
          placeholder="what color is your bugatti ?"
          className="border p-3 rounded-lg"
          id="securityans"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
     
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default AdminLogin;
