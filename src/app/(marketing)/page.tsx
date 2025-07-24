import Image from "next/image";
import PageTransition from "@/components/page-transition";
// import { BuyMeCoffeeCard } from "@/components/buy-me-coffee-card";
import { Support } from "@/components/support";
import { Review } from "@/components/review";
import { PricingCard } from "@/components/pricing-card";
import { SecondFeature } from "@/components/second-feature";
// import { FeatureCard } from "@/components/FeedbackForm";
// import { TemplatesSection } from "@/components/templates-section";

export default function Home() {
  return (
    <PageTransition>
      <div className=" mx-auto px-4 max-w-5xl lg:px-6 h-auto overflow-y-auto md:overflow-hidden my-10  items-center justify-center">
      <div className="md:min-h-screen pt-20 pb-20 md:pb-0">
        <div className="relative w-full max-w-5xl aspect-[16/8] rounded-2xl mx-auto overflow-hidden">
          <Image
            src="/hero.webp"
            alt="Kite"
            width={800}
            height={450}
            draggable={false}
            priority
            className="rounded-xl select-none brightness-87 object-cover w-full h-full"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-5xl font-bold text-center z-10 ">
            Frictionless Waitlists for Busy Founders
          </h1>
        </div>
        <p className="text-md text-center text-muted-foreground mt-3">
          Focus on the serving your{" "}
          <span className="font-semibold text-black">Potential Customers</span>{" "}
          while you build the{" "}
          <span className="font-semibold text-black">MVP</span>. Distribution.Studio will
          help you do that.
        </p>
      </div>
      <div className="mb-14 max-w-4xl mx-auto px-4">
          <section>
            <article>
              <p className="text-lg text-neutral-700 leading-relaxed">
                A Vibe Coder and not sure about the security of your waitlist?{" "}
                <strong>It's time for better templates.</strong> <br />
                Spending 2 days on what should take 10 minutes to setup & deploy?{" "}
                <strong>It's time for better templates.</strong> <br/>
                Database setup giving you headaches?{" "}
                <strong>It's time for better templates.</strong> <br />
                People Spamming your waitlist?{" "}
                <strong className="inline-block bg-neutral-100 border border-neutral-300 text-black px-2 py-1 transform rotate-[-2deg] font-bold">
                  It's time for Better Waitlists.
                </strong>
                <br />
                <br />
                ps: we are not a design shop, that stuff is very brand oriented.
                <br />
                we sell functionality only, not design.

              </p>
            </article>
          </section>
        </div>
        <div className="grid grid-cols-2 gap-8 my-10 px-4">
        <div>
          <Review />
        </div>
        <div>
          <Support />
        </div>
      </div>
      <SecondFeature />
      {/* <FeatureCard /> */}
      <div className="mx-4 my-2">
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
          <h1 className="absolute bottom-0 font-mono lg:right-1/4 transform translate-x-1/4 md:translate-x-1/2 -translate-y-1/2 text-white text-2xl md:text-3xl font-bold text-center z-10 whitespace-nowrap">
            Treat. Customers. Better.
          </h1>
        </div>
      </div>
      {/* <TemplatesSection /> */}
    </div>
    </PageTransition>
  );
}
