import * as React from "react";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function Slot({ children, ...props }: SlotProps) {
  if (!React.isValidElement<React.HTMLAttributes<HTMLElement>>(children)) {
    return null;
  }

  return React.cloneElement(children, {
    ...props,
    className: [props.className, children.props.className].filter(Boolean).join(" "),
  });
}
