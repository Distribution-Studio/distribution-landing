import Image from "next/image";
import PageTransition from "@/components/page-transition";
// import { BuyMeCoffeeCard } from "@/components/buy-me-coffee-card";
import { Support } from "@/components/support";
import { Features } from "@/components/feature";
import { PricingCard } from "@/components/pricing-card";
import { SecondFeature } from "@/components/second-feature";
// import { FeatureCard } from "@/components/FeedbackForm";
// import { TemplatesSection } from "@/components/templates-section";

export default function Home() {
  return (
    <PageTransition>
      <div className=" mx-auto h-auto overflow-y-auto md:overflow-hidden  items-center justify-center">
      <div className=" bg-stone-100 pt-10 pb-20 md:pb-0">
        <div className="flex flex-col lg:flex-row gap-10 max-w-5xl py-20 px-5 mx-auto items-center">
        <div>
        <h1 className="text-black text-4xl md:text-5xl font-bold z-10 ">
            Distribute on Reddit Better than Ever
          </h1>
        <p className="text-md text-muted-foreground mt-3 max-w-lg">
          Minimizing the friction of{" "}
          <span className="font-semibold text-black">Distributing & Market Research</span>{" "}
          while you build the{" "}
          <span className="font-semibold text-black">Product</span>. <br /> <br /> Distribution.Studio also services enterprise-grade marketing with human-touch.
        </p>
        </div>
        <div><img src="hero-side.webp" draggable="false" width="700" alt="sidebar" /></div>
        </div>
      </div>
      <div className="py-16">
      <Features />
      </div>
      <div className="mx-4 my-20">
        <div className="relative w-full max-w-5xl aspect-[10/3] rounded-2xl mx-auto overflow-hidden">
          <Image
            src="/gradient-2.webp"
            alt="Gradiant 2"
            width={800}
            height={450}
            priority
            draggable={false}
            className="rounded-xl select-none brightness-75 object-cover w-full h-full"
          />
          <h1 className="absolute bottom-20 font-mono text-white text-2xl pl-10 md:text-3xl font-bold text-center z-10 whitespace-nowrap">
            STALK Your Potential Customers or Find AN EMPTY SPACE
          </h1>
        </div>
      </div>
      {/* <TemplatesSection /> */}
    </div>
    </PageTransition>
  );
}
