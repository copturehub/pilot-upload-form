"use client";

import { UploadDropzone } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core"; // du kan behöva anpassa sökvägen

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export default function UploadPage() {
  const { startUpload, permittedFileInfo, isUploading, fileTypes } = useUploadThing("pilotUploader");

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ladda upp flygfiler till Copture</h1>

      <UploadDropzone
        endpoint="pilotUploader"
        onClientUploadComplete={(res) => {
          console.log("✅ Upload complete", res);
          alert("✅ Filerna har laddats upp!");
        }}
        onUploadError={(err) => {
          console.error("❌ Upload error", err);
          alert("❌ Fel vid uppladdning: " + err.message);
        }}
        appearance={{
          label: "Dra och släpp filer här eller klicka",
          button: "Ladda upp",
        }}
      />

      {isUploading && <p>⏳ Laddar upp...</p>}
    </main>
  );
}
