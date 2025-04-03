import { IBM_Plex_Sans, Open_Sans } from "next/font/google";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const useFonts = () => {
  return { openSans: openSans.className, ibmPlexSans: ibmPlexSans.className };
};

export default useFonts;
