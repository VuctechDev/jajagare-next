import React from "react";

interface DialogProps {
  title: string;
  children: React.ReactNode;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  isSubmitting,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full mx-4 bg-white rounded-2xl p-6 max-w-[450px] shadow-2xl space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Ne hvala
          </button>
          <button
            onClick={onSubmit}
            className={`px-4 py-2 rounded-xl text-white transition   ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Slanje..." : "Sačuvaj"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
