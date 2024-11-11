import EdamamLogo from "../assets/Edamam_Badge_Transparent.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logoSection">
          <p className="apiText">API courtesy of</p>
          <img className="edamamLogo" src={EdamamLogo} />
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Recipe Book. All rights reserved.
        </p>
        <ul className="footer-links">
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
