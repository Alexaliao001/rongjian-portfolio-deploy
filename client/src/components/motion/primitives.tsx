import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function useMotionSafe() {
  const reduce = useReducedMotion();
  return !reduce;
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

/** Scroll / mount reveal with reduced-motion fallback */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  once = true,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const animate = useMotionSafe();
  if (!animate) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  fast = false,
}: {
  children: ReactNode;
  className?: string;
  fast?: boolean;
}) {
  const animate = useMotionSafe();
  if (!animate) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const animate = useMotionSafe();
  if (!animate) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/** Page content enter on route change */
export function PageEnter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const animate = useMotionSafe();
  if (!animate) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function TechCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const animate = useMotionSafe();

  if (!animate) {
    return (
      <div className={cn("tech-border tech-card", className)}>{children}</div>
    );
  }

  return (
    <motion.div
      className={cn("tech-border tech-card", className)}
      variants={fadeUp}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: easeOut },
      }}
      whileTap={{ scale: 0.995 }}
    >
      {children}
    </motion.div>
  );
}
