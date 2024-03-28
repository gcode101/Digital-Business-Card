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
import Update from './components/UpdateCard'
import ShowReadyCard from './components/ShowReadyCard'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
  	setIsLoggedIn(false);
  	<Logout />
  }

  const handleLogin = () => {
  	setIsLoggedIn(true);

  }

  return (
    <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
		<Routes>
		    <Route exact path="/" element={<Home />} />
        <Route path="/show-card/:id" element={ <ShowReadyCard/> }/>
		    <Route path="/card" element={isLoggedIn ? <Card /> : <Login onLogin={handleLogin} />} />
		    <Route path="/signup" element={<Signup />} />
		    <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Profile />} />
		    <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login onLogin={handleLogin} />} />
		    <Route path="/card-build" element={isLoggedIn ? <CardBuild /> : <Login onLogin={handleLogin} />} />
		    <Route path="/update-card" element={isLoggedIn ? <Update/> : <Login onLogin={handleLogin}/>} />
		</Routes>
    </Router>
  )
}

export default App
