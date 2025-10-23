import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../UI/Button'
import FileUpload from './FileUpload'
import pricingConfig from '../../config/pricing'

export default function RequestForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    level: '',
    courseOfStudy: '',
    workType: '',
    deadline: '',
    notes: '',
    files: [],
    pageCount: 1,
    diagramCount: 0,
    deliveryType: pricingConfig.deliveryTypes.SOFT_COPY
  })

  const [errors, setErrors] = useState({})
  const [showPricePreview, setShowPricePreview] = useState(false)

  // Calculate days until deadline
  const daysUntilDeadline = formData.deadline ? 
    Math.ceil((new Date(formData.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : 
    null

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.department.trim()) newErrors.department = 'Department is required'
    if (!formData.level) newErrors.level = 'Level is required'
    if (!formData.courseOfStudy.trim()) newErrors.courseOfStudy = 'Course of study is required'
    if (!formData.workType) newErrors.workType = 'Please select a work type'
    if (!formData.deadline) newErrors.deadline = 'Deadline is required'
    if (!formData.pageCount || formData.pageCount < 1) newErrors.pageCount = 'Page count must be at least 1'
    if (formData.diagramCount < 0) newErrors.diagramCount = 'Diagram count cannot be negative'
    
    // Validate deadline is not in the past
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
      newErrors.deadline = 'Deadline cannot be in the past'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Calculate final price before submitting
      const finalPrice = pricingConfig.calculatePrice(formData)
      const priceBreakdown = pricingConfig.getPriceBreakdown(formData)
      
      const submissionData = {
        ...formData,
        totalPrice: finalPrice,
        priceBreakdown: priceBreakdown
      }
      
      onSubmit(submissionData)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    const parsedValue = type === 'number' ? parseInt(value) || 0 : value
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: parsedValue 
    }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFilesUpload = (files) => {
    setFormData(prev => ({ ...prev, files }))
  }

  const calculatePreviewPrice = () => {
    return pricingConfig.calculatePrice(formData)
  }

  const getPriceBreakdownPreview = () => {
    return pricingConfig.getPriceBreakdown(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div>
          <label htmlFor="fullName" className="label">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Academic Information */}
        <div>
          <label htmlFor="department" className="label">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="input-field"
            placeholder="e.g., Computer Science"
          />
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        <div>
          <label htmlFor="level" className="label">Level</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">Select your level</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
            <option value="500">500 Level</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
          {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
        </div>

        <div>
          <label htmlFor="courseOfStudy" className="label">Course of Study</label>
          <input
            type="text"
            id="courseOfStudy"
            name="courseOfStudy"
            value={formData.courseOfStudy}
            onChange={handleInputChange}
            className="input-field"
            placeholder="e.g., Introduction to Programming"
          />
          {errors.courseOfStudy && <p className="text-red-500 text-sm mt-1">{errors.courseOfStudy}</p>}
        </div>

        <div>
          <label htmlFor="workType" className="label">Type of Work</label>
          {/* In your RequestForm component, update the work type options */}
<select
  id="workType"
  name="workType"
  value={formData.workType}
  onChange={handleInputChange}
  className="input-field"
>
  <option value="">Select work type</option>
  <option value="assignment">Assignment (₦300-400/page)</option>
  <option value="project">Project (₦15,000)</option>
  <option value="thesis">Thesis (₦7,000)</option>
  <option value="report">Report (₦7,000)</option>
  <option value="presentation">Presentation Slides (₦3,000)</option>
  <option value="writing_notes">Writing Service (₦300/page)</option>
</select>
          {errors.workType && <p className="text-red-500 text-sm mt-1">{errors.workType}</p>}
        </div>

        {/* Pricing Information */}
        <div>
          <label htmlFor="pageCount" className="label">Number of Pages</label>
          <input
            type="number"
            id="pageCount"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleInputChange}
            min="1"
            max="100"
            className="input-field"
          />
          {errors.pageCount && <p className="text-red-500 text-sm mt-1">{errors.pageCount}</p>}
        </div>

        <div>
          <label htmlFor="diagramCount" className="label">Number of Diagrams</label>
          <input
            type="number"
            id="diagramCount"
            name="diagramCount"
            value={formData.diagramCount}
            onChange={handleInputChange}
            min="0"
            max="50"
            className="input-field"
          />
          {errors.diagramCount && <p className="text-red-500 text-sm mt-1">{errors.diagramCount}</p>}
        </div>

        <div>
          <label htmlFor="deliveryType" className="label">Delivery Type</label>
          {/* In your RequestForm component, update the delivery type options */}
<select
  id="deliveryType"
  name="deliveryType"
  value={formData.deliveryType}
  onChange={handleInputChange}
  className="input-field"
>
  <option value={pricingConfig.deliveryTypes.SOFT_COPY}>Soft Copy Only (₦300/page)</option>
  <option value={pricingConfig.deliveryTypes.PRINTED}>Printed Document (₦400/page)</option>
  <option value={pricingConfig.deliveryTypes.PRINTED_SPIRAL}>Printed & Spiral Bound (₦400/page + ₦300 binding)</option>
  <option value={pricingConfig.deliveryTypes.HANDWRITTEN}>Handwritten (₦400/page)</option>
</select>
        </div>

        <div>
          <label htmlFor="deadline" className="label">
            Deadline
            {daysUntilDeadline !== null && (
              <span className={`ml-2 text-sm ${
                daysUntilDeadline < 3 ? 'text-red-600 font-bold' : 'text-green-600'
              }`}>
                ({daysUntilDeadline} days)
                {daysUntilDeadline < 3 && ' - Impromptu fee applies'}
              </span>
            )}
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="input-field"
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="label">Additional Notes & Requirements</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          className="input-field"
          placeholder="Any specific requirements, instructions, or special requests..."
        />
      </div>

      <div>
        <label className="label">Upload Files (Optional)</label>
        <FileUpload onFilesUpload={handleFilesUpload} />
      </div>

      {/* Price Preview */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-900">Estimated Price</h3>
          <button
            type="button"
            onClick={() => setShowPricePreview(!showPricePreview)}
            className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {showPricePreview ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        
        <div className="text-2xl font-bold text-primary-600 mb-2">
          ₦{(calculatePreviewPrice() / 100).toLocaleString()}
        </div>

        {showPricePreview && (
          <div className="text-sm text-gray-600 space-y-1">
            {getPriceBreakdownPreview().map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.item}</span>
                <span>₦{item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Processing...' : 'Continue to Payment'}
      </Button>
    </motion.form>
  )
}