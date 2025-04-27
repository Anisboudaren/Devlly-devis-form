"use client"
import clsx from 'clsx';

import type { FormData } from "../multi-step-form"
import { motion } from "framer-motion"
import { Search, Share2, Mail, Palette } from "lucide-react"
import React from "react"

interface SupplementsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function SupplementsStep({ formData, updateFormData }: SupplementsStepProps) {
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

  const handleSupplementChange = (key: keyof FormData["supplements"]) => {
    updateFormData({
      supplements: {
        ...formData.supplements,
        [key]: !formData.supplements[key],
      },
    })
  }

  const supplements = [
    {
      id: "seo",
      label: "SEO Setup",
      description: "Optimize your website for search engines to improve visibility",
      icon: <Search className="h-5 w-5" />,
    },
    {
      id: "socialMedia",
      label: "Social Media Integration",
      description: "Connect your website with your social media accounts",
      icon: <Share2 className="h-5 w-5" />,
    },
    {
      id: "customEmail",
      label: "Custom Email",
      description: "Set up professional email addresses with your domain",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      id: "logoDesign",
      label: "Logo Design",
      description: "Professional logo design for your brand",
      icon: <Palette className="h-5 w-5" />,
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 sm:space-y-6">
      <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-1 sm:mb-2 tracking-wide">
          Additional Services
        </h2>
        <p className="text-sm text-indigo-200/70">Select any additional services you might need</p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-3 sm:space-y-4">
        {supplements.map((supplement, index) => (
          <motion.div
            key={supplement.id}
            variants={itemVariants}
            custom={index}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: formData.supplements[supplement.id as keyof FormData["supplements"]]
                ? "0 0 25px rgba(79, 70, 229, 0.4)"
                : "0 0 15px rgba(79, 70, 229, 0.2)",
            }}
            whileTap={{ scale: 0.99 }}
          >
            <label
              htmlFor={supplement.id}
              className={`block p-3 sm:p-4 rounded-lg border-2 ${
                formData.supplements[supplement.id as keyof FormData["supplements"]]
                  ? "border-indigo-500 bg-indigo-900/30 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                  : "border-[#1a2151] bg-[#0c1033]/70 hover:border-indigo-600/50"
              } transition-all duration-300 cursor-pointer group`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
                    formData.supplements[supplement.id as keyof FormData["supplements"]]
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                      : "bg-[#1a1c4b] text-indigo-300 group-hover:text-indigo-200 group-hover:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
                  }`}
                >
                 {React.cloneElement(supplement.icon as React.ReactElement<{ className?: string }>, {
  className: clsx(supplement.icon.props?.className || '', 'h-4 w-4 sm:h-6 sm:w-6')
})}

                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                    <h3
                      className={`text-sm sm:text-lg font-medium transition-all duration-300 ${
                        formData.supplements[supplement.id as keyof FormData["supplements"]]
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
                          : "text-indigo-200 group-hover:text-white"
                      }`}
                    >
                      {supplement.label}
                    </h3>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={supplement.id}
                        checked={formData.supplements[supplement.id as keyof FormData["supplements"]]}
                        onChange={() => handleSupplementChange(supplement.id as keyof FormData["supplements"])}
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded border-indigo-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-[#0c1033] transition-all"
                      />
                      <div
                        className={`absolute inset-0 rounded-sm ${
                          formData.supplements[supplement.id as keyof FormData["supplements"]]
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-sm"
                            : "opacity-0"
                        } transition-opacity`}
                        style={{ padding: "2px" }}
                      />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-300/70 group-hover:text-indigo-200/80 transition-all duration-300">
                    {supplement.description}
                  </p>
                </div>
              </div>
            </label>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
