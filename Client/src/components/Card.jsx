import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { getTokenPayload } from '../services/TokenPayload';
import { MdEmail } from "react-icons/md";
import { SiLinkedin } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareGithub } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

function Card() {

	const navigate = useNavigate();
	const { userID } = getTokenPayload();

	const [photo, setPhoto] = useState();
	const [name, setName] = useState();
	const [title, setTitle] = useState();
	const [socialLinks, setSocialLinks] = useState([]);
	const [about, setAbout] = useState();
	const [interests, setInterests] = useState();
	const [footerLinks, setFooterLinks] = useState([]);
	const [cardExists, setCardExists] = useState(false);

	const[twitter, setTwitter] = useState('');
	const[github, setGithub] = useState('');
	const[insta, setInsta] = useState('');
	const[linkedin, setLinkedin] = useState('');
	const[emailLink, setEmailLink] = useState('');

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

				setPhoto(result.data.picture);
				setName(name);
				setTitle(title);
				setSocialLinks(socialLinks);
				setAbout(about);
				setInterests(interests);
				setFooterLinks(footerLinks);
				setCardExists(true);

				function getFooterLinks() {
					footerLinks.forEach((item) => {
						if(item.includes('twitter')){
							setTwitter(item);
						}else if(item.includes('github')){
							setGithub(item);
						}else if(item.includes('instagram')){
							setInsta(item);
						}
					});
				}

				if(footerLinks){
					getFooterLinks();
				}

				const lastLink = socialLinks.length - 1;
				const linkedinLink = socialLinks[lastLink];
				if(linkedinLink){
					setLinkedin(linkedinLink);
				}
				setEmailLink(`mailto:${socialLinks[0]}`);
			}

		})
		.catch(err => {
			console.error('Error fetching card:', err);
		});
	}, []);

	const openNewTab = (link) => {
		//open new tab
		const newTab = window.open(link, '_blank');
		if(newTab){
			newTab.focus();
		}else{
			//if blocked by browser, fall back to same tab
			window.location.href = link;
		}
	}


	return (
		<div className="card-container">
			{cardExists ? (
				<div className="full-card">
					<div className='info-section'>
						<img src={`http://localhost:3000/${photo}`} className='img-fluid' alt='photo'/>
						<div className='info m-4'>
							<h1>{ name }</h1>
							<h3 className="mt-2">{ title }</h3>
							<div className='info-buttons'>
								<button className='btn btn-outline-secondary email-button' onClick={() => {window.open(emailLink, '_blank')}}>
									<MdEmail />
									Email
								</button>
								<button className='btn btn-primary linkedin-button' onClick={() => {openNewTab(linkedin)}}>
									<SiLinkedin />
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
				

					<div className='footer-section'>
						{twitter && (	
							<button className='btn btn-outline-secondary icon' onClick={() => {openNewTab(twitter)}}>
								<FaSquareXTwitter />
							</button>
						)}
						{linkedin && (
							<button className='btn btn-outline-secondary icon' onClick={() => {openNewTab(linkedin)}}>
								<SiLinkedin/>
							</button>
						)}
						{github && (
							<button className='btn btn-outline-secondary icon' onClick={() => {openNewTab(github)}}>
								<FaSquareGithub />
							</button>
						)}
						{insta && (
							<button className='btn btn-outline-secondary icon' onClick={() => {openNewTab(insta)}}>
								<FaInstagramSquare />
							</button>
						)}
					</div>
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