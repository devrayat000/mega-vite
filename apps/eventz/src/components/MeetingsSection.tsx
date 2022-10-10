import dayjs from "dayjs";
import { AnimatePresence, m as motion } from "framer-motion";
import { lazy, Suspense, useCallback } from "react";

import { useEventStore } from "../store/eventStore";
import AddMeeting from "./AddMeeting";
import { container } from "./animation";

const Meeting = lazy(() => import("./Meeting"));

const MeetingsSection = () => {
  const selectedDay = useEventStore((store) => store.day);

  return (
    <section className="mt-12 md:mt-0 md:pl-14">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">
          Schedule for{" "}
          <time dateTime={dayjs(selectedDay).format("YYYY-MM-DD")}>
            {dayjs(selectedDay).format("MMM D, YYYY")}
          </time>
        </h2>

        <AddMeeting selectedDay={selectedDay} />
      </div>
      <motion.ol
        key={dayjs(selectedDay).format("DD-MMM-YYYY")}
        className="mt-4 pl-0 space-y-1 text-sm leading-6 text-gray-500"
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Meetings />
      </motion.ol>
    </section>
  );
};

export default MeetingsSection;

export const Meetings = () => {
  const selectedDayMeetings = useEventStore(
    useCallback(
      (store) =>
        store.events.filter((meeting) =>
          dayjs(meeting.startDatetime).isSame(store.day, "date")
        ),
      []
    )
  );

  if (selectedDayMeetings.length <= 0) {
    return <p>No meetings today.</p>;
  }

  return (
    <AnimatePresence mode="wait">
      {selectedDayMeetings.map((meeting, i) => (
        <Suspense key={meeting.id} fallback={<p>Loading...</p>}>
          <Meeting meeting={meeting} />
        </Suspense>
      ))}
    </AnimatePresence>
  );
};
