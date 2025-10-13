import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Card from '../components/UI/Card'
import RequestForm from '../components/Form/RequestForm' // Now using simple version

function Request() {
  const navigate = useNavigate()
  const { setRequestData, setLoading } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setLoading(true)
    
    try {
      console.log('Form submitted:', formData)
      
      // Store request data in context
      setRequestData(formData)
      
      // Navigate to payment page
      navigate('/payment')
    } catch (error) {
      console.error('Error:', error)
      alert('Test submission failed')
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