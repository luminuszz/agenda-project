import { ScheduleHeader } from "@/components/ScheduleHeader";
import { ScheduleTimeLine } from "@/components/ScheduleTimeLine.tsx";

export const Schedule = () => {
  return (
    <section className="mt-[100px] flex flex-col flex-1">
      <ScheduleHeader />

      <div className="mt-[53px] flex items-start justify-center overflow-y-auto max-h-[500px] h-full">
        <ScheduleTimeLine />
      </div>
    </section>
  );
};
