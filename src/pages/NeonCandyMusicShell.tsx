import { Helmet } from "react-helmet";
import MusicPage from "./MusicPage";

const NeonCandyMusicShell = () => (
  <>
    <MusicPage />
    <Helmet>
      <title>Music & Releases | NeonCandy</title>
      <meta name="description" content="Published songs and releases from NeonCandy." />
      <link rel="canonical" href="https://neoncandy.net/music" />
    </Helmet>
  </>
);

export default NeonCandyMusicShell;