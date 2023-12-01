import axios from "axios";
import { z } from "zod";
import { authTokenKey } from "@/store/auth.ts";

export const taskApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

taskApi.interceptors.request.use((request) => {
  const storageToken = localStorage.getItem(authTokenKey) || "";
  const token = storageToken ? JSON.parse(storageToken) : "";
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

const createTaskSchema = z.object({
  description: z.string().min(1),
  date: z.date().transform((date) => date.toISOString()),
  timeRange: z.object({
    startDate: z.date().transform((date) => date.toISOString()),
    endDate: z.date().transform((date) => date.toISOString()),
  }),
});

const taskSchema = z.array(
  z
    .object({
      _id: z.string(),
      description: z.string().min(1),
      date: z
        .string()
        .datetime()
        .transform((date) => new Date(date)),
      timeRange: z.object({
        startDate: z
          .string()
          .datetime()
          .transform((date) => new Date(date)),
        endDate: z
          .string()
          .datetime()
          .transform((date) => new Date(date)),
      }),
    })
    .transform((values) => {
      return {
        ...values,
        id: values._id,
      };
    }),
);

type CreateTaskDto = z.infer<typeof createTaskSchema>;
type TaskDto = z.infer<typeof taskSchema>;

export const createTaskCall = async (payload: unknown) => {
  const data = createTaskSchema.parse(payload);

  await taskApi.post<CreateTaskDto>("/task/create-task", data);
};

export const getAllTasksCall = async (): Promise<TaskDto> => {
  const { data } = await taskApi.get<TaskDto[]>("/task");

  return await taskSchema.parseAsync(data);
};

export const createUserMutation = async (payload: unknown) => {
  await taskApi.post("/user/create-user", payload);
};

export const loginMutation = async (payload: unknown) => {
  const { data } = await taskApi.post<{ token: string }>(
    "/auth/login",
    payload,
  );

  return data.token;
};

const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  id: z.string(),
});

export type GetCurrentUserResponse = z.infer<typeof userSchema>;

export const getCurrentUserCall = async (): Promise<GetCurrentUserResponse> => {
  const { data } = await taskApi.get<GetCurrentUserResponse>("user/me");

  return data;
};
