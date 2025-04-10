import UserForm from "@/components/UserForm";
import Viber from "@/icons/Viber";
import { useGetUsers } from "@/lib/api/users/queries";
import { getDeliveryDisplayDate } from "@/lib/date";

export default function UsersPage() {
  const { data, isLoading } = useGetUsers();

  return (
    <div>
      {isLoading ? (
        <h2>Ucitavanje...</h2>
      ) : (
        <div className="flex flex-col md:flex-row w-full min-w-[1100px] p-3 space-y-1">
          <div className="flex justify-start w-[93vw] md:w-1/5  p-4">
            <UserForm />
          </div>

          <div className="w-full md:w-4/5 p-4 space-y-1">
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
                  {getDeliveryDisplayDate(item.lastOrder)}
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
        </div>
      )}
    </div>
  );
}
