"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { CheckoutScreenContext } from "../../contexts";
import { LoadingSpinner } from "@/components/loading";
import { CoursePreview } from "./components";

export const CheckoutDetails = () => {
  const searchParams = useSearchParams();
  const { apiGetCourse } = React.useContext(CheckoutScreenContext);

  const courseId = searchParams.get("id") ?? "";
  const showSignedUp = searchParams.get("showSignUp") === "true";
  const selectedCourse = apiGetCourse?.data;

  const getCourse = React.useCallback(() => {
    if (courseId && typeof courseId === "string") {
      apiGetCourse?.mutate({ courseId });
    }
  }, [courseId]);

  React.useEffect(() => {
    getCourse();
  }, [getCourse]);

  if (apiGetCourse?.isPending) return <LoadingSpinner />;
  if (apiGetCourse?.isError) return <div>Failed to fetch course data</div>;
  if (!selectedCourse) return <div>Course not found</div>;

  return (
    <div className="checkout-details">
      <div className="checkout-details__container">
        <div className="checkout-details__preview">
          <CoursePreview course={selectedCourse.data} />
        </div>
      </div>
    </div>
  );
};
