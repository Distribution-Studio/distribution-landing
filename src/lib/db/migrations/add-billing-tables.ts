import { db } from '../index';
import { sql } from 'drizzle-orm';

export async function addBillingTables() {
  console.log('Running migration: add-billing-tables');

  try {
    // Add customerId column to user table if it doesn't exist
    await db.execute(sql`
      ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "customer_id" TEXT;
    `);

    // Create subscription table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "subscription" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "status" TEXT NOT NULL,
        "plan_id" TEXT NOT NULL,
        "price_id" TEXT NOT NULL,
        "current_period_start" TIMESTAMP NOT NULL,
        "current_period_end" TIMESTAMP NOT NULL,
        "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT FALSE,
        "created_at" TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP NOT NULL
      );
    `);

    // Create billing_info table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "billing_info" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "customer_id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "address" TEXT,
        "city" TEXT,
        "state" TEXT,
        "postal_code" TEXT,
        "country" TEXT,
        "created_at" TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP NOT NULL
      );
    `);

    // Create invoice table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "invoice" (
        "id" TEXT PRIMARY KEY,
        "user_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
        "subscription_id" TEXT REFERENCES "subscription"("id") ON DELETE SET NULL,
        "amount" INTEGER NOT NULL,
        "currency" TEXT NOT NULL,
        "status" TEXT NOT NULL,
        "invoice_url" TEXT,
        "invoice_pdf" TEXT,
        "created_at" TIMESTAMP NOT NULL,
        "paid_at" TIMESTAMP
      );
    `);

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}