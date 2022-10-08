import clsx from "clsx";
import { forwardRef } from "react";

export type InputProps<C extends React.ElementType<any>> = {
  component?: C;
};

export function Input<C extends React.ElementType<any> = "div">({
  component,
  className,
  ...props
}: InputProps<C> & React.ComponentPropsWithoutRef<C>) {
  const As = component || "div";
  return (
    <As {...props} className={clsx("mt-3 first-of-type:mt-0", className)} />
  );
}

export function InputLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} />;
}

export const InputControl = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return <input className={clsx(className, "block")} {...props} ref={ref} />;
});

Input.displayName = "@ui/Form/Input";
InputLabel.displayName = "@ui/Form/InputLabel";
InputControl.displayName = "@ui/Form/InputControl";

Input.Label = InputLabel;
Input.Control = InputControl;
