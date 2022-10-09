import {
  AvatarFallback,
  AvatarImage,
  Root as AvatarRoot,
} from "@radix-ui/react-avatar";
import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import getDataUrl from "../utils/get-data-url";

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
          /* eslint-disable */
          if (props.multiple) {
            onChange?.(e.target.files as any);
          } else {
            onChange?.(e.target.files?.item(0) as any);
          }
          /* eslint-enable */
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

const ImageInput = forwardRef(_ImageInput) as <T extends boolean>(
  props: ImageInpurProps<T> & {
    ref?: React.LegacyRef<
      HTMLInputElement & { open(): void; file(): Promise<string | null> }
    >;
  }
) => ReturnType<typeof _ImageInput>;

export default ImageInput;
