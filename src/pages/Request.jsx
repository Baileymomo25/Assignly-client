import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Card from '../components/UI/Card'
import RequestForm from '../components/Form/RequestForm'
import api from '../services/api'

function Request() {
  // All hooks at the top - never inside conditions/loops
  const navigate = useNavigate()
  const { setRequestData, setLoading } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setLoading(true)
    
    try {
      console.log('Submitting form data:', formData)
      
      // Submit to backend
      const response = await api.post('/api/requests', formData)
      
      console.log('Response received:', response.data)
      
      // Store request data in context
      setRequestData({
        ...formData,
        id: response.data.requestId
      })
      
      // Navigate to payment page
      navigate('/payment')
    } catch (error) {
      console.error('Error submitting form:', error)
      
      let errorMessage = 'Error submitting request. Please try again.'
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.error || 'Invalid data. Please check your inputs.'
          if (error.response.data.missingFields) {
            errorMessage += ` Missing: ${error.response.data.missingFields.join(', ')}`
          }
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        } else if (error.response.status === 404) {
          errorMessage = 'Service temporarily unavailable. Please try again later.'
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection and try again.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Academic Assistance</h1>
          <p className="text-lg text-gray-600">
            Fill out the form below and our experts will get back to you shortly
            <br>Please Note that any order placed less than three days before the deadline would be tagged Impromptu 
            and will attract an impromptu fee of NGN500</br>
          </p>
        </motion.div>

        <Card className="p-8">
          <RequestForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </Card>
      </div>
    </div>
  )
}

export default Request