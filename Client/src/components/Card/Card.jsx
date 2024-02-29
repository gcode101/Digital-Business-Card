import React from 'react';
import Info from './info';
import About from './about';
import Interests from './interests';
import Footer from './footer';
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Card() {

	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:3000/card')
		.then(result => {
			console.log(result);
			if(result.data !== "success"){
				navigate('/login');
			}
		})
		.catch(err => console.log(err))
	}, []);

	return (
		<div className="card-container">
			<div className="card">
				<Info />
				<About />
				<Interests />
				<Footer />
			</div>
		</div>
	)

}

export default Card;