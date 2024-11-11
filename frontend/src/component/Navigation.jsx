import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // To redirect after logout

  const getCookie = (name) => {
    const cookieArr = document.cookie.split(";");
    for (let cookie of cookieArr) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/auth/logout", {
        method: "POST",
        credentials: "include", // Send cookies along with request
      });

      if (response.ok) {
        // Clear the username from state and cookies
        setUsername("");
        document.cookie =
          "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear the cookie
        navigate("/login"); // Redirect to login page after logout
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Fetch the username from cookies when the component mounts
  useEffect(() => {
    const user = getCookie("username");
    if (user) {
      setUsername(user); // Set the username state
    }
  }, []);

  return (
    <header className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhhGSBWiNsZE5qr79pEUYjsQgS_4vFQKV9xJ4pn_Ied8vwoyQ4YoboavNBi4G_EySwvWw&usqp=CAU"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <Link
            to="/"
            className="btn btn-ghost text-white hover:bg-blue-600 hover:text-white font-medium transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/employee-list"
            className="btn btn-ghost text-white hover:bg-blue-600 hover:text-white font-medium transition duration-200"
          >
            Employee List
          </Link>
        </nav>

        {/* User Info and Logout */}
        <div className="flex items-center gap-3">
          {username ? (
            <span className="text-white font-medium">{username}</span>
          ) : (
            <span className="text-white font-medium">Guest</span>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-error btn-sm text-white font-medium hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
