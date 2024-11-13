import { NavLink, Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const navLinks = [
    { id: 1, to: "/", label: "Home" },
    { id: 2, to: "/your-recipes", label: "Your Recipes" },
    { id: 3, to: "/recipes", label: "Recipes" },
    { id: 4, to: "/login", label: "Log In" },
    { id: 5, to: "/signup", label: "Sign Up" },
    { id: 6, to: "/profile", label: "User Profile" },
  ];
  return (
    <header className="navbar">
      <h1 className="navbarTitle">Recipe Book</h1>
      <nav>
        <div className="navlinksContainer">
          {navLinks.map((link) => (
            <NavLink className="navlinks" key={link.id} to={link.to}>
              <p className="singleNavlink">{link.label}</p>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
