import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Teams from './pages/Team'
import Events from './pages/Events'
import ContactUs from './pages/ContactUs'
import Footer from './components/Footer'
import IntroCover from './components/IntroCover'
import ScrollToTop from './ScrollToTop'

const App = () => {
  const location = useLocation();
  // Only show the intro cover when landing on the home route
  const isHome = location.pathname === '/';
  const [start, setStart] = useState(!isHome); // skip intro for non-home routes
  return (
    <div
      className="relative text-white min-h-screen bg-cover bg-center bg-black"
    >


      {/* Content */}

      <div className="relative z-10">

      </div>
      {!start && <IntroCover onFinish={() => setStart(true)} />}

      {start && (
        <>
          <ScrollToTop />   {/* ⭐ ADD HERE */}

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>

          <Footer />
        </>
      )}

    </div>

  )
}

export default App
