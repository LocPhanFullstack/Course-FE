"use client";

import { useAPIGetListOfCourses } from "@/screens/Home/apis";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useAPIDeleteCourse } from "./apis";
import { LoadingSpinner } from "@/components/loading";

export const CoursesSummary = () => {
  const router = useRouter();
  const { user } = useUser();

  const apiGetListOfCourses = useAPIGetListOfCourses();
  const apiDeleteCourse = useAPIDeleteCourse();

  const listOfCourses = apiGetListOfCourses.data;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  if (apiGetListOfCourses.isPending) return <LoadingSpinner />;
  if (!user) return <div>Please sign in to view your courses</div>;

  const filteredCourses = React.useMemo(() => {
    if (!listOfCourses?.data) return [];

    return listOfCourses.data.filter((course) => {
      const matchedSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchedSearch && matchCategory;
    });
  }, [listOfCourses, searchTerm, selectedCategory]);

  const handleEdit = (course: ICourse) => {
    router.push(`/teacher/courses/${course.courseId}`);
  };

  const handleDelete = (course: ICourse) => {
    if (window.confirm("Are you sure you want to delete this course ?")) {
      apiDeleteCourse.mutate({ courseId: course.courseId, userId: user?.id });
    }
  };

  const handleCreateCourse = () => {};

  React.useEffect(() => {
    apiGetListOfCourses.mutate({});
  }, []);

  return <div>CoursesSummary</div>;
};
