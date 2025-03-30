import { OrderType } from "@/@types";
import { formatDate } from "@/components/Form";
import { useEffect, useState } from "react";

const getNextWeekdays = (targetDays: number[], countPerDay: number) => {
  const result: Date[] = [];
  const today = new Date();
  const date = new Date(today);

  while (result.length < targetDays.length * countPerDay) {
    date.setDate(date.getDate() + 1);
    if (targetDays.includes(date.getDay())) {
      result.push(new Date(date));
    }
  }

  return result;
};

// await fetch(`/api/orders/${orderId}`, {
//   method: "PATCH"
// });

// await fetch(`/api/orders/${orderId}`, {
//   method: "DELETE"
// });

export default function Backoffice() {
  const [data, setData] = useState<OrderType[]>([]);
  const [delivery, setDelivery] = useState("");

  useEffect(() => {
    const get = async () => {
      const response = await fetch(`/api/orders?delivery=${delivery}`);
      const data = await response.json();
      setData(data.data);
    };
    if (delivery) {
      get();
    }
  }, [delivery]);

  const total = data.reduce((agg, value: OrderType) => agg + value.quantity, 0);

  return (
    <div className="">
      <div className="flex p-3">
        {getNextWeekdays([2, 6], 2).map((item, i) => (
          <button
            key={i}
            className="ml-3 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => setDelivery(item.toISOString().slice(0, 10))}
          >
            {formatDate(item)}
          </button>
        ))}
      </div>
      <div>
        {data.map((item: OrderType) => (
          <div key={item.id} className="p-2 border-b border-dark-500">
            {item.name}, {item.address}, {item.phone} : {item.quantity} komada
            <button
              className="ml-14 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
              // onClick={() => setDelivery(item.toISOString().slice(0, 10))}
            >
              Dostavljeno
            </button>
            <button
              className="ml-8 text-[14px] px-4 py-2 rounded-2xl bg-red-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
              // onClick={() => setDelivery(item.toISOString().slice(0, 10))}
            >
              Obrisi
            </button>
          </div>
        ))}

        <h2 className="p-2"> UKUPNO: {total}</h2>
      </div>
    </div>
  );
}
