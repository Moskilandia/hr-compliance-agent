import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SignatureCanvas from 'react-signature-canvas'
import { 
  PenTool, 
  CheckCircle2, 
  Clock, 
  Send,
  Download,
  RotateCcw,
  Mail,
  FileText,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  AlertCircle
} from 'lucide-react'
import { cn } from '../lib/utils'
import toast from 'react-hot-toast'

const steps = [
  { id: 1, label: 'Review Document', icon: FileText },
  { id: 2, label: 'Sign', icon: PenTool },
  { id: 3, label: 'Confirm', icon: CheckCircle2 },
  { id: 4, label: 'Complete', icon: Sparkles },
]

const mockDocument = {
  title: 'Employee Handbook 2024',
  content: `
    EMPLOYEE HANDBOOK ACKNOWLEDGMENT
    
    I acknowledge that I have received a copy of the Employee Handbook. 
    I understand that it is my responsibility to read and understand the 
    policies contained in this handbook.
    
    I understand that the policies in this handbook are guidelines only 
    and are not employment contracts.
    
    I understand that the company reserves the right to modify, suspend, 
    or revoke any of the policies in this handbook at any time.
    
    By signing below, I acknowledge that I have read, understood, and 
    agree to comply with the policies in this Employee Handbook.
  `
}

export default function ESignature() {
  const [currentStep, setCurrentStep] = useState(1)
  const [signature, setSignature] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const signatureRef = useRef()

  const handleClear = () => {
    signatureRef.current.clear()
    setSignature(null)
  }

  const handleSave = () => {
    if (signatureRef.current.isEmpty()) {
      toast.error('Please sign before continuing')
      return
    }
    setSignature(signatureRef.current.toDataURL())
    setCurrentStep(3)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
    setCurrentStep(4)
    toast.success('Document signed successfully!')
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true
      case 2:
        return signature !== null
      case 3:
        return signature !== null
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight">E-Signature</h1>
        <p className="text-muted-foreground mt-1">
          Sign documents securely and efficiently
        </p>
      </motion.div>

      {/* Progress Stepper */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep
            const isCompleted = step.id < currentStep
            const isLast = index === steps.length - 1

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isCompleted 
                        ? '#10B981' 
                        : isActive 
                          ? '#8B5CF6' 
                          : 'hsl(var(--accent))'
                    }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300",
                      (isActive || isCompleted) && "text-white shadow-lg"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  
                  <span className={cn(
                    "mt-2 text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>

                {!isLast && (
                  <div className="flex-1 h-1 mx-4 bg-accent rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: isCompleted ? '100%' : isActive ? '50%' : '0%' 
                      }}
                      className="h-full bg-gradient-to-r from-gradient-purple to-emerald-500"
                    />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-purple/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-gradient-purple" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{mockDocument.title}</h2>
                <p className="text-sm text-muted-foreground">Please review the document before signing</p>
              </div>
            </div>

            <div className="bg-accent/50 rounded-xl p-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {mockDocument.content}
              </pre>
            </div>

            <div className="flex items-center gap-3 mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-400">
                By continuing, you acknowledge that you have read and understood this document.
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 flex items-center gap-2"
              >
                Continue to Sign
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold">Sign Document</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Draw your signature in the box below
              </p>
            </div>

            <div className="relative">
              <div className="border-2 border-dashed border-border rounded-xl overflow-hidden bg-white">
                <SignatureCanvas
                  ref={signatureRef}
                  canvasProps={{
                    width: 800,
                    height: 300,
                    className: 'w-full h-[300px] cursor-crosshair'
                  }}
                  backgroundColor="white"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClear}
                className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg text-sm font-medium shadow-lg flex items-center gap-2 hover:bg-white"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </motion.button>
            </div>

            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-xl border border-border hover:bg-accent font-medium flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 flex items-center gap-2"
              >
                Save Signature
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold">Confirm Signature</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Review your signature before submitting
              </p>
            </div>

            <div className="bg-accent/50 rounded-xl p-8 mb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="font-semibold text-gray-900">{mockDocument.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Document ID: #DOC-2024-001</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Signer</span>
                    <span className="font-medium">Sarah Chen</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">IP Address</span>
                    <span className="font-medium">192.168.1.1</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Signature:</p>
                  {signature && (
                    <img 
                      src={signature} 
                      alt="Signature" 
                      className="h-20 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl border border-border hover:bg-accent font-medium flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25 flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm & Sign
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && isComplete && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              Document Signed Successfully!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-8"
            >
              A confirmation email has been sent to your inbox.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl border border-border hover:bg-accent font-medium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentStep(1)
                  setIsComplete(false)
                  setSignature(null)
                }}
                className="px-6 py-3 bg-gradient-to-r from-gradient-purple to-gradient-blue text-white rounded-xl font-medium shadow-lg shadow-gradient-purple/25"
              >
                Sign Another Document
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
