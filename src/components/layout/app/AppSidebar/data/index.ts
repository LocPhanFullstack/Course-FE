import { BookOpen, Briefcase, DollarSign, Settings, User } from "lucide-react";

export const navLinks = {
  student: [
    { icon: BookOpen, label: "Courses", href: "/user/courses" },
    { icon: Briefcase, label: "Billing", href: "/user/billing" },
    { icon: User, label: "Profile", href: "/user/profile" },
    { icon: Settings, label: "Settings", href: "/user/settings" },
  ],
  teacher: [
    { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
    { icon: DollarSign, label: "Billing", href: "/teacher/billing" },
    { icon: User, label: "Profile", href: "/teacher/profile" },
    { icon: Settings, label: "Settings", href: "/teacher/settings" },
  ],
};
