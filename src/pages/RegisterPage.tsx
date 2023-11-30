import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { Link } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email("Informe um e-mail valido"),
    password: z.string(),
    repeatPassword: z.string(),
    name: z.string().min(1),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatPassword"],
        message: "As senhas não coincidem",
      });
    }
  });

type RegisterPayload = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    values: {
      email: "",
      password: "",
      name: "",
      repeatPassword: "",
    },
  });

  const handleRegister = (values: RegisterPayload) => console.log(values);

  return (
    <main className="flex flex-1 justify-center items-center w-screen h-screen bg-[#E9EFFF]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Cadastrar</CardTitle>
          <CardDescription>Faça seu cadastro</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)}>
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="email"
              />

              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="name"
              />

              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="password"
              />

              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repetir Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="repeatPassword"
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button disabled={!form.formState.isValid} type="submit">
            Cadastrar
          </Button>

          <Button asChild variant="link" type="button">
            <Link to="/login">Fazer login</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
