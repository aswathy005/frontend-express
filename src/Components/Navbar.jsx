import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <h3 className="logo">Dashboard</h3>

      <div className="nav-links">
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/adddata">Add Product</NavLink>
        <NavLink to="/getdata">View Products</NavLink>
        {/* later */}
        <NavLink to="/profile">Profile</NavLink>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar
