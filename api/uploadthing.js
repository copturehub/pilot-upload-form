import { init, createUploadthing, type FileRouter } from "uploadthing/server";
import { uploadthingHandler } from "uploadthing/next";

// Initiera med miljövariabler från Vercel
init({
  apiKey: process.env.UPLOADTHING_SECRET,
});

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ metadata, file }) => {
      console.log("✅ Upload complete!");
      console.log("Filnamn:", file.name);
      console.log("Metadata:", metadata);
    }),
} satisfies FileRouter;

export const { GET, POST } = uploadthingHandler({
  router: ourFileRouter,
  config: {
    error: (err) => {
      console.error("❌ UploadThing Error:", err);
    },
  },
});
