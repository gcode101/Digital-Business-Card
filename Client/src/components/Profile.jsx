import { Link, useNavigate } from 'react-router-dom';
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
	
	useEffect(() => {
    const fetchData = async () => {

		// Fetch authentication data
		const name = localStorage.getItem("name");
		const userID = localStorage.getItem("userID");

		if(!userID){
          navigate('/login');
        } else {
          // Set the user state based on the name
          if (name) {
            const fullNameArray = name.split(' ');
            const firstName = fullNameArray[0];
            setUser(firstName);
          }

          // Fetch additional data using userID
		  try{
			const cardResult = await axios.get(`${apiUrl}/card/${userID}`);
            console.log(cardResult.data);
			setCardExists(true);
			setCardID(cardResult.data._id);
			setPhoto(cardResult.data.picture);
		  }catch(err){
			console.log("Error ", err);
		  }
        }
	}
    fetchData();
  }, []);


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
















