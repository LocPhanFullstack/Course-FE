"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/shared/hooks/useCarousel";
import { HomeScreenContext } from "../../contexts";
// import { Skeleton } from "@/components/ui/skeleton";

const tags = [
  "web development",
  "enterprise IT",
  "react nextjs",
  "backend/frontend",
  "javascript",
];

// const LoadingSkeleton = () => {
//   return (
//     <div className="landing-skeleton">
//       <div className="landing-skeleton__hero">
//         <div className="landing-skeleton__hero-content">
//           <Skeleton className="landing-skeleton__title" />
//           <Skeleton className="landing-skeleton__subtitle" />
//           <Skeleton className="landing-skeleton__subtitle-secondary" />
//           <Skeleton className="landing-skeleton__button" />
//         </div>
//         <Skeleton className="landing-skeleton__hero-image" />
//       </div>

//       <div className="landing-skeleton__featured">
//         <Skeleton className="landing-skeleton__featured-title" />
//         <Skeleton className="landing-skeleton__featured-description" />

//         <div className="landing-skeleton__tags">
//           {tags.map((__, i) => (
//             <Skeleton key={i} className="loading-skeleton__tag" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

const Landing = () => {
  const currentImage = useCarousel({ totalImages: 3 });
  const { apiGetListOfCourses } = React.useContext(HomeScreenContext);

  React.useEffect(() => {
    if (apiGetListOfCourses?.data) {
      console.log("Data from API:", apiGetListOfCourses.data); // Chỉ log khi có dữ liệu
    }
  }, [apiGetListOfCourses?.data]); // Theo dõi khi dữ liệu thay đổi

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Courses</h1>
          <p className="landing__description">
            This is the list of courses you can enroll in.
            <br />
            Courses when you need them and want them.
          </p>
          <div className="landing__cta">
            <Link href="/search">
              <div className="landing__cta-button">Search for Courses</div>
            </Link>
          </div>
        </div>

        <div className="landing__hero-images">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Hero Banner ${i + 1}`}
              fill
              sizes="sm"
              priority={i === currentImage}
              className={`landing__hero-image ${
                i === currentImage ? "landing__hero-image--active" : ""
              }`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          From beginner to advanced, in all industries, we have the right
          courses just for you and preparing your entire journey for learning
          and making the most.
        </p>
        <div className="landing__tags">
          {tags.map((tag, i) => (
            <span key={i} className="landing__tags">
              {tag}
            </span>
          ))}
        </div>

        <div className="landing__courses">{/* Courses display */}</div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
