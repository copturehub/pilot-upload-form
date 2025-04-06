import { createUploadthing, type FileRouter } from "uploadthing/server";
import { getUploadthingPayload } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pilotUploader: f(["image", "video", "pdf", "text"]) // tillåt flera typer
    .middleware(async ({ req }) => {
      const formData = await getUploadthingPayload(req);
      const pilot = formData?.pilot as string;
      const project = formData?.project as string;

      if (!pilot || !project) throw new Error("Pilot eller projekt saknas");

      return {
        pilotName: pilot,
        projectName: project,
      };
    })
    .onUploadComplete(({ file, metadata }) => {
      console.log("✅ Upload complete!");
      console.log("Filename:", file.name);
      console.log("Pilot:", metadata?.pilotName);
      console.log("Project:", metadata?.projectName);
    }),
} satisfies FileRouter;
