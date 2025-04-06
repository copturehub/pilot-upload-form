// app/page.tsx
"use client";

import { useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState("Välj filer och fyll i fälten");

  const upload = async () => {
    const pilot = (document.getElementById("pilot") as HTMLInputElement).value.trim();
    const project = (document.getElementById("project") as HTMLInputElement).value.trim();
    const files = (document.getElementById("files") as HTMLInputElement).files;

    if (!pilot || !project || !files?.length) {
      setStatus("⚠️ Fyll i alla fält och välj filer.");
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append("file", file);
    }

    formData.append("route", "pilotUploader");
    formData.append("metadata", JSON.stringify({
      pilotName: pilot,
      projectName: project,
    }));

    try {
      const res = await fetch("/api/uploadthing", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      setStatus("✅ Svar från servern: " + result);
      console.log(result);
    } catch (err: any) {
      setStatus("❌ Fel: " + err.message);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ladda upp flygfiler till Copture</h1>

      <label>
        Pilotnamn: <input type="text" id="pilot" required />
      </label>
      <br />
      <label>
        Projektnamn: <input type="text" id="project" required />
      </label>
      <br />
      <label>
        Filer: <input type="file" id="files" multiple required />
      </label>
      <br />
      <button onClick={upload}>Ladda upp</button>
      <p style={{ marginTop: "1rem", fontFamily: "monospace" }}>{status}</p>
    </main>
  );
}
