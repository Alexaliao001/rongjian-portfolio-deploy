import { motion, useReducedMotion } from "framer-motion";

/** Live “signal” ticker under header */
export function SignalStrip({ label }: { label?: string }) {
  const reduce = useReducedMotion();
  const text =
    label ??
    "SIGNAL · BUILD · VERIFY · SHIP ·  " +
      "SIGNAL · BUILD · VERIFY · SHIP ·  ";

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none overflow-hidden border-b border-border/30 bg-background/40"
      aria-hidden
    >
      <motion.div
        className="flex whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-muted-foreground/50 py-1"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="pr-12">{text.repeat(4)}</span>
        <span className="pr-12">{text.repeat(4)}</span>
      </motion.div>
    </div>
  );
}
