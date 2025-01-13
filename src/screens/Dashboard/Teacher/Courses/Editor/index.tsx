import { useAPIGetCourse, useAPIUpdateCourse } from "@/shared/apis";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export const CourseEditor = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const apiGetCourse = useAPIGetCourse();
  const apiUpdateCourse = useAPIUpdateCourse();
  // Upload video functionality

  React.useEffect(() => {
    apiGetCourse.mutate({ courseId: id });
  }, [id]);

  return <div>CourseDetails</div>;
};
