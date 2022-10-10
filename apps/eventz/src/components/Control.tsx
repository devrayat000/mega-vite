import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import shallow from "zustand/shallow";

import { useEventStore } from "../store/eventStore";

const Control = () => {
  const [previous, next] = useEventStore(
    (store) => [store.previous, store.next],
    shallow
  );

  return (
    <section id="control" className="flex items-center">
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
    </section>
  );
};

export default Control;
