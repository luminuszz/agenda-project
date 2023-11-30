import { format, intervalToDuration, hoursToMinutes } from "date-fns";

type Props = {
  description: string;
  range: {
    start: Date;
    end: Date;
  };
};

export const TaskCard = ({ range, description }: Props) => {
  const formatter = "HH:mm";

  const formattedRange = {
    start: format(range.start, formatter),
    end: format(range.end, formatter),
  };

  const interval = intervalToDuration(range);

  const withByRangePorcent = (
    hoursToMinutes(interval.hours || 0) +
    ((interval?.minutes || 0) * 100) / 60
  ).toFixed(0);

  return (
    <div
      style={{
        maxHeight: `${withByRangePorcent}%`,
      }}
      className={`border-l-[7px] border-s-[#5272E9] p-3 h-full rounded-sm bg-[#E9EFFF] flex flex-col flex-1 justify-between  max-w-xl cursor-pointer`}
    >
      <p className="text-[#5272E9] text-xs ">{description}</p>

      <span className="text-[10px] text-[#5272E9]">{`${formattedRange.start} - ${formattedRange.end}`}</span>
    </div>
  );
};
