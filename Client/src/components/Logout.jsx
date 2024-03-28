import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Logout() {

	const navigate = useNavigate();

	const handleLogout = () => {
		axios.get('https://digital-business-card-api.vercel.app/logout')
		.then((result) => {
			document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			navigate('/login');

		})
		.catch(err => {console.log(err)})
	}

	return null;
}

export default Logout;