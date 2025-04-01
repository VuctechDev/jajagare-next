import { getLastDayInMonth } from "@/lib/date";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  onQueryUpdate: (query: string) => void;
}

const QueryPanel: React.FC<Props> = ({ onQueryUpdate }) => {
  const [daysInMonth, setDaysInMonth] = useState(31);
  const { register, watch } = useForm({
    defaultValues: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
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
    const formattedMonth = String(Number(selectedMonth) + 1).padStart(2, "0");
    const formattedDay = String(selectedDay).padStart(2, "0");
    onQueryUpdate(`${selectedYear}-${formattedMonth}-${formattedDay}`);
  }, [selectedYear, selectedMonth, selectedDay, onQueryUpdate]);

  return (
    <div className="flex p-3 gap-4">
      <select
        {...register("day", { required: true })}
        className="w-[150px] px-4 py-3 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      >
        <option value={""}>Citav Mjesec</option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <select
        {...register("month", { required: true })}
        className="w-[150px] px-4 py-3 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      >
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
        className="w-[150px] px-4 py-3 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
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
  );
};

export default QueryPanel;
