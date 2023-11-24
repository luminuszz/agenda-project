import { useAtom, useAtomValue } from "jotai";
import { currentWeekAtom, selectedDateAtom } from "@/store/schedule.ts";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isSelected: boolean;
}>;

const CalendarText = ({ isSelected, children }: Props) => {
  return (
    <p
      data-active={isSelected}
      className="group-hover:text-[#5272E9] duration-75 text-gray-500 data-[active=true]:text-[#5272E9]"
    >
      {children}
    </p>
  );
};

export const ScheduleHeader = () => {
  const week = useAtomValue(currentWeekAtom);

  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  return (
    <header className="flex items-center flex-1">
      <span>SEMANA</span>

      <section className="ml-[70px] flex flex-1 gap-2 justify-between cursor-pointer ">
        {week.map(({ date, day, dayName }) => (
          <div
            className="flex flex-col justify-center items-center group"
            key={day}
            onClick={() => setSelectedDate(date)}
          >
            <CalendarText isSelected={Number(day) === selectedDate.getDate()}>
              {day}
            </CalendarText>
            <CalendarText isSelected={Number(day) === selectedDate.getDate()}>
              {dayName}
            </CalendarText>
          </div>
        ))}
      </section>
    </header>
  );
};
