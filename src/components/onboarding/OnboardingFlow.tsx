"use client"

import { useOnboardingStore } from "@/store/useOnboardingStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

const steps = [
  {
    id: "goals",
    question: "What are your primary goals right now?",
    type: "multiple",
    options: ["Career Growth", "Personal Wisdom", "Wealth Creation", "Scientific Understanding", "Strategic Mastery", "Artistic Expression"]
  },
  {
    id: "mindset",
    question: "How would you describe your current mindset?",
    type: "single",
    options: ["Seeking Clarity", "Highly Ambitious", "Intellectually Curious", "Facing Challenges", "Ready for Change"]
  },
  {
    id: "interests",
    question: "Which areas of knowledge fascinate you most?",
    type: "multiple",
    options: ["History", "Philosophy", "Technology", "Economics", "Psychology", "Art & Culture"]
  },
  {
    id: "struggles",
    question: "What is your biggest current struggle?",
    type: "text",
    placeholder: "e.g., Finding focus, leading a team, making decisions..."
  },
  {
    id: "ambitions",
    question: "What kind of legacy do you want to leave?",
    type: "text",
    placeholder: "Tell us about your ultimate vision..."
  }
]

export default function OnboardingFlow() {
  const { currentStep, responses, setResponse, nextStep, prevStep } = useOnboardingStore()
  const updateUser = useAuthStore(state => state.updateUser)
  const router = useRouter()

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleOptionToggle = (option: string) => {
    const currentResponses = (responses[step.id as keyof typeof responses] as string[]) || []
    if (currentResponses.includes(option)) {
      setResponse(step.id, currentResponses.filter(r => r !== option))
    } else {
      setResponse(step.id, [...currentResponses, option])
    }
  }

  const handleSingleSelect = (option: string) => {
    setResponse(step.id, option)
  }

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Final step
      updateUser({
        onboarded: true,
        goals: responses.goals,
        interests: responses.interests
      })
      router.push('/matching')
    } else {
      nextStep()
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-text-secondary">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-text-primary">{step.question}</h2>

          <div className="space-y-4 mb-12">
            {step.type === "multiple" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {step.options?.map((option) => {
                  const isSelected = (responses[step.id as keyof typeof responses] as string[]).includes(option)
                  return (
                    <Card
                      key={option}
                      className={`cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
                      onClick={() => handleOptionToggle(option)}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {isSelected && <Check size={18} className="text-primary" />}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {step.type === "single" && (
              <div className="space-y-3">
                {step.options?.map((option) => {
                  const isSelected = responses[step.id as keyof typeof responses] === option
                  return (
                    <Card
                      key={option}
                      className={`cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'}`}
                      onClick={() => handleSingleSelect(option)}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {isSelected && <div className="h-4 w-4 rounded-full bg-primary" />}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {step.type === "text" && (
              <textarea
                className="w-full h-40 p-4 rounded-xl border border-border bg-card focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder={step.placeholder}
                value={responses[step.id as keyof typeof responses] as string}
                onChange={(e) => setResponse(step.id, e.target.value)}
              />
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              size="lg"
              className="px-8"
              onClick={handleNext}
              disabled={
                (step.type === "multiple" && (responses[step.id as keyof typeof responses] as string[]).length === 0) ||
                (step.type === "single" && !responses[step.id as keyof typeof responses]) ||
                (step.type === "text" && !(responses[step.id as keyof typeof responses] as string).trim())
              }
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next Question"}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
