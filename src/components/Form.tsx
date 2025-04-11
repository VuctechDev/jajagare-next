import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "./Snackbar";
import { getDeliveryDays, getDeliveryDisplayDate } from "@/lib/date";
import { storage } from "@/lib/storage";
import Button from "./Button";
import InputField from "./form/InputField";
import { eggPrice, orderQuantityLenght } from "@/lib/data";

type FormValues = {
  quantity: number;
  price: number;
  address: string;
  email: string;
  phone: string;
  name: string;
  comment: string;
  delivery: number;
};

const fields: {
  label: string;
  name: keyof FormValues;
  type: string;
}[] = [
  {
    label: "Ime",
    name: "name",
    type: "text",
  },
  {
    label: "Broj Telefona",
    name: "phone",
    type: "text",
  },
  {
    label: "Adresa",
    name: "address",
    type: "text",
  },
  {
    label: "Dodatni komentar",
    name: "comment",
    type: "textarea",
  },
];

const DisplayError = ({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) => {
  if (show) {
    return <span className="text-red-500 text-[10px]">{message}</span>;
  }
  return null;
};

export default function OrderForm() {
  const deliveryDays = useMemo(
    () => getDeliveryDays(4, [2, 6], "2025-04-21"),
    []
  );
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: storage.get("formData", {
      quantity: 30,
    }),
  });

  const onSubmit = async (data: FormValues) => {
    const subscriptionEmail = storage.get("subscriptionEmail", "");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: 1000,
          quantity: +data.quantity,
          price: eggPrice,
          address: data.address,
          email: subscriptionEmail ?? "",
          phone: data.phone,
          name: data.name,
          comment: data.comment ?? "",
          delivery: deliveryDays[data.delivery].toISOString(),
        }),
      });
      const body = (await response.json()) as { userId: string };
      storage.set("UserId", body.userId);
      storage.set("formData", {
        product: 1000,
        quantity: +data.quantity,
        price: eggPrice,
        address: data.address,
        phone: data.phone,
        name: data.name,
        comment: data.comment ?? "",
        delivery: "",
      });
      resetField("delivery");
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const displayPrice = eggPrice * 10;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-[400px] mt-3 w-full mx-auto p-4  text-black gap-y-3"
    >
      <select
        {...register("quantity", { required: true, min: 1 })}
        defaultValue={20}
        className="px-4 py-3  bg-white rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
      >
        {Array.from({ length: orderQuantityLenght }, (_, i) =>
          i !== 0 ? (
            <option value={i * 10 + 10} key={i}>
              {i * 10 + 10} jaja / {i * displayPrice + displayPrice}KM
            </option>
          ) : null
        )}
      </select>
      <DisplayError
        message="Kolicina je obavezno polje"
        show={!!errors.quantity}
      />
      <select
        {...register("delivery", { required: true })}
        className="px-4 py-3  bg-white rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
      >
        <option value="">Odaberite datum za dostavu</option>
        {deliveryDays.map((date, i) => (
          <option key={date.toISOString()} value={i}>
            {getDeliveryDisplayDate(date)}
          </option>
        ))}
      </select>
      <DisplayError
        message="Datum Dostave je obavezno polje!"
        show={!!errors.delivery}
      />
      {fields.map((item) => (
        <InputField
          key={item.name}
          name={item.name}
          label={item.label}
          type={item.type}
          register={register}
          error={!!errors[item.name]}
        />
      ))}

      <Button
        type="submit"
        fullWidth
        label="Poruči"
        isSubmitting={isSubmitting}
      />
      <Snackbar
        open={open}
        message="Vaša narudžba je uspješno poslata!"
        onClose={() => setOpen(false)}
      />
    </form>
  );
}
