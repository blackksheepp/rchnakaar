import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, FC } from "react";

import { usePathname } from "next/navigation";

interface ILayoutProps {
  animate: boolean;
  children: ReactNode;
}

export const PageTransitionLayout: FC<ILayoutProps> = ({ animate, children }) => {

  return (
    <AnimatePresence mode={"wait"}>
      <motion.div
        key={usePathname()}
        initial="initialState"
        animate={animate ? "animateState" : "initialState"}
        exit="exitState"
        transition={{
          type: "spring",
          duration: 1,
        }}
        variants={{
          initialState: {
            x: "100vw",
          },
          animateState: {
            x: 0,
          },
          exitState: {
            x: "-100vw",
          },
        }}
        className="min-h-screen w-full" // Feel free to add your classes here
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
