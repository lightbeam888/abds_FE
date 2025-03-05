import { useEffect, useRef, MutableRefObject } from "react";

type Handler = () => void;

export function useOutsideClick(handler: Handler, propagation: boolean = true): MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, propagation);

    return () => document.removeEventListener("click", handleClick, propagation);
  }, [handler, propagation]);

  return ref;
}