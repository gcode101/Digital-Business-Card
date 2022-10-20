import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Info from './components/info'
import About from './components/about'
import Interests from './components/interests'
import Footer from './components/footer'

function App() {
  return (
    <div className='App'>
      <Info />
      <About />
      <Interests />
      <Footer />
    </div>
  )
}

export default App
