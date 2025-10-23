import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Request from './pages/Request'
import Payment from './pages/Payment'
import Success from './pages/Success'
import { AppProvider } from './context/AppContext'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
          Go to homepage
        </a>
      </div>
    </div>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-4">
            Assignly
          </div>
          <div className="h-1 bg-primary-600 mx-auto rounded-full w-24"></div>
        </div>
      </div>
    )
  }

  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request" element={<Request />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App