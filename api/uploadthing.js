import { createUploadthing, type FileRouter } from "uploadthing/server";
import { uploadthingHandler } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Uppladdad fil:", file);
    }),
} satisfies FileRouter;

export default uploadthingHandler({ router: ourFileRouter });
