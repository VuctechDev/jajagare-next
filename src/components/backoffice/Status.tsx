import { Check, Clock } from "lucide-react";

export default function OrderStatus({ status }: { status: string }) {
  if (status === "open") {
    return (
      <div className="flex max-w-[130px] ml-2 items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
        <Clock size={16} strokeWidth={3} />
        Poručeno
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="flex max-w-[130px] ml-2 items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
        <Check size={16} strokeWidth={3} />
        Dostavljeno
      </div>
    );
  }

  return null;
}
