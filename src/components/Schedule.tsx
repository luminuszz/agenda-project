import { ScheduleHeader } from "@/components/ScheduleHeader";
import { ScheduleHours } from "@/components/ScheduleHours.tsx";
import { ScheduleTimeLine } from "@/components/ScheduleTimeLine.tsx";

export const Schedule = () => {
  return (
    <section className="mt-[100px]">
      <ScheduleHeader />

      <div className="mt-[53px] flex flex-1 items-start justify-start">
        <ScheduleHours />
        <ScheduleTimeLine />
      </div>
    </section>
  );
};
