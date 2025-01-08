"use client";

import { useAPIGetListOfCourses } from "@/screens/Home/apis";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { useAPICreateCourse, useAPIDeleteCourse } from "./apis";
import { LoadingSpinner } from "@/components/loading";
import { Header } from "@/components/layout/app";
import { Button } from "@/components/ui/button";
import { TeacherCourseCard, Toolbar } from "./components";

export const CoursesSummary = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const apiGetListOfCourses = useAPIGetListOfCourses();
  const apiDeleteCourse = useAPIDeleteCourse();
  const apiCreateCourse = useAPICreateCourse();

  const listOfCourses = apiGetListOfCourses.data;

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

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
    if (
      window.confirm("Are you sure you want to delete this course ?") &&
      user
    ) {
      apiDeleteCourse.mutate({ courseId: course.courseId, userId: user?.id });
    }
  };

  const handleCreateCourse = async () => {
    if (!user) return;

    await apiCreateCourse.mutate({
      teacherId: user.id,
      teacherName: user.fullName || "Unknown Teacher",
    });
    router.push(`/teacher/courses/${apiCreateCourse.data?.data.courseId}`);
  };

  React.useEffect(() => {
    apiGetListOfCourses.mutate({});
  }, []);

  if (
    apiGetListOfCourses.isPending ||
    apiDeleteCourse.isPending ||
    apiCreateCourse.isPending ||
    !isLoaded
  )
    return <LoadingSpinner />;
  if (apiGetListOfCourses.isError || !apiGetListOfCourses.data)
    return <div>Error loading courses</div>;
  if (!user) return <div>Please sign in to view your courses</div>;

  return (
    <div className="teacher-courses">
      <Header
        title="Courses"
        subtitle="Browse your courses"
        rightElement={
          <Button
            onClick={handleCreateCourse}
            className="teacher-courses__header"
          >
            Create Course
          </Button>
        }
      />
      <Toolbar
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <div className="teacher-courses__grid">
        {filteredCourses.map((course) => (
          <TeacherCourseCard
            key={course.courseId}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isOwner={course.teacherId === user.id}
          />
        ))}
      </div>
    </div>
  );
};
