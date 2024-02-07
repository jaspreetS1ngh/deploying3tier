import './Header.scss'
import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/logo/logo.png"

function Header() {

    return (
      <>
        <div className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src={logo} alt="InStock Logo" />
                </Link>
            </div>

            <div className="header__links">
                <NavLink to="/" className="header__links--link">
                    Warehouses
                </NavLink>

                <NavLink to="/inventory" className="header__links--link">
                    Inventory
                </NavLink>
            </div>
        </div>
      </>
    );
  }
  
  export default Header;