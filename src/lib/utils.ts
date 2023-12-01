import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { setMinutes, setHours } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformHourStringToDate = (time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();

  return setMinutes(setHours(date, hours), minutes);
};
