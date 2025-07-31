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
            Distribute on Social Media Better
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
      {/* <TemplatesSection /> */}
    </div>
    </PageTransition>
  );
}
