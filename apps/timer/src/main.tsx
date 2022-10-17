import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    {/* <LazyMotion features={domAnimation} strict> */}
    <App />
    {/* </LazyMotion> */}
  </StrictMode>
);
