import { init, createUploadthing } from "uploadthing/server";
import { uploadthingHandler } from "uploadthing/next";

// Initiera miljövariabler (från Vercel)
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
};

// Lägg till fallback-felutskrift
export const { GET, POST } = uploadthingHandler({
  router: ourFileRouter,
  config: {
    error: (err) => {
      console.error("UploadThing Error:", err);
    },
  },
});
