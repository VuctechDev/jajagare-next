import { ClientOrderType } from "@/@types";
import Navigation from "@/components/backoffice/Navigation";
import OrderStatus from "@/components/backoffice/Status";
import Viber from "@/icons/Viber";
import { getDeliveryDays, getDeliveryDisplayDate } from "@/lib/date";
import { useEffect, useState } from "react";

const updateItem = async (orderId: string) => {
  await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
  });
};

export default function DeliveryPage() {
  const [data, setData] = useState<{ data: ClientOrderType[]; total: number }>({
    data: [],
    total: 0,
  });
  const [deliveryDays] = useState<Date[]>(() => getDeliveryDays());
  const [delivery, setDelivery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      const response = await fetch(`/api/orders/delivery?date=${delivery}`);
      const data = await response.json();
      setLoading(false);
      setData(data);
    };
    if (delivery) {
      setLoading(true);
      get();
    }
  }, [delivery, setLoading]);

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

      {loading ? (
        <h2>Ucitavanje...</h2>
      ) : (
        <div>
          <h2 className="p-2">
            UKUPNO KOMADA: {data.total}, PARA: {data.total * 0.5}KM
          </h2>
          {data.data.map((item: ClientOrderType) => (
            <div
              key={item.id}
              className="flex h-[50px] items-center p-2 border-b border-dark-500"
            >
              <div className="flex w-full justify-start items-center">
                {item.user.name}, {item.address}, {item.user.phone} :{" "}
                {item.quantity} komada <OrderStatus status={item.status} />
              </div>

              <div className="flex w-full justify-end items-center">
                <a
                  href={`viber://chat?number=${
                    item.user.phone?.startsWith("+")
                      ? item.user.phone
                      : "+387" + item.user.phone?.slice(1)
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Viber />
                </a>
                {item.status === "open" && (
                  <button
                    className="ml-14 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => updateItem(item.id ?? "")}
                  >
                    Dostavljeno
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
