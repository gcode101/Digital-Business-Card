import { useState } from "react";
import axios from "axios"; 
import { useNavigate, Link } from 'react-router-dom';


function Signup() {

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPass: ''
	});

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	//Error validation function
	const validateForm = (data) => {
		let formErrors = {}

		if(!data.name.trim()){
			formErrors.name = 'Name is required'
		}

		if(!data.email.trim()){
			formErrors.email = 'Email is required';
		}else if(!/\S+@\S+\.\S+/.test(data.email)){
			formErrors.email = 'Invalid email';
		}

		if(!data.password.trim()){
			formErrors.password = 'Password is required';
		}else if(data.password.length < 8){
			formErrors.password = 'Password needs to be at least 8 characters long';
		}

		if(data.confirmPass !== data.password){
			formErrors.confirmPass = 'Passwords do not match'
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validateForm(formData);

		if(Object.keys(validationErrors).length === 0){
			const { name, email, password } = formData;

			axios.post('https://digital-business-card-api.vercel.app/register', {name, email, password})
			.then(result => {console.log(result)
				localStorage.setItem('registrationSuccess', 'Registration successful. Please log in.');
				navigate('/login');
			})
			.catch(err => console.log(err))
			console.log('Form submitted successfully');
		}else{
			setErrors(validationErrors);
		}
	}

	return (
		<div className="container mt-5">
	      <div className="row justify-content-center">
	        <div className="col-md-6">
	          <div className="card">
	            <div className="card-header">
	              <h4>Register</h4>
	            </div>
	            <div className="card-body">
	              <form onSubmit={handleSubmit}>
	                <div className="form-group">
	                  <label htmlFor="name">Name</label>
	                  <input 
	                  	type="text" 
	                  	className="form-control mt-2" 
	                  	id="name" 
	                  	name="name"
	                  	value={ formData.name }
	                  	placeholder="Enter your name"
	                  	onChange={ handleChange }
	                  />
	                  { errors.name && <span className="errorMsg">{ errors.name }</span> }
	                </div>
	                <div className="form-group mt-2">
	                  <label htmlFor="email">Email</label>
	                  <input 
		                type="email" 
		                className="form-control mt-2" 
		                id="email" 
		                name="email"
		                value={ formData.email }
		                placeholder="Enter your email"
		                onChange={ handleChange }
	                  />
	                  { errors.email && <span className="errorMsg">{ errors.email }</span> }
	                </div>
	                <div className="form-group mt-2">
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
	                  { errors.password && <span className="errorMsg">{ errors.password }</span> }
	                </div>
	                <div className="form-group mt-2">
	                  <label htmlFor="confirmPass">Confirm Password</label>
	                  <input 
		                type="password" 
		                className="form-control mt-2" 
		                id="confirmPass"
		                name="confirmPass"
		                value={ formData.confirmPass }
		                placeholder="Enter your password" 
		                onChange={ handleChange }
	                  />
	                  { errors.confirmPass && <span className="errorMsg">{ errors.confirmPass }</span> }
	                </div>
	                <p className="form-reminder">Already registered? <Link to="/login">Log in</Link></p>
	                <button type="submit" className="btn btn-primary mt-3">Register</button>
	              </form>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	)
}

export default Signup;