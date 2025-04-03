import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "./Snackbar";
import { getDeliveryDays, getDeliveryDisplayDate } from "@/lib/date";
import { storage } from "@/lib/storage";
import Button from "./Button";

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
  const deliveryDays = useMemo(() => getDeliveryDays(4), []);
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
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: 1000,
          quantity: +data.quantity,
          price: 0.5,
          address: data.address,
          email: subscriptionEmail ?? "",
          phone: data.phone,
          name: data.name,
          comment: data.comment ?? "",
          delivery: deliveryDays[data.delivery].toISOString(),
        }),
      });
      storage.set("formData", {
        product: 1000,
        quantity: +data.quantity,
        price: 0.5,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-[400px] mt-3 w-full mx-auto p-4  text-black gap-y-3"
    >
      {fields.map((item) => (
        <React.Fragment key={item.name}>
          <input
            type={item.type}
            placeholder={item.label}
            {...register(item.name, { required: true })}
            className="px-4 py-3 bg-white rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
          />
          <DisplayError
            message={`${item.label} je obavezno polje!`}
            show={!!errors[item.name]}
          />
        </React.Fragment>
      ))}

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

      <select
        {...register("quantity", { required: true, min: 1 })}
        defaultValue={20}
        className="px-4 py-3  bg-white rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
      >
        {Array.from({ length: 15 }, (_, i) =>
          i !== 0 ? (
            <option value={i * 10 + 10} key={i}>
              {i * 10 + 10} jaja / {i * 5 + 5}KM
            </option>
          ) : null
        )}
      </select>
      <DisplayError
        message="Kolicina je obavezno polje"
        show={!!errors.quantity}
      />

      <textarea
        placeholder="Dodatni komentar"
        {...register("comment")}
        className="px-4 py-3  bg-white mb-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
      />
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
