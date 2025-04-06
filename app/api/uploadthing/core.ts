// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { z } from "zod"; // Lägg till Zod för metadata-validering

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f(["image", "video", "pdf", "text"])
    .input(
      z.object({
        pilotName: z.string().min(1),
        projectName: z.string().min(1),
      })
    )
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Upload complete!");
      console.log("Filename:", file.name);
      console.log("Pilot:", metadata.pilotName);
      console.log("Project:", metadata.projectName);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
