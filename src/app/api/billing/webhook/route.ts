import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { subscription, invoice, user } from '@/lib/db/schema';
import { polarClient } from '@/lib/polar';
import { eq } from 'drizzle-orm';
import { env } from '@/env';

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature
    const signature = req.headers.get('polar-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // TODO: Implement signature verification with Polar.sh
    // This would typically involve using a library or crypto functions
    // to verify the signature against the request body using your webhook secret

    const event = await req.json();
    const eventType = event.type;
    const data = event.data;

    console.log(`Processing webhook: ${eventType}`);

    switch (eventType) {
      case 'subscription.created':
      case 'subscription.updated':
        await handleSubscriptionUpdate(data);
        break;
      case 'subscription.deleted':
        await handleSubscriptionCancellation(data);
        break;
      case 'invoice.paid':
        await handleInvoicePaid(data);
        break;
      case 'customer.created':
      case 'customer.updated':
        await handleCustomerUpdate(data);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

async function handleSubscriptionUpdate(data: any) {
  const {
    id: subscriptionId,
    customer_id: customerId,
    plan_id: planId,
    price_id: priceId,
    status,
    current_period_start,
    current_period_end,
    cancel_at_period_end,
  } = data;

  // Find user by customer ID
  const userRecord = await db.query.user.findFirst({
    where: eq(user.customerId, customerId),
  });

  if (!userRecord) {
    console.error(`No user found for customer ID: ${customerId}`);
    return;
  }

  // Check if subscription already exists
  const existingSubscription = await db.query.subscription.findFirst({
    where: eq(subscription.id, subscriptionId),
  });

  const now = new Date();
  const subscriptionData = {
    userId: userRecord.id,
    status,
    planId,
    priceId,
    currentPeriodStart: new Date(current_period_start),
    currentPeriodEnd: new Date(current_period_end),
    cancelAtPeriodEnd: cancel_at_period_end,
    updatedAt: now,
  };

  if (existingSubscription) {
    // Update existing subscription
    await db
      .update(subscription)
      .set(subscriptionData)
      .where(eq(subscription.id, subscriptionId));
  } else {
    // Create new subscription
    await db.insert(subscription).values({
      id: subscriptionId,
      ...subscriptionData,
      createdAt: now,
    });
  }
}

async function handleSubscriptionCancellation(data: any) {
  const { id: subscriptionId } = data;

  // Update subscription status to canceled
  await db
    .update(subscription)
    .set({
      status: 'canceled',
      updatedAt: new Date(),
    })
    .where(eq(subscription.id, subscriptionId));
}

async function handleInvoicePaid(data: any) {
  const {
    id: invoiceId,
    customer_id: customerId,
    subscription_id: subscriptionId,
    amount,
    currency,
    status,
    invoice_url,
    invoice_pdf,
    created_at,
    paid_at,
  } = data;

  // Find user by customer ID
  const userRecord = await db.query.user.findFirst({
    where: eq(user.customerId, customerId),
  });

  if (!userRecord) {
    console.error(`No user found for customer ID: ${customerId}`);
    return;
  }

  // Check if invoice already exists
  const existingInvoice = await db.query.invoice.findFirst({
    where: eq(invoice.id, invoiceId),
  });

  if (!existingInvoice) {
    // Create new invoice record
    await db.insert(invoice).values({
      id: invoiceId,
      userId: userRecord.id,
      subscriptionId: subscriptionId || null,
      amount,
      currency,
      status,
      invoiceUrl: invoice_url,
      invoicePdf: invoice_pdf,
      createdAt: new Date(created_at),
      paidAt: paid_at ? new Date(paid_at) : null,
    });
  }
}

async function handleCustomerUpdate(data: any) {
  const { id: customerId, email } = data;

  // Find user by email
  const userRecord = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (userRecord) {
    // Update user with customer ID
    await db
      .update(user)
      .set({ customerId })
      .where(eq(user.id, userRecord.id));
  }
}