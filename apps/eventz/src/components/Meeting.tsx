import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import dayjs from "dayjs";
import { AnimatePresence, m as motion } from "framer-motion";

import type { IMeeting } from "../types/metting";
import { item } from "./animation";

export default function Meeting({ meeting }: { meeting: IMeeting }) {
  const startDateTime = dayjs(meeting.startDatetime);
  const endDateTime = dayjs(meeting.endDatetime);

  return (
    <motion.li
      className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
      variants={item}
    >
      <img
        src={meeting.imageUrl}
        alt={meeting.name}
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {startDateTime.format("h:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={meeting.endDatetime}>
            {endDateTime.format("h:mm a")}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="w-6 h-6" aria-hidden="true" />
              </Menu.Button>
            </div>

            <AnimatePresence mode="wait">
              {open && (
                <Menu.Items
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      ease: "easeOut",
                      duration: 0.1,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.75,
                    transition: {
                      ease: "easeIn",
                      duration: 0.075,
                    },
                  }}
                  as={motion.section}
                  static
                  className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/#"
                          className={clsx(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/#"
                          className={clsx(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Cancel
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </motion.li>
  );
}
