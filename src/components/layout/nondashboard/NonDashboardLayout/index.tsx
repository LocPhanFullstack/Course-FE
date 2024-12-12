import { Footer } from "../../app";
import { NonDashboardNavbar } from "../NonDashboardNavbar";

export const NonDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">{children}</main>
      <Footer />
    </div>
  );
};
