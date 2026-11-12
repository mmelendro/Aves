"use client";
import Image from "next/image";
import { useState } from "react";
/** Keep the linked guide usable when its optional thumbnail cannot load. */
export default function InventoryBirdImage({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="flex h-20 w-20 items-center justify-center rounded-lg bg-emerald-50 px-2 text-center text-xs text-gray-600">
      Image unavailable
    </span>
  ) : (
    <Image
      src={src}
      alt={name}
      width={80}
      height={80}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-20 w-20 rounded-lg object-cover"
    />
  );
}
