import dayjs from "dayjs";

import Control from "./components/Control";
import Dates from "./components/Dates";
import MeetingsSection from "./components/MeetingsSection";
import { useEventStore } from "./store/eventStore";

function App() {
  const currentMonth = useEventStore((store) => store.month);

  return (
    <div className="pt-8">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <h1 className="text-center mt-2">Organize Meetings with Ease</h1>
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 mt-10">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {dayjs(currentMonth).format("MMM YYYY")}
              </h2>

              <Control />
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              {Array.from(new Array(7).keys()).map((_, i) => (
                <div key={i}>{dayjs().weekday(i).format("dd")}</div>
              ))}
            </div>
            <Dates />
          </div>
          <MeetingsSection />
        </div>
      </div>
    </div>
  );
}

export default App;
