import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar() {
	return (
		<nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/signup">Signup</Link></li>
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/profile">My Profile</Link></li>
				<Logout />
			</ul>
		</nav>
	)
}

export default Navbar;