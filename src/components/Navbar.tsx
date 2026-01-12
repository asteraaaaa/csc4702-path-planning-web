// =========================
// FILE: src/components/Navbar.jsx
// =========================
import { NavLink } from "react-router-dom";


function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">CSC4702</h2>
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/learn">Learn</NavLink>
                <NavLink to="/interactive">Interactive</NavLink>
                <NavLink to="/challenges">Challenges</NavLink>
                <NavLink to="/reflection">Reflection</NavLink>
                <NavLink to="/resources">Resources</NavLink>
            </div>
        </nav>
    );
}


export default Navbar;