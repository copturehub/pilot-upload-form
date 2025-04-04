import { init, createUploadthing, type FileRouter } from "uploadthing/server";
import { uploadthingHandler } from "uploadthing/next";

init({
  apiKey: process.env.UPLOADTHING_SECRET,
});

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ "*": { maxFileSize: "100MB" } })
    .onUploadComplete(({ metadata, file }) => {
      console.log("✅ Uppladdad fil:", file);
    }),
} satisfies FileRouter;

export default uploadthingHandler({ router: ourFileRouter });
