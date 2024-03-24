import { Link, useNavigate } from 'react-router-dom';
import { getTokenPayload } from '../services/TokenPayload';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Profile() {

	const [user, setUser] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:3000/cardAuth')
		.then(result => {
			console.log(result);
			if(result.data !== 'success'){
				navigate('/login')
			}
		})
		.catch(err => console.log(err));

		const { name } = getTokenPayload();
		if(name){
			const fullNameArray = name.split(' ');
			const firstName = fullNameArray[0];

			setUser(firstName);
		}
	},[]);

	return(
		<div className="container profile">
			<h1 className="text-light text-center">Hello, { user }</h1>

			<div className="d-grid gap-2 col-6 mx-auto">
			  <Link to="/card-build" className="btn btn-primary">Create your Digital Card</Link>
			  <Link to="/card" className="btn btn-success">Digital Card Preview</Link>
			</div>
		</div>
	);

}

export default Profile;