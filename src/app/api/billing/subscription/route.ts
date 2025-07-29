import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { subscription, invoice, user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
// Import interfaces from polar.ts
import type { PolarSubscription, PolarInvoice } from '@/lib/polar';

export async function GET(req: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user subscription from database
    const userSubscription = await db.query.subscription.findFirst({
      where: eq(subscription.userId, session.user.id),
      orderBy: (subscription, { desc }) => [desc(subscription.createdAt)],
    });

    // Get user invoices from database
    const userInvoices = await db.query.invoice.findMany({
      where: eq(invoice.userId, session.user.id),
      orderBy: (invoice, { desc }) => [desc(invoice.createdAt)],
      limit: 10, // Limit to most recent 10 invoices
    });

    // Get user data to check for customerId
    const userData = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });

    // If we have a subscription and customerId, fetch latest data from Polar
    let polarSubscription: PolarSubscription | null = null;
    let polarInvoices: PolarInvoice[] = [];

    if (userSubscription && userData?.customerId) {
      try {
        // Import the Polar client
        const { polarClient } = await import('@/lib/polar');
        
        // Get latest subscription data from Polar
        polarSubscription = await polarClient.getSubscription(userSubscription.id);
        
        // Get latest invoices from Polar
        polarInvoices = await polarClient.getInvoices(userData.customerId);
      } catch (polarError) {
        console.error('Polar API fetch error:', polarError);
        // Continue with database data if Polar API fails
      }
    }

    return NextResponse.json({
      subscription: polarSubscription || userSubscription || null,
      invoices: polarInvoices.length > 0 ? polarInvoices : userInvoices || [],
    });
  } catch (error) {
    console.error('Subscription fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription data' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user subscription
    const userSubscription = await db.query.subscription.findFirst({
      where: eq(subscription.userId, session.user.id),
      orderBy: (subscription, { desc }) => [desc(subscription.createdAt)],
    });

    if (!userSubscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Import the Polar client
    const { polarClient } = await import('@/lib/polar');

    try {
      // Cancel subscription with Polar.sh API
      await polarClient.cancelSubscription(userSubscription.id, true);

      // Update subscription in local database
      await db
        .update(subscription)
        .set({
          cancelAtPeriodEnd: true,
          updatedAt: new Date(),
        })
        .where(eq(subscription.id, userSubscription.id));

      return NextResponse.json({
        success: true,
        message: 'Subscription will be canceled at the end of the billing period',
      });
    } catch (polarError) {
      console.error('Polar API error:', polarError);
      return NextResponse.json(
        { error: 'Failed to cancel subscription with payment provider' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Subscription cancellation error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}