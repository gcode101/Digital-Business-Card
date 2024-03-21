import { useState } from 'react';
import axios from 'axios';
import { getTokenPayload } from '../services/TokenPayload';
import { useNavigate } from 'react-router-dom';


function CardBuild() {

	const [picture, setPicture] = useState();
	const [title, setTitle] = useState();

	const [linkedIn, setLinkedIn] = useState();
	const [social, setSocialLinks] = useState([]);

	const [about, setAbout] = useState();
	const [interests, setInterests] = useState();

	const [footerLink, setFooterLink] = useState('');
	const [footer, setFooterLinks] = useState([]);

	const navigate = useNavigate();

	const addFooterLink = () => {
		setFooterLinks([...footer, footerLink]);
		setFooterLink('');
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const tokenPayload = getTokenPayload();
		const userEmail = tokenPayload.email;
		const userID = tokenPayload.userID;
		const name = tokenPayload.name;

	    setSocialLinks(prevSocialLinks => [...prevSocialLinks, userEmail, linkedIn]);
	    setFooterLinks(prevFooterLinks => [...prevFooterLinks, footerLink]);

	    const socialLinks = [...social, userEmail, linkedIn];
	    const footerLinks = [...footer, footerLink];

	    const formData = new FormData();
	    formData.append('file', picture);
	    formData.append('name', name);
	    formData.append('title', title);
	    socialLinks.forEach(link => {
	    	formData.append('socialLinks[]', link);
	    });
	    formData.append('about', about);
	    formData.append('interests', interests);
	    footerLinks.forEach((link) =>{
	    	formData.append('footerLinks[]', link);
	    });
	    formData.append('userID', userID);

		axios.post('http://localhost:3000/card', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(result => {
			navigate("/card");
		})
		.catch((err) => console.log(err));
	}
	return(
		<div>
			<h1 className="text-center text-light">Build your Digital Card</h1>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<div className="from-group">
										<label htmlFor="picture">Picture</label>
										<input 
											type="file"
											className="form-control mt-2"
											id="picture"
											placeholder="Upload your photo"
											onChange={(e) =>  setPicture(e.target.files[0])}
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
										<div>
											<div onClick={addFooterLink} className="btn btn-outline-primary mt-2">Add another link</div>
											{ footer.map((link, index) => (
												<div key={index}>{link}</div>
											))}
										</div>
									</div>
									<button type="submit" className="btn btn-primary mt-4 center">Create Card</button>
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