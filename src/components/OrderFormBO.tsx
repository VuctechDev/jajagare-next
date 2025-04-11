import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "./Snackbar";
import { getDeliveryDays, getDeliveryDisplayDate } from "@/lib/date";
import Button from "./Button";
import InputField from "./form/InputField";
import { eggPrice } from "@/lib/data";
import AutocompleteInput from "./form/Autocomplete";
import { useCreateOrderBO } from "@/lib/api/orders/queries";

type FormValues = {
  quantity: number;
  price: number;
  userId: string;
  comment: string;
  delivery: number;
};

const fields: {
  label: string;
  name: keyof FormValues;
  type: string;
}[] = [
  {
    label: "Dodatni komentar",
    name: "comment",
    type: "textarea",
  },
];

export default function OrderFormBO() {
  const deliveryDays = useMemo(
    () => getDeliveryDays(4, [0, 1, 2, 3, 4, 5, 6]),
    []
  );
  const [open, setOpen] = useState(false);
  const { mutateAsync: createOrder } = useCreateOrderBO();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      quantity: 50,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createOrder({
        ...data,
        price: eggPrice,
        product: 1000,
        delivery: data.delivery
          ? deliveryDays[data.delivery].toISOString()
          : undefined,
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const displayPrice = eggPrice * 10;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2 max-w-[400px] mt-3 text-black gap-y-3"
    >
      <AutocompleteInput
        label="Ime korisnika"
        name="userId"
        onSelect={(id) => setValue("userId", id)}
      />
      <select
        {...register("quantity")}
        defaultValue={20}
        className="px-4 py-3  bg-white rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
      >
        {Array.from({ length: 25 }, (_, i) =>
          i !== 0 ? (
            <option value={i * 10 + 10} key={i}>
              {i * 10 + 10} jaja / {i * displayPrice + displayPrice}KM
            </option>
          ) : null
        )}
      </select>
      <select
        {...register("delivery", { required: false })}
        className="px-4 py-3  bg-white rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200"
      >
        <option value={""}>Odaberite datum za dostavu</option>
        {deliveryDays.map((date, i) => (
          <option key={date.toISOString()} value={i}>
            {getDeliveryDisplayDate(date)}
          </option>
        ))}
      </select>
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
        label="Sačuvaj"
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
// b8380558-b8ce-48f1-862c-6d155f63bcd6