import cn from "@/helpers/cn";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useSearchParams } from "react-router";

interface MotionTabIndicatorProps {
  layoutId: string;
}

export const MotionTabIndicator = ({ layoutId }: MotionTabIndicatorProps) => (
  <motion.div
    layoutId={layoutId}
    className="absolute inset-0 rounded-lg bg-gray-300 dark:bg-gray-300/20"
    transition={{
      type: "spring",
      duration: 0.2,
      bounce: 0
    }}
  />
);

interface TabButtonProps {
  active: boolean;
  badge?: ReactNode;
  className?: string;
  name: ReactNode;
  onClick?: () => void;
  type?: string;
}

const TabButton = ({
  active,
  badge,
  className = "",
  name,
  onClick,
  type
}: TabButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = (type?: string) => {
    if (!type) {
      return;
    }

    searchParams.set("type", type);
    setSearchParams(searchParams);
  };

  return (
    <button
      className={cn(
        { "bg-gray-300 dark:bg-gray-300/20": active },
        "hover:bg-gray-300 dark:hover:bg-gray-300/30",
        "flex items-center justify-center gap-x-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm",
        className
      )}
      onClick={() => {
        updateQuery(type);
        onClick?.();
      }}
      type="button"
    >
      <span>{name}</span>
      {badge}
    </button>
  );
};

export default TabButton;
