import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { useState } from "react";

import Dates from "./components/Dates";
import MeetingsSection from "./components/MeetingsSection";

function App() {
  const today = dayjs().startOf("day");
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.format("MMM-YYYY"));

  function next() {
    const firstDayOfNextMonth = dayjs(currentMonth).add(1, "month");
    setCurrentMonth(firstDayOfNextMonth.format("MMM-YYYY"));
  }

  function previous() {
    const firstDayOfPreviousMonth = dayjs(currentMonth).subtract(1, "month");
    setCurrentMonth(firstDayOfPreviousMonth.format("MMM-YYYY"));
  }

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {dayjs(currentMonth).format("MMM YYYY")}
              </h2>

              <button
                onClick={previous}
                type="button"
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={next}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              {Array.from(new Array(7).keys()).map((_, i) => (
                <div key={i}>{today.weekday(i).format("dd")}</div>
              ))}
            </div>
            <Dates
              onSelect={(date) => setSelectedDay(date)}
              currentMonth={currentMonth}
              selectedDay={selectedDay}
            />
          </div>
          <MeetingsSection selectedDay={selectedDay} />
        </div>
      </div>
    </div>
  );
}

export default App;
