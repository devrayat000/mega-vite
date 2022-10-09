import type dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useState } from "react";

const AddMeetingDialog = lazy(() => import("./AddMeetingDialog"));

const AddMeeting = ({
  selectedDay,
}: {
  selectedDay: string | number | Date | dayjs.Dayjs;
}) => {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <section>
      <button
        className="bg-gray-900 hover:bg-gray-900/80 transition-colors select-none text-white rounded px-3 py-1"
        onClick={() => setOpen(true)}
      >
        Add
      </button>
      <AnimatePresence mode="wait">
        {open && (
          <Suspense>
            <AddMeetingDialog onClose={close} selectedDay={selectedDay} />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AddMeeting;
