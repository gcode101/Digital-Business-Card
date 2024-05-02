import { Link, useNavigate } from 'react-router-dom';
import { getTokenPayload } from '../services/TokenPayload';
import { getApiUrl } from '../services/ApiUrl';
import { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react'


function Profile() {

	const [user, setUser] = useState();
	const [cardExists, setCardExists] = useState(false);
	const [cardID, setCardID] = useState();
	const [photo, setPhoto] = useState();
	const navigate = useNavigate();
	const apiUrl = getApiUrl();
	
	axios.defaults.withCredentials = true;
	useEffect(() => {
		axios.get(`${apiUrl}/cardAuth`)
		.then(result => {
			console.log("Inside profile. cardAuth: ",result);
			if(result.data !== 'success'){
				navigate('/login')
			}
		})
		.catch(err => console.log(err));

		const { name, userID } = getTokenPayload();
		console.log(`Inside profile. { name, userID } = getTokenPayload . name: ${name}, userID: ${userID}`);
		if(name){
			const fullNameArray = name.split(' ');
			const firstName = fullNameArray[0];

			setUser(firstName);
		}

		axios.get(`${apiUrl}/card/${userID}`)
		.then(card => {
			console.log("Inside profile. getCard axios call. card: ",card);
			setCardExists(true);
			setCardID(card.data._id);
			setPhoto(card.data.picture);
		})
		.catch(err => console.log(err))

	},[]);

	return(
		<div className="container-lg main-container profile">
			<div className="profile-title">
				<div className="img-container">
					<img src={`${apiUrl}/${photo}`} alt="photo"/>
				</div>
				<h1 className="text-light text-center">Hello, { user }</h1>
			</div>
			<div className="container-lg text-center">
				<div className="row justify-content-center">
					<div className="profile-buttons d-grid gap-2 col-lg col-sm">
					  {cardExists ?
					  	<Link to={`/show-card/${cardID}`} className="btn btn-primary mt-2">View Card</Link> :
					  	<Link to="/card-build" className="btn btn-primary mt-2">Create your Digital Card</Link>
					  }
					  <Link to="/card" className="btn btn-success mt-2">Digital Card Preview</Link>
					</div>
					<div className="link-container col-lg col-sm">
						<h3 className="text-light">{cardExists ? 
							'Scan to share card' : 'Create your card to start sharing it'}
						</h3>
						{cardExists &&
							<QRCode className="qrcode" value={`https://digitalbusinesscard3043.netlify.app/show-card/${cardID}`} />
						}
					</div>
				</div>
			</div>
		</div>
	);

}

export default Profile;
















