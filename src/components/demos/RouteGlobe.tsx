"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/components/ui/theme";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";
import { useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from "framer-motion";
import { RouteMap } from "@/components/ui/RouteMap";
import { travelStops } from "@/components/portfolio/content";
import { LAND_DOTS } from "./globe-dots";

const DEG = Math.PI / 180;
const SEGMENT_POINTS = 48;
const FOCUS = { lat: 40, lng: 114 };

function toVec(lat: number, lng: number, r = 1) {
  const phi = lat * DEG;
  const lambda = lng * DEG;
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.sin(lambda),
    r * Math.sin(phi),
    r * Math.cos(phi) * Math.cos(lambda),
  );
}

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function dotTexture() {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const MAX_ZOOM = 2.1;
const scaleAt = (p: number) => 1 + smoothstep(0.15, 0.7, p) * (MAX_ZOOM - 1);

interface Colors {
  surface: string;
  land: string;
  route: string;
  theme: string;
}

function Globe({
  progress,
  dragOffset,
  dragging,
  colors,
}: {
  progress: MotionValue<number>;
  dragOffset: MotionValue<number>;
  dragging: MotionValue<boolean>;
  colors: Colors;
}) {
  const group = useRef<THREE.Group>(null);
  const line = useRef<Line2>(null);
  const head = useRef<THREE.Mesh>(null);
  const markers = useRef<(THREE.Mesh | null)[]>([]);

  const landGeometry = useMemo(() => {
    const positions = new Float32Array((LAND_DOTS.length / 2) * 3);
    for (let i = 0; i < LAND_DOTS.length; i += 2) {
      const v = toVec(LAND_DOTS[i], LAND_DOTS[i + 1], 1.001);
      positions.set([v.x, v.y, v.z], (i / 2) * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  const texture = useMemo(() => dotTexture(), []);

  const stops = useMemo(() => travelStops.map((s) => toVec(s.lat, s.lng, 1.004)), []);
  const routePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      const lift = 1.004 + a.distanceTo(b) * 0.55;
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(lift);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      points.push(...curve.getPoints(SEGMENT_POINTS).slice(i === 0 ? 0 : 1));
    }
    return points;
  }, [stops]);

  useFrame(() => {
    const p = progress.get();
    if (!dragging.get()) dragOffset.set(dragOffset.get() * 0.94);

    if (group.current) {
      const spinIn = (1 - smoothstep(0, 0.35, p)) * 1.3;
      group.current.rotation.set(FOCUS.lat * DEG, -FOCUS.lng * DEG - spinIn + dragOffset.get(), 0);
      group.current.scale.setScalar(scaleAt(p));
    }
    const inverse = 1 / scaleAt(p);

    const segments = routePoints.length - 1;
    const drawn = Math.round(smoothstep(0.1, 0.9, p) * segments);
    if (line.current) {
      (line.current.geometry as unknown as { instanceCount: number }).instanceCount = drawn;
      line.current.visible = drawn > 0;
    }
    if (head.current) {
      head.current.visible = drawn > 0 && drawn < segments;
      head.current.position.copy(routePoints[Math.min(drawn, segments)]);
      head.current.scale.setScalar(inverse);
    }
    const perStop = segments / (stops.length - 1);
    markers.current.forEach((marker, i) => {
      if (!marker) return;
      const target = drawn >= i * perStop ? 1 : 0;
      const current = marker.userData.grow ?? 0;
      const grow = THREE.MathUtils.lerp(current, target, 0.18);
      marker.userData.grow = grow;
      marker.scale.setScalar(Math.max(grow * inverse, 0.0001));
    });
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.995, 64, 64]} />
        <meshBasicMaterial color={colors.surface} />
      </mesh>
      <points geometry={landGeometry}>
        <pointsMaterial
          color={colors.land}
          size={0.016}
          map={texture}
          alphaTest={0.5}
          transparent
          sizeAttenuation
        />
      </points>
      <Line ref={line} points={routePoints} color={colors.route} lineWidth={2.2} />
      <mesh ref={head}>
        <sphereGeometry args={[0.009, 16, 16]} />
        <meshBasicMaterial color={colors.route} />
      </mesh>
      {stops.map((v, i) => (
        <mesh
          key={travelStops[i].city}
          position={v}
          ref={(el) => {
            markers.current[i] = el;
          }}
          scale={0.0001}
        >
          <sphereGeometry args={[0.011, 16, 16]} />
          <meshBasicMaterial color={colors.route} />
        </mesh>
      ))}
    </group>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function RouteGlobe() {
  const wrapper = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  // Never server-rendered (loaded with ssr: false), so window is safe here.
  const [capable] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && supportsWebGL(),
  );
  const colors = useMemo<Colors | null>(
    () =>
      capable
        ? { surface: token("--bg-2"), land: token("--text-dim"), route: token("--gold"), theme }
        : null,
    [capable, theme],
  );
  const [visible, setVisible] = useState(false);
  const [activeStop, setActiveStop] = useState(-1);
  const dragOffset = useMotionValue(0);
  const dragging = useMotionValue(false);
  const dragStart = useRef<{ x: number; base: number } | null>(null);

  const { scrollYProgress } = useScroll({ target: wrapper, offset: ["start 0.9", "end 0.35"] });

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const drawn = Math.round(smoothstep(0.1, 0.9, p) * (travelStops.length - 1) * SEGMENT_POINTS);
    setActiveStop(drawn === 0 ? -1 : Math.floor(drawn / SEGMENT_POINTS));
  });

  if (!colors) return <RouteMap cities={travelStops.map((s) => s.city)} />;

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, base: dragOffset.get() };
    dragging.set(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    dragOffset.set(dragStart.current.base + (e.clientX - dragStart.current.x) * 0.006);
  };
  const endDrag = () => {
    dragStart.current = null;
    dragging.set(false);
  };

  return (
    <div className="route-globe" ref={wrapper}>
      <div
        className="route-globe-stage"
       
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="img"
        aria-label={`3D globe tracing the business trip route: ${travelStops.map((s) => s.city).join(" to ")}`}
      >
        <Canvas
            camera={{ position: [0, 0, 3.4], fov: 38 }}
            flat
            dpr={[1, 1.75]}
            frameloop={visible ? "always" : "never"}
            gl={{ antialias: true, alpha: true }}
          >
            <Globe
              key={colors.theme}
              progress={scrollYProgress}
              dragOffset={dragOffset}
              dragging={dragging}
              colors={colors}
            />
          </Canvas>
      </div>
      <ol className="route-globe-stops" aria-hidden>
        {travelStops.map((stop, i) => (
          <li
            key={stop.city}
            className="route-globe-stop"
            data-state={i < activeStop ? "done" : i === activeStop ? "active" : "idle"}
          >
            <span className="route-globe-stop-index">{String(i + 1).padStart(2, "0")}</span>
            {stop.city}
          </li>
        ))}
      </ol>
      <p className="route-globe-hint">Ulaanbaatar to Shanghai, June to July 2024. Scroll to trace the route, drag to spin</p>
    </div>
  );
}
