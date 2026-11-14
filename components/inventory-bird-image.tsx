"use client";
import Image from "next/image";
import { useState } from "react";
/** Keep the linked guide usable when its optional thumbnail cannot load. */
export default function InventoryBirdImage({
  src,
  name,
  album = false,
}: {
  src: string;
  name: string;
  album?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className={album ? "flex aspect-[4/5] items-center justify-center text-sm text-gray-600" : "flex h-20 w-20 items-center justify-center rounded-lg bg-emerald-50 px-2 text-center text-xs text-gray-600"}>
      Image unavailable
    </span>
  ) : (
    <Image
      src={src}
      alt={name}
      width={album ? 600 : 80}
      height={album ? 750 : 80}
      loading="lazy"
      onError={() => setFailed(true)}
      className={album ? "aspect-[4/5] h-auto w-full object-contain" : "h-20 w-20 rounded-lg object-cover"}
    />
  );
}
