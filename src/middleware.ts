import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Skip authentication check for /signin and public routes
  if (req.url.includes("/signin") || req.url.includes("/")) {
    return NextResponse.next();
  }

  // Check if the user is authenticated by Clerk
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    console.log("User not authenticated, redirecting to signin");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const userId = sessionClaims.sub;
  const user = await clerkClient.users.getUser(userId);
  const userRole = (await user.publicMetadata?.userType) || "student";

  // Role-based route matching and redirection
  if (isStudentRoute(req)) {
    if (userRole !== "student") {
      const url = new URL("/teacher/courses", req.url);
      return NextResponse.redirect(url);
    }
  }

  if (isTeacherRoute(req)) {
    if (userRole !== "teacher") {
      const url = new URL("/user/courses", req.url);
      return NextResponse.redirect(url);
    }
  }

  // If everything is fine, continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
