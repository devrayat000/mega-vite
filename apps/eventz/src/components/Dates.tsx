import clsx from "clsx";
import dayjs from "dayjs";
import { AnimatePresence, m as motion } from "framer-motion";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import shallow from "zustand/shallow";

import { useEventStore } from "../store/eventStore";

export type DatesProp = unknown;

const Dates = (_props: DatesProp) => {
  const currentMonth = useEventStore((store) => store.month);
  const previousMonth = usePrevious(dayjs(currentMonth).format("MMM-YYYY"));
  const [containerRef, { width }] = useMeasure();

  const days = useMemo(
    () =>
      Array.from(new Array(dayjs(currentMonth).daysInMonth()).keys()).map((i) =>
        dayjs(currentMonth).date(i + 1)
      ),
    [currentMonth]
  );

  const direction = dayjs(currentMonth).isBefore(dayjs(previousMonth)) ? 1 : -1;

  return (
    <section ref={containerRef} className="overflow-x-hidden flex items-center">
      <AnimatePresence
        mode="wait"
        initial={false}
        custom={{ width, direction }}
      >
        <motion.ol
          key={dayjs(currentMonth).format("MMM-YYYY")}
          variants={slide}
          initial={"enter"}
          animate={"stay"}
          exit={"exit"}
          custom={{ width, direction }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-7 mt-2 pl-0 text-sm gap-y-2"
          style={{ width }}
        >
          {days.map((day, dayIdx) => (
            <DateItem
              key={day.format("DD-MMM-YYYY")}
              className={clsx(dayIdx === 0 && colStartClasses[day.weekday()])}
              day={day}
            />
          ))}
        </motion.ol>
      </AnimatePresence>
    </section>
  );
};

export default Dates;

type DateItemProps = React.ComponentPropsWithRef<"li"> & {
  day: dayjs.Dayjs;
};

function setDate(day: dayjs.Dayjs) {
  useEventStore.setState({ day });
}

export const DateItem = ({ day, ...props }: DateItemProps) => {
  const [isSameDay, isSameMonth, hasMeeting] = useEventStore(
    (store) => [
      dayjs(day).isSame(store.day, "date"),
      dayjs(day).isSame(store.month, "month"),
      store.events.some((meeting) =>
        dayjs(meeting.startDatetime).isSame(day, "date")
      ),
    ],
    shallow
  );
  const isToday = dayjs(day).isToday();

  return (
    <li {...props}>
      <button
        type="button"
        onClick={() => setDate(day)}
        className={clsx(
          isSameDay && "text-white",
          !isSameDay && isToday && "text-red-500",
          !isToday && isSameMonth && "text-gray-900",
          !isToday && !isSameMonth && "text-gray-400",
          isSameDay && isToday && "bg-red-500",
          isSameDay && !isToday && "bg-gray-900",
          !isSameDay && isToday && "hover:bg-red-100",
          !isSameDay && "hover:bg-gray-200",
          (isSameDay || isSameDay) && "font-semibold",
          hasMeeting &&
            "before:h-2 before:w-2 before:rounded-full before:bg-blue-500 before:absolute before:top-0 before:right-0",
          "mx-auto flex h-8 w-8 items-center justify-center rounded-full select-none relative"
        )}
      >
        <time dateTime={dayjs(day).format("YYYY-MM-DD")}>
          {dayjs(day).format("D")}
        </time>
      </button>
    </li>
  );
};

function usePrevious<T>(state: T) {
  const [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }
  return tuple[0];
}

type SlideProps = {
  direction: -1 | 1;
  width: number;
};
const slide = {
  enter: ({ direction, width }: SlideProps) => ({
    opacity: 0,
    x: -direction * width,
  }),
  stay: { x: 0, opacity: 1 },
  exit: ({ direction, width }: SlideProps) => ({
    x: direction * width,
    opacity: 0,
  }),
};

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
