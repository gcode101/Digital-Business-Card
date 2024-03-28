import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../services/ApiUrl';


function Logout() {

	const navigate = useNavigate();
	const apiUrl = getApiUrl();

	const handleLogout = () => {
		axios.get(`${apiUrl}/logout`)
		.then((result) => {
			document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			navigate('/login');

		})
		.catch(err => {console.log(err)})
	}

	return null;
}

export default Logout;