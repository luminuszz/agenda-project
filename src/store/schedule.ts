import { atom } from "jotai";
import {
  addDays,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  format,
  setHours,
  setMinutes,
  isSameHour,
  isSameDay,
} from "date-fns";

import { ptBR } from "date-fns/locale";
import { tasksAtom } from "@/store/task.ts";

export const todayAtom = atom(new Date());

type WeekWithName = {
  day: string;
  dayName: string;
  date: Date;
};

export const currentWeekAtom = atom<WeekWithName[]>((get) => {
  const daysOfWeek = eachDayOfInterval({
    start: get(todayAtom),
    end: addDays(get(todayAtom), 6),
  });

  return daysOfWeek.map((date) => ({
    day: format(date, "dd", { locale: ptBR }),
    dayName: format(date, "EEEEEE", { locale: ptBR }).toLocaleUpperCase(),
    date,
  }));
});

export const hoursAtom = atom((get) => {
  const hoursList = eachHourOfInterval({
    start: setHours(setMinutes(get(todayAtom), 0), 0),
    end: endOfDay(get(todayAtom)),
  });

  return hoursList.map((date) => ({
    hour: date.getHours(),
    formattedHour: format(date, "HH:mm"),
    date,
  }));
});

export const hourLinesWithTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);

  return get(hoursAtom).map((hoursData) => {
    const currentTasksInThisInterval = tasks.filter(
      (task) =>
        isSameHour(task.timeRange.startDate, hoursData.date) &&
        isSameDay(task.date, get(selectedDateAtom)),
    );

    return {
      ...hoursData,
      tasks: currentTasksInThisInterval,
    };
  });
});

export const selectedDateAtom = atom(new Date());
