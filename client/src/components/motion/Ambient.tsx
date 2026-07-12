import { motion, useReducedMotion } from "framer-motion";

/** Soft primary/secondary orbs + scan line — sits behind content */
export function AmbientBackdrop() {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-xl rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] max-w-lg rounded-full bg-secondary/5 blur-[100px]" />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute top-[-15%] right-[-8%] w-[42vw] h-[42vw] max-w-2xl rounded-full bg-primary/10 blur-[120px]"
        animate={{
          x: [0, 24, -12, 0],
          y: [0, 18, 8, 0],
          scale: [1, 1.06, 0.98, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12%] left-[-12%] w-[38vw] h-[38vw] max-w-xl rounded-full bg-secondary/8 blur-[110px]"
        animate={{
          x: [0, -20, 14, 0],
          y: [0, -16, 10, 0],
          scale: [1, 1.08, 0.97, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-[20vw] h-[20vw] max-w-sm rounded-full bg-primary/5 blur-[80px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        style={{ top: "0%" }}
      />
    </div>
  );
}

export default AmbientBackdrop;
