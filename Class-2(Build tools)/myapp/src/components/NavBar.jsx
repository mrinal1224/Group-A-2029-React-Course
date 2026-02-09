import './navbar.css'


function NavBar() {
    return (
      <nav className="navbar">
        <div className="navbar__left">
          <span className="navbar__logo">amazon</span>
        </div>
  
        <div className="navbar__links">
          <a className="navbar__link">Home</a>
          <a className="navbar__link">About</a>
          <a className="navbar__link">Contact</a>
        </div>
      </nav>
    );
  }
  
  export default NavBar;
  