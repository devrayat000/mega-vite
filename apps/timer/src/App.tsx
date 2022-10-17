import { useCallback, useSyncExternalStore } from "react";

import { ReactComponent as IconFacebook } from "./assets/images/icon-facebook.svg";
import { ReactComponent as IconInstagram } from "./assets/images/icon-instagram.svg";
import { ReactComponent as IconPinterest } from "./assets/images/icon-pinterest.svg";
import Time from "./components/Time";

function createCountdownStore(initialTime?: number) {
  // @ts-ignore
  let time = initialTime ?? (new Date("1/1/2023") - new Date()) / 1000;
  const listeners = new Set<() => void>();

  function subscribe(cb: () => void) {
    listeners.add(cb);
    return () => void listeners.delete(cb);
  }

  function listenToTick() {
    const interval = setInterval(() => {
      time--;
      listeners.forEach((cb) => cb());
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }

  function useCountdown<T>(selector: (store: number) => T) {
    return useSyncExternalStore(subscribe, () => selector(time));
  }
  useCountdown.destroy = listenToTick();
  return useCountdown;
}

const useCountdown = createCountdownStore();

const Days = () => {
  const days = useCountdown(
    useCallback((tick) => Math.floor(tick / 86400), [])
  );
  return <Time label="Days" time={days} />;
};

const Hours = () => {
  const hours = useCountdown((tick) => {
    const days = Math.floor(tick / 86400);
    return Math.floor((tick - days * 86400) / 3600);
  });
  return <Time label="Hours" time={hours} />;
};

const Minutes = () => {
  const minutes = useCountdown((tick) => Math.floor(tick / 60) % 60);
  return <Time label="Minutes" time={minutes} />;
};

const Seconds = () => {
  const seconds = useCountdown((tick) => Math.floor(tick) % 60);
  return <Time label="Seconds" time={seconds} />;
};

function App() {
  return (
    <main className="p-3 min-h-screen max-w-screen container">
      <section className="mt-28">
        <h1 className="uppercase text-white text-2xl text-center tracking-widest">
          We're Launching Soon
        </h1>
        <ul className="flex gap-3 justify-between sm:justify-center sm:gap-4 mx-4 mt-16">
          <Days />
          <Hours />
          <Minutes />
          <Seconds />
        </ul>
      </section>
      <section className="absolute bottom-0 left-0 w-full grid place-items-center">
        <section className="flex gap-9 items-center my-8 sm:my-14">
          <IconFacebook />
          <IconPinterest />
          <IconInstagram />
        </section>
      </section>
    </main>
  );
}

export default App;
