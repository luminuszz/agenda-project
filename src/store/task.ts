import { atom, useAtom } from "jotai";
import { getAllTasksCall } from "@/lib/api.ts";

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

export const isTasksLoadingAtom = atom(false);

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [istasksLoading, setIstasksLoading] = useAtom(isTasksLoadingAtom);

  const makeRequest = async () => {
    setIstasksLoading(true);
    try {
      const data = await getAllTasksCall();

      setTasks(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIstasksLoading(false);
    }
  };

  return {
    tasks,
    istasksLoading,
    refetch: makeRequest,
  };
};
