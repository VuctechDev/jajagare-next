import { useGetStats } from "@/lib/api/stats/queries";

export default function Backoffice() {
  const { data } = useGetStats();
  return (
    <div className="w-full p-4">
      <p>Trenutno stanje: {data.balance}</p>
      <p>Prodato: {data.sold}</p>
      <p>Rezervisano: {data.reserved}</p>
      <p>Dostupno: {data.balance - data.reserved}</p>
    </div>
  );
}
