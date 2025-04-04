import { createUploadthing, type FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/next"; // ✅ v7-import

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Upload complete!");
      console.log("Filnamn:", file.name);
      console.log("Metadata:", metadata);
    }),
} satisfies FileRouter;

// ✅ v7-sättet att exportera API-route med felhantering
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    error: (err) => {
      console.error("🔥 UploadThing Error:", err);
    },
  },
});
