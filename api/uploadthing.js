import { init, createUploadthing } from "uploadthing/server";
import { uploadthingHandler } from "uploadthing/next";

// Initiera med nyckeln du lagt till i Vercel miljövariabler
init({
  apiKey: process.env.UPLOADTHING_SECRET,
});

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ metadata, file }) => {
      console.log("✅ Uppladdad fil:", file);
    }),
};

export default uploadthingHandler({ router: ourFileRouter });
