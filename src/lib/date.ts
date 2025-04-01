const getNextWeekdays = (targetDays: number[], countPerDay: number) => {
  const result: Date[] = [];
  const today = new Date();
  const date = new Date(today);

  while (result.length < targetDays.length * countPerDay) {
    date.setDate(date.getDate() + 1);

    if (targetDays.includes(date.getDay())) {
      const utcDate = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          12,
          0,
          0,
          0
        )
      );
      result.push(utcDate);
    }
  }

  return result;
};

export const getDeliveryDisplayDate = (date: Date) => {
  const formatted = date.toLocaleDateString("sr-Latn-RS", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const getDeliveryDays = (count = 2) => getNextWeekdays([2, 6], count);

export const getLastDayInMonth = (month: number, year: number): number => {
  const monthNumber = Number(month) || 0;
  return new Date(year, monthNumber + 1, 0).getDate();
};

export const getDateRange = (date: string) => {
  if (date?.endsWith("00")) {
    const [year, month] = date.split("-");
    console.log(year, month);
    return {
      gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
      lt: new Date(
        `${year}-${month}-${getLastDayInMonth(+month, +year)}T23:59:59.999Z`
      ),
    };
  }
  return {
    gte: new Date(`${date}T00:00:00.000Z`),
    lt: new Date(`${date}T23:59:59.999Z`),
  };
};
