import { useAtomValue } from "jotai";
import { hoursAtom } from "@/store/schedule.ts";

export const ScheduleHours = () => {
  const hoursList = useAtomValue(hoursAtom);

  return (
    <aside className="flex flex-col gap-[35px]">
      {hoursList.map((hour) => (
        <p className="text-gray-500 ">{hour}</p>
      ))}
    </aside>
  );
};
