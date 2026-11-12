"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Layers } from "lucide-react";

export const mapControlButtonClass =
  "relative inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-full border border-emerald-200 px-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

/** Native top-layer dialogs avoid clipping inside either guide faces or an
 * expanded map. Cancel never bubbles into the underlying map's own dialog. */
export function useMapLayerPicker() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null),
    dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const close = () => {
    dialog.current?.close();
    setOpen(false);
    button.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previous;
    };
  }, [open]);
  return { open, setOpen, button, dialog, id, close };
}

/** Pure presentation shared by the country and richer South Island adapters. */
export function renderMapLayerPicker({
  picker,
  scope,
  title,
  count,
  children,
  backgroundControl,
}: {
  picker: ReturnType<typeof useMapLayerPicker>;
  scope: string;
  title: string;
  count: number;
  children: ReactNode;
  backgroundControl?: ReactNode;
}) {
  return (
    <div
      className="static flex shrink-0 items-center gap-1"
      data-map-layer-panel={scope}
    >
      {backgroundControl}
      <button
        ref={picker.button}
        type="button"
        className={`${mapControlButtonClass} bg-white text-emerald-950`}
        aria-label="Map layers"
        title="Map layers and background"
        aria-expanded={picker.open}
        aria-controls={`${picker.id}-layers`}
        onClick={() => picker.setOpen((value) => !value)}
      >
        <Layers size={18} aria-hidden="true" />
        {count > 0 && (
          <span
            aria-hidden="true"
            className="rounded-full bg-emerald-800 px-1.5 text-[10px] text-white"
          >
            {count}
          </span>
        )}
      </button>
      {picker.open && (
        <dialog
          ref={picker.dialog}
          id={`${picker.id}-layers`}
          aria-label={`${title} layer choices`}
          className="fixed inset-4 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm overflow-y-auto overscroll-contain rounded-2xl border border-emerald-200 bg-white p-3 text-left text-xs leading-5 text-emerald-950 shadow-2xl backdrop:bg-emerald-950/40"
          onCancel={(event) => {
            event.preventDefault();
            event.stopPropagation();
            picker.close();
          }}
          onClose={() => picker.setOpen(false)}
        >
          <div className="sticky -top-3 z-10 -mx-1 flex items-center justify-between gap-2 border-b border-emerald-100 bg-white px-1 pb-1 pt-1">
            <h2 className="font-semibold">{title} map layers</h2>
            <button
              type="button"
              aria-label="Close layers"
              className="min-h-11 min-w-11 rounded-full border border-emerald-200 bg-white"
              onClick={picker.close}
            >
              ×
            </button>
          </div>
          {children}
        </dialog>
      )}
    </div>
  );
}
