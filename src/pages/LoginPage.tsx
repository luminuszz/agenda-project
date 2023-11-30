import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail valido"),
  password: z.string().min(1),
});

type LoginPayload = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    values: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: LoginPayload) => console.log(values);

  return (
    <main className="flex flex-1 justify-center items-center w-screen h-screen bg-[#E9EFFF]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Iniciar sessão</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="password"
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={form.handleSubmit(handleLogin)}
            disabled={!form.formState.isValid}
            type="submit"
          >
            Entrar
          </Button>

          <Button variant="link" type="button" asChild>
            <Link to="/register">Fazer cadastro</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
