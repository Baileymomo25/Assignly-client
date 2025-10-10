import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CreditCard, Shield, CheckCircle } from 'lucide-react'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'

export default function Payment() {
  const navigate = useNavigate()
  const { requestData, setPaymentData } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!requestData) {
      navigate('/request')
    }
  }, [requestData, navigate])

  // Pricing configuration
  const pricingConfig = {
    deliveryTypeLabels: {
      standard: 'Standard',
      express: 'Express',
      urgent: 'Urgent'
    }
  }

  // Helper function to calculate days until deadline
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handlePayment = () => {
    setIsProcessing(true)
    
    // Create Paystack payment handler
    const paystackHandler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: requestData.email,
      amount: requestData.totalPrice * 100, // Convert to kobo
      currency: 'NGN',
      ref: `TRX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: requestData.fullName
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: requestData.phone
          },
          {
            display_name: "Work Type",
            variable_name: "work_type",
            value: requestData.workType
          },
          {
            display_name: "Page Count",
            variable_name: "page_count",
            value: requestData.pageCount
          },
          {
            display_name: "Diagram Count",
            variable_name: "diagram_count",
            value: requestData.diagramCount || 0
          }
        ]
      },
      callback: (response) => {
        // Payment was successful
        const paymentResult = {
          success: true,
          transactionId: response.reference,
          amount: requestData.totalPrice,
          timestamp: new Date().toISOString()
        }
        
        setPaymentData(paymentResult)
        navigate('/success')
      },
      onClose: () => {
        // User closed the payment modal
        setIsProcessing(false)
        alert('Payment was not completed. Please try again.')
      }
    })
    
    paystackHandler.openIframe()
  }

  if (!requestData) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Payment</h1>
          <p className="text-lg text-gray-600">Secure payment processed through Paystack</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Enhanced Order Summary from second version */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Service Type:</span>
                <span className="font-medium capitalize">{requestData.workType}</span>
              </div>
              <div className="flex justify-between">
                <span>Pages:</span>
                <span className="font-medium">{requestData.pageCount} pages</span>
              </div>
              {requestData.diagramCount > 0 && (
                <div className="flex justify-between">
                  <span>Diagrams:</span>
                  <span className="font-medium">{requestData.diagramCount} diagrams</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-medium">
                  {pricingConfig.deliveryTypeLabels[requestData.deliveryType]}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Deadline:</span>
                <span className="font-medium">
                  {new Date(requestData.deadline).toLocaleDateString()}
                  {getDaysUntilDeadline(requestData.deadline) < 3 && (
                    <span className="text-red-600 ml-1">(Impromptu)</span>
                  )}
                </span>
              </div>
              
              {/* Price Breakdown */}
              {requestData.priceBreakdown && requestData.priceBreakdown.length > 0 && (
                <div className="pt-3 border-t space-y-2">
                  {requestData.priceBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.item}</span>
                      <span>₦{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                <span>Total:</span>
                <span className="text-primary-600">₦{requestData.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
            
            <div className="space-y-6">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span className="text-sm text-primary-700">Secure payment with Paystack</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">256-bit SSL encryption</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Payment Method</span>
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-center mb-4">
                  <p className="text-gray-600">You will be redirected to Paystack's secure payment page</p>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Supports cards, bank transfers, and mobile money
                </p>
              </div>

              <Button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="w-full flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : `Pay ₦${requestData.totalPrice.toLocaleString()}`}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}