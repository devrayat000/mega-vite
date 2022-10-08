import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  AvatarFallback,
  AvatarImage,
  Root as AvatarRoot,
} from "@radix-ui/react-avatar";
import clsx from "clsx";
import dayjs from "dayjs";
import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input } from "ui/Form";

import { useEventStore } from "../store/eventStore";

const ImageInput = forwardRef(_ImageInput) as <T extends boolean>(
  props: ImageInpurProps<T> & {
    ref?: React.LegacyRef<
      HTMLInputElement & { open(): void; file(): Promise<string | null> }
    >;
  }
) => ReturnType<typeof _ImageInput>;

function getDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      (e) => {
        resolve(e.target?.result as string);
      },
      false
    );
    reader.addEventListener(
      "error",
      (e) => {
        reject(e.target?.error);
      },
      false
    );

    reader.readAsDataURL(file);
  });
}

const AddMeeting = ({
  selectedDay,
}: {
  selectedDay: string | number | Date | dayjs.Dayjs;
}) => {
  const [open, setOpen] = useState(false);
  const addMeeting = useEventStore((store) => store.add);

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
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          role="dialog"
          className="relative z-10"
          onClose={close}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Backdrop className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <section className="flex items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 grow"
                    >
                      Add Meeting
                    </Dialog.Title>
                    <button
                      onClick={close}
                      className="p-1.5 rounded-full select-none hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </section>
                  <form
                    className="mt-2"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(
                        e.target as HTMLFormElement
                      );
                      const params = Object.fromEntries(formData.entries());

                      const [startHr, startMin] = (
                        params.startTime as string
                      ).split(":");
                      const [endHr, endMin] = (params.endTime as string).split(
                        ":"
                      );

                      addMeeting({
                        id: useEventStore.getState().events.length,
                        name: params.name as any,
                        startDatetime: dayjs(selectedDay)
                          .hour(+startHr)
                          .minute(+startMin)
                          .format("YYYY-MM-DDTHH:mm"),
                        endDatetime: dayjs(selectedDay)
                          .hour(+endHr)
                          .minute(+endMin)
                          .format("YYYY-MM-DDTHH:mm"),
                        imageUrl: await getDataUrl(params.avatar as any),
                      });

                      close();
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
                      {/* <div className="mt-1 flex items-center">
                        <input
                          required
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => console.log(e.target.files?.[0])}
                        />
                        <AvatarRoot className="inline-block h-12 w-12 overflow-hidden rounded-full select-none">
                          <AvatarImage
                            src={
                              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                          />
                          <AvatarFallback className="w-full h-full grid place-items-center text-black text-lg">
                            JD
                          </AvatarFallback>
                        </AvatarRoot>
                        <button
                          type="button"
                          onClick={() => {
                            document
                              .querySelector<HTMLInputElement>("#avatar")
                              ?.click();
                          }}
                          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                      </div> */}
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
                        // onClick={close}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};

type ImageInpurProps<Multiple extends boolean> =
  React.ComponentPropsWithRef<"input"> & {
    multiple?: Multiple;
    onChange?(data: (Multiple extends true ? FileList : File) | null): void;
  };

function _ImageInput<Multiple extends boolean = false>(
  { className, onChange, ...props }: ImageInpurProps<Multiple>,
  ref: React.ForwardedRef<
    HTMLInputElement & { open(): void; file(): Promise<string | null> }
  >
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  useImperativeHandle(
    ref,
    () =>
      Object.assign({}, inputRef.current, {
        open: () => inputRef.current?.click(),
        file: async () =>
          inputRef.current?.files?.item(0)
            ? await getDataUrl(inputRef.current?.files?.item(0)!)
            : null,
      }),
    []
  );

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={async (e) => {
          if (props.multiple) {
            onChange?.(e.target.files as any);
          } else {
            onChange?.(e.target.files?.item(0) as any);
          }
          if (e.target.files?.item(0)) {
            setImage(await getDataUrl(e.target.files?.item(0)!));
          }
        }}
        className={clsx("hidden", className)}
        {...props}
      />
      <AvatarRoot className="inline-block h-12 w-12 overflow-hidden rounded-full select-none">
        {image && <AvatarImage src={image} />}
        <AvatarFallback className="w-full h-full grid place-items-center text-black text-lg">
          A
        </AvatarFallback>
      </AvatarRoot>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Change
      </button>
    </div>
  );
}

export default AddMeeting;
