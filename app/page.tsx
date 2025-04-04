// app/page.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import { ourFileRouter } from "./api/uploadthing/core";

export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🛫 Ladda upp flygfiler till Copture</h1>

      <UploadButton
        endpoint="pilotUploader"
        onClientUploadComplete={(res) => {
          alert("✅ Uppladdning klar!");
          console.log("Resultat:", res);
        }}
        onUploadError={(error: Error) => {
          alert("❌ Fel: " + error.message);
        }}
        appearance={{
          button: {
            backgroundColor: "#222",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "6px",
          },
        }}
      />
    </main>
  );
}
