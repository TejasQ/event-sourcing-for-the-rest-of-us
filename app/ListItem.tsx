"use client";

import { PropsWithChildren } from "react";
import {
  toggleEventSourcedCheckbox,
  toggleTraditionalCheckbox,
} from "./actions";

type Props = {
  id: number;
  completed: boolean;
  model: "event-sourced" | "traditional";
};

export function ListItem({
  children,
  model,
  completed,
  id,
}: PropsWithChildren<Props>) {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={async () => {
          if (model === "event-sourced") {
            await toggleEventSourcedCheckbox({ completed, id });
          } else {
            await toggleTraditionalCheckbox({ completed, id });
          }
          window.location.reload();
        }}
      />
      {children}
    </li>
  );
}
