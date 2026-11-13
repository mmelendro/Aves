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
    // Non-modal: layers remain selectable while the map can still be panned.
    element.show();
    return () => { element.close(); };
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
      className="relative flex min-w-0 flex-wrap items-center gap-1"
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
          className="relative basis-full z-10 m-0 h-fit max-h-[min(65svh,32rem)] w-full max-w-full overflow-y-auto overscroll-contain rounded-2xl border border-emerald-200 bg-white p-3 text-left text-xs leading-5 text-emerald-950 shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
          onKeyDown={(event) => {if(event.key==="Escape"){event.preventDefault();event.stopPropagation();picker.close();}}}
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
