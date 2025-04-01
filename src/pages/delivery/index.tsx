import { OrderType } from "@/@types";
import Navigation from "@/components/backoffice/Navigation";
import Viber from "@/icons/Viber";
import { getDeliveryDays, getDeliveryDisplayDate } from "@/lib/date";
import { useEffect, useState } from "react";

const updateItem = async (orderId: string) => {
  await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
  });
};

export default function DeliveryPage() {
  const [data, setData] = useState<OrderType[]>([]);
  const [deliveryDays] = useState<Date[]>(() => getDeliveryDays());
  const [delivery, setDelivery] = useState("");

  useEffect(() => {
    const get = async () => {
      const response = await fetch(`/api/orders/delivery?date=${delivery}`);
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
      <Navigation />
      <div className="flex p-3">
        {deliveryDays.map((item, i) => (
          <button
            key={i}
            className="ml-3 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => setDelivery(item.toISOString().slice(0, 10))}
          >
            {getDeliveryDisplayDate(item)}
          </button>
        ))}
      </div>
      <h2 className="p-2"> UKUPNO: {total}</h2>
      <div>
        {data.map((item: OrderType) => (
          <div
            key={item.id}
            className="flex items-center p-2 border-b border-dark-500"
          >
            {item.name}, {item.address}, {item.phone} : {item.quantity} komada
            <a
              href={`viber://chat?number=${
                item.phone?.startsWith("+")
                  ? item.phone
                  : "+387" + item.phone?.slice(1)
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Viber />
            </a>
            <button
              className="ml-14 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => updateItem(item.id ?? "")}
            >
              Dostavljeno
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
