import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useAtom, useAtomValue } from "jotai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isAfter } from "date-fns";
import { taskStore } from "@/store/task.ts";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast.ts";
import { Label } from "@/components/ui/label.tsx";
import { transformHourStringToDate } from "@/lib/utils.ts";
import { selectedDateAtom } from "@/store/schedule.ts";

const formSchema = z
  .object({
    description: z.string().min(1),
    selectedDate: z.date(),
    startTimeRange: z.string(),
    endTimeRange: z.string(),
  })
  .superRefine((data, ctx) => {
    const initialDateIsAfterToEndRangeDate = isAfter(
      transformHourStringToDate(data.startTimeRange),
      transformHourStringToDate(data.endTimeRange),
    );

    if (initialDateIsAfterToEndRangeDate) {
      ctx.addIssue({
        code: "invalid_date",
        path: ["endTimeRange"],
        message: "Informe uma data maior que a inicial",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

export const CreateTaskModal = () => {
  const { toast } = useToast();

  const [, addTask] = useAtom(taskStore);
  const selectedDate = useAtomValue(selectedDateAtom);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      description: "",
      selectedDate,
      startTimeRange: format(new Date(), "HH:mm"),
      endTimeRange: "",
    },
  });

  const handleCreateTask = (payload: typeof formSchema._output) => {
    addTask({
      date: payload.selectedDate,
      description: payload.description,
      timeRange: {
        endDate: transformHourStringToDate(payload.endTimeRange),
        startDate: transformHourStringToDate(payload.startTimeRange),
      },
      id: Date.now().toLocaleString(),
    });

    closeButtonRef.current?.click();

    toast({
      description: "Tarefa adicionada !",
      variant: "success",
    });
  };

  return (
    <DialogContent className="sm:max-w-[6000]">
      <DialogHeader>
        <DialogTitle>Criar Lembrete</DialogTitle>
        <DialogDescription>Adicionar lembrete na Agenda</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateTask)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="description"
          />
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data selecionada</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={format(field.value, "yyyy-MM-dd")}
                    type="date"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="selectedDate"
          />

          <Label>Duração</Label>

          <div className=" grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="startTimeRange"
            />

            <FormField
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="endTimeRange"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Criar</Button>
            <DialogClose ref={closeButtonRef}></DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
