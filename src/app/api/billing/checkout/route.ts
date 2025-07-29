import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { polarClient } from '@/lib/polar';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
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

    const { planId } = await req.json();
    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Get user from database
    const userRecord = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });

    if (!userRecord) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create or get customer
    let customerId = userRecord.customerId;
    if (!customerId) {
      // Create new customer in Polar.sh
      const customer = await polarClient.createCustomer({
        email: userRecord.email,
        name: userRecord.name,
        metadata: {
          userId: userRecord.id,
        },
      });

      customerId = customer.id;

      // Update user with customer ID
      await db
        .update(user)
        .set({ customerId })
        .where(eq(user.id, userRecord.id));
    }

    // Create checkout session
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const checkoutSession = await polarClient.createCheckoutSession({
      planId,
      customerId,
      successUrl: `${origin}/dashboard/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/dashboard/billing?canceled=true`,
      metadata: {
        userId: userRecord.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}