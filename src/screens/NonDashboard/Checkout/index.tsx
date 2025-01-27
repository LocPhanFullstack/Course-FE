"use client";

import { LoadingSpinner } from "@/components/loading";
import { useUser } from "@clerk/nextjs";
import {
  CheckoutDetails,
  Completion,
  Payment,
  WizardStepper,
} from "./components";
import { useCheckoutNavigation } from "@/shared/hooks/useCheckoutNavigation";
import React from "react";
import { CheckoutScreenContext } from "./contexts";
import { useSearchParams } from "next/navigation";
import { useAPIGetCourse } from "@/shared/apis";

export const CheckoutScreen = () => {
  const { isLoaded } = useUser();
  const searchParams = useSearchParams();
  const { checkoutStep } = useCheckoutNavigation();
  const apiGetCourse = useAPIGetCourse();

  const courseId = searchParams.get("courseId") ?? "";

  const getCourse = React.useCallback(() => {
    if (courseId && typeof courseId === "string") {
      apiGetCourse?.mutate({ courseId });
    }
  }, [courseId]);

  React.useEffect(() => {
    if (courseId) {
      getCourse();
    }
  }, [getCourse]);

  if (!isLoaded) return <LoadingSpinner />;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetails />;
      case 2:
        return <Payment />;
      case 3:
        return <Completion />;
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
