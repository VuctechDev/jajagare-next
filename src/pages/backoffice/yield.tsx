import { YieldType } from "@/@types";
import Button from "@/components/Button";
import InputField from "@/components/form/InputField";
import Snackbar from "@/components/Snackbar";
import useFonts from "@/hooks/useFonts";
import { useGetYield, useCreateYield } from "@/lib/api/yield/queries";
import { eggPrice } from "@/lib/data";
import { getDeliveryDisplayDate } from "@/lib/date";
import { storage } from "@/lib/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
}) => {
  if (!active || !payload?.length || !label) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, month, day] = label.split("-");
  const formattedDate = `${parseInt(day)}.${parseInt(month)}.`;

  const eggs = payload[0]?.value;
  const chickens = payload[0]?.payload?.chickens;
  const comment = payload[0]?.payload?.comment;
  const yieldValue = payload[0]?.payload?.yield;

  return (
    <div className="bg-white border border-gray-300 rounded-md p-2 shadow text-sm">
      <p className="font-semibold">{formattedDate}</p>
      <p>🥚 {eggs}</p>
      <p>🐔 {chickens}</p>
      <p>🥚/🐔 {yieldValue}%</p>
      <p>{comment}</p>
    </div>
  );
};

const EggYieldChart = ({ data }: { data: YieldType[] }) => {
  const mappedData = data.map(({ date, quantity, chickens, comment }) => ({
    date,
    quantity,
    chickens,
    comment,
    yield: chickens > 0 ? Math.round((quantity / chickens) * 100) : 0,
  }));
  return (
    <div className="w-full h-40 md:h-96 md:pr-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mappedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(dateStr) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [_, month, day] = dateStr.split("-");
              return `${parseInt(day)}.${parseInt(month)}.`;
            }}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="#DB6D1D"
            strokeWidth={2}
            yAxisId="left"
          />
          <Line
            type="monotone"
            dataKey="yield"
            stroke="#1E90FF"
            strokeWidth={2}
            yAxisId="right"
            name="Eggs per Chicken (%)"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

type FormValues = {
  quantity: number;
  comment: string;
  chickens: number;
  date: string;
};

const fields: {
  label: string;
  name: keyof FormValues;
  type: string;
}[] = [
  {
    label: "Kolicina",
    name: "quantity",
    type: "number",
  },
  {
    label: "Datum",
    name: "date",
    type: "date",
  },
  {
    label: "Broj koka",
    name: "chickens",
    type: "number",
  },
  {
    label: "Dodatni komentar",
    name: "comment",
    type: "textarea",
  },
];

export default function UsersPage() {
  const { openSans } = useFonts();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetYield();
  const { mutateAsync: createYield } = useCreateYield();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      ...storage.get("YieldFormData", {}),
      date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createYield(data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const totalChickens = data.data.reduce(
    (sum, entry) => sum + entry.chickens,
    0
  );
  const averageYield = ((data.total * 100) / totalChickens).toFixed(1);
  return (
    <div className={`w-full ${openSans}`}>
      {/* <QueryPanel onQueryUpdate={(value) => console.log(value)} month /> */}
      {isLoading ? (
        <h2>Ucitavanje...</h2>
      ) : (
        <div className="w-full md:min-w-[1200px] p-4 space-y-1 flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/7 min-w-[200px] md:p-4 space-y-1">
            <div className="flex font-semibold text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
              <div className="w-2/3">Datum</div>
              <div className="w-1/3">Kolicina</div>
            </div>
            {data.data.map((item) => (
              <div
                key={item.id}
                className="flex items-center text-sm text-gray-800 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="w-2/3">
                  {getDeliveryDisplayDate(item.date, true)}
                </div>
                <div className="w-1/3">{item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-6/7 ">
            <div className="flex w-full flex-col md:flex-row ">
              <div className="flex w-full md:w-1/5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2 max-w-[400px] mt-3 w-full mx-auto p-4  text-black gap-y-3"
                >
                  {fields.map((item) => (
                    <InputField
                      key={item.name}
                      name={item.name}
                      type={item.type}
                      label={item.label}
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
                    message="Prinos je uspjesno sacuvan!"
                    onClose={() => setOpen(false)}
                  />
                </form>
              </div>
              <div className="w-full md:w-2/5 my-6 md:my-0 md:pl-8">
                <p>Ukupni prinos: {data.total} komada</p>
                <p>Prosjecan prinos: {averageYield}%</p>
                <p>
                  Prosjecan dnevni prinos:{" "}
                  {(data.total / data.data?.length).toFixed(1)} komada
                </p>
                <p>Ukupna vrijednost: {data.total * eggPrice}KM</p>
                {data.topDay && (
                  <p>
                    Top dan:{" "}
                    {getDeliveryDisplayDate(data?.topDay?.date ?? "", true)},{" "}
                    {data?.topDay?.quantity} komada,{" "}
                    {(
                      (data?.topDay?.quantity * 100) /
                      data?.topDay.chickens
                    ).toFixed(1)}
                    %
                  </p>
                )}
              </div>
              <div className="w-full md:w-2/5 md:pl-8">
                <p className="text-sm">
                  ✅ 80–90% → Excellent (commercial farm levels)
                </p>
                <p className="text-sm">✅ 60–75% → Good backyard performance</p>
                <p className="text-sm">
                  ⚠️ 30–50% → Something might be wrong (diet, age, daylight,
                  stress)
                </p>
                <p className="text-sm">
                  🚫 30% → Likely declining flock or poor conditions
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-8 mb-6 items-center w-full">
              <p className="mb-5">Poslednjih 30 dana</p>
              <EggYieldChart data={data.data?.slice().reverse()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
