"use client"

import { useState } from "react"
import { PremiumFeatureModal } from "@/components/premium-feature-modal"

export function usePremiumFeature() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentFeature, setCurrentFeature] = useState("")

  const openPremiumFeatureModal = (featureName: string) => {
    setCurrentFeature(featureName)
    setIsModalOpen(true)
  }

  const closePremiumFeatureModal = () => {
    setIsModalOpen(false)
  }

  // This component will be rendered alongside your component
  const PremiumFeatureModalComponent = () => (
    <PremiumFeatureModal isOpen={isModalOpen} onClose={closePremiumFeatureModal} featureName={currentFeature} />
  )

  return {
    openPremiumFeatureModal,
    PremiumFeatureModalComponent,
  }
}
