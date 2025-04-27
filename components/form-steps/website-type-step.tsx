"use client"

import type { FormData, WebsiteType } from "../multi-step-form"
import { motion } from "framer-motion"
import { ShoppingCart, ImageIcon, FileText, Building2 } from "lucide-react"
import type { JSX } from "react"
import React from "react"

interface WebsiteTypeStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function WebsiteTypeStep({ formData, updateFormData }: WebsiteTypeStepProps) {
  const websiteTypes: { type: WebsiteType; label: string; icon: JSX.Element }[] = [
    {
      type: "e-commerce",
      label: "E-commerce",
      icon: <ShoppingCart className="h-6 w-6" />,
    },
    {
      type: "portfolio",
      label: "Portfolio",
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      type: "blog",
      label: "Blog",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      type: "corporate",
      label: "Corporate",
      icon: <Building2 className="h-6 w-6" />,
    },
  ]

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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-2 tracking-wide">
          Website Type
        </h2>
        <p className="text-indigo-200/70">Select the type of website you need</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-2 gap-2 sm:gap-4">
        {websiteTypes.map((item, index) => (
          <motion.div
            key={item.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(79, 70, 229, 0.3)",
              y: -5,
            }}
            whileTap={{ scale: 0.98 }}
            custom={index}
          >
            <button
              type="button"
              onClick={() => updateFormData({ websiteType: item.type })}
              className={`w-full p-3 sm:p-6 rounded-xl border-2 ${
                formData.websiteType === item.type
                  ? "border-indigo-500 bg-indigo-900/30 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                  : "border-[#1a2151] bg-[#0c1033]/70 hover:border-indigo-600/50"
              } transition-all duration-300 flex flex-col items-center text-center group`}
            >
              <div
                className={`p-2 sm:p-3 rounded-full mb-2 sm:mb-4 transition-all duration-300 ${
                  formData.websiteType === item.type
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                    : "bg-[#1a1c4b] text-indigo-300 group-hover:text-indigo-200 group-hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                }`}
              >
                {React.cloneElement(item.icon as React.ReactElement, { className: "h-4 w-4 sm:h-6 sm:w-6" })}
              </div>
              <h3
                className={`text-sm sm:text-lg font-medium mb-1 sm:mb-2 transition-all duration-300 ${
                  formData.websiteType === item.type
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
                    : "text-indigo-200 group-hover:text-white"
                }`}
              >
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-indigo-300/70 group-hover:text-indigo-200/80 transition-all duration-300 hidden sm:block">
                {item.type === "e-commerce" && "Online store with product listings and checkout"}
                {item.type === "portfolio" && "Showcase your work and professional skills"}
                {item.type === "blog" && "Share your thoughts and content with readers"}
                {item.type === "corporate" && "Professional website for your business"}
              </p>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
