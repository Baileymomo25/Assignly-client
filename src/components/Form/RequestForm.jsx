import { useState } from 'react'
import Button from '../UI/Button'  // Add this import

export default function RequestForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    workType: '',
    deadline: '',
    notes: '',
    files: [],
    pageCount: 1,
    diagramCount: 0,
    deliveryType: 'soft_copy'
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.workType) newErrors.workType = 'Please select a work type'
    if (!formData.deadline) newErrors.deadline = 'Deadline is required'
    if (!formData.pageCount || formData.pageCount < 1) newErrors.pageCount = 'Page count must be at least 1'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Simple pricing calculation
      const submissionData = {
        ...formData,
        totalPrice: formData.pageCount * 2000,
        priceBreakdown: []
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="label">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="input-field"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="label">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input-field"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="workType" className="label">Work Type</label>
          <select
            id="workType"
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">Select work type</option>
            <option value="assignment">Assignment</option>
            <option value="project">Project</option>
            <option value="thesis">Thesis</option>
            <option value="report">Report</option>
            <option value="presentation">Presentation Slides</option>
          </select>
          {errors.workType && <p className="text-red-500 text-sm mt-1">{errors.workType}</p>}
        </div>

        <div>
          <label htmlFor="pageCount" className="label">Pages</label>
          <input
            type="number"
            id="pageCount"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleInputChange}
            className="input-field"
            min="1"
          />
          {errors.pageCount && <p className="text-red-500 text-sm mt-1">{errors.pageCount}</p>}
        </div>

        <div>
          <label htmlFor="diagramCount" className="label">Diagrams</label>
          <input
            type="number"
            id="diagramCount"
            name="diagramCount"
            value={formData.diagramCount}
            onChange={handleInputChange}
            className="input-field"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="deliveryType" className="label">Delivery Type</label>
          <select
            id="deliveryType"
            name="deliveryType"
            value={formData.deliveryType}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="soft_copy">Soft Copy Only</option>
            <option value="printed">Printed Document</option>
            <option value="printed_spiral">Printed & Spiral Bound</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className="label">Deadline</label>
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
        <label htmlFor="notes" className="label">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          className="input-field"
          placeholder="Any specific requirements..."
        />
      </div>

      {/* Use the custom Button component */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Processing...' : 'Continue to Payment'}
      </Button>
    </form>
  )
}