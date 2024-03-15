import { Link } from 'react-router-dom';


function Profile() {
	return(
		<div className="container profile">
			<h1 className="text-light text-center">My Profile</h1>

			<div className="d-grid gap-2 col-6 mx-auto">
			  <Link to="/card-build" className="btn btn-primary">Create your Digital Card</Link>
			  <Link to="/card" className="btn btn-success">Digital Card Preview</Link>
			</div>
		</div>
	);

}

export default Profile;