import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col justify-center items-center relative h-[calc(100vh-48px)]"
    >
      {children}
    </motion.div>
  );
};

export default MainContainer;
