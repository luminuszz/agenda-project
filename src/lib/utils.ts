import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 @param time
 @return Date
 Receive hour format (00:00) and transform to Date format
 */
export const transformHourStringToDate = (time: string): Date => {
  const [hours, minutes] = time.split(":");

  const date = new Date();

  date.setHours(Number(hours), Number(minutes));

  return date;
};
