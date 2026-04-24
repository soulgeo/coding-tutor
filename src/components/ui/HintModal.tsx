import { useRef, useImperativeHandle, forwardRef } from "react";
import Card from "./Card";

interface HintModalProps {
  hint: string;
}

export interface HintModalHandle {
  showModal: () => void;
  close: () => void;
}

const HintModal = forwardRef<HintModalHandle, HintModalProps>(({ hint }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  const closeModal = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="m-auto bg-transparent border-none w-sm p-3"
    >
      <button
        onClick={closeModal}
        className="btn btn-ghost btn-circle absolute top-6 right-6"
      >
        ✕
      </button>
      <Card title="Hint">
        <p className="py-4 text-base-content">{hint}</p>
        <div className="flex justify-end">
          <button onClick={closeModal} className="btn">
            Close
          </button>
        </div>
      </Card>
    </dialog>
  );
});

HintModal.displayName = "HintModal";

export default HintModal;
