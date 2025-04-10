import OrderFormBO from "@/components/OrderFormBO";

export default function Backoffice() {
  return (
    <div className="w-full p-4 flex">
      <div className="w-full md:w-2/5">
        <OrderFormBO />
      </div>
    </div>
  );
}
