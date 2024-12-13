import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = (e) => {
    logout();
    navigate("/login");
  };
  
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>My Books</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <div>
            <Link to="/books/add-book">Add Book</Link>
            <span>{JSON.parse(localStorage.getItem("user")).email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
