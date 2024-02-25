import React from 'react'
import Info from './info'
import About from './about'
import Interests from './interests'
import Footer from './footer'

function Card() {
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