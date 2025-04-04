"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "./api/uploadthing/core";
import "@uploadthing/react/styles.css";
import { useState } from "react";

export default function UploadPage() {
  const [pilot, setPilot] = useState("");
  const [project, setProject] = useState("");
  const [error, setError] = useState("");

  const isFormComplete = pilot.trim() !== "" && project.trim() !== "";

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ladda upp flygfiler till Copture</h1>

      <label>
        Pilotnamn:{" "}
        <input
          type="text"
          value={pilot}
          onChange={(e) => setPilot(e.target.value)}
          placeholder="Ex: Anna"
        />
      </label>
      <br />
      <label>
        Projektnamn:{" "}
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Ex: Skog123"
        />
      </label>

      <br />
      <br />

      {isFormComplete ? (
        <UploadDropzone<OurFileRouter>
          endpoint="pilotUploader"
          input={{ pilot, project }}
          onClientUploadComplete={(res) => {
            console.log("✅ Upload klar:", res);
            alert("✅ Filuppladdning slutförd!");
          }}
          onUploadError={(error: Error) => {
            console.error("❌ Fel vid uppladdning:", error);
            setError(error.message);
          }}
          appearance={{
            button: "bg-blue-500 text-white px-4 py-2 rounded mt-2",
          }}
        />
      ) : (
        <p style={{ color: "gray", marginTop: "1rem" }}>
          Fyll i pilot- och projektnamn för att aktivera uppladdning.
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          ❌ Fel: {error}
        </p>
      )}
    </main>
  );
}
