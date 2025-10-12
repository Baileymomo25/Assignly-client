import { motion } from 'framer-motion'
import Card from '../components/UI/Card'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect information that you provide directly to us when using Assignly:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Personal identification information (name, email address, phone number)</li>
                  <li>Academic assignment details and requirements</li>
                  <li>Payment information processed through secure third-party providers</li>
                  <li>Files and documents you upload for your assignments</li>
                  <li>Communication records between you and our service team</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide, maintain, and improve our academic assistance services</li>
                  <li>Process your payments and complete transactions</li>
                  <li>Communicate with you about your assignments and service updates</li>
                  <li>Ensure the quality and timely delivery of your academic work</li>
                  <li>Comply with legal obligations and prevent fraudulent activities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Protection</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Encryption of sensitive data during transmission and storage</li>
                  <li>Secure payment processing through certified providers</li>
                  <li>Restricted access to personal information on a need-to-know basis</li>
                  <li>Regular security assessments and updates to our systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
                <p className="text-gray-700 mb-4">
                  We may use third-party services for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Payment processing (Paystack)</li>
                  <li>Email communication services</li>
                  <li>Cloud storage for document management</li>
                  <li>Analytics to improve our services</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-700 mt-2">
                  Phone: {import.meta.env.VITE_WHATSAPP_NUMBER || '+234 XXX XXX XXXX'}
                  Address: McPherson University, Seriki Sotayo, Ogun State, Nigeria
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}