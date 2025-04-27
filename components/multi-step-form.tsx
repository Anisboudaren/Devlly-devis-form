"user client"

import type React from "react"
import { useEffect } from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Upload, X } from "lucide-react"
import Image from "next/image"

// Form steps
import ClientInfoStep from "./form-steps/client-info-step"
import WebsiteTypeStep from "./form-steps/website-type-step"
import ConditionalQuestionsStep from "./form-steps/conditional-questions-step"
import SupplementsStep from "./form-steps/supplements-step"
import ConfirmationStep from "./form-steps/confirmation-step"

// Types
export type WebsiteType = "e-commerce" | "portfolio" | "blog" | "corporate"

export type FormData = {
  fullName: string
  email: string
  phone: string
  websiteType: WebsiteType | ""
  // E-commerce specific
  numberOfProducts?: string
  paymentMethods?: string[]
  // Portfolio specific
  designStyle?: string
  numberOfProjects?: string
  // Blog specific
  categories?: string[]
  postingFrequency?: string
  // Corporate specific
  numberOfServices?: string
  targetAudience?: string
  // Supplements
  supplements: {
    seo: boolean
    socialMedia: boolean
    customEmail: boolean
    logoDesign: boolean
  }
  logo?: string
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    websiteType: "",
    supplements: {
      seo: false,
      socialMedia: false,
      customEmail: false,
      logoDesign: false,
    },
  })
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const steps = ["Client Information", "Website Type", "Additional Questions", "Supplements", "Confirmation"]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
    }
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoPreview(event.target.result as string)
          updateFormData({ logo: event.target.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerLogoUpload = () => {
    fileInputRef.current?.click()
  }

  const removeLogo = () => {
    setLogoPreview(null)
    updateFormData({ logo: undefined })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== ""
      case 1:
        return formData.websiteType !== ""
      case 2:
        if (formData.websiteType === "e-commerce") {
          return formData.numberOfProducts && formData.paymentMethods && formData.paymentMethods.length > 0
        } else if (formData.websiteType === "portfolio") {
          return formData.designStyle && formData.numberOfProjects
        } else if (formData.websiteType === "blog") {
          return formData.categories && formData.categories.length > 0 && formData.postingFrequency
        } else if (formData.websiteType === "corporate") {
          return formData.numberOfServices && formData.targetAudience
        }
        return false
      default:
        return true
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ClientInfoStep formData={formData} updateFormData={updateFormData} />
      case 1:
        return <WebsiteTypeStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <ConditionalQuestionsStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <SupplementsStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <ConfirmationStep formData={formData} />
      default:
        return null
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  }

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    alert("Form submitted successfully!")
  }

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Only run on the client side
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl bg-[#080b1a]/80 backdrop-blur-lg rounded-2xl shadow-[0_0_40px_rgba(66,153,225,0.15)] overflow-hidden border border-[#1a2151] relative">
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 blur-xl opacity-30" />

      {/* Logo and branding */}
      <div className="p-6 bg-gradient-to-r from-[#0b1437] to-[#1a1c4b] flex justify-between items-center border-b border-[#1a2151]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-wider">
            DEVLLY
          </h1>
          <p className="text-blue-200 text-sm tracking-wide">WEB DEVELOPMENT SERVICES</p>
        </motion.div>
        <div className="relative">
          {logoPreview ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.5)]"
            >
              <Image src={logoPreview || "/placeholder.svg"} alt="Uploaded logo" fill className="object-cover" />
              <button
                onClick={removeLogo}
                className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 text-white shadow-lg"
                aria-label="Remove logo"
              >
                <X size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerLogoUpload}
              className="h-16 w-16 rounded-full bg-[#1a1c4b] flex items-center justify-center text-blue-300 hover:text-blue-100 transition-colors border-2 border-dashed border-indigo-400 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            >
              <Upload size={24} />
            </motion.button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
            aria-label="Upload logo"
          />
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-8 pt-6">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative"
              style={{ width: `${100 / steps.length}%` }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  boxShadow: index <= currentStep ? "0 0 15px rgba(79, 70, 229, 0.5)" : "none",
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center z-10 ${
                  index < currentStep
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : index === currentStep
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white ring-4 ring-indigo-300/20"
                      : "bg-[#1a1c4b] text-gray-400"
                }`}
              >
                {index < currentStep ? (
                  <Check size={14} className="sm:text-base" />
                ) : (
                  <span className="text-xs sm:text-sm">{index + 1}</span>
                )}
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`text-[10px] sm:text-xs mt-1 sm:mt-2 text-center truncate w-full px-1 ${index <= currentStep ? "text-indigo-300" : "text-gray-500"}`}
              >
                {windowSize.width < 400 && step.length > 8 ? step.substring(0, 8) + "..." : step}
              </motion.span>
              {index < steps.length - 1 && (
                <div className="absolute top-3 sm:top-4 left-[calc(50%+12px)] sm:left-[calc(50%+16px)] w-[calc(100%-24px)] sm:w-[calc(100%-32px)] h-[2px] bg-[#1a2151]">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: index < currentStep ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <motion.div
          className="w-full h-1 bg-[#1a2151] rounded-full mb-6 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Form content */}
      <div className="px-4 sm:px-8 py-4 sm:py-6 min-h-[350px] sm:min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="p-4 sm:p-6 bg-[#0a0d20] flex justify-between border-t border-[#1a2151]">
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
            currentStep === 0
              ? "bg-[#1a1c4b]/50 text-gray-500 cursor-not-allowed"
              : "bg-[#1a1c4b] text-white hover:bg-[#252a5e] shadow-[0_0_10px_rgba(79,70,229,0.2)]"
          } transition-all duration-200`}
        >
          <ChevronLeft size={18} />
          Back
        </motion.button>
        {currentStep === steps.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          >
            Submit
            <Check size={18} />
          </motion.button>
        ) : (
          <motion.button
            whileHover={isStepValid() ? { scale: 1.03, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" } : {}}
            whileTap={isStepValid() ? { scale: 0.97 } : {}}
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
              !isStepValid()
                ? "bg-[#1a1c4b]/50 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            } transition-all duration-200`}
          >
            Next
            <ChevronRight size={18} />
          </motion.button>
        )}
      </div>
    </div>
  )
}
