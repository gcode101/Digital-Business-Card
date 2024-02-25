import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";


function Footer () {

	let twitter = "https://twitter.com/cguelmis"
	let linkedin = "https://www.linkedin.com/in/guelmis/"
	let github = "https://github.com/gcode101"
	let insta = "https://www.instagram.com/dominoss18/"
	return (
		<div className='footer-section'>
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
		</div>
	)
}

export default Footer;