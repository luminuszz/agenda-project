import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { useAtomValue } from "jotai";
import { initialUserNameAtom, userLoadableAtom } from "@/store/user.ts";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import { LogOutIcon } from "lucide-react";
import { useSession } from "@/store/auth.ts";

export const UserBadge = () => {
  const { logout } = useSession();

  const user = useAtomValue(userLoadableAtom);

  const isLoading = user.state === "loading";

  const initialUserName = useAtomValue(initialUserNameAtom);

  const userData = user.state === "hasData" ? user.data : null;

  return (
    <div className="w-full p-[15px] shadow-md  rounded-lg h-[80px] ml-5 shadow-[#E4E4E4] max-w-[400px]">
      <section className="flex justify-between items-center px-2">
        <aside className="flex gap-2">
          <Avatar className="w-[47px] h-[47px]">
            <AvatarFallback>
              {isLoading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                initialUserName
              )}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-start items-start">
            <p className="text-gray-900">{userData?.name}</p>
            <span className="text-xs text-gray-500">{userData?.id}</span>
          </div>
        </aside>

        <Button variant="outline" size="icon" onClick={logout}>
          <LogOutIcon />
        </Button>
      </section>
    </div>
  );
};
