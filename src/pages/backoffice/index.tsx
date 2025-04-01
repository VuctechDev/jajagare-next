import { OrderType } from "@/@types";
import Navigation from "@/components/backoffice/Navigation";
import QueryPanel from "@/components/backoffice/QueryPanel";
import Viber from "@/icons/Viber";
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

export default function Backoffice() {
  const [data, setData] = useState<{ data: OrderType[]; total: number }>({
    data: [],
    total: 0,
  });
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      const response = await fetch(`/api/orders?date=${query}`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    if (query) {
      get();
    }
  }, [query]);

  const onQueryUpdate = (query: string) => {
    setLoading(true);
    setQuery(query);
  };

  return (
    <div className="">
      <Navigation />
      <QueryPanel onQueryUpdate={onQueryUpdate} />
      {loading ? (
        <h2>Ucitavanje...</h2>
      ) : (
        <div>
          <h2 className="p-2">
            UKUPNO KOMADA: {data.total}, PARA: {data.total * 0.5}KM
          </h2>
          {data.data.map((item: OrderType) => (
            <div
              key={item.id}
              className="flex h-[50px] items-center p-2 border-b border-dark-500"
            >
              {item.name}, {item.address}, {item.phone} : {item.quantity}{" "}
              komada, {item.status}
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
              {item.status === "open" && (
                <>
                  <button
                    className="ml-14 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => updateItem(item.id ?? "")}
                  >
                    Dostavljeno
                  </button>
                  <button
                    className="ml-8 text-[14px] px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => deleteItem(item.id ?? "")}
                  >
                    Obrisi
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
