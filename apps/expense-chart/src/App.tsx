import * as Portal from "@radix-ui/react-portal";
import clsx from "clsx";
import dayjs from "dayjs";
// import en from "dayjs/locale/en-in";
import {
  AnimatePresence,
  m as motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

import { ReactComponent as Logo } from "./assets/logo.svg";
import chartData from "./data.json";

const GAP = 10,
  THRESHOLD = 24;

type RectProps = {
  fullHeight: number;
  height: number;
  size: number;
  data: typeof chartData[number];
  index: number;
};

export const Rect = ({ height, fullHeight, size, data, index }: RectProps) => {
  const h = useMotionValue(0);
  const top = fullHeight - height - THRESHOLD;
  const yP = useTransform(h, [0, height], [fullHeight - THRESHOLD, top]);
  const [text, { width }] = useMeasure();
  const [tooltip, tp] = useMeasure();

  const [show, setShow] = useState(false);

  return (
    <g
      key={data.day}
      className="text-gray-400"
      transform={`translate(${size * index},0)`}
      height={height}
    >
      <AnimatePresence>
        {show && (
          <Portal.Root
            asChild
            container={document.getElementById("tooltip-container")}
          >
            <motion.div
              ref={tooltip}
              className="absolute bg-neutral-dark-brown text-neutral-cream text-sm px-1.5 py-2 rounded"
              style={{
                top: top - tp.height - 6,
                left: size * (index + 0.5) - tp.width / 2,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ${data.amount}
            </motion.div>
          </Portal.Root>
        )}
      </AnimatePresence>
      <motion.rect
        width={size ? size - GAP : undefined}
        x={GAP / 2}
        style={{
          height: h,
          y: yP,
        }}
        animate={{
          height: height,
        }}
        transition={{ duration: 0.4 }}
        fill="currentColor"
        className={clsx(
          dayjs().format("ddd").toLowerCase() === data.day.toLowerCase()
            ? "text-primary-cyan hover:text-primary-cyan/80"
            : "text-primary-soft-red hover:text-primary-soft-red/80",
          "transition-colors"
        )}
        rx={4}
        cursor="pointer"
        onHoverStart={() => {
          setShow(true);
        }}
        onHoverEnd={() => {
          setShow(false);
        }}
      />
      <text
        x={(size - width) / 2}
        y={fullHeight - 4}
        fill="currentColor"
        className="text-xs text-neutral-mid-brown"
        ref={text}
      >
        <tspan>{data.day}</tspan>
      </text>
    </g>
  );
};

function App() {
  const [bound, { width, height }] = useMeasure();
  const maxPrice = Math.min(
    chartData.reduce((prev, curr) => Math.max(prev, curr.amount), 0) +
      THRESHOLD,
    100
  );
  const yScale = transform([0, maxPrice], [0, height]);

  const size = width / chartData.length;

  return (
    <main className="p-3 min-h-screen bg-neutral-cream grid items-center sm:justify-center">
      <section className="sm:w-96">
        <header className="flex justify-between items-center bg-primary-soft-red p-5 rounded-lg">
          <section className="text-white">
            <h6 className="text-xs">My balance</h6>
            <h4 className="text-2xl mt-1 font-bold">$921.48</h4>
          </section>
          <Logo className="w-12 h-auto" />
        </header>
        <article className="bg-neutral-pale-orange p-5 rounded-lg mt-3 text-neutral-dark-brown">
          <h1 className="text-2xl font-bold">Spending - Last 7 days</h1>
          <section ref={bound} className="h-56 relative">
            <svg viewBox={`0 0 ${width} ${height}`}>
              {chartData.map((data, i) => {
                return (
                  <Rect
                    key={data.day}
                    data={data}
                    index={i}
                    size={size}
                    fullHeight={height}
                    height={yScale(data.amount - 4)}
                  />
                );
              })}
              <rect />
            </svg>
            <section id="tooltip-container"></section>
          </section>
          <hr className="bg-neutral-cream my-4" />
          <section className="flex justify-between items-end">
            <section>
              <h6 className="text-xs text-neutral-mid-brown">
                Total in this month
              </h6>
              <h4 className="text-3xl mt-1 font-bold">$478.33</h4>
            </section>
            <section className="text-right">
              <p>
                <b>+2.4%</b>
              </p>
              <p className="text-neutral-mid-brown text-xs">from last month</p>
            </section>
          </section>
        </article>
      </section>
    </main>
  );
}

export default App;
