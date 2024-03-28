import { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenPayload } from '../services/TokenPayload';
import { useNavigate, Link } from 'react-router-dom';


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
	const [errors, setErrors] = useState({});
	const tokenPayload = getTokenPayload();
	const userID = tokenPayload.userID;
	const userEmail = tokenPayload.email;
	const name = tokenPayload.name;
	const [editIndex, setEditIndex] = useState(null);

	const addFooterLink = (e) => {
		e.preventDefault();
		if (editIndex !== null){
			const newFooter = [...footer];
			newFooter[editIndex] = footerLink;

			setFooterLinks(newFooter);
			setEditIndex(null);
			setFooterLink('');
		}else {
			setFooterLinks([...footer, footerLink]);
			setFooterLink('');
		}
	}

	const deleteLink = (index, e) => {
		e.preventDefault();
		const newFooter = [...footer];
		newFooter.splice(index, 1);
		setFooterLinks(newFooter);
	}

	const validateForm = (data) => {
		let formErrors = {};
		if(!data.title || !data.title.trim()){
			formErrors.title = "Title field is required";
		}

		return formErrors;
	}

	const handleEdit = (index, e) => {
		e.preventDefault();
		setFooterLink(footer[index]);
		setEditIndex(index);
	}

	const cancelFooterUpdate = (e) => {
		e.preventDefault();
		setEditIndex(null);
		setFooterLink('');
	}

	useEffect(() => {
		axios.get(`https://digital-business-card-api.vercel.app/card/${userID}`)
		.then(result => {
			if (result) {
				console.log(result);
				const {
					picture, 
					title,
					socialLinks,
					about,
					interests,
					footerLinks
				} = result.data;

				setPicture(picture);
				setTitle(title);
				setSocialLinks(socialLinks);
				setLinkedIn(socialLinks[1]);
				setAbout(about);
				setInterests(interests);
				setFooterLinks(footerLinks);
			}
		})
		.catch(err => {
			console.error('Error fetching card:', err);
		});
	},[]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if(!linkedIn){
			setLinkedIn('');
		}

	    setSocialLinks(prevSocialLinks => [...prevSocialLinks, userEmail, linkedIn]);
	    setFooterLinks(prevFooterLinks => [...prevFooterLinks, footerLink]);

	    const socialLinks = [...social, userEmail, linkedIn];
	    const footerLinks = [...footer, footerLink];

		const validationErrors = validateForm({
	    	title
		});
	    const formData = new FormData();
	    formData.append('file', picture);
	    formData.append('title', title);
	    socialLinks.forEach(link => {
	    	formData.append('socialLinks[]', link);
	    });
	    formData.append('about', about);
	    formData.append('interests', interests);
	    footerLinks.forEach((link) =>{
	    	formData.append('footerLinks[]', link);
	    });

		if(Object.keys(validationErrors).length === 0){
			axios.put(`https://digital-business-card-api.vercel.app/card/${userID}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(result => {
				console.log(result);
				navigate("/card");
			})
			.catch((err) => console.log(".catch(err) => ",err));
		}else{
			setErrors(validationErrors);
		}
	}
	return(
		<div>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<div className="from-group">
										<label htmlFor="picture">Update Picture</label>
										<input 
											type="file"
											className="form-control mt-2"
											id="picture"
											placeholder="Upload your photo"
											onChange={(e) => setPicture(e.target.files[0])}
										/>
										<div>
											{ errors.file &&  <span className="errorMsg">{ errors.file }</span>}
										</div>
										<label htmlFor="title">Title</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="title"
											placeholder="Enter your professional title"
											value={ title }
											onChange={(e) => { setTitle(e.target.value) }}
										/>
										<div>
											{ errors.title &&  <span className="errorMsg">{ errors.title }</span>}
										</div>
										<label htmlFor="linkedIn">LinkedIn</label>
										<input 
											type="text"
											className="form-control mt-2"
											id="linkedIn"
											placeholder="Enter your LinkedIn link"
											value={ linkedIn }
											onChange={(e) => { setLinkedIn(e.target.value) }}
										/>
										<label htmlFor="about">About</label>
										<textarea 
											type="text"
											rows={4}
											className="form-control mt-2"
											id="about"
											placeholder="Write a brief text about yourself"
											value={ about }
											onChange={(e) => { setAbout(e.target.value) }}
										>
										</textarea>
										<label htmlFor="interests">Interests</label>
										<textarea 
											type="text"
											rows={3}
											className="form-control mt-2"
											id="interests"
											placeholder="Write a brief text about your interests"
											value={ interests }
											onChange={(e) => { setInterests(e.target.value) }}
										>
										</textarea>
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
											<button onClick={addFooterLink} className="btn btn-outline-primary mt-2">
												{editIndex === null ? 'Add another link' : 'Update link'}
											</button>
											{editIndex !== null && (
												<button onClick={cancelFooterUpdate} className="btn btn-outline-secondary mt-2 mx-2">Cancel</button>
											)}
											{editIndex === null && (footer.map((link, index) => (
												<div key={index}>
													{link}
													{link && <button className="btn btn-link" onClick={(e) => handleEdit(index, e)}>Edit</button>}
													{link && <a href="" className="link-danger" onClick={(e) => deleteLink(index, e)}>Delete</a>}
												</div>
											)))}
										</div>
									</div>
									<button type="submit" className="btn btn-primary mt-4 center">Update</button>
									<Link to="/card" className="btn btn-secondary mt-4 mx-2 center">Cancel</Link>
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