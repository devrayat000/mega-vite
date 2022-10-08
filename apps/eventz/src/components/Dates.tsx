import clsx from "clsx";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";

import { useEventStore } from "../store/eventStore";

export type DatesProp = {
  onSelect(date: dayjs.Dayjs): void;
  selectedDay: string | number | Date | dayjs.Dayjs;
  currentMonth: string | number | Date | dayjs.Dayjs;
};

const Dates = ({ onSelect, selectedDay, currentMonth }: DatesProp) => {
  const previousMonth = usePrevious(dayjs(currentMonth).format("MMM-YYYY"));
  const [containerRef, { width }] = useMeasure();
  const meetings = useEventStore((store) => store.events);
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
            <li
              key={day.format("DD-MMM-YYYY")}
              className={clsx(dayIdx === 0 && colStartClasses[day.weekday()])}
            >
              <button
                type="button"
                onClick={() => onSelect(day)}
                className={clsx(
                  dayjs(day).isSame(selectedDay, "date") && "text-white",
                  !dayjs(day).isSame(selectedDay, "date") &&
                    dayjs(day).isToday() &&
                    "text-red-500",
                  !dayjs(day).isSame(currentMonth, "date") &&
                    !dayjs(day).isToday() &&
                    dayjs(day).isSame(currentMonth, "month") &&
                    "text-gray-900",
                  !dayjs(day).isSame(currentMonth, "date") &&
                    !dayjs(day).isToday() &&
                    !dayjs(day).isSame(currentMonth, "month") &&
                    "text-gray-400",
                  dayjs(day).isSame(selectedDay, "date") &&
                    dayjs(day).isToday() &&
                    "bg-red-500",
                  dayjs(day).isSame(selectedDay, "date") &&
                    !dayjs(day).isToday() &&
                    "bg-gray-900",
                  !dayjs(day).isSame(selectedDay, "date") &&
                    dayjs(day).isToday() &&
                    "hover:bg-red-100",
                  !dayjs(day).isSame(selectedDay, "date") &&
                    "hover:bg-gray-200",
                  (dayjs(day).isSame(selectedDay, "date") ||
                    dayjs(day).isSame(selectedDay, "date")) &&
                    "font-semibold",
                  meetings.some((meeting) =>
                    dayjs(meeting.startDatetime).isSame(day, "date")
                  ) &&
                    "before:h-2 before:w-2 before:rounded-full before:bg-blue-500 before:absolute before:top-0 before:right-0",
                  "mx-auto flex h-8 w-8 items-center justify-center rounded-full select-none relative"
                )}
              >
                <time dateTime={dayjs(day).format("YYYY-MM-DD")}>
                  {dayjs(day).format("D")}
                </time>
              </button>
            </li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </section>
  );
};

export default Dates;

function usePrevious<T>(state: T) {
  const [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }
  return tuple[0];
}
const slide = {
  enter: ({ direction, width }: any) => ({
    opacity: 0,
    x: direction * width,
  }),
  stay: { x: 0, opacity: 1 },
  exit: ({ direction, width }: any) => ({ x: -direction * width, opacity: 0 }),
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
