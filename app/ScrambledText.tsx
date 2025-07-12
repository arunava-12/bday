import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Split all <p> elements inside this container
    const split = SplitText.create(rootRef.current.querySelectorAll("p"), {
      type: "chars",
      charsClass: "inline-block will-change-transform",
    });

    split.chars.forEach((c: Element) => {
      gsap.set(c, { attr: { "data-content": c.innerHTML } });
    });

    const handleMove = (e: PointerEvent) => {
      split.chars.forEach((c: Element) => {
        const el = c as HTMLElement;
        const { left, top, width, height } = el.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(el, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: el.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    const container = rootRef.current;
    container.addEventListener("pointermove", handleMove);

    return () => {
      container.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`m-[1vw] max-w-[900px] font-mono text-white ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrambledText;
