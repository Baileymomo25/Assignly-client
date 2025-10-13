import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Request from './pages/Request'
import Payment from './pages/Payment'
import Success from './pages/Success'
import { AppProvider } from './context/AppContext'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

// Simple 404 component - MOVE THIS BEFORE App function
{/* Add a catch-all route for 404s */}
function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go to homepage</a>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request" element={<Request />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
    </ErrorBoundary>
  )
}

export default App