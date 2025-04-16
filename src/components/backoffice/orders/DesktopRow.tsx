import { ClientOrderType } from "@/@types";
import OrderStatus from "@/components/backoffice/Status";
import ViberRounded from "@/icons/ViberRounded";
import { getDeliveryDisplayDate } from "@/lib/date";

interface Props {
  data: ClientOrderType[];
  setAction: React.Dispatch<
    React.SetStateAction<{
      action: "delete" | "update";
      id: string;
    } | null>
  >;
}
const DesktopRow: React.FC<Props> = ({ data, setAction }) => {
  return (
    <div className="w-full hidden md:flex flex-col space-y-1">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-nowrap items-center text-sm text-gray-800 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          <div className="w-1/7">{item.user.name}</div>
          <div className="w-1/6">{item.address}</div>
          <div className="w-1/7">{item.user.phone || "—"}</div>
          <div className="w-1/9">{item.quantity ?? 0}</div>
          <div className="w-1/7">
            <OrderStatus status={item.status} />
            {item.status === "open" && getDeliveryDisplayDate(item.delivery)}
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
              <ViberRounded />
            </a>
            {item.status === "open" && (
              <button
                className="ml-8 text-[14px] px-4 py-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => setAction({ action: "update", id: item.id })}
              >
                Dostavljeno
              </button>
            )}
            <div className="flex-grow" />
            <button
              className="ml-8 text-[14px] px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => setAction({ action: "delete", id: item.id })}
            >
              Obrisi
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesktopRow;
