import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function Logout() {

	const navigate = useNavigate();

	const handleLogout = () => {
		axios.get('http://localhost:3000/logout')
		.then((result) => {
			document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			navigate('/login');

		})
		.catch(err => {console.log(err)})
	}

	return (
		<li className="nav-item" onClick={handleLogout}><Link className="nav-link fw-bold quicksand-font text-light">Logout</Link></li>
	)
}

export default Logout;