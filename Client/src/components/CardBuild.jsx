import { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../services/GetCookies'


function CardBuild() {

	const [picture, setPicture] = useState();
	const [title, setTitle] = useState();

	const [linkedIn, setLinkedIn] = useState();
	const [socialLinks, setSocialtLinks] = useState([]);

	const [about, setAbout] = useState();
	const [interests, setInterests] = useState();

	const [footerLink, setFooterLink] = useState('');
	const [footerLinks, setFooterLinks] = useState([]);

	const getTokenPayload = () => {
		const token = getCookie('token');
		let tokenPayload = '';
		if (token){
			tokenPayload = JSON.parse(atob(token.split('.')[1]));
		}
		return tokenPayload;
	}

	const addFooterLink = () => {
		setFooterLinks([...footerLinks, footerLink]);
		setFooterLink('');
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const tokenPayload = getTokenPayload();
		const userEmail = tokenPayload.email;
		const userID = tokenPayload.userId;
		const name = tokenPayload.name;

		setSocialtLinks([userEmail, linkedIn]);
		setFooterLinks([...footerLinks, footerLink]);

		axios.post('http://localhost:3000/cards', {
			picture,
			name,
			title,
			socialLinks,
			about,
			interests,
			footerLinks,
			userID
		})
		.then(result => {
			console.log(result)
		})
		.catch((err) => console.log(err));
	}
	return(
		<div>
			<h1 className="text-center text-light">Build your Digital Card</h1>
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<div className="from-group">
										<label htmlFor="picture">Picture</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="picture"
											placeholder="Enter a link to your photo"
											onChange={(e) => { setPicture(e.target.value) }}
										/>
										<label htmlFor="title">Title</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="title"
											placeholder="Enter your professional title"
											onChange={(e) => { setTitle(e.target.value) }}
										/>
										<label htmlFor="linkedIn">LinkedIn</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="linkedIn"
											placeholder="Enter your LinkedIn link"
											onChange={(e) => { setLinkedIn(e.target.value) }}
										/>
										<label htmlFor="about">About</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="about"
											placeholder="Write a brief text about yourself"
											onChange={(e) => { setAbout(e.target.value) }}
										/>
										<label htmlFor="interests">Interests</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="interests"
											placeholder="Write a brief text about your interests"
											onChange={(e) => { setInterests(e.target.value) }}
										/>
										<label htmlFor="footer">Footer</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="footer"
											placeholder="Enter social link"
											value={footerLink}
											onChange={(e) => { setFooterLink(e.target.value) }}
										/>
										<div onClick={addFooterLink} className="btn btn-outline-primary">Add another link</div>
									</div>
									<button type="submit" className="btn btn-primary mt-3 center">Create Card</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardBuild;