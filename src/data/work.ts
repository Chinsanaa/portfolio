/** Work section is disabled in ENABLED_SECTIONS until content is ready. */

export type PhotoshopWork = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

export type VideoWork = {
  id: string;
  title: string;
  desc: string;
  video: string;
};

export const work = {
  photoshop: [
    {
      id: "ps-1",
      title: "Design Sample 01",
      desc: "Add your Photoshop work — replace image in public/images/work/",
      image: "/images/work/photoshop-example-1.svg",
    },
    {
      id: "ps-2",
      title: "Design Sample 02",
      desc: "Upload PNG/JPG to public/images/work/ and update work.ts",
      image: "/images/work/photoshop-example-2.svg",
    },
  ] as PhotoshopWork[],
  videoEditing: [
    {
      id: "vid-1",
      title: "Edit Sample 01",
      desc: "Replace with your MP4 in public/images/work/video-example-1.mp4",
      video: "",
    },
    {
      id: "vid-2",
      title: "Edit Sample 02",
      desc: "Add video path in src/data/work.ts when ready",
      video: "",
    },
  ] as VideoWork[],
};
