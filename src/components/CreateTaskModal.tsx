import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useAtomValue } from "jotai";
import { selectedDateAtom } from "@/store/schedule.ts";
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
import { format } from "date-fns";

const formSchema = z.object({
  description: z.string().min(1),
  selectedDate: z.date(),
  startTimeRange: z.number().min(1).max(60),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateTaskModal = () => {
  const selectedDate = useAtomValue(selectedDateAtom);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      description: "",
      selectedDate,
      startTimeRange: 0,
    },
  });

  const handleCreateTask = (payload: FormValues) => {
    console.log(payload);
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

          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="startTimeRange"
          />

          <DialogFooter>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
