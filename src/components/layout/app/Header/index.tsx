import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export const Header = (props: HeaderProps) => {
  const { subtitle, title, rightElement } = props;

  return (
    <div className="header">
      <div>
        <h1 className="header__title">{title}</h1>
        <p className="header__subtitle">{subtitle}</p>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};
