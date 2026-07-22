"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface RouteMapProps {
  cities: string[];
}

const WIDTH = 800;
const HEIGHT = 220;

function buildPoints(count: number) {
  const marginX = 40;
  const usable = WIDTH - marginX * 2;
  return Array.from({ length: count }, (_, i) => {
    const x = marginX + (usable / (count - 1)) * i;
    const y = i % 2 === 0 ? HEIGHT * 0.62 : HEIGHT * 0.28;
    return { x, y };
  });
}

/**
 * Stylized (non-geographic) journey diagram: an SVG line connecting each
 * city as an evenly spaced node, drawing itself via pathLength as the
 * section scrolls into view. Nodes are flat amber; the route line and
 * glow are flat amber at reduced opacity — no gradients.
 */
export function RouteMap({ cities }: RouteMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  const points = buildPoints(cities.length);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className="route-map" ref={ref}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="route-map-svg"
        role="img"
        aria-label={`Business trip route: ${cities.join(" to ")}`}
      >
        <path d={path} className="route-map-line-bg" fill="none" />
        <motion.path d={path} className="route-map-line" fill="none" style={{ pathLength: drawn }} />
        {points.map((p, i) => (
          <g key={cities[i]}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={7}
              className="route-map-node"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ type: "spring", stiffness: 320, damping: 18, delay: i * 0.12 }}
            />
            <text
              x={p.x}
              y={p.y < HEIGHT / 2 ? p.y - 16 : p.y + 26}
              textAnchor="middle"
              className="route-map-label"
            >
              {cities[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
