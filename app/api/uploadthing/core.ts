// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { z } from "zod";

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
      console.log("Pilot:", metadata!.pilotName);     // <- OBS: "!" säger att metadata inte är undefined
      console.log("Project:", metadata!.projectName); // <- samma här
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
