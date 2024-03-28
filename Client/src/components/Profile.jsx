import { Link, useNavigate } from 'react-router-dom';
import { getTokenPayload } from '../services/TokenPayload';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Profile() {

	const [user, setUser] = useState();
	const [cardExists, setCardExists] = useState(false);
	const [cardID, setCardID] = useState();
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

		const { name, userID } = getTokenPayload();
		if(name){
			const fullNameArray = name.split(' ');
			const firstName = fullNameArray[0];

			setUser(firstName);
		}

		axios.get(`http://localhost:3000/card/${userID}`)
		.then(card => {
			console.log(card);
			setCardExists(true);
			setCardID(card.data._id);
		})
		.catch(err => console.log(err))

	},[]);

	return(
		<div className="container-lg profile">
			<h1 className="text-light text-center">Hello, { user }</h1>
			<div className="container-lg text-center">
				<div className="row justify-content-center">
					<div className="profile-buttons d-grid gap-2 col">
					  {cardExists ?
					  	<Link to={`/show-card/${cardID}`} className="btn btn-primary mt-2">View Card</Link> :
					  	<Link to="/card-build" className="btn btn-primary mt-2">Create your Digital Card</Link>
					  }
					  <Link to="/card" className="btn btn-success mt-2">Digital Card Preview</Link>
					</div>
					<div className="link-container col">
						<h3 className="text-light">Use this link to share your card</h3>
						<a href={`http://localhost:5173/show-card/${cardID}`} target="_blank" rel="noopener noreferrer">
							{`http://localhost:5173/show-card/${cardID}`}
						</a>
					</div>
				</div>
			</div>
		</div>
	);

}

export default Profile;
















