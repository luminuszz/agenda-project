import { Button } from "@/components/ui/button.tsx";
import { Schedule } from "@/components/Schedule.tsx";
import { UserBadge } from "@/components/UserBadge.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";

import { ptBR } from "date-fns/locale";

export default function CalendarPage() {
  return (
    <main className="flex  w-screen h-screen justify-center items-center">
      <div className="flex justify-center items-start flex-1">
        <div className="max-w-[1366px] w-full flex-1">
          <h3 className="font-bold text-gray-900 text-3xl leading-9">Agenda</h3>

          <header className="flex  flex-1 justify-between">
            <h4 className="font-bold text-gray-900 text-xl leading-9 mt-10">
              Fevereiro, 15-20
            </h4>

            <div className="flex gap-2 items-center justify-center">
              <Button variant="outline" size="lg">
                Fevereiro
              </Button>

              <Button size="lg">Novo +</Button>
            </div>
          </header>

          <Schedule />
        </div>

        <aside className="flex max-w-[420px] w-full flex-col gap-2 mt-10 ml-5">
          <UserBadge />

          <Calendar
            locale={ptBR}
            className="flex flex-1 justify-center  mt-20 rounded-2xl shadow-sm"
          />
        </aside>
      </div>
    </main>
  );
}
