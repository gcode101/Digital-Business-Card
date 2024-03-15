import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-lg">
				<Link to="/" className="navbar-brand">
					<span className="fw-bold text-light">
						DBCards
					</span>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-target="#navbarCollapse" data-bs-toggle="collapse">
					<span className="navbar-toggler-icon text-light"></span>
				</button>
				<div id="navbarCollapse" className="collapse navbar-collapse justify-content-end align-center">
			      <ul class="navbar-nav">
			        <li className="nav-item"><Link className="nav-link fw-bold quicksand-font text-light" to="/">Home</Link></li>
			        <li className="nav-item"><Link className="nav-link fw-bold quicksand-font text-light" to="/signup">Signup</Link></li>
			        <li className="nav-item"><Link className="nav-link fw-bold quicksand-font text-light" to="/login">Login</Link></li>
			        <li className="nav-item"><Link className="nav-link fw-bold quicksand-font text-light" to="/profile">Profile</Link></li>
			        <Logout />
			      </ul>					
				</div>
			</div>
		</nav>
	)
}

export default Navbar;