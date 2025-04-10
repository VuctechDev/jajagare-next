import { ClientOrderType } from "@/@types";
import QueryPanel from "@/components/backoffice/QueryPanel";
import OrderStatus from "@/components/backoffice/Status";
import Viber from "@/icons/Viber";
import { eggPrice } from "@/lib/data";
import { getDeliveryDisplayDate } from "@/lib/date";
import { useEffect, useState } from "react";

const updateItem = async (orderId: string) => {
  await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
  });
};

const deleteItem = async (orderId: string) => {
  await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });
};

export default function OrdersPage() {
  const [data, setData] = useState<{ data: ClientOrderType[]; total: number }>({
    data: [],
    total: 0,
  });
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      const response = await fetch(`/api/orders?date=${query}`);
      const data = await response.json();
      setLoading(false);
      setData(data);
    };
    if (query) {
      setLoading(true);
      get();
    }
  }, [query, setLoading]);

  const onQueryUpdate = (query: string) => {
    setQuery(query);
  };

  return (
    <div className="">
      <QueryPanel onQueryUpdate={onQueryUpdate} />
      <h2 className="p-2">
        UKUPNO KOMADA: {data.total}, VRIJEDNOST: {data.total * eggPrice}KM
      </h2>
      {loading ? (
        <h2>Ucitavanje...</h2>
      ) : (
        <div className="w-full min-w-[1200px] p-4 space-y-1">
          <div className="flex font-semibold text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
            <div className="w-1/7">Ime</div>
            <div className="w-1/6">Adresa</div>
            <div className="w-1/7">Telefon</div>
            <div className="w-1/9">Kolicina</div>
            <div className="w-1/7">Dostava/Status</div>
            <div className="w-1/6"></div>
          </div>
          {data.data.map((item) => (
            <div
              key={item.id}
              className="flex items-center text-sm text-gray-800 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="w-1/7">{item.user.name}</div>
              <div className="w-1/6">{item.address}</div>
              <div className="w-1/7">{item.user.phone || "—"}</div>
              <div className="w-1/9">{item.quantity ?? 0}</div>
              <div className="w-1/7">
                {getDeliveryDisplayDate(item.delivery)}
                <OrderStatus status={item.status} />
              </div>

              <div className="w-1/6 h-[40px] flex items-center">
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
                    className="ml-8 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => updateItem(item.id ?? "")}
                  >
                    Dostavljeno
                  </button>
                )}
                <button
                  className="ml-8 text-[14px] px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => deleteItem(item.id ?? "")}
                >
                  Obrisi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
