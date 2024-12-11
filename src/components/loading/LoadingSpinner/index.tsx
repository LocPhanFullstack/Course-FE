import { Loader2 } from "lucide-react";
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="loading">
      <Loader2 className="loading__spinner" />
      <span className="loading__text">Loading...</span>
    </div>
  );
};
