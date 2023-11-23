export const ScheduleHeader = () => {
  return (
    <header className="flex items-center flex-1">
      <span>SEMANA</span>

      <section className=" ml-[90px] flex flex-1 gap-2 justify-between">
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500">14</p>
          <p className="text-gray-500">SUN</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500">14</p>
          <p className="text-gray-500">DOM</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500">14</p>
          <p className="text-gray-500">SEG</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500">14</p>
          <p className="text-gray-500">TER</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500">14</p>
          <p className="text-gray-500">QUAR</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500">14</p>
          <p className="text-gray-500">QUIN</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500">14</p>
          <p className="text-gray-500">SEX</p>
        </div>
      </section>
    </header>
  );
};
