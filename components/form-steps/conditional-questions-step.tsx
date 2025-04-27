"use client"

import type { FormData } from "../multi-step-form"
import { motion } from "framer-motion"

interface ConditionalQuestionsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function ConditionalQuestionsStep({ formData, updateFormData }: ConditionalQuestionsStepProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  const renderConditionalQuestions = () => {
    switch (formData.websiteType) {
      case "e-commerce":
        return (
          <>
            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="numberOfProducts" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Number of Products
              </label>
              <input
                type="number"
                id="numberOfProducts"
                value={formData.numberOfProducts || ""}
                onChange={(e) => updateFormData({ numberOfProducts: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
                placeholder="Enter number of products"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="paymentMethods" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Payment Methods
              </label>
              <select
                id="paymentMethods"
                multiple
                value={formData.paymentMethods || []}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
                  updateFormData({ paymentMethods: selectedOptions })
                }}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
              >
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="other">Other</option>
              </select>
            </motion.div>
          </>
        )
      case "portfolio":
        return (
          <>
            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="designStyle" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Design Style
              </label>
              <input
                type="text"
                id="designStyle"
                value={formData.designStyle || ""}
                onChange={(e) => updateFormData({ designStyle: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
                placeholder="Enter design style"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="numberOfProjects" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Number of Projects
              </label>
              <input
                type="number"
                id="numberOfProjects"
                value={formData.numberOfProjects || ""}
                onChange={(e) => updateFormData({ numberOfProjects: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
                placeholder="Enter number of projects"
              />
            </motion.div>
          </>
        )
      case "blog":
        return (
          <>
            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="categories" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Categories
              </label>
              <select
                id="categories"
                multiple
                value={formData.categories || []}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value)
                  updateFormData({ categories: selectedOptions })
                }}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
              >
                <option value="technology">Technology</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="postingFrequency" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Posting Frequency
              </label>
              <input
                type="text"
                id="postingFrequency"
                value={formData.postingFrequency || ""}
                onChange={(e) => updateFormData({ postingFrequency: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
                placeholder="Enter posting frequency"
              />
            </motion.div>
          </>
        )
      case "corporate":
        return (
          <>
            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="numberOfServices" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Number of Services
              </label>
              <input
                type="number"
                id="numberOfServices"
                value={formData.numberOfServices || ""}
                onChange={(e) => updateFormData({ numberOfServices: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
                placeholder="Enter number of services"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <label htmlFor="targetAudience" className="block text-xs sm:text-sm text-indigo-200 font-medium">
                Target Audience
              </label>
              <input
                type="text"
                id="targetAudience"
                value={formData.targetAudience || ""}
                onChange={(e) => updateFormData({ targetAudience: e.target.value })}
                className="w-full px-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
                placeholder="Enter target audience"
              />
            </motion.div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-2 tracking-wide">
          Additional Questions
        </h2>
        <p className="text-indigo-200/70">Please answer the following questions based on your website type</p>
      </motion.div>

      {renderConditionalQuestions()}
    </motion.div>
  )
}
