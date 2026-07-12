import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Metric = { label: string; value: number; suffix?: string };

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function WaveCanvas({ rate }: { rate: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let t0 = performance.now();

    const draw = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      ctx.clearRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = "rgba(51,51,51,0.8)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const phase = reduce ? 0 : (now - t0) / 1000;
      const amp = h * 0.28 * (0.7 + rate * 0.15);
      const freq = 1.2 + rate * 0.35;

      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y =
          h / 2 +
          Math.sin(x * 0.035 * freq + phase * 3.2) * amp * 0.55 +
          Math.sin(x * 0.09 + phase * 5.1) * amp * 0.25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(59,130,246,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // secondary
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const y =
          h / 2 +
          Math.sin(x * 0.05 * freq - phase * 2.4) * amp * 0.35 +
          Math.cos(x * 0.02 + phase) * amp * 0.12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(16,185,129,0.55)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (!reduce) {
        frame++;
        raf = requestAnimationFrame(draw);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [rate, reduce]);

  return (
    <canvas
      ref={ref}
      className="w-full h-[120px] md:h-[140px] block"
      aria-hidden
    />
  );
}

export default function SignalPanel({
  locale,
  className,
}: {
  locale: "en" | "zh";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [rate, setRate] = useState(locale === "zh" ? 1.15 : 1);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRate(locale === "zh" ? 1.15 : 1);
  }, [locale]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const metrics: Metric[] = useMemo(
    () =>
      locale === "zh"
        ? [
            { label: "公开项目", value: 6 },
            { label: "框架测试", value: 153 },
            { label: "语言版本", value: 2 },
          ]
        : [
            { label: "SHIPPED_SYSTEMS", value: 6 },
            { label: "FRAMEWORK_TESTS", value: 153 },
            { label: "LOCALES", value: 2 },
          ],
    [locale]
  );

  const a = useCountUp(metrics[0].value, inView && !reduce);
  const b = useCountUp(metrics[1].value, inView && !reduce);
  const c = useCountUp(metrics[2].value, inView && !reduce);
  const values = [a, b, c];

  return (
    <div
      ref={rootRef}
      className={cn(
        "tech-border bg-card/60 p-4 md:p-5 relative overflow-hidden",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="font-mono text-xs text-primary flex items-center gap-2">
          <span className="signal-dot" />
          {locale === "zh" ? "信号面板 · LIVE" : "SIGNAL_PANEL · LIVE"}
        </div>
        <button
          type="button"
          onClick={() => setRate(r => (r < 1.2 ? 1.45 : 1))}
          className="font-mono text-[10px] border border-border px-2 py-1 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          {locale === "zh"
            ? rate > 1.2
              ? "频率: 高"
              : "切换频率"
            : rate > 1.2
              ? "FREQ: HIGH"
              : "TOGGLE_FREQ"}
        </button>
      </div>

      <WaveCanvas rate={rate} />

      <div className="grid grid-cols-3 gap-3 mt-4 border-t border-border/50 pt-4">
        {metrics.map((m, i) => (
          <div key={m.label} className="text-center md:text-left">
            <div className="font-mono text-2xl md:text-3xl text-foreground tabular-nums">
              {values[i]}
              {m.suffix ?? ""}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground tracking-wider mt-1">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
