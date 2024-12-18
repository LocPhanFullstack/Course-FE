import { AccordionSections } from "@/screens/NonDashboard/components";
import { formatPrice } from "@/shared/utils/components";
import Image from "next/image";
import React from "react";

interface CoursePreviewProps {
  course: ICourse;
}

export const CoursePreview = (props: CoursePreviewProps) => {
  const { course } = props;
  const price = formatPrice(course.price);

  return (
    <div className="course-preview">
      <div className="course-preview__container">
        <div className="course-preview__image-wrapper">
          <Image
            src={course.image || "/course-preview-placeholder.png"}
            alt="Course Preview"
            width={640}
            height={360}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="course-preview__title">{course.title}</h2>
          <p className="text-gray-400 text-md">by {course.teacherName}</p>
          <p className="text-sm text-customgreys-dirtyGrey mt-4">
            {course.description}
          </p>
        </div>

        <div>
          <h4 className="text-white-50/90 font-semibold">Course Content</h4>
          <div className="mt-2">
            <AccordionSections sections={course.sections} />
          </div>
        </div>
      </div>

      <div className="course-preview__container">
        <h3 className="text-xl mb-4">Price Details (1 item)</h3>
        <div className="flex justify-between mb-4 text-customgreys-dirtyGrey text-base">
          <span className="font-bold">1x {course.title}</span>
          <span className="font-bold">{price}</span>
        </div>
        <div className="flex justify-between border-t border-customgreys-dirtyGrey pt-4">
          <span className="font-semibold text-lg mt-2">Total Amount</span>
          <span className="font-semibold text-lg mt-2">{price}</span>
        </div>
      </div>
    </div>
  );
};
