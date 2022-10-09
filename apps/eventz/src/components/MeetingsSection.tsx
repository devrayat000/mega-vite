import dayjs from "dayjs";
import { AnimatePresence, m as motion } from "framer-motion";

import { useEventStore } from "../store/eventStore";
import AddMeeting from "./AddMeeting";
import { container } from "./animation";
import Meeting from "./Meeting";

const MeetingsSection = ({
  selectedDay,
}: {
  selectedDay: string | number | Date | dayjs.Dayjs;
}) => {
  const meetings = useEventStore((store) => store.events);
  const selectedDayMeetings = meetings.filter((meeting) =>
    dayjs(meeting.startDatetime).isSame(selectedDay, "date")
  );

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
        {selectedDayMeetings.length > 0 ? (
          <AnimatePresence mode="wait">
            {selectedDayMeetings.map((meeting, i) => (
              <Meeting key={meeting.id} meeting={meeting} />
            ))}
          </AnimatePresence>
        ) : (
          <p>No meetings today.</p>
        )}
      </motion.ol>
    </section>
  );
};

export default MeetingsSection;
