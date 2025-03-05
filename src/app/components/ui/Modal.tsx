"use client";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { cn } from "@/app/utils";

const ModalContext = createContext({
  openName: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (_name: string) => {},
  close: () => {},
});

function ModalOpen({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement<{ onClick?: () => void }>;
  opens: string;
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function ModalClose({ children }: { children: React.ReactNode }) {
  const { close } = useContext(ModalContext);

  return <div onClick={close}>{children}</div>;
}

interface ModalBodyProps {
  children: React.ReactNode;
  name: string;
  className?: string;
}

function ModalBody({ children, name, className }: ModalBodyProps) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div
      className={` fixed inset-0 z-[99999] flex  overflow-y-scroll bg-black/50 justify-center backdrop-blur-sm `}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          `${
            name === openName ? "scale-in" : "scale-out"
          } w-full rounded-[40px] max-w-[969px]`,
          className,
        )}
      >
        <div className="relative h-full w-full ">{children}</div>
      </div>
    </div>,
    document.getElementById("portal-root") as HTMLElement,
  );
}

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Body = ModalBody;
Modal.Open = ModalOpen;
Modal.Close = ModalClose;

export default Modal;
