import { useEffect, useState } from "react";
import Dialog from "./Dialog";
import { storage } from "@/lib/storage";
import { useForm } from "react-hook-form";
import InputField from "./form/InputField";

const handleDisplayLogic = () => {
  if (storage.get("subscriptionEmail", null)) {
    return false;
  }
  const count = storage.get("SubscriptionModalDisplayCount", 0);
  if (!count || +count === 5) {
    storage.set("SubscriptionModalDisplayCount", 1);
    return true;
  }
  storage.set("SubscriptionModalDisplayCount", +count + 1);
  return false;
};

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
    setOpen(false);
  };

  const onSubmit = async (data: { email: string }) => {
    await fetch("/api/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        userId: storage.get("UserId", ""),
      }),
    });
    storage.set("subscriptionEmail", data.email);
    successCallback();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(() => handleDisplayLogic());
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Dialog
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      cancelLabel="Ne hvala"
      confirmLabel="Sačuvaj"
      isSubmitting={isSubmitting}
      title="Povremeno u ponudi imamo i domaću piletinu, junetinu i teletinu kao i mliječne proizvode. Ako želite da vas obavijestimo o dostupnosti ostalih naših proizvoda, ostavite nam vašu email adresu."
    >
      <InputField
        name="email"
        label="Email"
        type="text"
        register={register}
        error={!!errors.email}
      />
    </Dialog>
  );
}
