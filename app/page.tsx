// app/page.tsx

"use client";

import { UploadButton } from "uploadthing/react";
import type { OurFileRouter } from "./api/uploadthing/route";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Ladda upp flygfiler till Copture</h1>
      <UploadButton<OurFileRouter>
        endpoint="pilotUploader"
        onClientUploadComplete={(res) => {
          alert("✅ Uppladdat!");
          console.log("Upload response:", res);
        }}
        onUploadError={(error: Error) => {
          alert(`❌ Fel vid uppladdning: ${error.message}`);
        }}
      />
    </main>
  );
}
