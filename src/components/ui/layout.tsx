import React from "react";

const PageLayout = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <div className={`${style} max-w-screen-2xl mx-auto px-6`}>{children}</div>
  );
};

export default PageLayout;
