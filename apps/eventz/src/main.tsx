import "./index.css";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import weekday from "dayjs/plugin/weekday";
import { domAnimation, LazyMotion } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

dayjs.extend(weekday);
dayjs.extend(isToday);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>
);
