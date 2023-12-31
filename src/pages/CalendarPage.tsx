import { Button } from "@/components/ui/button.tsx";
import { Schedule } from "@/components/Schedule.tsx";
import { UserBadge } from "@/components/UserBadge.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Plus } from "lucide-react";
import { format } from "date-fns";

import { ptBR } from "date-fns/locale";
import { useAtom, useAtomValue } from "jotai";
import { currentWeekAtom, selectedDateAtom } from "@/store/schedule.ts";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { CreateTaskModal } from "@/components/CreateTaskModal.tsx";
import { useTasks } from "@/store/task.ts";
import { useEffect } from "react";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const weekList = useAtomValue(currentWeekAtom);

  const { refetch } = useTasks();

  const lastDateFromWeek = weekList?.[weekList.length - 1];
  const firstDateFromWeek = weekList?.[0];

  const month = format(firstDateFromWeek?.date, "MMMM", {
    locale: ptBR,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Dialog>
      <CreateTaskModal />
      <main className="flex  w-screen h-screen justify-center items-center container-xl px-2">
        <div className="flex justify-center items-start flex-1">
          <div className="max-w-[1366px] w-full flex-1">
            <h3 className="font-bold text-gray-900 text-3xl leading-9">
              Agenda
            </h3>

            <header className="flex  flex-1 justify-between">
              <h4 className="font-bold text-gray-900 text-xl leading-9 mt-10 capitalize">
                {`${month} , ${firstDateFromWeek?.day} - ${lastDateFromWeek?.day}`}
              </h4>

              <div className="flex gap-2 items-center justify-center">
                <Button variant="outline" size="lg" className="capitalize">
                  {month}
                </Button>

                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="mr-2" /> Novo
                  </Button>
                </DialogTrigger>
              </div>
            </header>

            <Schedule />
          </div>

          <aside className="flex max-w-[420px] w-full flex-col gap-2 mt-10 ml-5">
            <UserBadge />

            <Calendar
              mode="single"
              fromDate={firstDateFromWeek.date}
              toDate={lastDateFromWeek.date}
              today={selectedDate}
              onDayClick={(date) => setSelectedDate(date)}
              locale={ptBR}
              className="flex flex-1 justify-center  mt-20 rounded-2xl shadow-sm"
            />
          </aside>
        </div>
      </main>
    </Dialog>
  );
}
