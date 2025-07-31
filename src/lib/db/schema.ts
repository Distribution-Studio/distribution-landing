import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  bio: text("bio"),
  website: text("website"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  customerId: text("customer_id"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const subscription = pgTable("subscription", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // active, canceled, past_due, etc.
  planId: text("plan_id").notNull(),
  priceId: text("price_id").notNull(),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const billingInfo = pgTable("billing_info", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  customerId: text("customer_id").notNull(),
  email: text("email").notNull(),
  name: text("name"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  postalCode: text("postal_code"),
  country: text("country"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const invoice = pgTable("invoice", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subscriptionId: text("subscription_id")
    .references(() => subscription.id, { onDelete: "set null" }),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  status: text("status").notNull(), // paid, open, void, etc.
  invoiceUrl: text("invoice_url"),
  invoicePdf: text("invoice_pdf"),
  createdAt: timestamp("created_at").notNull(),
  paidAt: timestamp("paid_at"),
});

// Keywords for monitoring
export const keyword = pgTable("keyword", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  keyword: text("keyword").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  alertsEnabled: boolean("alerts_enabled").notNull().default(true),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Reddit mentions found
export const mention = pgTable("mention", {
  id: text("id").primaryKey(),
  keywordId: text("keyword_id")
    .notNull()
    .references(() => keyword.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  redditPostId: text("reddit_post_id").notNull(),
  subreddit: text("subreddit").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  author: text("author").notNull(),
  url: text("url").notNull(),
  score: integer("score").default(0),
  numComments: integer("num_comments").default(0),
  createdAt: timestamp("created_at").notNull(),
  redditCreatedAt: timestamp("reddit_created_at").notNull(),
});

// Manual search results
export const searchResult = pgTable("search_result", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  query: text("query").notNull(),
  redditPostId: text("reddit_post_id").notNull(),
  subreddit: text("subreddit").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  author: text("author").notNull(),
  url: text("url").notNull(),
  score: integer("score").default(0),
  numComments: integer("num_comments").default(0),
  createdAt: timestamp("created_at").notNull(),
  redditCreatedAt: timestamp("reddit_created_at").notNull(),
});

// Alerts sent to users
export const alert = pgTable("alert", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  mentionId: text("mention_id")
    .notNull()
    .references(() => mention.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // email, webhook, etc.
  status: text("status").notNull(), // sent, failed, pending
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").notNull(),
});
