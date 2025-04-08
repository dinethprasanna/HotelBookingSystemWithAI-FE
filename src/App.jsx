import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero.jsx'
import HeroImg from './assets/hero/hero_1.jpg'
import HotelListings from './components/HotelListings'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <div className="relative min-h-screen">
        <Hero />
        <img
          src={HeroImg}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      <HotelListings />
    </>
  )
}

export default App
