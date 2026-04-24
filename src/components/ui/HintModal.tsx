import { useRef, useImperativeHandle, forwardRef, useState } from "react";
import Card from "./Card";
import MarkdownRenderer from "./MarkdownRenderer";
import 'animate.css';

interface HintModalProps {
  hint: string;
}

export interface HintModalHandle {
  showModal: () => void;
  close: () => void;
}

const HintModal = forwardRef<HintModalHandle, HintModalProps>(({ hint }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dialogRef.current?.close();
      setIsClosing(false);
    }, 200);
  };

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setIsClosing(false);
      dialogRef.current?.showModal();
    },
    close: handleClose,
  }));

  return (
    <dialog
      ref={dialogRef}
      className="m-auto bg-transparent border-none w-full max-w-lg p-3 overflow-visible"
    >
      <div className={isClosing ? "animate-subtle-zoom-fade-out" : "animate-subtle-zoom-fade"}>
        <button
          onClick={handleClose}
          className="btn btn-ghost btn-circle absolute top-3 right-3 z-50"
        >
          ✕
        </button>
        <Card title="Hint">
          <div className="py-4">
            <MarkdownRenderer content={hint} />
          </div>
        </Card>
      </div>
    </dialog>
  );
});

HintModal.displayName = "HintModal";

export default HintModal;
