import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ✅ Simple className merge helper */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function PlaceholdersAndVanishInput({
  placeholders = [],
  onChange,
  onSubmit,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef(null);

  /* ---------------- Placeholder Animation ---------------- */

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible") {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  /* ---------------- Canvas Vanish Logic ---------------- */

  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const newDataRef = useRef([]);

  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);

    const styles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(styles.fontSize);

    ctx.font = `${fontSize * 2}px ${styles.fontFamily}`;
    ctx.fillStyle = "#fff";
    ctx.fillText(value, 16, 40);

    const { data } = ctx.getImageData(0, 0, 800, 800);
    const pixels = [];

    for (let y = 0; y < 800; y++) {
      for (let x = 0; x < 800; x++) {
        const idx = (y * 800 + x) * 4;
        if (data[idx + 3] > 0) {
          pixels.push({
            x,
            y,
            r: 1,
            color: `rgba(${data[idx]},${data[idx + 1]},${data[idx + 2]},${data[idx + 3]})`,
          });
        }
      }
    }

    newDataRef.current = pixels;
  }, [value]);

  useEffect(() => {
    draw();
  }, [draw]);

  const animate = (startX) => {
    const step = (pos = startX) => {
      requestAnimationFrame(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(pos, 0, 800, 800);

        newDataRef.current = newDataRef.current.filter((p) => {
          if (p.x < pos) return true;

          p.x += Math.random() > 0.5 ? 1 : -1;
          p.y += Math.random() > 0.5 ? 1 : -1;
          p.r -= Math.random() * 0.05;

          if (p.r <= 0) return false;

          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.r, p.r);
          return true;
        });

        if (newDataRef.current.length > 0) {
          step(pos - 8);
        } else {
          setAnimating(false);
          setValue("");
        }
      });
    };

    step();
  };

  const vanishAndSubmit = () => {
    if (!value) return;
    setAnimating(true);
    draw();

    const maxX = Math.max(...newDataRef.current.map((p) => p.x));
    animate(maxX);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit?.(e);
  };

  /* ---------------- JSX ---------------- */

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative mx-auto max-w-xl h-12 rounded-full overflow-hidden bg-white dark:bg-zinc-800 shadow transition",
        value && "bg-gray-50"
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute pointer-events-none scale-50 top-[20%] left-4 origin-top-left",
          animating ? "opacity-100" : "opacity-0"
        )}
      />

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange?.(e);
          }
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative z-10 w-full h-full bg-transparent px-6 text-sm sm:text-base focus:outline-none",
          animating && "text-transparent"
        )}
        type="text"
      />

      <button
        type="submit"
        disabled={!value}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black flex items-center justify-center"
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-gray-300 h-4 w-4"
        >
          <motion.path
            d="M5 12h14"
            initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
            animate={{ strokeDashoffset: value ? 0 : "50%" }}
            transition={{ duration: 0.3 }}
          />
          <path d="M13 18l6-6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              key={currentPlaceholder}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pl-6 text-sm sm:text-base text-neutral-500 truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
