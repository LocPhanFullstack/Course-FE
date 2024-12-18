"use client";

import { LoadingSpinner } from "@/components/loading";
import { useUser } from "@clerk/nextjs";
import { CheckoutDetails, WizardStepper } from "./components";
import { useCheckoutNavigation } from "@/shared/hooks/useCheckoutNavigation";
import { useAPIGetCourse } from "./apis";
import React from "react";
import { CheckoutScreenContext } from "./contexts";

export const CheckoutScreen = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();
  const apiGetCourse = useAPIGetCourse();

  if (!isLoaded) return <LoadingSpinner />;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetails />;
      case 2:
        return "payment page";
      case 3:
        return "completion page";
      default:
        return "checkout details page";
    }
  };

  return (
    <CheckoutScreenContext.Provider value={{ apiGetCourse }}>
      <div className="checkout">
        <WizardStepper currentStep={checkoutStep} />
        <div className="checkout__content">{renderStep()}</div>
      </div>
    </CheckoutScreenContext.Provider>
  );
};
