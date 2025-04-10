import { useGetStats } from "@/lib/api/stats/queries";
import { eggPrice } from "@/lib/data";

export default function Backoffice() {
  const { data } = useGetStats();
  return (
    <div className="w-full p-4">
      <h3>JAJA</h3>
      <p>Trenutno stanje: {data.balance}</p>
      <p>Prodato: {data.sold}</p>
      <p>Rezervisano: {data.reserved}</p>
      <p>Ukupno: {data.sold + data.reserved}</p>
      <p>Dostupno: {data.balance - data.reserved}</p>
      <br />
      <h3>FINANSIJE</h3>
      <p>Prodato: {data.sold * eggPrice}KM</p>
      <p>Rezervisano: {data.reserved * eggPrice}KM</p>
      <p>Ukupno: {(data.sold + data.reserved) * eggPrice}KM</p>
    </div>
  );
}
