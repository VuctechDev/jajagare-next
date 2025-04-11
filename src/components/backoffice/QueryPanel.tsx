import { getLastDayInMonth } from "@/lib/date";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";

interface Props {
  onQueryUpdate: (query: string) => void;
  month?: boolean;
}

const QueryPanel: React.FC<Props> = ({ onQueryUpdate, month }) => {
  const [daysInMonth, setDaysInMonth] = useState(31);
  const { register, watch, setValue } = useForm({
    defaultValues: {
      year: +new Date().getFullYear(),
      month: +new Date().getMonth(),
      day: "",
    },
  });

  const selectedYear = watch("year");
  const selectedMonth = watch("month");
  const selectedDay = watch("day");

  useEffect(() => {
    setDaysInMonth(() => getLastDayInMonth(selectedMonth, selectedYear));
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    setValue("day", "");
  }, [selectedMonth, setValue]);

  useEffect(() => {
    const formattedMonth = selectedMonth
      ? String(Number(selectedMonth) + 1).padStart(2, "0")
      : "00";
    const formattedDay = String(selectedDay).padStart(2, "0");
    onQueryUpdate(`?date=${selectedYear}-${formattedMonth}-${formattedDay}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleLast30Days = (days: string) => {
    onQueryUpdate(`?lastDays=${days}`);
  };

  return (
    <div className="flex flex-col md:flex-row py-3 px-0 md:px-3 gap-4 mt-2">
      <div className="flex items-center px-2 gap-4">
        {!month && (
          <select
            disabled={!selectedMonth}
            {...register("day", { required: true })}
            className="w-[110px] md:w-[150px] h-[40px] px-4 py-0 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
          >
            <option value={""}>Citav Mjesec</option>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        )}
        <select
          {...register("month", { required: true })}
          className="w-[110px] md:w-[150px] h-[40px] px-4 py-0 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
        >
          <option value={""}>Citava Godina</option>
          {[
            "Januar",
            "Februar",
            "Mart",
            "April",
            "Maj",
            "Jun",
            "Jul",
            "Avgust",
            "Septembar",
            "Oktobar",
            "Novembar",
            "Decembar",
          ].map((month, index) => (
            <option value={index} key={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          {...register("year", { required: true })}
          className="w-[110px] md:w-[150px] h-[40px] px-4 py-0 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
        >
          {Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex items-center px-2 md:ml-4 gap-2 md:gap-4">
        <Button
          label="30 dana"
          small
          variant="secondary"
          onClick={() => handleLast30Days("30")}
        />
        <Button
          label="60 dana"
          small
          variant="secondary"
          onClick={() => handleLast30Days("60")}
        />
        <Button
          label="90 dana"
          small
          variant="secondary"
          onClick={() => handleLast30Days("90")}
        />
      </div>
    </div>
  );
};

export default QueryPanel;
