import { useState } from 'react';
import axios from 'axios';


function CardBuild() {

	const [photo, setPhoto] = useState();
	const [title, setTitle] = useState();
	const [contactLinks, setContactLinks] = useState();
	const [about, setAbout] = useState();
	const [interests, setInterests] = useState();
	const [footer, setFooter] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/cards'), {
			photo,
			title,
			contactLinks,
			about,
			interests,
			footer,
			userId
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
										<label htmlFor="photo">Photo</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="photo"
											placeholder="Enter a link to your photo"
											onChange={(e) => { setPhoto(e.target.value) }}
										/>
										<label htmlFor="title">Title</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="title"
											placeholder="Enter your professional title"
											onChange={(e) => { setTitle(e.target.value) }}
										/>
										<label htmlFor="contact-links">Contact Links</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="contact-links"
											placeholder="Enter your email and linkedIn link"
											onChange={(e) => { setContactLinks(e.target.value) }}
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
											placeholder="Enter 4 social links"
											onChange={(e) => { setFooter(e.target.value) }}
										/>
									</div>
									<button type="submit" className="btn btn-primary mt-3">Create Card</button>
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