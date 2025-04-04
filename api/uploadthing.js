import { init, createUploadthing, type FileRouter } from "uploadthing/server";
import { uploadthingHandler } from "uploadthing/next";

// 🧠 Initiera med miljövariablerna (läggs in automatiskt från Vercel Environment Variables)
init({
  apiKey: process.env.UPLOADTHING_SECRET,
});

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ metadata, file }) => {
      console.log("✅ Uppladdad fil:", file);
    }),
} satisfies FileRouter;

export default uploadthingHandler({ router: ourFileRouter });
asa
