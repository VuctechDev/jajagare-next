import { ClientOrderType } from "@/@types";
import ViberRounded from "@/icons/ViberRounded";

interface Props {
  data: ClientOrderType[];
  setAction: React.Dispatch<
    React.SetStateAction<{
      action: "delete" | "update";
      id: string;
    } | null>
  >;
}
const MobileRow: React.FC<Props> = ({ data, setAction }) => {
  return (
    <div className="w-full flex md:hidden flex-col space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap items-center text-sm text-gray-800 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
        >
          <div className="w-4/5 text-base">{item.user.name}</div>
          <div className="w-1/5 text-base h-[40px] relative top-[0px] right-[-30px]">
            <a
              href={`viber://chat?number=${
                item.user.phone?.startsWith("+") ||
                item.user.phone?.startsWith("00")
                  ? item.user.phone
                  : "+387" + item.user.phone?.slice(1)
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ViberRounded />
            </a>
          </div>
          <div className="w-1/1 mt-3">{item.address}</div>
          <div className="w-1/2">{item.user.phone || "—"}</div>
          <div className="w-1/2">{item.quantity ?? 0} komada</div>

          <div className="w-full h-[40px] flex space-x-2 mt-3">
            <button
              className="w-full flex justify-center h-[36px] text-[14px] px-4 !pt-2 rounded-2xl bg-red-600 text-white font-semibold shadow-md"
              onClick={() => setAction({ action: "delete", id: item.id })}
            >
              Obrisi
            </button>
            {item.status === "open" && (
              <button
                className="w-full flex justify-center h-[36px] text-[14px] px-4 !pt-2 rounded-2xl bg-green-600 text-white font-semibold shadow-md"
                onClick={() => setAction({ action: "update", id: item.id })}
              >
                Dostavljeno
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileRow;
