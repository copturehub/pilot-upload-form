// app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Fil uppladdad:", file.name);
      console.log("📂 Metadata:", metadata);
    }),
} satisfies FileRouter;
