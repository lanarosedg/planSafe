import { useState } from 'react'
import './App.css'
import Logo from './Logo'
import User from './User'
import CurrentLocation from './CurrentLocation'
import Search from './Search'
import WeatherPhoto from './WeatherPhoto'

function App() {

  return (
    <div class="parentContainer">
      <Logo/>
      <User/>
      <CurrentLocation/>
      <Search/>
      <WeatherPhoto/>
    </div>
  )
}

export default App
