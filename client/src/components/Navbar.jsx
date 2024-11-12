import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { id: 1, to: "/", label: "Home" },
    { id: 2, to: "/yourbook", label: "Your Book" },
    { id: 3, to: "/recipes", label: "Recipes" },
    { id: 4, to: "/login", label: "Log In" },
    { id: 5, to: "/signup", label: "Sign Up" },
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
