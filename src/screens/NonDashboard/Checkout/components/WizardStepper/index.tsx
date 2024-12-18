import { cn } from "@/shared/utils/components";
import { Check } from "lucide-react";
import React from "react";

interface WizardStepperProps {
  currentStep: number;
}

const steps = [1, 2, 3];

export const WizardStepper = (props: WizardStepperProps) => {
  const { currentStep } = props;

  return (
    <div className="wizard-stepper">
      <div className="wizard-stepper__container">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="wizard-stepper__step">
              <div
                className={cn("wizard-stepper__circle", {
                  "wizard-stepper__circle--completed":
                    currentStep > step || (currentStep === 3 && step === 3),
                  "wizard-stepper__circle--current":
                    currentStep === step && step !== 3,
                  "wizard-stepper__circle--upcoming": currentStep < step,
                })}
              >
                {currentStep > step || (currentStep === 3 && step === 3) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <p
                className={cn("wizard-stepper__text", {
                  "wizard-stepper__text--active": currentStep >= step,
                  "wizard-stepper__text--inactive": currentStep < step,
                })}
              >
                {step === 1 && "Details"}
                {step === 2 && "Payment"}
                {step === 3 && "Complete"}
              </p>
            </div>
            {index < 2 && (
              <div
                className={cn("wizard-stepper__line", {
                  "wizard-stepper__line--active": currentStep > step,
                  "wizard-stepper__line--inactive": currentStep <= step,
                })}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};