import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectCity } from "../features/user/userSlice";
import { GiHouse } from "react-icons/gi";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleCityDropdown = () => {
    setCityDropdownOpen(!cityDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    setIsOpen(false);
    navigate("/login");
  };

  const handleCitySelect = (city) => {
    dispatch(selectCity(city));
    setCityDropdownOpen(false);
  };

  // Check if user or admin is logged in
  const isUserLoggedIn = localStorage.getItem("user");
  const isAdminLoggedIn = localStorage.getItem("admin");
  const user = isUserLoggedIn && JSON.parse(isUserLoggedIn);
  const admin = isAdminLoggedIn && JSON.parse(isAdminLoggedIn);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown") && cityDropdownOpen) {
        setCityDropdownOpen(false);
      }
      if (!e.target.closest(".user-menu-container") && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cityDropdownOpen, isOpen]);

  return (
    <header className="bg-200 shadow-md" style={{ backgroundColor: '#FFBF00' }}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="flex items-center text-decoration-none left">
          <GiHouse style={{ color: 'black', fontSize: '50px', marginRight: '10px' }} />
          <h1 className="font-bold text-sm sm:text-xl flex-wrap" style={{ fontFamily: '"Josefin Sans", sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="text-red-500" style={{ fontSize: '30px' }}>Suguru</span>
            <span className="text-slate-700" style={{ fontSize: '30px' }}>Estates</span>
          </h1>
        </Link>

        {/* City Dropdown */}
        <div className="relative dropdown">
          <button
            onClick={toggleCityDropdown}
            className="flex items-center bg-white text-gray-700 py-4 px-5 rounded-full focus:outline-none"
          >
            <FaMapMarkerAlt className="mr-2" />
            {userData.city || "Select City"}
            <FaChevronDown className="ml-2" />
          </button>
          {cityDropdownOpen && (
            <div className="origin-top-right absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {["kolkata", "patna", "mumbai", "pune"].map((city) => (
                  <div
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <ul className="flex gap-4 items-center">
          {!isAdminLoggedIn ? (
            <Link to="/subscription" className="text-decoration-none">
              <li className="hidden sm:inline text-slate-700 cursor-pointer" style={{fontFamily:'"Josefin Sans", system-ui',fontSize:'20px',fontWeight:"500"}}>
                Plans
              </li>
            </Link>
          ) : null}

          <Link to="/aboutus" className="text-decoration-none">
            <li className="hidden sm:inline text-slate-700 cursor-pointer" style={{fontFamily:'"Josefin Sans", system-ui',fontSize:'20px',fontWeight:"500"}}>
              About us
            </li>
          </Link>

          {/* User/Admin Dropdown menu */}
          {isUserLoggedIn || isAdminLoggedIn ? (
            <div className="relative user-menu-container">
              <button
                onClick={toggle}
                className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                id="user-menu"
                aria-label="User menu"
                aria-haspopup="true"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    (user && user.pic) ||
                    (admin && '/image/admin.png') ||
                    ""
                  }
                  alt="Profile"
                />
              </button>
              {isOpen && (
                <div className="origin-top-right absolute z-20 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {isUserLoggedIn && (
                      <>
                        <Link
                          to="/home/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={toggle}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/home/activity"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={toggle}
                        >
                          My Activity
                        </Link>
                      </>
                    )}
                    {isAdminLoggedIn && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={toggle}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-decoration-none">
              <li className="sm:inline text-slate-700 hover:underline cursor-pointer" style={{fontFamily:'"Josefin Sans", system-ui',fontSize:'20px',fontWeight:"500"}}>
                Login
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};
