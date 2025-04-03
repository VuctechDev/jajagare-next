import useFonts from "@/hooks/useFonts";
import { useEffect, useState } from "react";

type SnackbarProps = {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
};

export default function Snackbar({
  message,
  open,
  onClose,
  duration = 6000,
}: SnackbarProps) {
  const { openSans } = useFonts();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open && !visible) return null;

  return (
    <div
      className={`
        fixed bottom-6 left-4 right-4 md:left-6 md:right-auto transform ${openSans} font-semibold
        px-6 py-3 rounded-2xl shadow-lg
        bg-green-600 text-white
        transition-all duration-300
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      `}
    >
      {message}
    </div>
  );
}
