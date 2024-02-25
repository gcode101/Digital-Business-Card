import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'

import Home from './components/Home'
import Card from './components/Card/Card'
import Navbar from './components/Navbar'
import Signup from './components/Signup'

function App() {
  return (
  	<Router>
  	<div>
  		<Navbar />
	  	<Routes>
	    	<Route exact path="/" Component={Home} />
	    	<Route path="/card" Component={Card}/>
	    	<Route path="/signup" Component={Signup}/>
		</Routes>
	</div>
	</Router>
  )
}

export default App
