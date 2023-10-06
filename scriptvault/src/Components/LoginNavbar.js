import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [id, setId] = useState(null);
  console.log("Id", id);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (accessToken) {
      const parts = accessToken.split(".");
      const payload = JSON.parse(atob(parts[1]));
      const userId = payload._id;
      console.log("userId", userId);
      setId(userId);
      setAccessToken(accessToken);
      console.log("User ID:", userId);
    } else {
      console.log("Token not found");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      setAccessToken(token);
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAccessToken("");
    navigate("/signin");
  };

  return (
    <header className="bg-white flex items-center justify-between p-3  px-12">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://i.ibb.co/BGTKjCQ/Script-Vault.png"
            alt="Logo"
            className="w-[200px]"
          />
        </Link>
      </div>

      <nav>
        {accessToken ? (
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard">
                <span className="text-xl"></span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/explore">
                <span className="text-xl"></span>
                Explore
              </Link>
            </li>
            {/* <li>
              <Link to="/watchlist">
                <span className="text-xl"></span>
                Watchlist
              </Link>
            </li> */}
            {/* <li>
              <Link to={`/update-profile`}>
                <span className="text-xl">👤</span>
                Profile
              </Link>
            </li> */}
            <li>
              <button onClick={handleLogout}>
                <span className="text-xl"></span>
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <div className="grid grid-cols-2 gap-1 min-[200px]:hidden max-[639px]:hidden sm:hidden lg:grid">
            <div className="bg-white-300 px-3 py-3 text-black rounded hover:bg-white hover:text-green-300 ">
              <Link to="/signin">
                <span className="text-xl">Sign In</span>
              </Link>
            </div>
            <div className="bg-black px-3 py-3 text-white rounded hover:bg-white hover:text-black hover:border-[1px] hover:border-black hover:border-solid">
              <Link to="/signup">
                <span className="text-xl">Sign Up</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
