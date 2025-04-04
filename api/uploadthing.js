import { createUploadthing, type FileRouter } from "uploadthing";
import { createRouteHandler } from "uploadthing/next"; // v7-handler

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Upload complete!");
      console.log("Filnamn:", file.name);
      console.log("Metadata:", metadata);
    }),
} satisfies FileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    error: (err) => {
      console.error("🔥 UploadThing Error:", err);
    },
  },
});
