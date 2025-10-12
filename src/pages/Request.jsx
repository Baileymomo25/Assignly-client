const handleSubmit = async (formData) => {
  setIsSubmitting(true)
  setLoading(true)
  
  try {
    console.log('Submitting form data:', formData)
    console.log('API URL:', import.meta.env.VITE_BACKEND_URL)
    
    // Submit directly to backend (remove health check)
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
      // Server responded with error status
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
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your connection and try again.'
    } else if (error.message) {
      // Something else happened
      errorMessage = error.message
    }
    
    alert(errorMessage)
  } finally {
    setIsSubmitting(false)
    setLoading(false)
  }
}