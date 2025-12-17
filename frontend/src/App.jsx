import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/authContext"
import HomePage from "./pages/HomePage.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Creator from "./pages/CreatorPage.jsx"
import MyCampaignPage from "./pages/MyCampaignPage.jsx"
import CampaignDetails from "./components/CampaignDetails.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import Pricing from "./components/Pricing.jsx"
import VerifyPage from "./pages/VerifyPage.jsx"


function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-full relative">
          {/* Cosmic Noise */}

          <div className="relative z-10 flex flex-col min-h-screen ">
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/my" element={<MyCampaignPage />} />
                <Route path="/creator" element={<Creator />} />
                <Route path="/campaign/:id" element={<CampaignDetails />} />
                <Route path="/about" element={<AboutPage />}/>
                <Route path='pricing' element ={<Pricing />}/>
                <Route path="/verify" element={<VerifyPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
