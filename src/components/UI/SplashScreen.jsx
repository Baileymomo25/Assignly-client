import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 0.3,
          duration: 0.8,
          ease: "easeOut"
        }}
        className="text-center"
      >
        {/* Replace with your actual logo - for now using text */}
        <img 
                src={logoPath} 
                alt="Assignly Logo" 
                className="w-48 h-48 object-contain"
                onError={(e) => {
                  // Fallback if the logo file doesn't exist
                  console.error('Logo not found:', logoPath);
                  e.target.style.display = 'none';
                  
                  // Show text fallback
                  const fallbackElement = e.target.nextElementSibling;
                  if (fallbackElement) {
                    fallbackElement.style.display = 'block';
                  }
                }}
            
           
            />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="h-1 bg-primary-600 mx-auto rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}