import dayjs from "dayjs";

import Control from "./components/Control";
import Dates from "./components/Dates";
import MeetingsSection from "./components/MeetingsSection";
import { useEventStore } from "./store/eventStore";

function App() {
  const currentMonth = useEventStore((store) => store.month);

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-rose-300 via-purple-200 to-cyan-200">
      <div className="max-w-md py-6 px-4 mx-auto sm:px-7 md:max-w-5xl md:px-9 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 shadow shadow-white/40">
        <h1 className="text-center">Organize Meetings with Ease</h1>
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
