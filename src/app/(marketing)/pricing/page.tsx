import PageTransition from "@/components/page-transition";

export default function PricingPage() {
  const pricingTiers = [
    {
      price: "$19",
      features: [
        "Live Scan with Alerts",
        "5 Keywords",
        "5 Members",
        "Csv / Json"
      ]
    },
    {
      price: "$29",
      features: [
        "20 Keywords",
        "15 Members",
        "Csv / Json"
      ]
    },
    {
      price: "$69",
      features: [
        "55 Keywords",
        "Unlimited Members",
        "Csv / Json"
      ]
    },
    {
      price: "Enterprise",
      features: [
        "Custom Self Hosted Solutions",
        "Manual Marketing with Human Touch"
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-black mb-4">Pricing</h1>
            <p className="text-lg text-neutral-600">
              Simple, transparent pricing for every stage of your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className="border border-neutral-200 bg-white p-8 rounded-none"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-black mb-2">
                    {tier.price}
                  </h3>
                </div>

                <div className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="flex-1">
                        <p className="text-neutral-700 text-sm leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button className="w-full bg-black text-white py-3 px-6 font-medium hover:bg-neutral-800 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-neutral-600 text-sm">
              All plans include 24/7 support and a 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 