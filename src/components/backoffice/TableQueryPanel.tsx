import { QueryState } from "@/hooks/useApiQuery";

interface Props {
  sortKeys: string[];
  handleQuery: (data: Partial<QueryState>) => void;
}

const labels: Record<string, string> = {
  quantity: "Kolicina",
  delivery: "Dostava",
  createdAt: "Kreirano",
  lastOrder: "Poslednja narudzba",
  quantitySum: "Kolicina",
  orderCount: "Broj narudzbi",
};

const TableQueryPanel: React.FC<Props> = ({ sortKeys, handleQuery }) => {
  return (
    <div className="hidden md:flex font-semibold text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl shadow-sm gap-x-4 mb-2">
      <select
        onChange={(e) => handleQuery({ sort: e.target.value })}
        className="w-[100px] bg-white md:w-[140px] h-[30px] px-4 py-0 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      >
        {/* <option value={""}>Sortiraj po</option> */}
        {sortKeys.map((option) => (
          <option key={option} value={option}>
            {labels[option]}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleQuery({ take: e.target.value })}
        className="w-[100px] bg-white md:w-[140px] h-[30px] px-4 py-0 rounded-2xl text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-200"
      >
        {Array.from({ length: 4 }, (_, i) => i + 1).map((value) => (
          <option key={value} value={value * 50}>
            {value * 50}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableQueryPanel;
