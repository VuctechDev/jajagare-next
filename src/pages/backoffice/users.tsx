import { UserBOType } from "@/@types";
import Navigation from "@/components/backoffice/Navigation";
import Viber from "@/icons/Viber";
import { getDeliveryDisplayDate } from "@/lib/date";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [data, setData] = useState<{ data: UserBOType[]; total: number }>({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      setLoading(false);
      setData(data);
    };
    setLoading(true);
    get();
  }, [, setLoading]);
  return (
    <div>
      <Navigation />
      {loading ? (
        <h2>Ucitavanje...</h2>
      ) : (
        <div className="w-full min-w-[1100px] p-4 space-y-1">
          <div className="flex font-semibold text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
            <div className="w-1/7">Ime</div>
            <div className="w-1/7">Telefon</div>
            <div className="w-1/7">Email</div>
            <div className="w-1/10">Broj narudžbi</div>
            <div className="w-1/9">Ukupno komada</div>
            <div className="w-1/7">Poslednja Narudzba</div>
            <div className="w-1/6"></div>
          </div>
          {data.data.map((item) => (
            <div
              key={item.id}
              className="flex items-center text-sm text-gray-800 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="w-1/7">{item.name}</div>
              <div className="w-1/7">{item.phone}</div>
              <div className="w-1/7">{item.email || "—"}</div>
              <div className="w-1/10 text-center">{item.orderCount}</div>
              <div className="w-1/9 text-center">{item.quantitySum}</div>
              <div className="w-1/6">
                {getDeliveryDisplayDate(new Date(item.lastOrder))}
              </div>
              <div className="w-1/7 h-[40px] flex items-center">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
