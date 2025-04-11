const getNextWeekdays = (
  targetDays: number[],
  countPerDay: number,
  start?: string
) => {
  const result: Date[] = [];
  const today = new Date(start ?? "");
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

export const getDeliveryDisplayDate = (
  date: Date | string,
  excludeDay?: boolean
) => {
  if (!date) {
    return "-";
  }
  if (typeof date === "string") {
    date = new Date(date);
  }
  if (excludeDay) {
    const formatted = date.toLocaleDateString("sr-Latn-RS", {
      month: "long",
      day: "numeric",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  const formatted = date.toLocaleDateString("sr-Latn-RS", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const getDeliveryDays = (
  count = 2,
  includeDays = [2, 6],
  start?: string
) => getNextWeekdays(includeDays, count, start);

export const getLastDayInMonth = (month: number, year: number): number => {
  const monthNumber = Number(month) || 0;
  return new Date(year, monthNumber + 1, 0).getDate();
};

export const getDateRange = (date: string) => {
  const [year, month, day] = date.split("-");

  if (day !== "00") {
    return {
      gte: new Date(`${date}T00:00:00.000Z`),
      lt: new Date(`${date}T23:59:59.999Z`),
    };
  } else if (month !== "00") {
    return {
      gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
      lt: new Date(
        `${year}-${month}-${getLastDayInMonth(+month, +year)}T23:59:59.999Z`
      ),
    };
  }
  return {
    gte: new Date(`${year}-01-01T00:00:00.000Z`),
    lt: new Date(`${year}-12-31T23:59:59.999Z`),
  };
};
