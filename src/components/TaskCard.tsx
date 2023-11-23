type Props = {
  position: {
    x: number;
    y: number;
  };
};

export const TaskCard = ({ position }: Props) => {
  return (
    <div
      style={{
        top: position.y,
        left: position.x,
      }}
      className={`border-l-[7px] border-s-[#5272E9] p-3 w-[200px] h-[85px] rounded-sm bg-[#E9EFFF] flex flex-col flex-1 justify-start absolute`}
    >
      <p className="text-[#5272E9] text-xs">Colocar a comida do cachorro</p>

      <span className="text-[10px] text-[#5272E9]">10:10 - 10:30</span>
    </div>
  );
};
