import photo from "../photo.jpg"
import { GrMail } from "react-icons/gr";
import { AiFillLinkedin } from "react-icons/ai";


function Info () {
	return (
		<div className='info-section'>
			<img src={photo} className='photo' alt='photo'/>
			<div className='info'>
				<h1>Guelmis Cortina</h1>
				<h3>Software Developer</h3>
				<div className='info-buttons'>
					<button className='email-button'>
						<GrMail /> 
						Email
					</button>
					<button className='linkedin-button'>
						<AiFillLinkedin />
						LinkedIn
					</button>
				</div>
			</div>

		</div>
	)
}

export default Info;
