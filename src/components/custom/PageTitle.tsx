import React from "react";

const PageTitle = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-primary/10 p-2 rounded-full text-primary">{icon}</div>
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
};

export default PageTitle;
