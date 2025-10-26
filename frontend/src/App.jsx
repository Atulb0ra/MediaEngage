import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthProvider from "./context/authContext"
import HomePage from "./pages/HomePage.jsx"
import SignupPage from "./pages/signupPage.jsx"
import SigninPage from "./pages/SigninPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
