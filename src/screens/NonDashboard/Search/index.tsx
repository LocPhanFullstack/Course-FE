"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SearchScreenContext } from "./contexts";
import { LoadingSpinner } from "@/components/loading";
import { motion } from "framer-motion";
import { CourseCardSearch } from "@/components/course";
import { SelectedCourse } from "./components";
import { useAPIGetListOfCourses } from "@/screens/Home/apis";

export const SearchScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const apiGetListOfCourses = useAPIGetListOfCourses();
  const courses = apiGetListOfCourses.data;
  const [selectedCourse, setSelectedCourse] = React.useState<ICourse | null>(
    null
  );

  React.useEffect(() => {
    apiGetListOfCourses.mutate({});
  }, []);

  React.useEffect(() => {
    if (apiGetListOfCourses.data) {
      const courses = apiGetListOfCourses.data;
      if (id) {
        const course = courses.data.find((c) => c.courseId === id);
        setSelectedCourse(course || courses.data[0]);
      } else {
        setSelectedCourse(courses.data[0]);
      }
    }
  }, [apiGetListOfCourses, id]);

  if (apiGetListOfCourses.isPending) return <LoadingSpinner />;
  if (apiGetListOfCourses.isError) return <div>Failed to fetch courses!!!</div>;

  const handleCourseSelect = (course: ICourse) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`);
  };

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`);
  };

  return (
    <SearchScreenContext.Provider value={{ apiGetListOfCourses }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="search"
      >
        <h1 className="search__title">List of available courses</h1>
        <h2 className="search__subtitle">
          {courses?.data.length} courses avaiable
        </h2>
        <div className="search__content">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="search__courses-grid"
          >
            {courses?.data.map((course) => (
              <CourseCardSearch
                key={course.courseId}
                course={course}
                isSelected={selectedCourse?.courseId === course.courseId}
                onClick={() => handleCourseSelect(course)}
              />
            ))}
          </motion.div>

          {selectedCourse && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="search__selected-course"
            >
              <SelectedCourse
                course={selectedCourse}
                handleEnrollNow={handleEnrollNow}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </SearchScreenContext.Provider>
  );
};
