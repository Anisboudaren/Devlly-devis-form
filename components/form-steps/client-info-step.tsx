"use client"

import type { FormData } from "../multi-step-form"
import { motion } from "framer-motion"
import { User, Mail, Phone } from "lucide-react"

interface ClientInfoStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function ClientInfoStep({ formData, updateFormData }: ClientInfoStepProps) {
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
      <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-1 sm:mb-2 tracking-wide">
          Client Information
        </h2>
        <p className="text-sm text-indigo-200/70">Let&apos;s start with your basic information</p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-3 sm:space-y-5">
        <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
          <label htmlFor="fullName" className="block text-xs sm:text-sm text-indigo-200 font-medium">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-400 group-hover:text-indigo-300 transition-colors">
              <User size={16} className="sm:h-[18px] sm:w-[18px]" />
            </div>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
              placeholder="John Doe"
              required
            />
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-indigo-600/0 to-purple-600/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none"
              style={{ padding: "1px" }}
            >
              <div className="h-full w-full rounded-lg bg-[#0c1033]/70"></div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
          <label htmlFor="email" className="block text-xs sm:text-sm text-indigo-200 font-medium">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-400 group-hover:text-indigo-300 transition-colors">
              <Mail size={16} className="sm:h-[18px] sm:w-[18px]" />
            </div>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
              placeholder="john@example.com"
              required
            />
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-indigo-600/0 to-purple-600/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none"
              style={{ padding: "1px" }}
            >
              <div className="h-full w-full rounded-lg bg-[#0c1033]/70"></div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
          <label htmlFor="phone" className="block text-xs sm:text-sm text-indigo-200 font-medium">
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-400 group-hover:text-indigo-300 transition-colors">
              <Phone size={16} className="sm:h-[18px] sm:w-[18px]" />
            </div>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className="w-full pl-10 pr-4 py-2 sm:py-3 bg-[#0c1033]/70 border border-[#1a2151] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-300/50 transition-all shadow-[0_0_10px_rgba(79,70,229,0.1)] hover:shadow-[0_0_15px_rgba(79,70,229,0.2)] focus:shadow-[0_0_20px_rgba(79,70,229,0.3)] text-sm sm:text-base"
              placeholder="(123) 456-7890"
              required
            />
            <div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-indigo-600/0 to-purple-600/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none"
              style={{ padding: "1px" }}
            >
              <div className="h-full w-full rounded-lg bg-[#0c1033]/70"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
