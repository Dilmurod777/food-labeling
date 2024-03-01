import localFont from "next/font/local";

const basePath = "../../public/fonts/Helvetica/";

export const Helvetica = localFont({
  src: [
    {
      path: "../../public/fonts/Helvetica/Helvetica-Light.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Helvetica/Helvetica-LightOblique.woff",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/Helvetica/Helvetica-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Helvetica/Helvetica-Oblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Helvetica/Helvetica-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Helvetica/Helvetica-BoldOblique.woff",
      weight: "700",
      style: "italic",
    },
  ],
});
