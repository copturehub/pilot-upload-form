import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ pilot: z.string(), project: z.string() })) // 👈 validera metadata
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Fil uppladdad:");
      console.log("📁 Filnamn:", file.name);
      console.log("🧑 Pilot:", metadata.pilot);
      console.log("📂 Projekt:", metadata.project);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
