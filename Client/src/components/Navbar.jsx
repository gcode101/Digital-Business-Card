import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar(props) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-lg">
				<Link to="/" className="navbar-brand">
					<span className="fw-bold text-light">
						DBCards
					</span>
				</Link>
				<button className="navbar-toggler navbar-dark" type="button" data-bs-target="#navbarCollapse" data-bs-toggle="collapse">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div id="navbarCollapse" className="collapse navbar-collapse justify-content-end align-center">
			      <ul className="navbar-nav">
			      	{!props.isLoggedIn ? (
			      		<>
				      		<li className="nav-item">
					        	<Link className="nav-link fw-bold quicksand-font text-light" to="/">Home</Link>
					        </li>
					        <li className="nav-item">
					        	<Link className="nav-link fw-bold quicksand-font text-light" to="/signup">Signup</Link>
					        </li>
					        <li className="nav-item">
					        	<Link className="nav-link fw-bold quicksand-font text-light" to="/login">Login</Link>
					        </li>
				        </>
					) : (
						<>
				      		<li className="nav-item">
					        	<Link className="nav-link fw-bold quicksand-font text-light" to="/">Home</Link>
					        </li>
					        <li className="nav-item">
					        	<Link className="nav-link fw-bold quicksand-font text-light" to="/profile">Profile</Link>
					        </li>
					        <li className="nav-item">
					        	<button className="nav-link fw-bold quicksand-font text-light" onClick={props.handleLogout}>Logout</button>
					        </li>
				        </>
				    )}
			      </ul>					
				</div>
			</div>
		</nav>
	)
}

export default Navbar;