// app/api/uploadthing/route.ts

import { createUploadthing, type FileRouter } from "uploadthing/server";
import { handleUploadThing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Upload complete!");
      console.log("Filename:", file.name);
      console.log("Metadata:", metadata);
    }),
} satisfies FileRouter;

export const GET = handleUploadThing({ router: ourFileRouter });
export const POST = handleUploadThing({ router: ourFileRouter });
