"use client"

import type { FormData } from "../multi-step-form"
import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"

interface ConfirmationStepProps {
  formData: FormData
}

export default function ConfirmationStep({ formData }: ConfirmationStepProps) {
  const renderWebsiteTypeDetails = () => {
    switch (formData.websiteType) {
      case "e-commerce":
        return (
          <>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Number of Products</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.numberOfProducts}</span>
            </div>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Payment Methods</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.paymentMethods?.join(", ")}</span>
            </div>
          </>
        )
      case "portfolio":
        return (
          <>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Design Style</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.designStyle}</span>
            </div>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Number of Projects</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.numberOfProjects}</span>
            </div>
          </>
        )
      case "blog":
        return (
          <>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Categories</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.categories?.join(", ")}</span>
            </div>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Posting Frequency</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.postingFrequency}</span>
            </div>
          </>
        )
      case "corporate":
        return (
          <>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Number of Services</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.numberOfServices}</span>
            </div>
            <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
              <span className="text-xs sm:text-sm text-gray-400">Target Audience</span>
              <span className="text-xs sm:text-sm text-white font-medium">{formData.targetAudience}</span>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-1 sm:mb-2 tracking-wide">
          Review Your Information
        </h2>
        <p className="text-sm text-indigo-200/70">Please confirm that all details are correct</p>
      </div>

      <div className="bg-[#0c1033]/70 rounded-lg p-3 sm:p-6 space-y-3 sm:space-y-4 border border-[#1a2151]">
        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
          {formData.logo ? (
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden border-2 border-blue-400">
              <Image
                src={formData.logo || "/placeholder.svg"}
                alt="Your logo"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-[#1a1c4b] flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-600">
              <span className="text-xs sm:text-sm">No logo</span>
            </div>
          )}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{formData.fullName}</h3>
            <p className="text-xs sm:text-sm text-gray-400">{formData.email}</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
            <span className="text-xs sm:text-sm text-gray-400">Phone</span>
            <span className="text-xs sm:text-sm text-white font-medium">{formData.phone}</span>
          </div>
          <div className="flex justify-between py-1.5 sm:py-2 border-b border-gray-700">
            <span className="text-xs sm:text-sm text-gray-400">Website Type</span>
            <span className="text-xs sm:text-sm text-white font-medium">
              {formData.websiteType ? formData.websiteType.charAt(0).toUpperCase() + formData.websiteType.slice(1) : ""}
            </span>
          </div>

          {renderWebsiteTypeDetails()}

          <div className="py-1.5 sm:py-2 border-b border-gray-700">
            <span className="text-xs sm:text-sm text-gray-400 block mb-1.5 sm:mb-2">Additional Services</span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {Object.entries(formData.supplements).map(
                ([key, value]) =>
                  value && (
                    <div
                      key={key}
                      className="bg-blue-900/30 text-blue-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1 text-[10px] sm:text-xs"
                    >
                      <Check size={10} className="sm:h-3 sm:w-3" />
                      <span>
                        {key === "seo"
                          ? "SEO Setup"
                          : key === "socialMedia"
                            ? "Social Media Integration"
                            : key === "customEmail"
                              ? "Custom Email"
                              : "Logo Design"}
                      </span>
                    </div>
                  ),
              )}
              {!Object.values(formData.supplements).some((value) => value === true) && (
                <span className="text-gray-500 italic text-xs">None selected</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 sm:p-4 text-blue-300 text-xs sm:text-sm">
        <p>
          Thank you for providing your information. By clicking Submit, your request will be sent to our team, and
          we&apos;ll get back to you within 24-48 hours with a proposal tailored to your needs.
        </p>
      </div>
    </motion.div>
  )
}
