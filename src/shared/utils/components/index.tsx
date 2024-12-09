import clsx, { type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Convert cents to formatted currency string (e.g., 4999 -> $49.99)
export const formatPrice = (cents: number | undefined): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((cents || 0) / 100);
};

// Convert dollars to cents (e.g., "49.99" -> 4999)
export const dollarsToCents = (dollars: string | number): number => {
  const amount = typeof dollars === "string" ? parseInt(dollars) : dollars;
  return Math.round(amount * 100);
};

// Convert cents to dollar (e.g., 4999 -> 49.99)
export const centsToDollars = (cents: number | undefined): string => {
  return ((cents || 0) / 100).toString();
};

// Zod schema for price input (converts dollar input to cents)
export const priceSchema = z.string().transform((val) => {
  const dollars = parseFloat(val);
  if (isNaN(dollars)) return 0;
  return dollarsToCents(dollars).toString();
});

export const convertToSubCurrency = (amount: number, factor: 100) => {
  return Math.round(amount * factor);
};

export const courseCategories = [
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
] as const;

export const combineComponents = (components: React.ComponentType<any>[]) => {
  const CombinedComponent = components.reduce(
    (
      AccumulatedComponents: React.ComponentType<any>,
      CurrentComponent: React.ComponentType<any>
    ) => {
      const WrappedComponent = ({
        children,
        ...props
      }: React.ComponentProps<any>) => {
        return (
          <AccumulatedComponents {...props}>
            <CurrentComponent {...props}>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };

      // Set display name for better debugging
      WrappedComponent.displayName = `Wrapped(${
        CurrentComponent.displayName || CurrentComponent.name
      })`;

      return WrappedComponent;
    },
    ({ children }: React.ComponentProps<any>) => <>{children}</>
  );

  // Set display name for the combined component
  CombinedComponent.displayName = "CombinedComponent";

  return CombinedComponent;
};
