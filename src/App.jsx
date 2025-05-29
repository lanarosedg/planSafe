import { useState } from 'react'
import './App.css'
import Logo from './Logo'
import User from './User'
import CurrentLocation from './CurrentLocation'
import Search from './Search'

function App() {

  return (
    <div class="parentContainer">
      <Logo/>
      <User/>
      <CurrentLocation/>
      {/* <Search/> */}
    </div>
  )
}

export default App
