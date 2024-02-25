import { useState } from "react";
import axios from "axios"; 


function Signup() {

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState(); 

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/register', {name, email, password})
		.then(result => console.log(result))
		.catch(err => console.log(error))
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
	                  	placeholder="Enter your name"
	                  	onChange={ (e) => {setName(e.target.value)} }
	                  />
	                </div>
	                <div className="form-group mt-2">
	                  <label htmlFor="email">Email</label>
	                  <input 
		                type="email" 
		                className="form-control mt-2" 
		                id="email" 
		                placeholder="Enter your email"
		                onChange={ (e) => {setEmail(e.target.value)} }
	                  />
	                </div>
	                <div className="form-group mt-2">
	                  <label htmlFor="password">Password</label>
	                  <input 
		                type="password" 
		                className="form-control mt-2" 
		                id="password" 
		                placeholder="Enter your password" 
		                onChange={ (e) => {setPassword(e.target.value)} }
	                  />
	                </div>
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