import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/login', { email, password })
		.then(result => {
			console.log(result)
			if(result.data === "success"){
				navigate('/card')
			}
		})
		.catch(err => console.log(err))
	}

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-header">
							<h4>Login</h4>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input 
										type="text"
										className="form-control mt-2"
										id="email"
										placeholder="Enter your email"
										onChange={ (e) => { setEmail(e.target.value) } }
									/>
									<label htmlFor="password">Password</label>
									<input 
										type="password"
										className="form-control mt-2"
										id="password"
										placeholder="Enter your password"
										onChange={ (e) => { setPassword(e.target.value) } }
									/>
								</div>
								<button type="submit" className="btn btn-primary mt-3">Login</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;