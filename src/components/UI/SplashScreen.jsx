import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function SplashScreen({ onComplete }) {
  const [showFallback, setShowFallback] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  // In the component, change the logoPath to:
const logoPath = `${window.location.origin}/logo.png`
  const handleLogoLoad = () => {
    console.log('✅ Logo loaded successfully from:', logoPath)
  }

  const handleLogoError = (e) => {
    console.error('❌ Logo failed to load from:', logoPath)
    console.log('Image error event:', e)
    setShowFallback(true)
  }

  console.log('🔄 SplashScreen rendering, logo path:', logoPath)

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Logo Image */}
        <img 
          src={logoPath} 
          alt="Assignly Logo" 
          className="h-32 w-auto mx-auto mb-4"
          onLoad={handleLogoLoad}
          onError={handleLogoError}
          style={{ display: showFallback ? 'none' : 'block' }}
        />
        
        {/* Text fallback */}
        {showFallback && (
          <div className="text-4xl font-bold text-primary-600 mb-4">
            Assignly
          </div>
        )}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="h-1 bg-primary-600 mx-auto rounded-full"
        />
      </motion.div>
    </div>
  )
}