import React from "react";
import { StripeProvider } from "./providers";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCheckoutNavigation } from "@/shared/hooks/useCheckoutNavigation";
import { useSearchParams } from "next/navigation";
import { CheckoutScreenContext } from "../../contexts";
import { useClerk, useUser } from "@clerk/nextjs";
import { CoursePreview } from "../CheckoutDetails/components";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentContent = () => {
  const searchParams = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const { navigateToStep } = useCheckoutNavigation();
  const { apiGetCourse } = React.useContext(CheckoutScreenContext);
  const { user } = useUser();
  const { signOut } = useClerk();

  const selectedCourse = apiGetCourse?.data;

  if (!selectedCourse) return null;

  return (
    <div className="payment">
      <div className="payment__container">
        {/* Order summary */}
        <div className="payment__preview">
          <CoursePreview course={selectedCourse?.data} />
        </div>

        {/* Payment form */}
        <div className="payment__form-container">
          <form id="payment-form" className="payment__form">
            <div className="payment__content">
              <h1 className="payment__title">Checkout</h1>
              <p className="payment__subtitle">
                Fill out the payment details below to complete your purchase
              </p>

              <div className="payment__method">
                <h3 className="payment__method-title">Payment Method</h3>
                <div className="payment__card-container">
                  <div className="payment__card-header">
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </div>
                  <div className="payment__card-element">
                    <PaymentElement />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="payment__actions">
        <Button
          className="hover:bg-white-50/10"
          variant="outline"
          type="button"
        >
          Switch Account
        </Button>

        <Button
          form="payment-form"
          type="submit"
          className="payment__submit"
          disabled={!stripe || !elements}
        >
          Pay with Credit Card
        </Button>
      </div>
    </div>
  );
};

export const Payment = () => {
  return (
    <StripeProvider>
      <PaymentContent />
    </StripeProvider>
  );
};
