import { Button } from "@/components/ui/button";
import { Check, Box, ShoppingBag, Github, ExternalLink } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
  learnMoreUrl: string;
  previewUrl: string;
}

function FeatureCard({
  title,
  description,
  features,
  learnMoreUrl,
  previewUrl,
}: FeatureCardProps) {
  return (
    <div className="relative flex h-full flex-col gap-y-6 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 hover:border-neutral-300 transition-all duration-300 p-8 border border-neutral-200">
      <div className="flex flex-row items-center gap-3">
        {/* <div className="h-5 w-5 text-neutral-600">
          {icon}
        </div> */}
        <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
      </div>

      <div className="flex flex-1 flex-col justify-start gap-2">
        <p className="text-balance text-md text-neutral-600">{description}</p>
      </div>

      <div className="flex gap-4 flex-col justify-start h-full">
        <ul className="flex flex-col gap-y-1 text-neutral-600 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex flex-row items-center gap-x-2">
              <Check className="h-4 w-4 text-orange-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row gap-2">
      <Button
        variant="outline"
        className="w-fit rounded-full bg-transparent bg-white hover:bg-neutral-100 text-black border-neutral-200"
        asChild
      >
        <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex flex-row items-center gap-2">Buy Now</div>
        </a>
      </Button>
      <Button
        variant="outline"
        className="w-fit rounded-full bg-transparent bg-white hover:bg-neutral-100 text-black border-neutral-200"
        asChild
      >
        <a href={previewUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex flex-row items-center gap-2">Preview</div>
        </a>
      </Button>
      </div>
    </div>
  );
}

export function SecondFeature() {
  const features = [
    {
      title: "$11.99 _Basic",
      description: "Best suited for small scale waitlists with low observability.",
      features: [
        "Discord Server Template for your waitlist",
        "Rate Limiting",
        "Drizzle ORM",
        "PostgresSQL",
        "Upstash Redis",
        "Weekly Improvements & Fixes",
        "Assistance with Deployments",
        "Discord Support",
      ],
      learnMoreUrl: "https://buy.polar.sh/polar_cl_s7hDStpJ1l1UPNFy22HeaRpKfBWOPh8TQ2O1I0vM9j7",
      previewUrl: "https://basic.ruklist.com",
    },
    {
      // icon: <ShoppingBag className="h-5 w-5" />,
      title: "$15.99 _Standard",
      description: "Best suited for medium scale waitlists with moderate observability.",
      features: [
        "Everything from _Basic",
        "Resend Integration",
        "Discord & Slack Webhook with Email & Count",
        "Script to Export Mails from Discord Channel",
        "Integrations with Zapier, Airtable & Notion.",
        "Assistance with Deployments",
        "Weekly Improvements & Fixes",
        "Discord Support",
      ],
      learnMoreUrl: "https://buy.polar.sh/polar_cl_geGAFq8iHlIRBuzmcMYfZkRGZxno12gKlSdyu0kiEvz",
      previewUrl: "https://standard.ruklist.com",
    },
    {
      // icon: <Github className="h-5 w-5" />,
      title: "$29 _Enterprise",
      description: "Best suited for large scale waitlists with high observability & visualizations.",
      features: [
        "Everything from _Standard",
        "Beautiful Dashboard with Analytics",
        "Custom Minor Feature Requests",
        "Weekly Improvements & Fixes",
        "Assistance with Deployments",
        "Priority Discord Support",
        "Access to both _Basic & _Standard Codebase",
        "Access to this Landing Page Codebase"
      ],
      learnMoreUrl: "https://buy.polar.sh/polar_cl_d9fHwDVZCE0ztT7lCSwEmISDjNgm9uzoAso6j29GbAn",
      previewUrl: "https://enterprise.ruklist.com",
    },
  ];

  return (
    <div className="mt-16 mb-8 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="opacity-100">
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </div>
  );
}
