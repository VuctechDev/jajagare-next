import React from "react";
import { useForm } from "react-hook-form";

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

export const getNextWeekdays = (targetDays: number[], countPerDay: number) => {
  const result: Date[] = [];
  const today = new Date();
  let date = new Date(today);

  while (result.length < targetDays.length * countPerDay) {
    date.setDate(date.getDate() + 1);
    if (targetDays.includes(date.getDay())) {
      result.push(new Date(date));
    }
  }

  return result;
};

export const formatDate = (date: Date) => {
  const formatted = date.toLocaleDateString("sr-Latn-RS", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const saveToLocalStorage = (data: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("formData", JSON.stringify(data));
  }
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
  const deliveryDays = getNextWeekdays([2, 6], 4);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      quantity: 20,
      //   address: "Jagare",
      //   email: "customer@example.com",
      //   phone: "065678765",
      //   name: "Slavisa Travar",
      //   comment: "Prije podne",
      //   delivery: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
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
        email: data.email ?? "",
        phone: data.phone,
        name: data.name,
        comment: data.name ?? "",
        delivery: deliveryDays[data.delivery].toISOString(),
      }),
    });
    saveToLocalStorage(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 max-w-[400px] w-full mx-auto p-4 bg-white rounded-xl shadow-lg text-black"
    >
      {fields.map((item) => (
        <React.Fragment key={item.name}>
          <input
            type={item.type}
            placeholder={item.label}
            {...register(item.name, { required: true })}
            className="px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
          />
          <DisplayError
            message={`${item.name} is required`}
            show={!!errors[item.name]}
          />
        </React.Fragment>
      ))}

      <select
        {...register("delivery", { required: true })}
        className="px-4 py-3 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      >
        <option value="">Odaberite datum za dostavu</option>
        {deliveryDays.map((date, i) => (
          <option key={date.toISOString()} value={i}>
            {formatDate(date)}
          </option>
        ))}
      </select>
      <DisplayError message="Dostava is required" show={!!errors.delivery} />

      <select
        {...register("quantity", { required: true, min: 1 })}
        defaultValue={20}
        className="px-4 py-3 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      >
        {Array.from({ length: 15 }, (_, i) => (
          <option value={i * 10 + 10} key={i}>
            {i * 10 + 10} jaja / {i * 5 + 5}KM
          </option>
        ))}
        {/* <option value={10}>10 jaja / 5KM</option>
        <option value={20} selected>
          20 jaja / 10KM
        </option>
        <option value={30}>30 jaja</option>
        <option value={50}> 50 jaja</option> */}
      </select>
      <DisplayError message="Address is required" show={!!errors.address} />

      {/* <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
        className="px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      /> */}
      {/* <DisplayError message="Valid email is required" show={!!errors.email} /> */}

      {/* <input
        type="text"
        placeholder="Phone"
        {...register("phone", { required: true })}
        className="px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      />
      <DisplayError message="Phone is required" show={!!errors.phone} /> */}

      <textarea
        placeholder="Dodatni komentar"
        {...register("comment")}
        className="px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      />

      <button
        type="submit"
        className="px-6 py-3 mt-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
      >
        Poruči
      </button>
    </form>
  );
}
