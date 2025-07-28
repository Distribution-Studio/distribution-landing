import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import arjun from "./arjun.jpg";
import ruklist from "./ruklist.png";

export const Features = () => (
<div className="max-w-6xl mx-auto">
  <h3 className="pb-3 text-3xl font-semibold">Keyword Tracking + Alerts (Live Scan)</h3>
  <p className="pb-8 max-w-2xl">
  <b>Get instantly notified</b> whenever your chosen keywords are <b>mentioned on Reddit</b>. We scan
  in real-time and <b>alert you the moment a relevant post or comment appears</b> <br /> so you can act
  fast.
  </p>
<div className="relative rounded-xl flex flex-col justify-between border component-outline bg-card p-1.25">
    <video src="tweet-scraping.mp4" controls className="rounded-md"></video>
  </div>
<div className="grid grid-cols-2 max-w-6xl mx-auto gap-8 my-10 px-4">
  <div>
  <h3 className="pb-3 text-3xl font-semibold">Manual Keyword Search</h3>
  <p className="pb-5 max-w-2xl">
  <b>Use Manual Search to instantly scan</b> Reddit for any keyword or phrase and find posts & comments.
  </p>
  <div className="relative rounded-xl flex flex-col justify-between border component-outline bg-card p-1.25">
    <video src="tweet-scraping.mp4" controls className="rounded-md"></video>
  </div>
  </div>
  <div>
    <h3 className="pb-3 text-3xl font-semibold">Curated Subreddits</h3>
    <p className="pb-5 max-w-2xl">
      <b>Relevant Subreddits</b> for startups, agencies, and creators
      to find customers or market research.
    </p>
  <div className="relative rounded-xl flex flex-col justify-between border component-outline bg-card p-1.25">
    <video src="tweet-scraping.mp4" controls className="rounded-md"></video>
  </div>
  </div>
  </div>
</div>
);
