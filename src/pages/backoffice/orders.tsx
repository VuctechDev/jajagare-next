import QueryPanel from "@/components/backoffice/QueryPanel";
import OrderStatus from "@/components/backoffice/Status";
import OrderFormBO from "@/components/OrderFormBO";
import Viber from "@/icons/Viber";
import { useGetOrders } from "@/lib/api/orders/queries";
import { eggPrice } from "@/lib/data";
import { getDeliveryDisplayDate } from "@/lib/date";
import { useState } from "react";

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
  const [query, setQuery] = useState("");
  const { data, isLoading } = useGetOrders(query);

  const onQueryUpdate = (query: string) => {
    setQuery(query);
  };

  return (
    <div className="">
      <QueryPanel onQueryUpdate={onQueryUpdate} />
      <h2 className="p-2">
        UKUPNO KOMADA: {data.total}, VRIJEDNOST: {data.total * eggPrice}KM
      </h2>
      {isLoading ? (
        <h2>Ucitavanje...</h2>
      ) : (
        <div className="flex flex-col md:flex-row w-full min-w-[1100px] p-2 space-y-1">
          <div className="flex justify-start w-[93vw] md:w-1/5 p-3">
            <OrderFormBO />
          </div>
          <div className="w-full md:w-4/5 p-3 space-y-1">
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
                  <OrderStatus status={item.status} />
                  {item.status === "open" &&
                    getDeliveryDisplayDate(item.delivery)}
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
                  <div className="flex-grow" />
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
        </div>
      )}
    </div>
  );
}
