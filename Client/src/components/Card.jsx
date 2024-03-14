import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { getTokenPayload } from '../services/TokenPayload';

function Card() {

	const navigate = useNavigate();
	const { userID } = getTokenPayload();

	const [name, setName] = useState();
	const [title, setTitle] = useState();
	const [socialLinks, setSocialLinks] = useState([]);
	const [about, setAbout] = useState();
	const [interests, setInterests] = useState();
	const [footerLinks, setFooterLinks] = useState([]);
	const [cardExists, setCardExists] = useState(false);

	useEffect(() => {
		axios.get('http://localhost:3000/cardAuth')
		.then(result => {
			console.log(result);
			if(result.data !== "success"){
				navigate('/login');
			}
		})
		.catch(err => console.log(err));

		axios.get(`http://localhost:3000/card/${userID}`)
		.then(result => {
			if (result){
				const { 
					name,
					title,
					socialLinks,
					about,
					interests,
					footerLinks
				} = result.data;

				setName(name);
				setTitle(title);
				setSocialLinks(socialLinks);
				setAbout(about);
				setInterests(interests);
				setFooterLinks(footerLinks);
				setCardExists(true);
			}

		})
		.catch(err => {
			console.error('Error fetching card:', err);
		});
	}, []);

	const linkedinLink = socialLinks[1];
	const emailLink = `mailto:${socialLinks[0]}`;

	const openNewTab = (link) => {
		//open new tab
		const newTab = window.open(linkedinLink, '_blank');
		if(newTab){
			newTab.focus();
		}else{
			//if blocked by browser, fall back to same tab
			window.location.href = linkedinLink;
		}
	}

	return (
		<div className="card-container">
			{cardExists ? (
				<div className="card">
					<div className='info-section'>
						<img src='#' className='photo' alt='photo'/>
						<div className='info'>
							<h1>{ name }</h1>
							<h3>{ title }</h3>
							<div className='info-buttons'>
								<button className='email-button' onClick={() => {window.open(emailLink, '_blank')}}>
									Email
								</button>
								<button className='linkedin-button' onClick={() => {openNewTab(linkedinLink)}}>
									LinkedIn
								</button>
							</div>
						</div>
					</div>

					<div className='about-section'>
						<div className='about-info'>
							<h2>About</h2>
							<p>{ about }</p>
						</div>
					</div>

					<div className='inte-section'>
						<div className='inte-info'>
							<h2>Interests</h2>
							<p>{ interests }</p>
						</div>
					</div> 
				

	{/*				<div className='footer-section'>
						<a href={twitter}>
							<FaTwitterSquare className='icon' />
						</a>
						<a href={linkedin}>
							<FaLinkedin className='icon'/>
						</a>
						<a href={github}>
							<FaGithubSquare className='icon' />
						</a>
						<a href={insta}>
							<FaInstagramSquare className='icon' />
						</a>
					</div> //footer-section*/}
				</div>
			) : (
				<div>
					<h2 className="text-light mb-5">Looks like you don't have a card yet.</h2>
					<Link to="/card-build" className="btn btn-primary">Create your Digital Card</Link>
				</div>
			)}
		</div>
	)

}

export default Card;