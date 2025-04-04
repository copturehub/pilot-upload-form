// app/page.tsx
"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "./api/uploadthing/core";
import "@uploadthing/react/styles.css";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ladda upp flygfiler till Copture</h1>

      <UploadDropzone<OurFileRouter>
        endpoint="pilotUploader"
        onClientUploadComplete={(res) => {
          console.log("✅ Upload klar:", res);
          alert("✅ Filen är uppladdad!");
        }}
        onUploadError={(error: Error) => {
          console.error("❌ Fel vid uppladdning:", error);
          alert(`Fel: ${error.message}`);
        }}
        config={{
          mode: "auto",
        }}
      />
    </main>
  );
}
