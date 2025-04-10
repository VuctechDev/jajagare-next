import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "./Snackbar";
import Button from "./Button";
import InputField from "./form/InputField";
import { useCreateUser } from "@/lib/api/users/queries";

type FormValues = {
  email: string;
  phone: string;
  name: string;
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
    label: "Email",
    name: "email",
    type: "email",
  },
];

export default function UserForm() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createUser } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await createUser(data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col md:max-w-[400px] mt-3 text-black gap-y-3"
    >
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
        label="Kreiraj"
        isSubmitting={isSubmitting}
      />
      <Snackbar
        open={open}
        message="Novi kupac uspješno kreiran!"
        onClose={() => setOpen(false)}
      />
    </form>
  );
}
