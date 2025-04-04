import { createUploadthing, type FileRouter } from "uploadthing/server";
import { uploadthingHandler } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Upload complete!");
      console.log("Filnamn:", file.name);
      console.log("Metadata:", metadata);
    }),
} satisfies FileRouter;

export const { GET, POST } = uploadthingHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: "/thank-you", // valfritt – kan tas bort
    error: (err) => {
      console.error("UploadThing Error:", err);
    },
  },
});
