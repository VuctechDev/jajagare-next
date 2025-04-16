import useFonts from "@/hooks/useFonts";
import React from "react";
import Button from "./Button";

interface DialogProps {
  title: string;
  children?: React.ReactNode;
  isSubmitting: boolean;
  cancelLabel: string;
  confirmLabel: string;
  onClose: () => void;
  onSubmit: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  isSubmitting,
  cancelLabel,
  confirmLabel,
  onClose,
  onSubmit,
}) => {
  const { openSans } = useFonts();
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full mx-4 bg-white rounded-2xl p-6 max-w-[450px] shadow-2xl space-y-4">
        <h2 className={`text-l font-semibold ${openSans}`}>{title}</h2>
        {!!children && <div>{children}</div>}
        <div className="flex justify-end mt-8 space-x-4">
          <Button
            label={cancelLabel}
            variant="secondary"
            onClick={onClose}
            small
            fullWidth
          />
          <Button
            label={confirmLabel}
            isSubmitting={isSubmitting}
            onClick={onSubmit}
            small
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
