import { createUploadthing, type FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/next";
import { z } from "zod"; // 👈 Validering krävs i v7

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .input(
      z.object({
        pilot: z.string().min(1),
        project: z.string().min(1),
      })
    )
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
