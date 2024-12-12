import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 VOIN. All Rights Reserved.</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item, i) => (
          <Link
            key={i}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};
