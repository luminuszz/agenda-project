import { atom } from "jotai";
import { getCurrentUserCall } from "@/lib/api.ts";
import { loadable } from "jotai/utils";

type User = {
  name: string;
  email: string;
  id: string;
};

const useByApiAtom = atom<Promise<User>>(() => getCurrentUserCall());

export const userLoadableAtom = loadable(useByApiAtom);

export const initialUserNameAtom = atom((get) => {
  const value = get(userLoadableAtom);

  return value.state === "hasData"
    ? value.data.name?.substr(0, 2).toLocaleUpperCase()
    : "";
});
