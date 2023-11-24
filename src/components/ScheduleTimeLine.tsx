import { Separator } from "@radix-ui/react-select";
import { useAtomValue } from "jotai";
import { hoursAtom, todayAtom } from "@/store/schedule.ts";

import { getHours } from "date-fns";
import { useEffect, useRef } from "react";

type HourLineProps = {
  isActive: boolean;
  hour: string;
};

const HourLine = ({ isActive, hour }: HourLineProps) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current && isActive) {
      lineRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isActive]);

  return (
    <div
      ref={lineRef}
      className="flex flex-1 justify-start items-center gap-10 px-2 "
      key={hour}
    >
      <p
        data-active={isActive}
        className="text-gray-500 data-[active=true]:text-[#5272E9]"
      >
        {hour}
      </p>
      <Separator
        data-ative={isActive}
        className="w-full h-0.5 bg-[#DCDCDC] data-[active=true]:bg-[#5272E9]"
      />
    </div>
  );
};

export const ScheduleTimeLine = () => {
  const hoursList = useAtomValue(hoursAtom);

  const selectedDate = useAtomValue(todayAtom);

  return (
    <section className="flex-col flex flex-1 ml-[25px]  relative mt-2 gap-[32px]">
      {hoursList.map(({ hour, formattedHour }) => (
        <HourLine
          key={hour}
          hour={formattedHour}
          isActive={Number(hour) === getHours(selectedDate)}
        />
      ))}
    </section>
  );
};
