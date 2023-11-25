import { Separator } from "@radix-ui/react-select";
import { useAtomValue } from "jotai";
import { hourLinesWithTasksAtom, todayAtom } from "@/store/schedule.ts";

import { getHours } from "date-fns";
import { useEffect, useRef } from "react";
import { Task } from "@/store/task.ts";
import { TaskCard } from "@/components/TaskCard.tsx";

type HourLineProps = {
  isActive: boolean;
  hour: string;
  tasks?: Task[];
};

const HourLine = ({ isActive, hour, tasks = [] }: HourLineProps) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current && isActive) {
      lineRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isActive]);

  return (
    <div
      ref={lineRef}
      className="flex flex-col  justify-center gap-4 px-2"
      key={hour}
    >
      <div className="flex justify-center items-center gap-4">
        <p
          data-active={isActive}
          className="text-gray-500 data-[active=true]:text-[#5272E9]"
        >
          {hour}
        </p>
        <Separator
          data-active={isActive}
          className="w-full h-0.5 bg-[#DCDCDC] data-[active=true]:bg-[#5272E9]"
        />
      </div>

      <div className="flex flex-1 justify-start items-center gap-4 ml-[60px]">
        {tasks?.map((task) => (
          <TaskCard
            key={task.id}
            description={task.description}
            range={{
              start: task.timeRange.startDate,
              end: task.timeRange.endDate,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const ScheduleTimeLine = () => {
  const hoursList = useAtomValue(hourLinesWithTasksAtom);

  console.log({ hoursList });

  const selectedDate = useAtomValue(todayAtom);

  return (
    <section className="flex-col flex flex-1 ml-[25px]  relative mt-2 gap-[32px]">
      {hoursList.map(({ hour, formattedHour, tasks }) => (
        <HourLine
          tasks={tasks}
          key={hour}
          hour={formattedHour}
          isActive={Number(hour) === getHours(selectedDate)}
        />
      ))}
    </section>
  );
};
