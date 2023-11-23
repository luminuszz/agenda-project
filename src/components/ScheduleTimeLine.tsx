import { TaskCard } from "@/components/TaskCard.tsx";
import { Separator } from "@radix-ui/react-select";

export const ScheduleTimeLine = () => {
  return (
    <section className="flex-col flex flex-1 gap-[50px] ml-[25px]  relative">
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />

      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <TaskCard position={{ x: 200, y: 100 }} />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <TaskCard position={{ x: 400, y: 200 }} />

      <TaskCard position={{ x: 600, y: 300 }} />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
      <Separator className="w-full h-0.5 bg-[#DCDCDC]" />
    </section>
  );
};
