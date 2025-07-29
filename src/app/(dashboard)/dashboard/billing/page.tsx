'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Check, AlertCircle, CreditCard, FileText, Clock, RefreshCw } from 'lucide-react';

interface Subscription {
  id: string;
  status: string;
  planId: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  invoiceUrl: string | null;
  createdAt: string;
  paidAt: string | null;
}

interface BillingData {
  subscription: Subscription | null;
  invoices: Invoice[];
}

const plans = {
  'plan_basic': {
    name: 'Basic',
    price: '$19/month',
    features: [
      'Live Scan with Alerts',
      '5 Keywords',
      '5 Members',
      'Csv / Json'
    ]
  },
  'plan_pro': {
    name: 'Pro',
    price: '$29/month',
    features: [
      '20 Keywords',
      '15 Members',
      'Csv / Json'
    ]
  },
  'plan_premium': {
    name: 'Premium',
    price: '$69/month',
    features: [
      '55 Keywords',
      'Unlimited Members',
      'Csv / Json'
    ]
  },
  'plan_enterprise': {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Custom Self Hosted Solutions',
      'Manual Marketing with Human Touch'
    ]
  }
};

export default function BillingPage() {
  const [loading, setLoading] = useState(true);
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const searchParams = useSearchParams();
  
  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/billing/subscription');
      if (!response.ok) throw new Error('Failed to fetch subscription data');
      
      const data = await response.json();
      setBillingData(data);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      toast.error('Failed to load subscription information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
    
    // Check for success or canceled params from checkout
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success) {
      toast.success('Your subscription has been successfully processed!');
    } else if (canceled) {
      toast.info('Checkout was canceled. You can try again when you\'re ready.');
    }
  }, [searchParams]);

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout process');
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You\'ll still have access until the end of your billing period.')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch('/api/billing/subscription', {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to cancel subscription');
      
      await fetchSubscriptionData();
      toast.success('Your subscription will be canceled at the end of the billing period');
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error('Failed to cancel subscription');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'canceled':
        return <Badge className="bg-yellow-100 text-yellow-800">Canceled</Badge>;
      case 'past_due':
        return <Badge className="bg-red-100 text-red-800">Past Due</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case 'void':
        return <Badge className="bg-gray-100 text-gray-800">Void</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getCurrentPlan = () => {
    if (!billingData?.subscription) return null;
    
    const planId = billingData.subscription.planId;
    return plans[planId as keyof typeof plans] || { name: 'Unknown Plan', price: 'Unknown', features: [] };
  };

  const currentPlan = getCurrentPlan();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>
      
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <RefreshCw className="animate-spin h-8 w-8 text-gray-400" />
            </div>
          ) : billingData?.subscription ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Current Plan: {currentPlan?.name || 'Unknown'}</CardTitle>
                    <CardDescription>
                      Status: {getStatusBadge(billingData.subscription.status)}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{currentPlan?.price}</div>
                    {billingData.subscription.cancelAtPeriodEnd && (
                      <p className="text-sm text-amber-600 mt-1">
                        <Clock className="inline-block h-4 w-4 mr-1" />
                        Cancels on {formatDate(billingData.subscription.currentPeriodEnd)}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Plan Features:</h3>
                <ul className="space-y-1">
                  {currentPlan?.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Next billing date</h4>
                      <p className="text-sm text-blue-700">
                        Your next billing date is {formatDate(billingData.subscription.currentPeriodEnd)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={fetchSubscriptionData}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                {!billingData.subscription.cancelAtPeriodEnd && (
                  <Button variant="destructive" onClick={handleCancelSubscription} disabled={loading}>
                    Cancel Subscription
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">No active subscription</h3>
                    <p className="text-sm text-amber-700">
                      Choose a plan below to get started with our services.
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(plans).map(([planId, plan]) => (
                  <Card key={planId} className="flex flex-col">
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>
                        <span className="text-2xl font-bold">{plan.price}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleSubscribe(planId)}
                        disabled={loading}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Subscribe
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <RefreshCw className="animate-spin h-8 w-8 text-gray-400" />
                </div>
              ) : billingData?.invoices && billingData.invoices.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingData.invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{formatDate(invoice.createdAt)}</td>
                          <td className="py-3 px-4">{formatCurrency(invoice.amount, invoice.currency)}</td>
                          <td className="py-3 px-4">{getInvoiceStatusBadge(invoice.status)}</td>
                          <td className="py-3 px-4 text-right">
                            {invoice.invoiceUrl && (
                              <a 
                                href={invoice.invoiceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                View
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No invoices found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}