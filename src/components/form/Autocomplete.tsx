import { useGetUsers } from "@/lib/api/users/queries";
import React, { useState } from "react";

interface AutocompleteInputProps {
  label: string;
  name: string;
  onSelect: (id: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  name,
  onSelect,
}) => {
  const { data } = useGetUsers();
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = data?.data?.filter((opt) =>
    opt.name.toLowerCase().includes(input.toLowerCase())
  );
  const handleSelect = (value: string, label: string) => {
    setInput(label);
    setShowDropdown(false);
    onSelect(value);
  };

  const handleClear = () => {
    setInput("");
    onSelect("");
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={label}
        name={name}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowDropdown(true);
        }}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 200);
        }}
        className="px-4 py-3 pr-10 bg-white rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DB6D1D] shadow-md transition-all duration-200 w-full"
      />

      {input && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}

      {showDropdown && (
        <ul className="absolute top-full z-10 w-full bg-white border border-gray-200 mt-1 rounded-xl shadow-md max-h-48 overflow-y-auto">
          {filtered.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.id, option.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
