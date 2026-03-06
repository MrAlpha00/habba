import React, { useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import IntroCover from './components/IntroCover'
import ScrollToTop from './ScrollToTop'

// Lazy load other pages
const Teams = lazy(() => import('./pages/Team'))
const Events = lazy(() => import('./pages/Events'))
const ContactUs = lazy(() => import('./pages/ContactUs'))

const App = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [start, setStart] = useState(!isHome)

  return (
    <div className="relative text-white min-h-screen bg-cover bg-center bg-black">

      {!start && <IntroCover onFinish={() => setStart(true)} />}

      {start && (
        <>
          <ScrollToTop />
          <Navbar />

          <Suspense fallback={<div className="text-center p-10">Loading...</div>}>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>

          </Suspense>

          <Footer />
        </>
      )}

    </div>
  )
}

export default App