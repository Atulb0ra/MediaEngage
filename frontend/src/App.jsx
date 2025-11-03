
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/authContext"
import HomePage from "./pages/HomePage.jsx"
import SignupPage from "./pages/signupPage.jsx"
import SigninPage from "./pages/SigninPage.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Creator from "./pages/Creator.jsx"


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-full bg-black relative">
          {/* Cosmic Noise */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)"
            }}
          />

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/creator" element={<Creator />} />
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
