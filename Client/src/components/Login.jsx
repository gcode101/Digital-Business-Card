import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { getApiUrl } from '../services/ApiUrl';


function Login({ onLogin }) {

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const navigate = useNavigate();
	const [successMsg, setSuccessMsg] = useState();
	const [errors, setErrors] = useState({});
	const apiUrl = getApiUrl();


	axios.defaults.withCredentials = true;
	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validateForm(formData);

		if(Object.keys(validationErrors).length === 0){
			const { email, password } = formData;
			axios.post(`${apiUrl}/login`, { email, password })
			.then(result => {
				console.log(result)
				if(result.data === "success"){
					onLogin();
					navigate('/profile');
				}else if (result.data === "user not found"){
					setErrors({
						email: result.data
					});
				}else if(result.data === "incorrect password"){
					setErrors({
						password: result.data
					});
				}
			})
			.catch(err => console.log(err))
		}else{
			setErrors(validationErrors);
		}
	}

	const validateForm = (data) => {
		let formErrors = {};

		if(!data.email.trim() || !data.password.trim()){
			formErrors.all = "All fields are required";
		}
		return formErrors;
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	}

	//Grab success msg from localStorage after successful user registration
	useEffect(() =>{
		const successMessage = localStorage.getItem('registrationSuccess');
		if(successMessage){
			setSuccessMsg(successMessage);
			localStorage.removeItem('registrationSuccess');
		}
	},[]);

	return (
		<div className="container main-container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h3 className="text-light">{ successMsg }</h3>
					<div className="card">
						<div className="card-header">
							<h4>Login</h4>
						</div>
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								{ errors.all && <span className="errorMsg">{ errors.all }</span>}
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input 
										type="text"
										className="form-control mt-2"
										id="email"
										name="email"
										value={ formData.email }
										placeholder="Enter your email"
										onChange={ handleChange }
									/>
									<div>
										{ errors.email && <span className="errorMsg">{ errors.email }</span>}
									</div>
									<label htmlFor="password">Password</label>
									<input 
										type="password"
										className="form-control mt-2"
										id="password"
										name="password"
										value={ formData.password }
										placeholder="Enter your password"
										onChange={ handleChange }
									/>
									{ errors.password && <span className="errorMsg">{ errors.password }</span>}
								</div>
								<p className="form-reminder">Dont have an account? <Link to="/signup">Sign up</Link></p>
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