import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'

import Home from './components/Home'
import Card from './components//Card'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import Profile from './components/Profile'
import CardBuild from './components/CardBuild'

function App() {
  return (
  	<Router>
  		<Navbar />
	  	<Routes>
	    	<Route exact path="/" Component={Home} />
	    	<Route path="/card" Component={Card}/>
	    	<Route path="/signup" Component={Signup}/>
	    	<Route path="/login" Component={Login}/>
	    	<Route path="/profile" Component={Profile}/>
	    	<Route path="/card-build" Component={CardBuild}/>
		</Routes>
	</Router>
  )
}

export default App
