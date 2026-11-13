"use client";
import { useState } from "react";
import { Bird } from "lucide-react";
import { useUiCopy } from "@/components/ui-copy-context";
import { useMediaPreferences } from "@/components/media-preferences";
import type { BirdCollectionResponse } from "@/lib/bird-collection";
import Image from "../responsive-photo";
/** Owner and licensed reference images keep separate loading, retry and credit states. */
export default function CollectionPhoto({
  item,
}: {
  item: BirdCollectionResponse["items"][number];
}) {
  const uiCopy = useUiCopy(),
    { lowBandwidth, resolved } = useMediaPreferences(),
    [requested, setRequested] = useState(false),
    [failed, setFailed] = useState(false),
    [photoAttempt, setPhotoAttempt] = useState(0);
  const photo = item.ownerPhoto,
    reference = item.referenceImage,
    showOwner = photo && (requested || (resolved && !lowBandwidth));
  return (
    <div className="space-y-2">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-emerald-50">
        {showOwner && !failed ? (
          <img
            src={photo.src}
            alt={
              photo.caption ||
              `${uiCopy("Your linked photo")}: ${item.commonName}`
            }
            loading="lazy"
            className="h-full w-full object-contain"
            onError={() => setFailed(true)}
          />
        ) : !photo && reference && !failed ? (
          <Image
            key={photoAttempt}
            src={reference.src}
            width={384}
            height={288}
            sizes="(max-width: 767px) 90vw, 320px"
            alt={`${uiCopy(reference.kind)}: ${item.commonName}`}
            className="h-full w-full object-contain"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="p-5 text-center text-emerald-800">
            <Bird className="mx-auto h-12 w-12" aria-hidden="true" />
            <p className="mt-2 text-sm">
              {uiCopy(
                photo
                  ? "Your linked photo is ready to open"
                  : "No collection image available yet",
              )}
            </p>
          </div>
        )}
      </div>
      {photo ? (
        <>
          <p className="text-xs">
            {uiCopy("Your linked photo")} ·{" "}
            {photo.creator || uiCopy("Creator not entered")}
          </p>
          {(!showOwner || failed) && (
            <button
              type="button"
              className="min-h-11 underline text-sm"
              onClick={() => {
                setRequested(true);
                setFailed(false);
              }}
            >
              {uiCopy(failed ? "Retry linked photo" : "Load your linked photo")}
            </button>
          )}
        </>
      ) : reference ? (
        <p className="text-xs leading-5">
          {uiCopy(reference.kind)} · {reference.creator} ·{" "}
          <a
            className="underline"
            href={reference.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {uiCopy("Source")}
          </a>{" "}
          ·{" "}
          <a
            className="underline"
            href={reference.licenseUrl}
            target="_blank"
            rel="noreferrer"
          >
            {reference.license}
          </a>
          {reference.location && <span> · {reference.location}</span>}
          {reference.modifications && (
            <span className="block">{reference.modifications}</span>
          )}
        </p>
      ) : (
        <p className="text-xs">
          {uiCopy(
            "Link one of your existing journal photos from a trip's bird album.",
          )}
        </p>
      )}
      {failed && reference && !photo && (
        <button
          type="button"
          className="min-h-11 underline text-sm"
          onClick={() => {
            setPhotoAttempt((n) => n + 1);
            setFailed(false);
          }}
        >
          {uiCopy("Retry reference image")}
        </button>
      )}
      {failed && (
        <p role="status" className="text-xs">
          {uiCopy("Image unavailable. Your records remain available below.")}
        </p>
      )}
    </div>
  );
}
