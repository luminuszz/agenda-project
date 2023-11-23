import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

export const UserBadge = () => {
  return (
    <div className="w-full p-[15px] shadow-md  rounded-lg h-[80px] ml-5 shadow-[#E4E4E4]">
      <section className="flex gap-2">
        <Avatar className="w-[47px] h-[47px]">
          <AvatarImage src="https://github.com/luminuszz.png" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-start items-start">
          <p className="text-gray-900">Davi Ribeiro</p>
          <span className="text-xs text-gray-500">Grupo 20</span>
        </div>
      </section>
    </div>
  );
};
