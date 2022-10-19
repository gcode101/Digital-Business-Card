import photo from "../photo.jpg"


function Info () {
	return (
		<div className='info-section'>
			<img src={photo} className='photo' alt='photo'/>
			<div className='info'>
				<h1>Guelmis Cortina</h1>
				<h3>Software Developer</h3>
				<div className='info-buttons'>
					<button className='email-button'>Email</button>
					<button className='linkedin-button'>LinkedIn</button>
				</div>
			</div>

		</div>
	)
}

export default Info;
