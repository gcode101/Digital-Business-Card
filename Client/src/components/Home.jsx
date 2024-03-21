import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="container d-flex justify-content-center">
			<div id="home" class="intro-slide">
				<div>
					<div class="intro-info text-center text-light">
						<h1 class="fw-semibold animated title">Build on your online presence with us!</h1>
						<p class="animated subtitle mt-4" id="subtitle">
							With our easy-to-use platform, you can create a professional and stylish business 
							card that showcases you. 
						</p>
						<Link to="/signup" className="btn btn-primary mt-5">Let's Get Started</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;