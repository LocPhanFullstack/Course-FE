import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
  loadStripe,
  Appearance,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { useAPICreateStripePaymentIntent } from "../../apis";
import { CheckoutScreenContext } from "@/screens/NonDashboard/Checkout/contexts";
import { LoadingSpinner } from "@/components/loading";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#18181b",
    colorText: "#d2d2d2",
    colorDanger: "#df1b41",
    colorTextPlaceholder: "#6e6e6e",
    fontFamily: "Inter, system-ui, sans-serif",
    spacingUnit: "3px",
    borderRadius: "10px",
    fontSizeBase: "14px",
  },
};

export const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSecret, setClientSecret] = React.useState<string | undefined>(
    ""
  );
  const apiCreateStripePaymentIntent = useAPICreateStripePaymentIntent();
  const { apiGetCourse } = React.useContext(CheckoutScreenContext);

  const selectedCourse = apiGetCourse?.data;

  const fetchPaymentIntent = React.useCallback(async () => {
    if (selectedCourse?.data?.price) {
      try {
        const response = await apiCreateStripePaymentIntent.mutateAsync({
          amount: selectedCourse.data.price,
        });
        if (response?.data.clientSecret) {
          setClientSecret(response?.data.clientSecret);
        } else {
          console.error("Client secret not found in response");
        }
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    }
  }, [selectedCourse]);

  React.useEffect(() => {
    if (selectedCourse?.data) {
      fetchPaymentIntent();
    }
  }, [selectedCourse, fetchPaymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) return <LoadingSpinner />;

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
