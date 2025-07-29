'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth } from "@/lib/auth-client";

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const pricingTiers = [
    {
      id: 'plan_basic',
      name: 'Basic',
      price: "$19",
      period: 'month',
      features: [
        "Live Scan with Alerts",
        "5 Keywords",
        "5 Members",
        "Csv / Json"
      ]
    },
    {
      id: 'plan_pro',
      name: 'Pro',
      price: "$29",
      period: 'month',
      features: [
        "20 Keywords",
        "15 Members",
        "Csv / Json"
      ]
    },
    {
      id: 'plan_premium',
      name: 'Premium',
      price: "$69",
      period: 'month',
      features: [
        "55 Keywords",
        "Unlimited Members",
        "Csv / Json"
      ]
    },
    {
      id: 'plan_enterprise',
      name: 'Enterprise',
      price: "Custom",
      period: '',
      features: [
        "Custom Self Hosted Solutions",
        "Manual Marketing with Human Touch"
      ]
    }
  ];
  
  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const session = await auth.getSession();
      if (!session) {
        // Redirect to login if not authenticated
        router.push(`/login?redirect=${encodeURIComponent('/dashboard/billing')}&plan=${planId}`);
        return;
      }
      
      // Redirect to billing page to complete subscription
      router.push(`/dashboard/billing?plan=${planId}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                  <Button 
                    className="w-full bg-black text-white py-3 px-6 font-medium hover:bg-neutral-800 transition-colors"
                    onClick={() => handleSubscribe(tier.id)}
                    disabled={loading || tier.id === 'plan_enterprise'}
                  >
                    {tier.id === 'plan_enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
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