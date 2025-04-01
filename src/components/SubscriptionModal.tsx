import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { storage } from "@/lib/storage";
import { useForm } from "react-hook-form";

export default function SubscriptionModal({
  successCallback,
}: {
  successCallback: () => void;
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: storage.get("formData", {
      email: "",
    }),
  });

  const handleClose = () => {
    storage.set("subscriptionDismissed", true);
    setOpen(false);
  };
  const onSubmit = async (data: { email: string }) => {
    await fetch("/api/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });
    storage.set("subscriptionDismissed", true);
    storage.set("subscriptionEmail", data.email);
    successCallback();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(() => !storage.get("subscriptionDismissed", false));
  }, [setOpen]);

  if (!open) {
    return null;
  }

  return (
    <Dialog
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
      title="Povremeno u ponudi imamo i domaću piletinu, junetinu i teletinu kao i mliječne proizvode. Ako želite da vas obavijestimo o dostupnosti ostalih naših proizvoda, ostavite nam vašu email adresu."
    >
      <input
        type="text"
        placeholder="Email"
        {...register("email", { required: true })}
        className="w-full px-4 py-3 mt-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      />
      {errors.email && (
        <span className="text-red-500 text-[10px]">Obavezno polje</span>
      )}
    </Dialog>
  );
}
