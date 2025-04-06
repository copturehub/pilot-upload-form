// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f(["image", "video", "pdf", "text"])
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Upload complete!");
      console.log("Filename:", file.name);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
