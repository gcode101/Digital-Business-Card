import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Info from './components/info'
import About from './components/about'
import Interests from './components/interests'

function App() {
  return (
    <div className='App'>
      <Info />
      <About />
      <Interests />
    </div>
  )
}

export default App
