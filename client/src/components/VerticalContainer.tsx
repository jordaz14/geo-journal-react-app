import { ReactNode } from "react";

interface VerticalContainerProps {
  children: ReactNode;
}

const VerticalContainer = ({ children }: VerticalContainerProps) => {
  return (
    <div className="w-[500px] h-full flex flex-col items-center py-2 px-2">
      {children}
    </div>
  );
};

export default VerticalContainer;
