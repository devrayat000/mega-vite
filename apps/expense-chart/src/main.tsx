import "./index.css";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { domAnimation, LazyMotion } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

dayjs.extend(weekday);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <App />
    </LazyMotion>
  </StrictMode>
);
