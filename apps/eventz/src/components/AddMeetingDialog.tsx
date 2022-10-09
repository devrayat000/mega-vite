import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import type { Variants } from "framer-motion";
import { m as motion } from "framer-motion";
import { Input } from "ui/Form";

import { useEventStore } from "../store/eventStore";
import getDataUrl from "../utils/get-data-url";
import ImageInput from "./InputImage";

export type AddMeetingDialogProps = {
  onClose(): void;
  selectedDay: string | number | Date | dayjs.Dayjs;
};

const backdrop: Variants = {
  from: {
    opacity: 0,
    backdropFilter: `blur(0px)`,
  },
  to: {
    opacity: 1,
    backdropFilter: `blur(3px)`,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    backdropFilter: `blur(0px)`,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const panel: Variants = {
  from: {
    opacity: 0,
    scale: 0.35,
  },
  to: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.35,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const AddMeetingDialog = ({ onClose, selectedDay }: AddMeetingDialogProps) => {
  const addMeeting = useEventStore((store) => store.add);

  return (
    <Dialog
      as={motion.div}
      role="dialog"
      className="relative z-10"
      static
      open
      onClose={onClose}
      initial="from"
      animate="to"
      exit="exit"
    >
      <Dialog.Backdrop
        as={motion.div}
        variants={backdrop}
        className="fixed inset-0 bg-black/25"
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel
            as={motion.section}
            variants={panel}
            className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <section className="flex items-center">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 grow"
              >
                Add Meeting
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full select-none hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </section>
            <form
              className="mt-2"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const params = Object.fromEntries(formData.entries());

                const [startHr, startMin] = (params.startTime as string).split(
                  ":"
                );
                const [endHr, endMin] = (params.endTime as string).split(":");

                if (
                  typeof params.avatar !== "string" &&
                  typeof params.name === "string"
                ) {
                  addMeeting({
                    id: useEventStore.getState().events.length,
                    name: params.name,
                    startDatetime: dayjs(selectedDay)
                      .hour(+startHr)
                      .minute(+startMin)
                      .format("YYYY-MM-DDTHH:mm"),
                    endDatetime: dayjs(selectedDay)
                      .hour(+endHr)
                      .minute(+endMin)
                      .format("YYYY-MM-DDTHH:mm"),
                    imageUrl: await getDataUrl(params.avatar),
                  });
                }

                onClose();
              }}
            >
              <Input>
                <Input.Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </Input.Label>
                <Input.Control
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm w-full rounded-md border-gray-300 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </Input>
              <Input className="mt-3">
                <Input.Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="avatar"
                >
                  Photo
                </Input.Label>
                <ImageInput
                  multiple={false}
                  onChange={console.log}
                  name="avatar"
                  id="avatar"
                />
              </Input>
              <Input>
                <Input.Label
                  htmlFor="startTime"
                  className="text-sm font-medium text-gray-700"
                >
                  Time
                </Input.Label>
                <section className="flex items-center gap-3">
                  <Input.Control
                    required
                    type="time"
                    name="startTime"
                    id="startTime"
                    className="grow shadow-sm w-full rounded-md border-gray-300 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="08:00"
                  />
                  <label htmlFor="endTime">To</label>
                  <Input.Control
                    required
                    type="time"
                    name="endTime"
                    id="endTime"
                    className="grow shadow-sm w-full rounded-md border-gray-300 px-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="09:00"
                  />
                </section>
              </Input>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Add
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddMeetingDialog;
