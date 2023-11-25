import { atom } from "jotai";

export type Task = {
  id: string;
  description: string;
  date: Date;
  timeRange: {
    startDate: Date;
    endDate: Date;
  };
};

export const tasksAtom = atom<Task[]>([]);

export const taskStore = atom(
  (get) => get(tasksAtom),
  (get, set, newTask: Task) => {
    set(tasksAtom, [...get(tasksAtom), newTask]);
  },
);
