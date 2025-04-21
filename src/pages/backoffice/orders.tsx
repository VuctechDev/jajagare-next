import QueryPanel from "@/components/backoffice/QueryPanel";
import Dialog from "@/components/Dialog";
import OrderFormBO from "@/components/OrderFormBO";
import {
  useDeleteOrder,
  useGetOrders,
  useUpdateOrderStatus,
} from "@/lib/api/orders/queries";
import { eggPrice } from "@/lib/data";
import { useState } from "react";
import DesktopRow from "../../components/backoffice/orders/DesktopRow";
import MobileRow from "../../components/backoffice/orders/MobileRow";
import useApiQuery from "@/hooks/useApiQuery";
import TableQueryPanel from "@/components/backoffice/TableQueryPanel";

export default function OrdersPage() {
  const [action, setAction] = useState<{
    action: "delete" | "update";
    id: string;
  } | null>(null);
  const { queryString, handleQuery } = useApiQuery();
  const { data, isLoading } = useGetOrders(queryString);
  const { mutateAsync: updateItem, isPending } = useUpdateOrderStatus();
  const { mutateAsync: deleteItem, isPending: isDeletePending } =
    useDeleteOrder();

  const handleModalClose = () => setAction(null);

  const handleConfirm = async () => {
    try {
      if (action?.action === "delete") {
        await deleteItem(action.id);
      } else {
        await updateItem(action?.id ?? "");
      }
      handleModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <QueryPanel handleQuery={handleQuery} includeStatus />
      <h2 className="p-2">
        UKUPNO KOMADA: {data.total}, VRIJEDNOST: {data.total * eggPrice}KM
      </h2>
      <div className="flex flex-col md:flex-row w-full p-2 space-y-1">
        <div className="flex justify-start w-full md:w-1/5 p-3 my-4">
          <OrderFormBO />
        </div>

        <div className="w-full overflow-x-auto md:w-4/5">
          {isLoading ? (
            <h2>Ucitavanje...</h2>
          ) : (
            <div className="w-full p-3 space-y-1">
              <TableQueryPanel
                sortKeys={["createdAt", "quantity", "delivery"]}
                handleQuery={handleQuery}
              />
              <div className="hidden md:flex font-semibold text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
                <div className="w-1/7">Ime</div>
                <div className="w-1/6">Adresa</div>
                <div className="w-1/7">Telefon</div>
                <div className="w-1/9">Kolicina</div>
                <div className="w-1/7">Dostava/Status</div>
                <div className="w-1/6"></div>
              </div>
              {!data.data?.length && (
                <div className="w-full flex justify-center p-4">
                  Ne postoje narudzbe za odabrani filter!
                </div>
              )}

              <DesktopRow data={data.data} setAction={setAction} />
              <MobileRow data={data.data} setAction={setAction} />
            </div>
          )}
        </div>
      </div>
      {action && (
        <Dialog
          onClose={handleModalClose}
          onSubmit={handleConfirm}
          isSubmitting={isDeletePending || isPending}
          title={action?.action === "delete" ? "Obriši?" : "Dostavljeno?"}
          cancelLabel="Otkaži"
          confirmLabel="OK"
        />
      )}
    </div>
  );
}
