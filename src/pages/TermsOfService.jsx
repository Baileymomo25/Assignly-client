import { motion } from 'framer-motion'
import Card from '../components/UI/Card'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using Assignly, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-700 mb-4">
                  Assignly provides academic assistance services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Assignment writing and completion</li>
                  <li>Project development and documentation</li>
                  <li>Thesis and dissertation assistance</li>
                  <li>Report writing and formatting</li>
                  <li>Presentation slide creation</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Our services are designed to assist students in their academic work while maintaining academic integrity.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pricing and Payment</h2>
                <div className="text-gray-700 space-y-4">
                  <p><strong>Base Pricing:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Writing Service: ₦200 per page</li>
                    <li>Diagrams: ₦100 per diagram</li>
                    <li>Printed Documents: ₦300 per page</li>
                    <li>Spiral Binding: ₦300 additional fee</li>
                  </ul>
                  
                  <p><strong>Impromptu Service:</strong></p>
                  <p>Assignments with deadlines less than 3 days attract an additional ₦500 impromptu service fee.</p>
                  
                  <p><strong>Payment Terms:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Full payment is required before work commencement</li>
                    <li>Payments are processed securely through Paystack</li>
                    <li>All prices are in Nigerian Naira (₦)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
                <p className="text-gray-700 mb-4">As a user of Assignly, you agree to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate and complete information for your assignments</li>
                  <li>Use the provided work as a reference and learning aid only</li>
                  <li>Not submit our work as your own in violation of academic integrity policies</li>
                  <li>Respect intellectual property rights and copyright laws</li>
                  <li>Make timely payments for services rendered</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Delivery and Deadlines</h2>
                <div className="text-gray-700 space-y-4">
                  <p><strong>Delivery Options:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Soft Copy (Digital download)</li>
                    <li>Printed Document</li>
                    <li>Printed Document with Spiral Binding</li>
                  </ul>
                  
                  <p><strong>Deadline Policy:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>We guarantee delivery before your specified deadline</li>
                    <li>Rush orders (less than 3 days) are subject to impromptu fees</li>
                    <li>Delivery times may vary based on assignment complexity</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Refund Policy</h2>
                <p className="text-gray-700 mb-4">Refunds may be considered under the following circumstances:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Service not delivered by the agreed deadline</li>
                  <li>Significant deviation from assignment requirements</li>
                  <li>Technical errors in payment processing</li>
                  <li>Cancellation request before work commencement</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Refund requests must be submitted in writing within 7 days of service delivery.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Academic Integrity</h2>
                <p className="text-gray-700">
                  Assignly is committed to supporting academic integrity. Our services are intended to provide:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                  <li>Learning references and study aids</li>
                  <li>Research assistance and guidance</li>
                  <li>Formatting and editing support</li>
                  <li>Concept explanation and clarification</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Users are responsible for ensuring their use of our services complies with their institution's academic integrity policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-700">
                  For questions about these Terms of Service, please contact us:
                </p>
                <p className="text-gray-700 mt-2">
                  Email: legal@assignly.com<br />
                  Phone: {import.meta.env.VITE_WHATSAPP_NUMBER || '+234 XXX XXX XXXX'}<br />
                  Address: [Your Business Address]
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
